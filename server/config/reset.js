import { pool } from './database.js'

const createTables = async () => {
    const createLocationsTableQuery = `
        DROP TABLE IF EXISTS events CASCADE;
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(50) NOT NULL,
            image TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(100) NOT NULL,
            time VARCHAR(100) NOT NULL,
            image TEXT NOT NULL,
            remaining TIMESTAMP WITH TIME ZONE NOT NULL,
            location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
        );
    `
    try {
        await pool.query(createLocationsTableQuery)
        console.log('Successfully created locations and events tables.')
    } catch (err) {
        console.error('Error creating tables:', err)
        throw err
    }
}

const seedLocations = async () => {
    const locations = [
        {
            id: 1,
            name: "Estadio Azteca",
            address: "Calzada de Tlalpan 3465",
            city: "Mexico City",
            state: "CDMX",
            zip: "04650",
            image: "https://media.coliseum-online.com/2025/05/Coliseum-GSVA-News-Baylin-Technologies-and-its-Galtronics-subsidiary-working-with-EstadioAzteca.webp"
        },
        {
            id: 2,
            name: "SoFi Stadium",
            address: "1001 Stadium Dr",
            city: "Inglewood",
            state: "CA",
            zip: "90301",
            image: "https://ca-times.brightspotcdn.com/dims4/default/13297fe/2147483647/strip/true/crop/4644x3096+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc3%2Fea%2Faf2b94c14155a813174a50bdda2a%2Fcopa-america-soccer-brazil-costa-rica-66220.jpg"
        },
        {
            id: 3,
            name: "MetLife Stadium",
            address: "1 MetLife Stadium Dr",
            city: "East Rutherford",
            state: "NJ",
            zip: "07073",
            image: "https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0714%2Fr1358413_1296x729_16%2D9.jpg"
        },
        {
            id: 4,
            name: "BMO Field",
            address: "170 Princes' Blvd",
            city: "Toronto",
            state: "ON",
            zip: "M6K 3C3",
            image: "https://www.sportsnet.ca/wp-content/uploads/2025/09/BMO-Field-768x432.jpg"
        }
    ]

    const query = `
        INSERT INTO locations (id, name, address, city, state, zip, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            address = EXCLUDED.address,
            city = EXCLUDED.city,
            state = EXCLUDED.state,
            zip = EXCLUDED.zip,
            image = EXCLUDED.image
    `

    try {
        for (const loc of locations) {
            await pool.query(query, [loc.id, loc.name, loc.address, loc.city, loc.state, loc.zip, loc.image])
            console.log(`Seeded location: ${loc.name}`)
        }
    } catch (err) {
        console.error('Error seeding locations:', err)
        throw err
    }
}

const seedEvents = async () => {
    const events = [
        {
            title: "Mexico vs. South Africa",
            date: "Thursday, June 11, 2026",
            time: "19:00",
            image: "https://s.yimg.com/ny/api/res/1.2/yeImAHtr2DM4M.CMMWKBWA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MDtjZj13ZWJw/https://media.zenfs.com/en/bbc_us_articles_995/5d3fc8fbb02b9caf2f25a45617475f70",
            remaining: "2026-06-11T19:00:00-06:00",
            location_id: 1
        },
        {
            title: "Canada vs. Bosnia and Herzegovina",
            date: "Friday, June 12, 2026",
            time: "19:30",
            image: "https://www.usatoday.com/gcdn/authoring/authoring-images/2026/06/12/USAT/90527944007-usatsi-29182818.jpg?crop=5327,2997,x0,y223&width=660&height=371&format=pjpg&auto=webp",
            remaining: "2026-06-12T19:30:00-04:00",
            location_id: 4
        },
        {
            title: "USA vs. Paraguay",
            date: "Friday, June 12, 2026",
            time: "20:00",
            image: "https://www.usatoday.com/gcdn/authoring/authoring-images/2026/06/13/USAT/90533391007-20260613-t-011812-z-1429301733-up-1-em-6-d-03-ma-96-rtrmadp-3-soccerworldcupusapry.JPG?crop=5940,3341,x0,y269&width=660&height=371&format=pjpg&auto=webp",
            remaining: "2026-06-12T20:00:00-07:00",
            location_id: 2
        },
        {
            title: "Brazil vs. Morocco",
            date: "Saturday, June 13, 2026",
            time: "15:00",
            image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2026/06/19/446767.jpeg",
            remaining: "2026-06-13T15:00:00-06:00",
            location_id: 3
        },
        {
            title: "Belgium vs. Iran",
            date: "Sunday, June 21, 2026",
            time: "15:00",
            image: "https://www.tntsports.co.uk/betting/thumbor/801ge6t1E8fZ3raX3bueYAdSdHA=/1200x630/smart/filters:format(jpeg)/https%3A%2F%2Fmedia-eurosport.s3.gra.io.cloud.ovh.net%2Fbetting%2F2026%2F06%2FBelgium-vs-Iran-TNT-Sports-UK.png",
            remaining: "2026-06-21T15:00:00-07:00",
            location_id: 2
        },
        {
            title: "Norway vs. Senegal",
            date: "Monday, June 22, 2026",
            time: "20:00",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUyL2kCKSMz5tON-HNKK7lt4KVAcvXWVEsvuO09Xk9g&s=10",
            remaining: "2026-06-22T20:00:00-04:00",
            location_id: 3
        },
        {
            title: "Panama vs. Croatia",
            date: "Tuesday, June 23, 2026",
            time: "19:00",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2OxRp0T96i5CEXCjbOGC8PE1pOOot4dzjF2WsM6VqA&s=10",
            remaining: "2026-06-23T19:00:00-04:00",
            location_id: 4
        },
        {
            title: "Czechia vs. Mexico",
            date: "Wednesday, June 24, 2026",
            time: "21:00",
            image: "https://images.myguide-cdn.com/mexico/events/large/czechia-vs-mexico-group-a-football-world-cup-2026-group-stage-match-53-232083-7371778.jpg",
            remaining: "2026-06-24T21:00:00-06:00",
            location_id: 1
        },
        {
            title: "Ecuador vs. Germany",
            date: "Thursday, June 25, 2026",
            time: "16:00",
            image: "https://www.reuters.com/graphics/SOCCER-WORLDCUP/mopaoglqkpa/cdn/images/sharecards/matches/ecuador-germany-06-25.jpeg",
            remaining: "2026-06-25T16:00:00-04:00",
            location_id: 3
        },
        {
            title: "Türkiye vs. USA",
            date: "Thursday, June 25, 2026",
            time: "22:00",
            image: "https://i.ytimg.com/vi/bEOhT10C7nA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCIP4x_CZ22Qd3zZK6OD9hfGLd2Fw",
            remaining: "2026-06-25T22:00:00-07:00",
            location_id: 2
        }
    ]

    const query = `
        INSERT INTO events (title, date, time, image, remaining, location_id)
        VALUES ($1, $2, $3, $4, $5, $6)
    `

    try {
        for (const event of events) {
            await pool.query(query, [event.title, event.date, event.time, event.image, event.remaining, event.location_id])
            console.log(`Seeded event: ${event.title}`)
        }
    } catch (err) {
        console.error('Error seeding events:', err)
        throw err
    }
}

const main = async () => {
    try {
        await createTables()
        await seedLocations()
        await seedEvents()
        console.log('Database successfully initialized and seeded.')
    } catch (err) {
        console.error('Initialization failed:', err)
    } finally {
        await pool.end()
        console.log('Pool closed.')
    }
}

main()