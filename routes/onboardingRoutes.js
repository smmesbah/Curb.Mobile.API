import express from 'express';
import {
    getUserMetadataController,
    userMetadataController,
    createUserGoalsController,
    getUserGoalsController,
    createUserWeeklyDrinkController,
    deleteUserWeeklyDrinkController,
    getUserWeeklyDrinkController,
    calculateUserDrinkingInsightsController
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

//weekly drink apis
//create drink || Method POST
router.post('/weekly-drink', createUserWeeklyDrinkController)

//delete drink || Method DELETE
router.delete('/weekly-drink', deleteUserWeeklyDrinkController)

//get all drink || Method GET
router.get('/weekly-drink/:id', getUserWeeklyDrinkController)

// number% women/men calculation || GET
router.get('/user-drinking-insights/:token', calculateUserDrinkingInsightsController)

// your rank as a drinker || GET

// calculation of money spent

// per week || GET

// per month || GET

// per year || GET



export default router;