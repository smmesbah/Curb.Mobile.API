import express from 'express'
import {
    createWhyAnswerController,
    getWhyAnswerOfUserController,
    getTodaysTaskOfUserController,
    getAllTaskOfUserController,
    getMoneyCaloriesUnitsAvoidedOfUserController,
    getDrinkFreeDaysOfCurrentMonthOfUserController,
    getCalenderDrinkFreeDaysController
} from '../controllers/homeController.js'


const router = express.Router()



//routing
//create/update your why ans || Method POST
router.post('/answer-why', createWhyAnswerController)
//get you why ans of individual || Method POST
router.get('/answer-why/:token', getWhyAnswerOfUserController)

//get today's task of individual || Method GET
router.get('/this-week-task/:token', getTodaysTaskOfUserController)

//get all tasks || Method GET
router.get('/all-tasks/:token', getAllTaskOfUserController)

//calculation money , calories, units avoided || Method GET
router.get('/calculation/:token', getMoneyCaloriesUnitsAvoidedOfUserController)

//calculation of drink free days of current month || Method GET
router.get('/drink-free-days/:token', getDrinkFreeDaysOfCurrentMonthOfUserController)

// get drink free days for calender in "2023-12-01" format of current month || Method GET
router.get('/drink-free-days-calender/:token', getCalenderDrinkFreeDaysController)

export default router;
