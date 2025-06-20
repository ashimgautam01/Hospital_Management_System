import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.js";
import uploadOnCloud from "../utils/cloudinary.js";
import otpHtml from "../Emails/html/otpVerify.js";
import sendemail from "../Emails/SendEmail.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { refreshToken, accessToken };
};

const generateOtp = () => {
  const otp = Math.floor(Math.random() * 999999);
  const otp_expiry = new Date(Date.now() + 20 * 60 * 1000);
  return { otp, otp_expiry };
};

const sendingEmail = async (email, otp, otp_expiry) => {
  try {
    const otp_html = otpHtml(otp, otp_expiry);
    const sendEmailVerification = await sendemail(
      email,
      "otp verification",
      otp_html
    );
    if (!sendEmailVerification) {
      throw new ApiError(400, "Error to send email");
    }
  } catch (error) {
    console.log(error);
  }
};
const RegisterUser = asyncHandler(async (req, res) => {
  const { name, age, email, password } = req.body;

  if ([name, age, email, password].some((field) => !field.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.isverified) {
      throw new ApiError(401, "Email already exists");
    } else {
      return res.status(201).json(new ApiResponse(201, "Verify user", []));
    }
  }

  const localProfilePath = req.files?.profile?.[0]?.path;
  if (!localProfilePath) {
    throw new ApiError(400, "Failed to select photo");
  }

  const response = await uploadOnCloud(localProfilePath);
  if (!response) {
    throw new ApiError(500, "Failed to upload photo");
  }

  const profile = response.url;
  const { otp, otp_expiry } = generateOtp();

  const newUser = await User.create({
    name,
    age,
    email,
    otp,
    otp_expiry,
    password,
    profile,
  });

  await sendingEmail(email, otp, otp_expiry);

  const savedUser = await User.findById(newUser._id).select(
    "-password -ismember -isverified -otp -otp_expiry -refreshToken -medicalHistory"
  );
  if (!savedUser) {
    throw new ApiError(500, "Failed to save user in database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User registered successfully", savedUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "No email is registered. Please register first.");
  }

  if (!user.isverified) {
    throw new ApiError(400, "Email is not verified yet.");
  }

  const authorizedUser = await user.ispasswordCorrect(password);
  if (!authorizedUser) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const options = {
    http: true,
    secure: true,
  };

  const userWithToken = await User.findById(authorizedUser._id).select(
    "-password -ismember -isverified -otp -otp_expiry -refreshToken -medicalHistory"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User logged in", {
        user: userWithToken,
        accessToken,
        refreshToken,
      })
    );
});

const verifyOpt = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { otp } = req.body;
  const user = await User.findById(id);

  if (user.isverified) {
    throw new ApiError(400, "user with email is already verified");
  }
  const presentDate = new Date(Date.now());
  if (presentDate > user.otp_expiry) {
    throw new ApiError(400, "Opt has expired please get new otp");
  }
  console.log(user.otp);
  if (user.otp != otp) {
    throw new ApiError(400, "Invalid otp");
  }
  user.isverified = true;
  user.otp = null;
  user.otp_expiry = null;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "user verification successful", user.name));
});

const resendEmail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user.isverified) {
    throw new ApiError(400, "user is already verified");
  }
  const { otp, otp_expiry } = generateOtp();
  await sendingEmail(user.email, otp, otp_expiry);
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: { otp: otp, otp_expiry: otp_expiry },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Email sent successfully", updatedUser.name));
});

const changePassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  const user = await User.findById(id);
  if (user.password === password) {
    throw new ApiError(401, "old password and new are same");
  }
  user.password = password;
  await user.save();
  if (!user) {
    throw new ApiError(400, "password cannot be updated");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "password has been changed", []));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findOneAndUpdate({ $set: { refreshToken: undefined } });
  const options = {
    http: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "User logged Out", []));
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).select(
    "-password -isverified -otp -otp_expiry -refreshToken -medicalHistory  -createdAt -updatedAt -__v"
  );
  return res.status(200).json(
    new ApiResponse(200, "user is verified", {
      user: user,
    })
  );
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, problem, response, medicine } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found"));
  }

  const medicalEntry = {
    problem,
    response,
    medicine,
  };

  user.medicalHistory.push(medicalEntry);
  await user.save({ validateBeforeSave: false });

  const updatedUser = await User.findById(id).select(
    "-password -ismember -isverified -otp -otp_expiry -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(200, "User updated", {
      user: updatedUser,
    })
  );
});

const getHistory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select(
    "-password -ismember -isverified -otp -otp_expiry -refreshToken "
  );
  return res.status(200).json(
    new ApiResponse(200, "user is verified", {
      user: user.medicalHistory,
    })
  );
});

export {
  RegisterUser,
  loginUser,
  logoutUser,
  getUser,
  verifyOpt,
  resendEmail,
  changePassword,
  updateUser,
  getHistory,
};
