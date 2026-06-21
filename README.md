# WEB103 Project 3 - World Cup 2026 Venue & Match Planner

Submitted by: **Viet Thai Nguyen**

About this web app: **An interactive virtual community space for exploring stadiums and match schedules for the FIFA World Cup 2026. Users can click on host venues across North America to see matches scheduled there, view live countdowns to kickoff, filter all matches by stadium, and easily distinguish between upcoming and completed matches.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available** *(See Render dashboard screenshot in Walkthrough)*
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.** *(See database table printouts below)*
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.* (Implemented using interactive SVG polygon overlays over the stadium map).
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] **An additional page shows all possible events**
  - [x] **Users can sort *or* filter events by location.** (Sleek filter buttons are provided on the Events page).
- [x] **Events display a countdown showing the time remaining before that event**
  - [x] **Events appear with different formatting when the event has passed** (Passed matches are styled with lower opacity, gray scale filter, red-accented headers, and a "passed ago" duration).

The following **additional** features are implemented:

- [x] **Dynamic Timezone Offset Countdowns**: Countdowns are parsed and computed using timezone-aware ISO timestamps for Mexico City (CST), Los Angeles (PST), Toronto (EST), and New York/New Jersey (EST) match times.
- [x] **Glassmorphism Theme**: Styled the filter buttons and header sections with backdrop filters and custom neon glow shadows for premium aesthetics.

---

## Database Table Contents

### 1. Locations Table (`SELECT * FROM locations;`)
| id | name | address | city | state | zip | image |
|----|------|---------|------|-------|-----|-------|
| 1 | Estadio Azteca | Calzada de Tlalpan 3465 | Mexico City | CDMX | 04650 | https://media.coliseum-online.com/...webp |
| 2 | SoFi Stadium | 1001 Stadium Dr | Inglewood | CA | 90301 | https://ca-times.brightspotcdn.com/...jpg |
| 3 | MetLife Stadium | 1 MetLife Stadium Dr | East Rutherford | NJ | 07073 | https://a.espncdn.com/...jpg |
| 4 | BMO Field | 170 Princes' Blvd | Toronto | ON | M6K 3C3 | https://www.sportsnet.ca/...jpg |

### 2. Events Table (`SELECT * FROM events;`)
| id | title | date | time | image | remaining | location_id |
|----|-------|------|------|-------|-----------|-------------|
| 1 | Mexico vs. South Africa (Opening Match) | Thursday, June 11, 2026 | 19:00 | https://s.yimg.com/... | 2026-06-11 19:00:00-06 | 1 |
| 2 | Canada vs. Bosnia and Herzegovina | Friday, June 12, 2026 | 19:30 | https://www.usatoday.com/... | 2026-06-12 19:30:00-04 | 4 |
| 3 | USA vs. Paraguay | Friday, June 12, 2026 | 20:00 | https://www.usatoday.com/... | 2026-06-12 20:00:00-07 | 2 |
| 4 | Brazil vs. Morocco | Saturday, June 13, 2026 | 15:00 | https://idsb.tmgrup.com.tr/... | 2026-06-13 15:00:00-06 | 3 |
| 5 | Belgium vs. Iran | Sunday, June 21, 2026 | 15:00 | https://www.tntsports.co.uk/... | 2026-06-21 15:00:00-07 | 2 |
| 6 | Norway vs. Senegal | Monday, June 22, 2026 | 20:00 | https://encrypted-tbn0.gstatic.com/... | 2026-06-22 20:00:00-04 | 3 |
| 7 | Panama vs. Croatia | Tuesday, June 23, 2026 | 19:00 | https://encrypted-tbn0.gstatic.com/... | 2026-06-23 19:00:00-04 | 4 |
| 8 | Czechia vs. Mexico | Wednesday, June 24, 2026 | 21:00 | https://images.myguide-cdn.com/... | 2026-06-24 21:00:00-06 | 1 |
| 9 | Ecuador vs. Germany | Thursday, June 25, 2026 | 16:00 | https://www.reuters.com/... | 2026-06-25 16:00:00-04 | 3 |
| 10 | Türkiye vs. USA | Thursday, June 25, 2026 | 22:00 | https://i.ytimg.com/... | 2026-06-25 22:00:00-07 | 2 |

---

## Video Walkthrough

Here's a walkthrough of implemented required and optional features:

<div>
    <a href="https://www.loom.com/share/667874a778b84e8cb7348a5c8328b822">
        <p>World Cup 2026 Venue App Walkthrough - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/667874a778b84e8cb7348a5c8328b822">
        <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/667874a778b84e8cb7348a5c8328b822-db01b1f742becc7d-full-play.gif#t=0.1">
    </a>
</div>

---

## Notes

- **SSL connection error**: Configuring connection parameters locally required distinguishing between Render's internal and external URLs, as local development requires connecting to Render's database over a secure SSL channel using the external host.
- **Image URL Length constraints**: Encountered database length issues when inserting long Unsplash/news image URLs into `VARCHAR(255)`. Resolved by updating the column type in the PostgreSQL database from `VARCHAR(255)` to `TEXT`.

## License

Copyright [2026] [Thai]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.