import { PrismaClient } from "@prisma/client";
import { jwtDecode } from "../helpers/authHelper.js";
import { calculateWeeklySpend, calculateTotalUserCalories, calculateTotalDrinkUnits } from "./onboardingController.js";

const prisma = new PrismaClient();

export const checkinDrinkController = async(req, res) => {
    try {
        const {token, drinkType, drinkName, drinkVolume, drinkQuantity} = req.body;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId = data.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');
        const drinkCheckedIn = await prisma.daily_drink_checkin.create({
            data: {
                userId,
                drinkType,
                drinkName,
                drinkVolume,
                drinkQuantity,
                drinkDate: formattedDate,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Drink checked in successfully",
            data: drinkCheckedIn,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while checking in drink",
            error: error
        })
    }
}

export const getCheckinDrinkController = async(req,res) => {
    try {
        const {token} = req.params;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId = data.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');

        const drinks = await prisma.daily_drink_checkin.findMany({
            where: {
                userId: userId,
                drinkDate: formattedDate,
            },
        })

        return res.status(200).json({
            success: true,
            message: "Drink fetched successfully",
            data: drinks,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching drink",
            error: error
        })
    }
}

export const deleteCheckinDrinkController = async(req, res) => {
    try {
        const {id} = req.params;

        const deletedDrink = await prisma.daily_drink_checkin.delete({
            where: {
                id: parseInt(id),
            }
        })

        return res.status(200).json({
            success: true,
            message: "Drink deleted successfully",
            data: deletedDrink,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting drink",
            error: error
        })
    }
}

export const getCheckinCalculationOfSpentCaloriesUnits = async(req, res) => {
    try {
        const {token} = req.params;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId = data.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');

        const drinkFormula = await prisma.drink_formula.findMany({});
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

        const spent = calculateWeeklySpend(drinks, drinkFormula);
        const calories = calculateTotalUserCalories(drinks, drinkFormula);
        const units = calculateTotalDrinkUnits(drinks, drinkFormula);

        return res.status(200).json({
            success: true,
            message: "Drink money spent, calories and units calculated successfully",
            data: {
                spent,
                calories,
                units
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while calculating drink money spent, calories and units",
            error: error
        })
    }
}

export const checkinHealthInfoController = async(req, res) => {
    try {
        const {token, sleep, mood, energy, willPower, places, people, activity, note} = req.body;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value;
        const userId = data.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');

        const healthInfoCheckedIn = await prisma.daily_health_checkin.create({
            data: {
                userId,
                sleep,
                mood,
                energy,
                willPower,
                places,
                people,
                activity,
                note,
                date: formattedDate,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Health info checked in successfully",
            data: healthInfoCheckedIn,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while checking in health info",
            error: error
        })
    }
}

export const getCheckinHealthInfoController = async(req, res) => {
    try {
        const {token} = req.params;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value;
        const userId = data.id;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');

        const healthInfo = await prisma.daily_health_checkin.findUnique({
            where: {
                UniqueDailyHealthCheckinConstraint: {
                    userId,
                    date: formattedDate,
                }
            }
        })

        return res.status(200).json({
            success: true,
            message: "Health info fetched successfully",
            data: healthInfo,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching health info",
            error: error
        })  
    }
}