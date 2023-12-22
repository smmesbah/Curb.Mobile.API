import express from 'express';
import {
    sendOtpToEmail,
    verifyOTP,
    createUser,
    loginController,
    forgetPasswordController,
    resetPasswordController
} from '../controllers/authController.js';


//router object
const router = express.Router();

//routing
//send OTP to email || Method POST
router.post('/signup', sendOtpToEmail);

//OTP verification || Method GET
router.get('/verify-otp/:email/:otp', verifyOTP);

//Create a new user || Method POST
router.post('/create-user', createUser);

//Login || POST
router.post('/login', loginController);

//Forget Password || POST
router.post('/forget-password', forgetPasswordController);

//Reset Password || POST
router.put('/reset-password', resetPasswordController);

export default router;