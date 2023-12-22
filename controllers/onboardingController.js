import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userMetadataController = async(req, res) => {
    try {
        const {userId, ageRange, gender, postcode} = req.body;
        // validation
        if(!userId){
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
        if(!existingUser){
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
        else{
            const updatedUserMetadata = await prisma.user_metadata.update({
                where: {userId: userId},
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

export const getUserMetadataController = async(req, res) => {
    try {
        const {id} = req.params;
        const userId = parseInt(id);
        // validation
        if(!userId){
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
        if(!existingUser){
            return res.status(404).send({
                success: false,
                message: 'User metadata is not found.'
            })
        }else{
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

export const createUserGoalsController = async(req, res) => {
    try {
        const {userId, goals} = req.body;

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

export const getUserGoalsController = async(req, res) => {
    try {
        const {id} = req.params;
        const userId = parseInt(id);
        // validation
        if(!userId){
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