import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from '../utils/ApiError.js'
import Doctor from '../models/doctor.js'
import ApiResponse from '../utils/ApiResponse.js'
import uploadOnCloud from "../utils/cloudinary.js";
import Appoint from "../models/appointment.js";
import crypto from 'crypto'
import generateDoctorId from "../utils/crypto.js";
import sendemail from "../Emails/SendEmail.js";

const generateRandomPassword = (length = 8) => {
    return crypto.randomBytes(length).toString("base64").slice(0, length);
};
const registerDoctor=asyncHandler(async(req,res)=>{
    const {specialization,email,name} =req.body
    
    const photopath= req.files?.photo?.[0]?.path;
    if(!photopath){
        throw new ApiError(400,"Could not find the photo")
    }
    const photo=await uploadOnCloud(photopath)
    if(!photo){
        throw new ApiError(400,"Couldnot upload photo")
    }
    const doctorid=await generateDoctorId()
    const password=await generateRandomPassword()
   const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Doctor Registration</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      color: #333;
      padding: 20px;
    }
    .container {
      background: #ffffff;
      max-width: 600px;
      margin: auto;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h2 {
      color: #FF9500;
    }
    .info {
      margin: 20px 0;
      font-size: 16px;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      color: #222;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Doctor Registration Successful</h2>
    <p class="info">Dear <strong>${name}</strong>,</p>
    <p class="info">You have been successfully registered as a doctor in our hospital system. Below are your login credentials:</p>

    <div class="info"><span class="label">Doctor ID:</span> <span class="value">${doctorid}</span></div>
    <div class="info"><span class="label">Temporary Password:</span> <span class="value">${password}</span></div>

    <p class="info">Please keep this information safe. You can log in to your account and change your password anytime.</p>

    <div class="footer">
      &copy; ${new Date().getFullYear()} Hospital Management System. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

    const createdUser=await Doctor.create({
        name,
        doctorid,
        password,
        email,
        specialization,
        photo:photo.url
    })
    const sendemailtoDoctor=sendemail(email,"Registration",html)
    if(!sendemailtoDoctor){
        throw new ApiError("Failed to send email")
    }
    await createdUser.save();
    return res.status(200).json(
        new ApiResponse(
            200,
            "doctor registed successfully",
            {
                "doctor":createdUser
            }
        )
    )
})


const doctorLogin=asyncHandler(async(req,res)=>{
    const {doctorid,password}=req.body;

    if(!doctorid,!password){
        throw new ApiError(401,"all fields are required")
    }
    const doctor=await Doctor.findOne({doctorid})
    if(!doctor){
        throw new ApiError(400,"Cannot fins a doctor")
    }
    const loggedDoctor=await doctor.checkingPassword(password)
    if(!loggedDoctor){
        throw new ApiError(400,"Invalid credentials")
    }
    
    return res.status(200).json(
        new ApiResponse(
            200,
            "Doctor login success",
           {"id":doctor._id,
            "photo":doctor.photo,
            "name":doctor.name
           }
        )
    )
})

const getDoctors=asyncHandler(async(req,res)=>{
    const doctor=await Doctor.find().select("-password")
    if(!doctor){
        throw new ApiResponse(400,"There are no doctors")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            "All doctors",
            doctor
        )
    )
})

const deleteDoctor=asyncHandler(async(req,res)=>{
    const id=req.params.id
    console.log(id);
    const doctor=await Doctor.findByIdAndDelete(id)
    if(!doctor){
        throw new ApiError(400,"Error to delete doctor")
    }
    return res.status(200).json(
        new ApiResponse(
            400,
            "user deleted",
            []
        )
    )
})

const getAppointments=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const doctor=await Doctor.findById(id)
    if(!doctor){
        throw new ApiError(400,"Invalid id")
    }
    const appointList=await Appoint.find({doctorid:id})
    if(!appointList){
        throw new ApiError(400,"No appointments")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            "Appointments",
            {
                "Appointments":appointList
            }
        )
    )

})

const editDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    doctor.password = password;

    await doctor.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Password updated successfully",
            { doctorId: doctor._id }
        )
    );
});

export {registerDoctor,doctorLogin,getAppointments,getDoctors,deleteDoctor,editDoctor}