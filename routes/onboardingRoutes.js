import express from 'express';
import {
    getUserMetadataController,
    userMetadataController,
    createUserGoalsController,
    getUserGoalsController,
    createUserWeeklyDrinkController,
    deleteUserWeeklyDrinkController,
    getUserWeeklyDrinkController,
    calculateUserDrinkingInsightsController,
    trackHkUserFromReferrelCodeController,
    calculateUserDrinkAvoidController,
    getOnboardingStepsController,
    updateOnboardingStepsController
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
router.get('/user-goals/:token', getUserGoalsController)

//weekly drink apis
//create drink || Method POST
router.post('/weekly-drink', createUserWeeklyDrinkController)

//delete drink || Method DELETE
router.delete('/weekly-drink', deleteUserWeeklyDrinkController)

//get all drink || Method GET
router.get('/weekly-drink/:id', getUserWeeklyDrinkController)

// number% women/men calculationn and money spend(week, month, year) || GET
router.get('/user-drinking-insights/:token', calculateUserDrinkingInsightsController)

// HK user or Non-HK user referrel code || POST
router.post('/user-referrel-code', trackHkUserFromReferrelCodeController)

// get drink avoid calculation || GET
router.get('/user-drink-avoid-calculation/:token', calculateUserDrinkAvoidController)

// get onboarding steps || GET
router.get('/onboarding-steps/:token', getOnboardingStepsController)

// update onboarding steps || PUT
router.patch('/update-onboarding-steps', updateOnboardingStepsController)



export default router;