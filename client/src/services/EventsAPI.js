const getAllEvents = async () => {
    try {
        const response = await fetch('/api/events')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching events:', error)
        throw error
    }
}

const getEventsById = async (id) => {
    try {
        const response = await fetch(`/api/events/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error)
        throw error
    }
}

const getEventsByLocationId = async (locationId) => {
    try {
        const response = await fetch(`/api/events/location/${locationId}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching events for location ${locationId}:`, error)
        throw error
    }
}

export default {
    getAllEvents,
    getEventsById,
    getEventsByLocationId
}
