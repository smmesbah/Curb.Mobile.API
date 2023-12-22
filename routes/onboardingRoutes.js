import express from 'express';
import {
    getUserMetadataController,
    userMetadataController,
    createUserGoalsController,
    getUserGoalsController
} from '../controllers/onboardingController.js';


const router = express.Router()

//routing
//POST age-range, gender and postcode
router.post('/user-metadata', userMetadataController)

//get user metadata || Method GET
router.get('/user-metadata/:id',getUserMetadataController)

//create user goals || Method POST
router.post('/user-goals', createUserGoalsController)

//get user goals || Method GET
router.get('/user-goals/:id', getUserGoalsController)

export default router;