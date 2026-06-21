import express from 'express'
import { getEvents, getEventById, getEventsByLocationId } from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/:id', getEventById)
router.get('/location/:locationId', getEventsByLocationId)

export default router
