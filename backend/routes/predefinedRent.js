import express from 'express'
import {getAllPreDefinedRents,getOnePreDefinedRent,getFilteredPreDefinedRents} from '../controllers/predefinedRentControllers.js'

const router = express.Router()

router.get('/api/predefinedRents', getAllPreDefinedRents)
router.get('/api/predefinedRents/filter', getFilteredPreDefinedRents)
router.get('/api/predefinedRents/:id', getOnePreDefinedRent)

export default router