import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const createWhyAnswerController = async(req, res) => {
    try {
        const {userId, strapiId, answer} = req.body;

        // validation
        if(!userId || !strapiId || !answer) {
            return res.status(400).json({error: 'All fields are required'});
        }

        // check if user already answered
        const userAnswer = await prisma.your_why_answers.findUnique({
            where: {
                UniqueAnswerConstraint: {
                    userId: parseInt(userId),
                    strapiId: parseInt(strapiId)
                }
            }
        })

        // if user already answered
        if(userAnswer){
            // update
            const updatedAnswer = await prisma.your_why_answers.update({
                where: {
                    UniqueAnswerConstraint: {
                        userId: parseInt(userId),
                        strapiId: parseInt(strapiId)
                    }
                },
                data: {
                    answer
                }
            })

            return res.status(200).send({
                success: true,
                message: 'Answer updated successfully',
                data: updatedAnswer
            });
        }
        // if user not answered
        else{
            // create
            const createdAnswer = await prisma.your_why_answers.create({
                data: {
                    userId: parseInt(userId),
                    strapiId: parseInt(strapiId),
                    answer
                }
            })

            return res.status(200).send({
                success: true,
                message: 'Answer created successfully',
                data: createdAnswer
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

export const getWhyAnswerOfUserController = async(req, res) => {
    try {
        const {id} = req.params;
        const userId = parseInt(id);
        const userAnswers = await prisma.your_why_answers.findMany({
            where: {
                userId
            }
        })

        return res.status(200).send({
            success: true,
            message: 'Answers fetched successfully',
            data: userAnswers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong while fetching answers',
            error
        })
    }
}

export const getTodaysTaskOfUserController = async(req, res) => {
    try {
        const {id} = req.params;
        const userId = parseInt(id);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        // now calculate the week number of the user
        const createdAt = new Date(user.createdAt);
        console.log(createdAt)
        const today = new Date();
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        // Calculate the difference between today and createdAt in milliseconds
        const differenceInMilliseconds = today - createdAt;

        // Calculate the day number
        const dayNumber = Math.ceil(differenceInMilliseconds / millisecondsPerDay);

        // Fetch tasks from Strapi API
        const response = await axios.get(`${process.env.STRAPI_BASE_URL}/tasks/`, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
            }
        });

        // Filter tasks for the current day
        const currentDayTasks = response.data.data.filter(task => task.attributes.day === dayNumber);
        return res.status(200).json({
            success: true,
            message: `Tasks for week ${dayNumber} fetched successfully.`,
            data: currentDayTasks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching tasks.',
            error: error
        });
    }
}