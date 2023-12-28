import { PrismaClient } from "@prisma/client";
import { jwtDecode } from "../helpers/authHelper.js";
import axios from "axios";
import { calculateTotalDrinkUnits, calculateTotalUserCalories, calculateWeeklySpend } from "./onboardingController.js";

const prisma = new PrismaClient();

export const createWhyAnswerController = async (req, res) => {
    try {
        const { token, strapiId, answer } = req.body;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        // console.log(data.id)
        const userId=parseInt(data.id)

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
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        // console.log(data.id)
        const userId=parseInt(data.id)
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
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        // console.log(data.id)
        const userId=data.id
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
        // console.log(process.env.STRAPI_API_TOKEN)
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
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const userData=decodedToken.value
        // console.log(data.id)
        const userId=userData.id
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

export const getMoneyCaloriesUnitsAvoidedOfUserController = async (req, res) => {
    try {
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value
        const userId = data.id;

        const currentDate = new Date();

        // Get the current day as a string (e.g., "Monday", "Tuesday", etc.)
        const options = { weekday: 'long' };
        const currentDay = currentDate.toLocaleDateString('en-US', options);
        const formattedDate = currentDate.toLocaleDateString('en-GB');
        const weekly_drinks_info = await prisma.weekly_drink_info.findMany({
            where: {
                userId: userId,
                day: currentDay
                // userId: 1,
                // day: 'Monday'
            },
            select: {
                drinkName: true,
                drinkVolume: true,
                drinkQuantity: true
            }
        })
        const drinkFormula = await prisma.drink_formula.findMany({});
        // habit 
        const habitMoneySpent = calculateWeeklySpend(weekly_drinks_info, drinkFormula);
        const habitCaloriesAvoided = calculateTotalUserCalories(weekly_drinks_info, drinkFormula);
        const habitUnitsAvoided = calculateTotalDrinkUnits(weekly_drinks_info, drinkFormula);

        //console log
        // console.log(habitMoneySpent);
        // console.log(habitCaloriesAvoided);
        // console.log(habitUnitsAvoided);

        //calculation of money, calories, units avoided for homepage
        const drinks = await prisma.daily_drink_checkin.findMany({
            where: {
                userId: userId,
                drinkDate: formattedDate,
            },
            select: {
                drinkName: true,
                drinkVolume: true,
                drinkQuantity: true,
            }
        })
        const dailyMoneySpent = calculateWeeklySpend(drinks, drinkFormula);
        const dailyCaloriesAvoided = calculateTotalUserCalories(drinks, drinkFormula);
        const dailyUnitsAvoided = calculateTotalDrinkUnits(drinks, drinkFormula);
        //console.log
        // console.log(dailyMoneySpent);
        // console.log(dailyCaloriesAvoided);
        // console.log(dailyUnitsAvoided);
        let moneySaved = 0;
        let caloriesAvoided = 0;
        let unitsAvoided = 0;

        if(dailyMoneySpent < habitMoneySpent){
            moneySaved = habitMoneySpent - dailyMoneySpent;
        }
        if(dailyCaloriesAvoided < habitCaloriesAvoided){
            caloriesAvoided =habitCaloriesAvoided -  dailyCaloriesAvoided;
        }
        if(dailyUnitsAvoided < habitUnitsAvoided){
            unitsAvoided = habitUnitsAvoided - dailyUnitsAvoided;
        }
        // console.log(moneySaved);
        // console.log(caloriesAvoided);
        // console.log(unitsAvoided);

        return res.status(200).json({
            success: true,
            message: 'Current day fetched successfully.',
            data: {
                moneySaved,
                caloriesAvoided,
                unitsAvoided
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching data.',
            error: error
        })
    }
}


export const getDrinkFreeDaysOfCurrentMonthOfUserController = async(req, res) => {
    try {
        const {token} = req.params;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId = data.id;
        const currentDate = new Date();

        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const formattedFirstDayOfMonth = firstDayOfMonth.toLocaleDateString('en-GB');
        const formattedLastDayOfMonth = lastDayOfMonth.toLocaleDateString('en-GB');

        // console.log(formattedFirstDayOfMonth);
        // console.log(formattedLastDayOfMonth);

        const drinkEntriesWithinCurrentMonth = await prisma.daily_drink_checkin.findMany({
            where: {
                userId: userId,
                drinkDate: {
                    gte: formattedFirstDayOfMonth,
                    lte: formattedLastDayOfMonth
                }
            }
        })

        // Extract day part from drinkDate field of each entry
        const drinkDaysWithinCurrentMonth = drinkEntriesWithinCurrentMonth.map(entry => {
            const drinkDay = parseInt(entry.drinkDate.split('/')[0]); // Extracting the day part
            return drinkDay;
        });

        // console.log(drinkDaysWithinCurrentMonth);

        return res.status(200).json({
            success: true,
            message: 'Drink free days fetched successfully.',
            data: {
                drinkDaysWithinCurrentMonth
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching data.',
            error: error
        })
    }
}

// helper function

// Function to format the date as "Fri 25th, 2023"
const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
};