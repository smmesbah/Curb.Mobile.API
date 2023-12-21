import express from 'express';
import { verifyEmail } from '../controllers/authController.js';


//router object
const router = express.Router();

//routing
//Signup || Method POST
router.post('/signup', verifyEmail);


export default router;