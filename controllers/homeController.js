import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const createWhyAnswerController = async (req, res) => {
    try {
        const { userId, strapiId, answer } = req.body;

        // validation
        if (!userId || !strapiId || !answer) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check if user already answered
        const userAnswer = await prisma.your_why_answers.upsert({
            where: {
                UniqueAnswerConstraint: {
                    userId: parseInt(userId),
                    strapiId: parseInt(strapiId)
                }
            },
            update: {
                answer
            },
            create: {
                userId: parseInt(userId),
                strapiId: parseInt(strapiId),
                answer
            }
        })

        // // if user already answered
        // if (userAnswer) {
        //     // update
        //     const updatedAnswer = await prisma.your_why_answers.update({
        //         where: {
        //             UniqueAnswerConstraint: {
        //                 userId: parseInt(userId),
        //                 strapiId: parseInt(strapiId)
        //             }
        //         },
        //         data: {
        //             answer
        //         }
        //     })

        //     return res.status(200).send({
        //         success: true,
        //         message: 'Answer updated successfully',
        //         data: updatedAnswer
        //     });
        // }
        // // if user not answered
        // else {
        //     // create
        //     const createdAnswer = await prisma.your_why_answers.create({
        //         data: {
        //             userId: parseInt(userId),
        //             strapiId: parseInt(strapiId),
        //             answer
        //         }
        //     })

        //     return res.status(200).send({
        //         success: true,
        //         message: 'Answer created successfully',
        //         data: createdAnswer
        //     });
        // }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

export const getWhyAnswerOfUserController = async (req, res) => {
    try {
        const { id } = req.params;
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

export const getTodaysTaskOfUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        // Get the start of the day for createdAt from the user data
        const createdAtStartOfDay = new Date(user.createdAt);
        createdAtStartOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00
        // console.log(createdAtStartOfDay.toLocaleTimeString())
        const today = new Date();
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        // Calculate the difference between today and createdAt in milliseconds
        const differenceInMilliseconds = today - createdAtStartOfDay;

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

export const getAllTaskOfUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        //get the start of the day for createdAt from the user data
        const createdAtStartOfDay = new Date(user.createdAt);
        createdAtStartOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

        const today = new Date();


        // Fetch tasks from Strapi API
        const response = await axios.get(`${process.env.STRAPI_BASE_URL}/tasks/`, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
            }
        });

        const { data } = response.data;

        // modify each task to include a 'date' field
        const modifiedTasks = data.map(task => {
            const taskDate = new Date(createdAtStartOfDay);
            taskDate.setDate(taskDate.getDate() + task.attributes.day - 1);
            return {
                ...task,
                date: formatDate(taskDate)
            }
        })

        return res.status(200).json({
            success: true,
            message: `Tasks fetched successfully.`,
            data: modifiedTasks
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching tasks.',
            error: error
        });
    }
}


// helper function

// Function to format the date as "Fri 25th, 2023"
const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};