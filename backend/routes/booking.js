import express from 'express'
import { getBookings, createBooking, deleteBooking } from '../controllers/bookingControllers.js'
import {requireAuth} from '../middlewares/jwtChecker.js'
const router = express.Router()

router.get('/api/bookings/me',requireAuth,  getBookings)
router.post('/api/bookings/:id', requireAuth, createBooking)
router.delete('/api/hotel/:hotelId/booking/:bookingId', requireAuth, deleteBooking)

export default router