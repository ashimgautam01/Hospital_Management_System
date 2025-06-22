import Appoint from "../models/appointment.js";
import LabReport from "../models/labreport.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const requestLabReport = asyncHandler(async (req, res) => {
    const appointmentId = req.params.id;
    const appointment = await Appoint.findOne({ appointmentId });
    if (!appointment) {
        throw new ApiError(400, "No appointments found");
    }

    const { sampleType, charge, Additional } = req.body;

    appointment.lab.push({
        user: req.user._id,
        sampleType,
        charge,
        Additional,
        appointment: appointment._id
    });

    await appointment.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "New lab request added",
            appointment.lab[appointment.lab.length - 1]  
        )
    );
});

const getAllReports = asyncHandler(async (req, res) => {
    try {

        const reports = await Appoint.find ()
        .populate("lab.user", "name email") 
        .populate("lab.appointment", "appointmentId") 
        .sort({'status':1})
        .exec();
     
      
      res.status(200).json({
        success: true,
        data: reports,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve lab reports",
      });
    }
});

const submitReport = asyncHandler(async(req, res) => {
    
  try {
    const { user, appointment, sampleType, data, labReportId } = req.body;
 
    // Handle both new ID-based approach and legacy appointment-based approach
    let existingReport;
    
    if (labReportId) {
      // New approach: find by lab report ID
      existingReport = await LabReport.findById(labReportId);
      
      if (!existingReport) {
        return res.status(404).json({
          success: false,
          message: "Lab report not found with the provided ID"
        });
      }
    } else if (user && appointment && sampleType) {
      // Legacy approach: find by appointment
      existingReport = await LabReport.findOne({ appointment });
      
      if (!existingReport) {
        return res.status(404).json({
          success: false,
          message: "Lab report not found for the provided appointment"
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Either labReportId or (user, appointment, sampleType) are required"
      });
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Lab result data is required"
      });
    }
 
    const reportSampleType = sampleType || existingReport.sampleType;
    
    if (!["blood", "stool"].includes(reportSampleType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample type. Must be 'blood' or 'stool'"
      });
    }

    // Check if report is already completed
    if (existingReport.status === "completed" || existingReport.status === "success") {
      return res.status(400).json({
        success: false,
        message: "Lab report has already been submitted"
      });
    }
 
    const updateData = {
      status: "success" // Changed to "success"
    };

    // Update the appropriate analysis data based on sample type
    if (reportSampleType === "blood") {
      updateData.bloodAnalysis = {
        sodium: data.sodium || null,
        potassium: data.potassium || null,
        calcium: data.calcium || null,
        AST: data.AST || null,
        ALT: data.ALT || null,
        alkalinePhosphatase: data.alkalinePhosphatase || null,
        bilirubinDirect: data.bilirubinDirect || null,
        bilirubinIndirect: data.bilirubinIndirect || null,
      };
    } else if (reportSampleType === "stool") {
      updateData.stoolAnalysis = {
        color: data.color || null,
        consistency: data.consistency || null,
        RBCs: data.RBCs || null,
        WBCs: data.WBCs || null,
        parasites: data.parasites || null,
      };
    }

    // Update the lab report
    const updatedReport = await LabReport.findByIdAndUpdate(
      existingReport._id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'name email')
     .populate('appointment', 'appointmentId date');

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Failed to update lab report"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lab report submitted successfully",
      data: updatedReport
    });

  } catch (error) {
    console.error("Error submitting lab report:", error);
     
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while submitting lab report"
    });
  }
});


const getPharmacyAppointment = asyncHandler(async (req, res) => {
    const appointmentId = req.params.id;
    
    const appointment = await Appoint.findOne({ appointmentId })
        .populate("lab.user", "name email")
        .exec();
    
    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }
 
    const labCharges = appointment.lab.reduce((total, lab) => {
        return total + (lab.charge || 0);
    }, 0);
 
    const labTests = appointment.lab.map(lab => ({
        sampleType: lab.sampleType,
        charge: lab.charge || 0,
        Additional: lab.Additional,
        status: lab.status || 'pending'
    }));
 
    const responseData = {
        ...appointment.toObject(),
        labCharges,
        labTests
    };

    return res.status(200).json(
        new ApiResponse(200, "Appointment found", responseData)
    );
});

export { requestLabReport, getAllReports, submitReport, getPharmacyAppointment };

