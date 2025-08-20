import express from 'express'
import { getBookings, createBooking, deleteBooking } from '../controllers/bookingControllers.js'
import {requireAuth} from '../middlewares/jwtChecker.js'
const router = express.Router()

router.get('/bookings/me',requireAuth,  getBookings)
router.post('/bookings/:id', requireAuth, createBooking)
router.delete('/hotel/:hotelId/booking/:bookingId', requireAuth, deleteBooking)

export default router