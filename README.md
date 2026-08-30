# TutorCue

TutorCue is a tutor discovery and session scheduling web application. The main idea of this project is to make it easier for students to find tutors, check tutor information and weekly availability, and book learning sessions based on available time slots.

The project is being built with **Next.js** on the frontend and **Express.js + MongoDB** on the backend.

## Project Links

- Frontend Repository: [https://github.com/sufianWG/tutorcue](https://github.com/sufianWG/tutorcue)
- Backend Repository: [https://github.com/sufianWG/tutorcue-server](https://github.com/sufianWG/tutorcue-server)
- Backend API: [https://tutorcue-server.vercel.app](https://tutorcue-server.vercel.app)

## Current Features

### Home Page

- Responsive homepage layout
- Three-slide hero slider
- Explore tutors by subject section
- Available tutors section
- Session journey section
- Reusable tutor cards
- Responsive navbar and footer
- Light and dark theme support

### Tutors Page

- Tutor data loaded from the backend API
- Search tutors by:
  - Tutor name
  - Subject
  - Teaching mode
  - Location
  - Institution
- Filter tutors by subject
- Filter by teaching mode
- Filter by location
- Sort tutors by newest and oldest
- Server-side pagination
- Empty state when no tutor matches the search
- Responsive tutor card layout

### Tutor Details Page

- Dynamic tutor details page using tutor ID
- Tutor summary information
- Subject and teaching information
- Location and teaching mode information
- Tutor availability section
- Weekly available days
- Weekly date calculation
- Time slot generation from tutor start and end time
- Total available slot calculation for the current week

### Tutor Slot System

TutorCue also has an initial slot management system.

The application can:

- Generate session time slots from a tutor's available time range
- Match tutor `availableDays` with the actual dates of the current week
- Prepare separate slot data for each available day
- Add an initial `available` status to every generated slot
- Store slot information in MongoDB
- Store total and available slot counts
- Prevent the same tutor's slot data for the same day/date from being inserted repeatedly

Example slot structure:

```js
{
  start: "18:30",
  end: "19:00",
  status: "available",
  bookedBy: null
}
```

Each available day is stored with information such as:

```js
{
  tutorId,
  tutorName,
  dayFull,
  dayShort,
  dateNumber,
  month,
  year,
  totalSlots,
  availableSlots,
  slots
}
```

## Backend Features

The Express server currently handles:

### Get Tutors

```http
GET /tutors
```

Supports:

- Search
- Subject filtering
- Teaching mode filtering
- Location filtering
- Institution search
- Sorting
- Pagination

### Get Single Tutor

```http
GET /tutors/:id
```

Returns the details of a tutor using the MongoDB document ID.

### Store Tutor Slots

```http
POST /tutorslots
```

Stores generated weekly tutor slot information in MongoDB.

Before inserting a day's slot information, the API checks whether the same tutor and date already exist. Existing slot data is skipped instead of being inserted again.

## Technologies Used

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- HeroUI
- Swiper
- React Icons
- Next Themes

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- CORS
- dotenv

## Theme

TutorCue supports both light and dark themes.

The main color direction of the project uses:

- Deep Teal as the primary color
- Dark Navy for headings and strong text
- Warm Amber for important highlights

The UI is designed to keep tutor discovery, availability, and session scheduling easy to understand.

## Project Structure

The frontend is mainly organized into:

```text
src/
├── app/
│   ├── add-tutor/
│   ├── login/
│   ├── my-booked-sessions/
│   ├── my-tutors/
│   ├── profile/
│   ├── signup/
│   └── tutors/
│       └── [id]/
│
├── components/
│   ├── HeroBanners/
│   ├── Home/
│   ├── TutorDetailPage/
│   └── shared/
│
├── assets/
└── lib/
```

Some reusable utility functions are kept inside the `lib` folder, including date formatting, current week calculation, time formatting, and time slot generation.

## Environment Variable

Create a `.env.local` file in the frontend project and add:

```env
NEXT_PUBLIC_TUTORCUE_SERVER_URL=https://tutorcue-server.vercel.app
```

For the backend, create a `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

## Run the Frontend Locally

Clone the repository:

```bash
git clone https://github.com/sufianWG/tutorcue.git
```

Move into the project directory:

```bash
cd tutorcue
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Run the Backend Locally

Clone the backend repository:

```bash
git clone https://github.com/sufianWG/tutorcue-server.git
```

Move into the server directory:

```bash
cd tutorcue-server
```

Install dependencies:

```bash
npm install
```

Add the required environment variables and run:

```bash
npm run dev
```

## Work in Progress

Some parts of TutorCue are still under development. The next main features are:

- User registration and login
- Authentication and user session handling
- Protected routes
- Complete session booking flow
- Selecting a specific available time slot
- Updating available slot count after booking
- Restoring a slot after booking cancellation
- User-specific booked sessions
- Add Tutor functionality
- My Tutors management
- Update and delete tutor functionality
- Booking status management
- Digital session token
- User profile functionality

## Current Development Status

At the current stage, the tutor discovery flow, search and filtering system, tutor details page, weekly availability calculation, time slot generation, and initial MongoDB-based tutor slot storage are working.

The next main focus is connecting authentication with the slot system so that logged-in users can select and book available tutor sessions.

## Author

**Md. Abu Sufian**

- GitHub: [https://github.com/sufianWG](https://github.com/sufianWG)
- Portfolio: [https://myportfolio-frontend-five.vercel.app/](https://myportfolio-frontend-five.vercel.app/)