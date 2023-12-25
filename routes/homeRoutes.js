import express from 'express'
import {
    createWhyAnswerController,
    getWhyAnswerOfUserController
} from '../controllers/homeController.js'


const router = express.Router()



//routing
//create/update your why ans || Method POST
router.post('/answer-why', createWhyAnswerController)
//get you why ans of individual || Method POST
router.get('/answer-why/:id', getWhyAnswerOfUserController)


export default router;
