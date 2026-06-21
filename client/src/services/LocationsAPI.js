const getAllLocations = async () => {
    try {
        const response = await fetch('/api/locations')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching locations:', error)
        throw error
    }
}

const getLocationById = async (id) => {
    try {
        const response = await fetch(`/api/locations/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`Error fetching location ${id}:`, error)
        throw error
    }
}

export default {
    getAllLocations,
    getLocationById
}
