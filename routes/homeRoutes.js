import express from 'express'
import {
    createWhyAnswerController,
    getWhyAnswerOfUserController,
    getTodaysTaskOfUserController,
    getAllTaskOfUserController
} from '../controllers/homeController.js'


const router = express.Router()



//routing
//create/update your why ans || Method POST
router.post('/answer-why', createWhyAnswerController)
//get you why ans of individual || Method POST
router.get('/answer-why/:id', getWhyAnswerOfUserController)

//get today's task of individual || Method GET
router.get('/this-week-task/:id', getTodaysTaskOfUserController)

//get all tasks || Method GET
router.get('/all-tasks/:id', getAllTaskOfUserController)

export default router;
