import appointmentHtml from "../Emails/html/doctor.js";
import sendemail from "../Emails/SendEmail.js";
import Appoint from "../models/appointment.js";
import Doctor from "../models/doctor.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import User from "../models/user.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const { d_id, name, age, date, doctorName, problem, phone } = req.body;
  console.log(req.body);
  if (!d_id || !name || !age || !date || !doctorName || !problem) {
    throw new ApiError(401, "All fields are required");
  }

  const doctor = await Doctor.findById(d_id);
  if (!doctor) {
    throw new ApiError(401, "No doctor found");
  }

  if (doctor.date.includes(date)) {
    throw new ApiError(400, "Invalid date as Date is already booked");
  }

  const appoint = await Appoint.create({
    doctorid: d_id,
    name,
    age,
    doctorName,
    problem,
    date,
    phone,
    email: req.user.email,
    user: req.user._id,
  });

  doctor.date.push(date);
  await doctor.save();

  const medicalHistoryEntry = {
    problem: problem,
    response: "",
    medicine: "",
    doctorname: doctorName,
    Date: date,
  };

  const user = await User.findById(req.user._id);
  if (user) {
    user.medicalHistory.push(medicalHistoryEntry);
    await user.save();
  }
  const app = await Appoint.findById(appoint._id);
  const appointid = app.appointmentId;

  const html = appointmentHtml(doctorName, problem, date, appointid);
  await sendemail(req.user.email, "Appointment Confirmation", html);

  const updatedDoctor = await Doctor.findById(d_id);

  return res.status(200).json(
    new ApiResponse(200, "Appointment Booked Successfully", {
      appoint: appoint,
      doctor: updatedDoctor,
    })
  );
});

const getAppointmentofUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const patient = await Appoint.findById(id);

  if (!patient) {
    throw new ApiError(400, "No patient found");
  }

  const profile = await User.findById(patient.user).select(
    "-password -ismember -isverified -otp -otp_expiry -refreshToken "
  );

  return res.status(200).json(
    new ApiResponse(200, "Appointment found", {
      patient: patient,
      user: profile,
    })
  );
});

const updateAppointment = asyncHandler(async (req, res) => {
  const { id, medicine } = req.body;

  const appointment = await Appoint.findById(id);
  if (!appointment) {
    return res.status(404).json(new ApiResponse(404, "Appointment not found"));
  }

  appointment.medicine = medicine;

  await appointment.save({ validateBeforeSav: false });

  const updatedAppointment = await Appoint.findById(id);
  return res.status(200).json(
    new ApiResponse(200, "User updated", {
      appoint: updatedAppointment,
    })
  );
});

const checkedAppointments = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await Appoint.findById(id);
  user.doctorid = null;
  user.save();
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "Appointment not found"));
  }

  return res.status(200).json(new ApiResponse(200, "Checked Out", []));
});

const pharmacy = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  const getAppointments = await Appoint.findOne({ appointmentId });
  if (!getAppointments) {
    throw new ApiError(400, "no appointments found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Appointment found", getAppointments));
});

export {
  bookAppointment,
  getAppointmentofUser,
  checkedAppointments,
  pharmacy,
  updateAppointment,
};
