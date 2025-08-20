import express from 'express'
import {getAllPreDefinedRents,getOnePreDefinedRent,getFilteredPreDefinedRents} from '../controllers/predefinedRentControllers.js'

const router = express.Router()

router.get('/predefinedRents', getAllPreDefinedRents)
router.get('/predefinedRents/filter', getFilteredPreDefinedRents)
router.get('/predefinedRents/:id', getOnePreDefinedRent)

export default router