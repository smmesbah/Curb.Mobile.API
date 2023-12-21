import express from 'express';
import { sendOtpToEmail, verifyOTP, createUser } from '../controllers/authController.js';


//router object
const router = express.Router();

//routing
//send OTP to email || Method POST
router.post('/signup', sendOtpToEmail);

//OTP verification || Method GET
router.get('/verify-otp/:email/:otp', verifyOTP);

//Create a new user || Method POST
router.post('/create-user', createUser);

export default router;