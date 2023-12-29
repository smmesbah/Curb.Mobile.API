import express from 'express'
import {
    getProfileNameEmailController,
    getProfileInfoController,
    updateNameEmailController,
    updateAgeRangeController,
    updateGenderController,
    updatePostcodeController
} 
from '../controllers/profiileController.js'


const router = express.Router()

//get user name, email || Method GET
router.get('/myprofile/:token', getProfileNameEmailController)

//get ageRange, gender and postcode || Method GET
router.get('/profile-info/:token', getProfileInfoController)

//update name and email || Method PUT
router.put('/update-name-email/:token', updateNameEmailController)

//update age range || Method PUT
router.put('/update-age-range/:token', updateAgeRangeController)

//update gender || Method PUT
router.put('/update-gender/:token', updateGenderController)

//update postcode || Method PUT
router.put('/update-postcode/:token', updatePostcodeController)


export default router