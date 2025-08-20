import express from 'express'
import { getAllUserDefinedRents, createUserDefinedRent ,deleteUserDefinedRent ,getFilteredUserDefinedRents ,getOneUserDefinedRent} from '../controllers/userdefinedRentControllers.js'
import {requireAuth} from '../middlewares/jwtChecker.js'


const router = express.Router()

router.get('/userdefinedRents/me',requireAuth, getAllUserDefinedRents)
router.post('/userdefinedRents',requireAuth, createUserDefinedRent)
router.delete('/userdefinedRents/:id', requireAuth, deleteUserDefinedRent)

router.get('/userdefinedRents/filter', getFilteredUserDefinedRents)
router.get('/userdefinedRents/:id', getOneUserDefinedRent)
export default router

