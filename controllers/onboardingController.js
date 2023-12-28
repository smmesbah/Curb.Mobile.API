import { PrismaClient } from "@prisma/client";
import { jwtDecode } from "../helpers/authHelper.js";

const prisma = new PrismaClient();

export const userMetadataController = async (req, res) => {
    try {
        const { token, ageRange, gender, postcode } = req.body;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId=data.id
        // validation

        // console.log(userId)
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        // check if user already exist
        const existingUser = await prisma.user_metadata.findUnique({
            where: {
                userId: userId
            }
        })

        // if not exist create entry
        if (!existingUser) {
            const userMetadata = await prisma.user_metadata.create({
                data: {
                    userId: userId,
                    ageRange,
                    gender,
                    postcode
                }
            })
            return res.status(201).send({
                success: true,
                message: 'User metadata created successfully',
                data: userMetadata
            })
        }
        // if exist then update
        else {
            const updatedUserMetadata = await prisma.user_metadata.update({
                where: { userId: userId },
                data: {
                    ageRange,
                    gender,
                    postcode,
                }
            })

            return res.status(200).send({
                success: true,
                message: 'User metadata updated successfully',
                data: updatedUserMetadata
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        })
    }
}

export const getUserMetadataController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        // validation
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        // check if user already exist
        const existingUser = await prisma.user_metadata.findUnique({
            where: {
                userId: userId
            }
        })

        // if user doesn't exist
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User metadata is not found.'
            })
        } else {
            return res.status(200).send({
                success: true,
                message: 'User metadata found.',
                data: existingUser
            })
        }
    } catch (error) {
        console.log(error),
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error,
            })
    }
}

export const createUserGoalsController = async (req, res) => {
    try {
        const { token, goals } = req.body;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId=data.id

        //Delete existing user goals for the specified userId
        await prisma.user_goals.deleteMany({
            where: {
                userId: Number(userId)
            }
        })

        const userGoalsData = goals.map((goal) => ({
            userId: Number(userId),
            goal: goal,
        }));
        // console.log(userGoalsData)

        //Bulk create user goals for the specified user
        const createUserGoals = await prisma.user_goals.createMany({
            data: userGoalsData,
            // skipDuplicates: true,
        })

        return res.status(201).send({
            success: true,
            message: 'User goals created successfully',
            data: createUserGoals
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        })
    }
}

export const getUserGoalsController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        // validation
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        const userGoals = await prisma.user_goals.findMany({
            where: {
                userId: userId
            }
        })

        return res.status(200).send({
            success: true,
            message: 'User goals found.',
            data: userGoals
        })
    } catch (error) {
        console.log(error),
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error,
            })
    }
}

export const createUserWeeklyDrinkController = async (req, res) => {
    try {
        const { token, day, drinkType, drinkName, drinkVolume, drinkQuantity } = req.body;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId=data.id

        // store the data in the databse
        const createUserWeeklyDrink = await prisma.weekly_drink_info.create({
            data: {
                userId,
                day,
                drinkType,
                drinkName,
                drinkVolume,
                drinkQuantity
            }
        })

        return res.status(201).send({
            success: true,
            message: 'User weekly drink created successfully',
            data: createUserWeeklyDrink
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        })
    }
}

export const deleteUserWeeklyDrinkController = async (req, res) => {
    try {
        const { token, day, drinkName, drinkVolume, drinkQuantity } = req.body;
        const decodedToken = await jwtDecode(token);
        const data=decodedToken.value
        const userId=data.id
        // delete the entry from the database
        const deleteUserWeeklyDrink = await prisma.weekly_drink_info.deleteMany({
            where: {
                userId,
                day,
                drinkName,
                drinkVolume,
                drinkQuantity
            }
        })

        return res.status(201).send({
            success: true,
            message: 'User weekly drink deleted successfully',
            data: deleteUserWeeklyDrink
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        })
    }
}

export const getUserWeeklyDrinkController = async (req, res) => {
    try {
        const token = req.params;
        const decodedToken = await jwtDecode(token.id);
        // console.log(token)
        const data=decodedToken.value
        // console.log(data)
        const userId = parseInt(data.id);
        // validation
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        // get the drinks of that userId
        const userWeeklyDrink = await prisma.weekly_drink_info.findMany({
            where: {
                userId: userId
            }
        })

        return res.status(200).send({
            success: true,
            message: 'User weekly drink found.',
            data: userWeeklyDrink
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        })
    }
}

export const calculateUserDrinkingInsightsController = async (req, res) => {
    try {
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        // console.log(token)
        const data=decodedToken.value
        // console.log(data)
        const userId = parseInt(data.id);
        // validation
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        const user_metadata = await prisma.user_metadata.findUnique({
            where: {
                userId: userId
            }
        })
        // console.log(user_metadata)
        // const user_metadata={
        //     ageRange: "AGE_25_34",
        //     gender: "MALE"
        // }
        const user_drinking_habit = await prisma.weekly_drink_info.findMany({
            where: {
                userId: userId
            },
            select: {
                drinkName: true,
                drinkVolume: true,
                drinkQuantity: true,
            }
        })
        // console.log(user_drinking_habit)
        const drinkFormula = await prisma.drink_formula.findMany({});
        const spendPerWeek = calculateWeeklySpend(user_drinking_habit, drinkFormula).toPrecision(6);
        const totalCaloriesConsumed = calculateTotalUserCalories(user_drinking_habit, drinkFormula);
        const totalDrinkUnitsConsumed = calculateTotalDrinkUnits(user_drinking_habit, drinkFormula);

        // console.log(`Total Calories Consumed: ${totalCaloriesConsumed}`);
        // console.log(`Total Drink Units Consumed: ${totalDrinkUnitsConsumed}`);

        const insights = await calculateInsights(user_metadata, totalDrinkUnitsConsumed);

        return res.status(200).send({
            success: true,
            message: 'User drinking insights found.',
            // user_drinking_habit,
            data: {
                insight: insights.insight,
                totalCaloriesConsumed: totalCaloriesConsumed,
                totalDrinkUnitsConsumed: totalDrinkUnitsConsumed,
                spendPerWeek: spendPerWeek,
                spendPerMonth: (spendPerWeek * 4).toPrecision(8),
                spendPerYear: (spendPerWeek * 52).toPrecision(8),
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error,
        })
    }
}


//Helper function 

function calculateDrinkConsumption(userDrinkingHabit, drinkName, drinkVolume) {
    let totalQuantity = 0;

    // Loop through the array to calculate total quantity for given drinkName and drinkVolume
    for (const drink of userDrinkingHabit) {
        if (drink.drinkName === drinkName && drink.drinkVolume === drinkVolume) {
            totalQuantity += drink.drinkQuantity;
        }
    }

    return totalQuantity;
}

// weekly spend calculation
export function calculateWeeklySpend(userDrinkingHabit, drinkFormula) {
    let totalSpend = 0;

    userDrinkingHabit.forEach((drink) => {
        const matchingDrink = drinkFormula.find(
            (formula) => formula.drinkName === drink.drinkName && formula.drinkVolume === drink.drinkVolume
        );

        if (matchingDrink){
            // console.log(matchingDrink)
            totalSpend += matchingDrink.drinkPriceUK * drink.drinkQuantity;
            // console.log( `total spend is : ${totalSpend}`)
        }
    })

    return totalSpend;
}

// calories calculation
export function calculateTotalUserCalories(userDrinkingHabit, drinkFormula) {
    let totalCalories = 0;

    userDrinkingHabit.forEach((drink) => {
        const matchingDrink = drinkFormula.find(
            (formula) => formula.drinkName === drink.drinkName && formula.drinkVolume === drink.drinkVolume
        );

        if (matchingDrink) {
            totalCalories += matchingDrink.drinkCalories * drink.drinkQuantity;
        }
    });

    return totalCalories;
}

//total unit calculation
export function calculateTotalDrinkUnits(userDrinkingHabit, drinkFormula) {
    let totalUnits = 0;

    userDrinkingHabit.forEach((drink) => {
        const matchingDrink = drinkFormula.find(
            (formula) => formula.drinkName === drink.drinkName && formula.drinkVolume === drink.drinkVolume
        );

        if (matchingDrink) {
            totalUnits += matchingDrink.drinkUnits * drink.drinkQuantity;
        }
    });

    return totalUnits;
}

// function to calculate insights
async function calculateInsights(user_metadata, totalDrinkUnitsConsumed) {
    const userAge = user_metadata.ageRange;
    const userGender = user_metadata.gender;
    let habit = "";

    if (userGender === "MALE") {
        if (totalDrinkUnitsConsumed === 0) {
            habit = "Non-drinker";
        } else if (totalDrinkUnitsConsumed > 0 && totalDrinkUnitsConsumed <= 14) {
            habit = "Up to 14 units";
        } else if (totalDrinkUnitsConsumed > 14 && totalDrinkUnitsConsumed <= 21) {
            habit = "14-21 units";
        } else if (totalDrinkUnitsConsumed > 21 && totalDrinkUnitsConsumed <= 35) {
            habit = "21-35 units";
        } else if (totalDrinkUnitsConsumed > 35 && totalDrinkUnitsConsumed <= 50) {
            habit = "35-50 units";
        } else {
            habit = "More than 50 units"
        }
    } else {
        if (totalDrinkUnitsConsumed === 0) {
            habit = "Non-drinker";
        } else if (totalDrinkUnitsConsumed > 0 && totalDrinkUnitsConsumed <= 14) {
            habit = "Up to 14 units";
        } else if (totalDrinkUnitsConsumed > 14 && totalDrinkUnitsConsumed <= 21) {
            habit = "14-21 units";
        } else if (totalDrinkUnitsConsumed > 21 && totalDrinkUnitsConsumed <= 35) {
            habit = "21-35 units";
        } else {
            habit = "More than 35 units"
        }
    }

    const drinkingInsight = await prisma.drinking_insights.findUnique({
        where: {
            UniqueInsightConstraint: {
                ageGroup: userAge,
                gender: userGender,
                habit: habit
            }
        },
        select: {
            insight: true
        }
    })


    return drinkingInsight;
}


