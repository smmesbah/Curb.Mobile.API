import express from 'express'

import {
    checkinDrinkController,
    getCheckinDrinkController,
    deleteCheckinDrinkController,
    getCheckinCalculationOfSpentCaloriesUnits,
    checkinHealthInfoController,
    getCheckinHealthInfoController
} from '../controllers/checkinController.js'

const router = express.Router()


//routing

//create drinking checkin || Method POST
router.post('/checkin-drink', checkinDrinkController);

//GET drinking checkin
router.get('/checkin-drink/:token', getCheckinDrinkController);

//DELETE drinks from daily checkin drinks table
router.delete('/checkin-drink/:id', deleteCheckinDrinkController);


// money spent, calories and units calculation
router.get('/checkin-drinkCalculation/:token', getCheckinCalculationOfSpentCaloriesUnits);

// POST || daily health checkin data || wellbeing, habits, notes
router.post('/checkin-health-info', checkinHealthInfoController);

// GET || daily health checkin data || wellbeing, habits, notes
router.get('/checkin-health-info/:token', getCheckinHealthInfoController);


export default router;