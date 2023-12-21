import JWT from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { generateOTP, sendOTP } from '../helpers/emailVerificationOTP.js';
import { hashPassword } from '../helpers/authHelper.js';

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

export const sendOtpToEmail = async (req, res) => {
    try {
        const { email } = req.body;
        // check if user already exist
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        // if exist return error
        if (existingUser) {
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
        const data = await sendOTP(email, 'OTP for email verification', 'Verify your email with the code below', otp);

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

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.params;
        console.log(email, otp);

        const existingOTP = await prisma.otp.findUnique({
            where: {
                email: email,
                otp: otp,
            },
        });

        if (existingOTP) {
            const createdAt = existingOTP.createdAt;
            const currentTime = new Date();
            const timeDifference = currentTime - createdAt; // Difference in milliseconds

            const timeDifferenceInMinutes = timeDifference / (1000 * 60); // Convert to minutes

            if (timeDifferenceInMinutes > 2) {
                // If OTP has expired (more than 2 minutes), delete it and respond with expired message
                await prisma.otp.delete({
                    where: {
                        id: existingOTP.id,
                    },
                });

                return res.status(400).json({
                    success: false,
                    message: 'OTP is expired. Please try using a new OTP.',
                });

            } else {
                res.status(200).json({
                    success: true,
                    message: 'OTP verified successfully',
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'OTP verification failed',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name){
            return res.send({message:"Name is Required"});
        }
        if(!email){
            return res.send({message:"Email is Required"});
        }
        if(!password){
            return res.send({message:"password is Required"});
        }

        // check if user already exist
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        // if exist return error
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Already registered user please login.'
            })
        }
        // if not exist create user in db
        // register user
        const hashedPassword = await hashPassword(password);
        //save user
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashPassword:hashedPassword
            }
        })
        return res.status(200).send({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error
        })
    }
}
