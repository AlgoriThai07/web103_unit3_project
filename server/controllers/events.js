import { pool } from '../config/database.js'

export const getEvents = async (req, res) => {
    try {
        const results = await pool.query(`
            SELECT events.*, locations.name AS location_name 
            FROM events 
            INNER JOIN locations ON events.location_id = locations.id 
            ORDER BY events.remaining ASC
        `)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query(`
            SELECT events.*, locations.name AS location_name 
            FROM events 
            INNER JOIN locations ON events.location_id = locations.id 
            WHERE events.id = $1
        `, [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const getEventsByLocationId = async (req, res) => {
    try {
        const locationId = parseInt(req.params.locationId)
        const results = await pool.query(`
            SELECT events.*, locations.name AS location_name 
            FROM events 
            INNER JOIN locations ON events.location_id = locations.id 
            WHERE events.location_id = $1 
            ORDER BY events.remaining ASC
        `, [locationId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
