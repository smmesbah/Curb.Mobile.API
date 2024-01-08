import { PrismaClient } from "@prisma/client";
import { jwtDecode } from "../helpers/authHelper.js";

const prisma = new PrismaClient();

export const userMetadataController = async (req, res) => {
    try {
        const { token, ageRange, gender, postcode } = req.body;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value
        const userId = data.id
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
        const data = decodedToken.value
        const userId = data.id

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
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value
        const userId = parseInt(data.id)
        // validation
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        const userGoals = await prisma.user_goals.findMany({
            where: {
                userId: userId
            },
            select: {
                goal: true
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
        const data = decodedToken.value
        const userId = data.id

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
        const data = decodedToken.value
        const userId = data.id
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
        const data = decodedToken.value
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
        const data = decodedToken.value
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
        const userPostCode = user_metadata.postcode;
        // console.log(user_drinking_habit)
        const drinkFormula = await prisma.drink_formula.findMany({});
        const spendPerWeek = await calculateWeeklySpend(user_drinking_habit, drinkFormula, userPostCode)
        const formattedSpendPerWeek = spendPerWeek.toPrecision(6);
        const totalCaloriesConsumed = calculateTotalUserCalories(user_drinking_habit, drinkFormula);
        const totalDrinkUnitsConsumed = calculateTotalDrinkUnits(user_drinking_habit, drinkFormula);

        // console.log(`Total Calories Consumed: ${totalCaloriesConsumed}`);
        // console.log(`Total Drink Units Consumed: ${totalDrinkUnitsConsumed}`);

        const insights = await calculateInsights(user_metadata, totalDrinkUnitsConsumed);
        const insightsBasedOnPlace = await calculateInsightsBasedOnPlace(user_metadata, totalDrinkUnitsConsumed);
        return res.status(200).send({
            success: true,
            message: 'User drinking insights found.',
            // user_drinking_habit,
            data: {
                insight: insights.insight,
                insightBasedOnPlace: insightsBasedOnPlace.insight,
                totalCaloriesConsumed: totalCaloriesConsumed,
                totalDrinkUnitsConsumed: totalDrinkUnitsConsumed,
                spendPerWeek: formattedSpendPerWeek,
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

export const trackHkUserFromReferrelCodeController = async (req, res) => {
    try {
        // console.log(req.body);
        const { token, HKUser, NonHKUser, CurbFriend, UsingFreeCurb } = req.body;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value
        const userId = data.id
        // validation
        // if (!referrelCode) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'ReferrelCode is required'
        //     })
        // }

        // check if the referrelCode is valid

        //check if the referrelCode is already used
        // const existingReferrelCode = await prisma.track_user_HK_or_NonHK.findUnique({
        //     where: {
        //         referrelCodeUsed: referrelCode
        //     }
        // })
        // if(existingReferrelCode){
        //     return res.status(200).json({
        //         success: false,
        //         message: 'Referrel Code is already used'
        //     })
        // }

        // if the referrelCode is not already used then check if the user is HK user or Non-HK user

        const trackUser = await prisma.track_user_HK_or_NonHK.upsert({
            where: { userId: userId },
            create: {
                userId: userId,
                isHKUser: HKUser,
                isNonHKUser: NonHKUser,
                isCurbFriend: CurbFriend,
                isUsingFreeCurb: UsingFreeCurb,
            },
            update: {
                isHKUser: HKUser,
                isNonHKUser: NonHKUser,
                isCurbFriend: CurbFriend,
                isUsingFreeCurb: UsingFreeCurb,
            },
        });

        return res.status(201).json({
            success: true,
            message: 'User tracked successfully',
            trackedUser: trackUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error while tracking user',
            error: error,
        })
    }
}

export const calculateUserDrinkAvoidController = async (req, res) => {
    const { token } = req.params;
    const decodedToken = await jwtDecode(token);
    const data = decodedToken.value
    // console.log(id)
    const userId = parseInt(data.id)
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'userId is required'
        })
    }
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
    const user_metadata = await prisma.user_metadata.findUnique({
        where: {
            userId: userId
        }
    })
    const userPostCode = user_metadata.postcode;
    const drinkFormula = await prisma.drink_formula.findMany({});
    const spendPerWeek = await calculateWeeklySpend(user_drinking_habit, drinkFormula, userPostCode)
    const formattedSpendPerWeek = spendPerWeek.toPrecision(6);
    const totalCaloriesConsumed = calculateTotalUserCalories(user_drinking_habit, drinkFormula);
    const totalDrinkUnitsConsumed = calculateTotalDrinkUnits(user_drinking_habit, drinkFormula);
    const totalDrinkNumber = calculateDrinkNumber(user_drinking_habit);
    // console.log(totalDrinkNumber)

    return res.status(200).json({
        success: true,
        message: 'User drinking insights found.',
        // user_drinking_habit,
        data: {
            totalCaloriesConsumed: totalCaloriesConsumed,
            totalDrinkUnitsConsumed: totalDrinkUnitsConsumed,
            spendPerMonth: (spendPerWeek * 4).toFixed(2),
            totalDrinkNumber: totalDrinkNumber
        }
    })


}

export const getOnboardingStepsController = async (req, res) => {
    try {
        const { token } = req.params;
        const decodedToken = await jwtDecode(token);
        // console.log(decodedToken)
        const data = decodedToken.value
        // console.log(data)
        const userId = parseInt(data.id);
        // validation
        if (!userId) {
            return res.status(400).send({
                message: 'userId is required'
            })
        }

        const onboardingSteps = await prisma.onboarding_steps.findUnique({
            where: {
                userId: userId
            }
        })

        return res.status(200).send({
            success: true,
            message: 'Onboarding steps found.',
            data: onboardingSteps
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching onboarding steps',
            error: error,
        })
    }
}

export const updateOnboardingStepsController = async (req, res) => {
    try {
        const { token, onboardingSteps } = req.body;
        const decodedToken = await jwtDecode(token);
        const data = decodedToken.value
        const userId = data.id

        // update the onboarding steps of the given userId
        const updatedOnboardingSteps = await prisma.onboarding_steps.update({
            where: {
                userId: userId
            },
            data: {
                stepCompleted: onboardingSteps
            }
        })

        return res.status(201).json({
            success: true,
            message: `${onboardingSteps} steps updated successfully`,
            data: updatedOnboardingSteps
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error while updating onboarding steps',
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
export async function calculateWeeklySpend(userDrinkingHabit, drinkFormula, userPostCode) {
    let totalSpend = 0;
    // check if the user is from London
    const isLondonUser = await prisma.london_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if (isLondonUser) {
        userDrinkingHabit.forEach((drink) => {
            const matchingDrink = drinkFormula.find(
                (formula) => formula.drinkName === drink.drinkName && formula.drinkVolume === drink.drinkVolume
            );

            if (matchingDrink) {
                totalSpend += matchingDrink.drinkPriceLondon * drink.drinkQuantity;
            }
        })
    } else {
        userDrinkingHabit.forEach((drink) => {
            const matchingDrink = drinkFormula.find(
                (formula) => formula.drinkName === drink.drinkName && formula.drinkVolume === drink.drinkVolume
            );

            if (matchingDrink) {
                // console.log(matchingDrink)
                totalSpend += matchingDrink.drinkPriceUK * drink.drinkQuantity;
                // console.log( `total spend is : ${totalSpend}`)
            }
        })
    }

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
    const userPostCode = user_metadata.postcode;
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
    } else if (userGender === "FEMALE") {
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
    } else {
        if (totalDrinkUnitsConsumed === 0) {
            habit = "Non-drinker";
        } else if (totalDrinkUnitsConsumed > 0 && totalDrinkUnitsConsumed <= 14) {
            habit = "Up to 14 units";
        } else if (totalDrinkUnitsConsumed > 14 && totalDrinkUnitsConsumed <= 35) {
            habit = "14-35 units";
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

async function calculateInsightsBasedOnPlace(user_metadata, totalDrinkUnitsConsumed) {
    const userPostCode = user_metadata.postcode;
    let habit = "";
    
    if (totalDrinkUnitsConsumed === 0) {
        habit = "Non-drinker";
    } else if (totalDrinkUnitsConsumed > 0 && totalDrinkUnitsConsumed <= 14) {
        habit = "Up to 14 units";
    } else if (totalDrinkUnitsConsumed > 14 && totalDrinkUnitsConsumed <= 50) {
        habit = "14-50 units";
    } else {
        habit = "More than 50 units"
    }

    // check if the user is from london
    const isLondonUser = await prisma.london_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isLondonUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "LONDON",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from north east
    const isNorthEastUser = await prisma.north_east_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isNorthEastUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "NORTH_EAST",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from north west
    const isNorthWestUser = await prisma.north_west_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isNorthWestUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "NORTH_WEST",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from yorkshire and the humber
    const isYorkshireAndTheHumberUser = await prisma.yorkshire_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isYorkshireAndTheHumberUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "YORKSHIRE_AND_HUMBER",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from east midlands
    const isEastMidlandsUser = await prisma.east_midlands_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })

    if(isEastMidlandsUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "EAST_MIDLANDS",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from west midlands
    const isWestMidlandsUser = await prisma.west_midlands_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isWestMidlandsUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "WEST_MIDLANDS",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from east of england
    const isEastOfEnglandUser = await prisma.east_of_england_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isEastOfEnglandUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "EAST_OF_ENGLAND",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from south east
    const isSouthEastUser = await prisma.south_east_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isSouthEastUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "SOUTH_EAST",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from south west
    const isSouthWestUser = await prisma.south_west_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isSouthWestUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "SOUTH_WEST",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from scotland
    const isScotlandUser = await prisma.scotland_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isScotlandUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "SCOTLAND",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // if the user is from wales
    const isWalesUser = await prisma.wales_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isWalesUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint: {
                    place: "WALES",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    // check if the user is from northern ireland
    const isNorthernIrelandUser = await prisma.northern_ireland_post_codes.findUnique({
        where: {
            postCode: userPostCode
        }
    })
    if(isNorthernIrelandUser){
        const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
            where: {
                UniquePlaceBasedInsightConstraint:{
                    place: "NORTHERN_IRELAND",
                    habit: habit
                }
            },
            select: {
                insight: true
            }
        })
        return insightsBasedOnPlace;
    }

    const insightsBasedOnPlace = await prisma.drinking_insights_based_on_place.findUnique({
        where: {
            UniquePlaceBasedInsightConstraint: {
                place: "OTHER",
                habit: habit
            }
        },
        select: {
            insight: true
        }
    })

    return insightsBasedOnPlace;
    
}

export function calculateDrinkNumber(userDrinkingHabit) {
    let drinkNumber = 0;

    userDrinkingHabit.forEach((drink) => {
        drinkNumber += drink.drinkQuantity;
    });

    return drinkNumber;
}


