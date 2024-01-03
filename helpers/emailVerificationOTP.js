
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();



export const sendOTP = async ( email, subject, message, otp_num ) => {
    try {
        const resend = new Resend(process.env.RESEND_FULL_ACCESS_API_KEY);
        const otp = otp_num.toString();
        // console.log(email, subject, message, otp);
        if (!(email && subject && message)) {
            throw new Error('Email, subject and message are required');
        }
        //check if otp already exist
        const existingOTP = await prisma.otp.findUnique({
            where: {
                email: email
            }
        })
        // if exist delete the entry
        if (existingOTP){
            await prisma.otp.delete({
                where: {
                    email: email
                }
            })
        }
        //create a new entry
        const createdOTP = await prisma.otp.create({
            data: {
                email,
                otp,
            }
        });

        const data = await resend.emails.send({
            from: "Curb <team@curb.health>",
            to: [email],
            subject: subject,
            html: "<strong>"+ message+ " " + otp + "</strong>",
          });
        // console.log(data);
        //if email send unsuccessfull 
        if(data.error !== null){
            await prisma.otp.delete({
                where: {
                    email: email
                }
            })
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}