import express from 'express'
import { getAllUserDefinedRents, createUserDefinedRent ,deleteUserDefinedRent ,getFilteredUserDefinedRents ,getOneUserDefinedRent} from '../controllers/userdefinedRentControllers.js'
import {requireAuth} from '../middlewares/jwtChecker.js'


const router = express.Router()

router.get('/api/userdefinedRents/me',requireAuth, getAllUserDefinedRents)
router.post('/api/userdefinedRents',requireAuth, createUserDefinedRent)
router.delete('/api/userdefinedRents/:id', requireAuth, deleteUserDefinedRent)

router.get('/api/userdefinedRents/filter', getFilteredUserDefinedRents)
router.get('/api/userdefinedRents/:id', getOneUserDefinedRent)
export default router

