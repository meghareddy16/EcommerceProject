const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const { sendEmail } = require("../middleware/sendEmail");
const otpModel = require("../models/otpModel");

let optStore = {};

const forgotPassword = expressAsyncHandler( async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(200).json("Email doesn't exists");
        return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await otpModel.create({ email, otp });
    await sendEmail(
        email,
        "Password Reset OTP",
        `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
    );

    res.status(200).json("OTP sent successfully",otpModel);
    console.log("otp:",otpModel);
});

const verifyOTP = async(req, res) =>{
    const {email, otp} = req.body;
    const otpRecord = await otpModel.findOne({ email, otp });
  console.log(otpRecord);

  if (!otpRecord) return res.status(400).json("Invalid OTP");

        res.status(200).json("OTP verified Successfully");

};

const resetPassword = async(req,res) =>{
    const {email, newPassword} = req.body;
    console.log(req.body);
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({email},{password: hashed});
    res.status(201).json("Reset new Password Success");
}

module.exports = { forgotPassword, verifyOTP, resetPassword };

