import express from 'express'
import {
    createWhyAnswerController,
    getWhyAnswerOfUserController,
    getTodaysTaskOfUserController
} from '../controllers/homeController.js'


const router = express.Router()



//routing
//create/update your why ans || Method POST
router.post('/answer-why', createWhyAnswerController)
//get you why ans of individual || Method POST
router.get('/answer-why/:id', getWhyAnswerOfUserController)

//get this week task of individual || Method GET
router.get('/this-week-task/:id', getTodaysTaskOfUserController)


export default router;
