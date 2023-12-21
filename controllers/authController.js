import JWT from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { generateOTP, sendOTP } from '../helpers/emailVerificationOTP.js';

const prisma = new PrismaClient();

// export const signupWithEmail = async(req, res) => {
//     try {
//         const {name, email, password} = req.body;

//         // validation
//         if(!name){
//             return res.status(400).send({
//                 message: 'Name is required'
//             })
//         }
//         if(!email){
//             return res.status(400).send({
//                 message: 'email is required'
//             })
//         }
//         if(!password){
//             return res.status(400).send({
//                 message: 'password is required'
//             })
//         }

//         // check if user already exist
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email: email
//             }
//         })
//         // if exist return error
//         if(existingUser){
//             return res.status(400).send({
//                 success: false,
//                 message: 'Already registered user please login.'
//             })
//         }
//         // if not exist create user in db
//         // verify the email using OTP:
//         // send the OTP to user email
//         const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);
//         res.status(200).json(createdEmailVerificationOTP);

//     } catch (error) {

        
//     }
// }

export const verifyEmail = async(req, res) => {
    try {
        const {email} = req.body;
        // check if user already exist
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        // if exist return error
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: 'Already registered user please login.'
            })
        }
        // if not exist create user in db
        // verify the email using OTP:

        //create an OTP
        const otp = generateOTP();
        // store the otp into the database and sent it to the user email
        const data = await sendOTP(email, 'OTP for email verification','Verify your email with the code below', otp);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            data: data,
            email: email,
            otp: otp
        });
    } catch (error) {
        console.log(error);
    }
}
