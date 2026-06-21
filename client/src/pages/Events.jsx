import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
                setFilteredEvents(eventsData)

                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            } catch (error) {
                console.error('Error fetching events or locations:', error)
            }
        })()
    }, [])

    const handleFilterChange = (locationId) => {
        setSelectedLocation(locationId)
        if (locationId === 'all') {
            setFilteredEvents(events)
        } else {
            const filtered = events.filter(event => event.location_id === parseInt(locationId))
            setFilteredEvents(filtered)
        }
    }

    return (
        <div className='all-events-page'>
            <header className='events-page-header'>
                <h2>World Cup 2026 Match Schedule</h2>
                <div className='filter-controls'>
                    <label htmlFor="location-select">Filter by Stadium:</label>
                    <select 
                        id="location-select" 
                        value={selectedLocation} 
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <option value="all">All Venues</option>
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>
                                {loc.name} ({loc.city})
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            <main className='events-grid'>
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ))
                ) : (
                    <h2 className='no-events'>
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i>
                        No matches scheduled for this selection!
                    </h2>
                )}
            </main>
        </div>
    )
}

export default Events
