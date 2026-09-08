# TutorCue

TutorCue is a full tutor discovery and session booking web application. Students can find tutors, check tutor information and weekly availability, book a learning session in an available time slot, and manage their bookings — while tutors (any logged-in user) can list themselves as a tutor and manage their own tutor listings.

The project is built with **Next.js** on the frontend and **Express.js + MongoDB** on the backend, with **BetterAuth** (email/password and Google login) issuing JWTs that the backend verifies on every private request.

## Project Links

- Frontend Repository: [https://github.com/sufianWG/tutorcue](https://github.com/sufianWG/tutorcue)
- Backend Repository: [https://github.com/sufianWG/tutorcue-server](https://github.com/sufianWG/tutorcue-server)
- Live Site: [https://tutorcue.vercel.app/](https://tutorcue.vercel.app/)
- Live API: [https://tutorcue-server.vercel.app/](https://tutorcue-server.vercel.app/)

## Current Features

### Home Page

- Responsive homepage layout
- Three-slide hero slider, each slide with working call-to-action buttons (Browse Tutors, Book a Session, How It Works)
- Explore tutors by subject section
- Available tutors section
- Session journey section explaining how booking works
- Reusable tutor cards
- Responsive navbar and footer
- Dark theme by default, with a light/dark switcher in the navbar

### Login & Register

- Email/password login and registration
- Google social login
- Password validation (uppercase letter, lowercase letter, minimum 6 characters) with inline errors, not a generic alert
- JWT issued on successful login (email/password and Google) and used to authorize private API calls
- Toast feedback on success/failure instead of `alert()`

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

- Dynamic tutor details page using the tutor ID
- Dynamic browser tab title using the tutor's name
- Tutor summary information
- Subject and teaching information
- Location and teaching mode information
- Upcoming availability for the current week, with a "Next Week" button to reveal the following week's slots
- Book Session modal with date and time slot selection
- On successful booking, a Session Pass card is shown with the generated access token, and the same Session Pass also appears below the booking box for that tutor going forward

### Add Tutor Page (private)

- Add a new tutor with Tutor Name, Photo URL, Subject, Hourly Fee, Location, Teaching Mode, Institution, Experience, Total Slot, Session Start Date, Available Days, Available Time, Bio, About Tutor, Teaching Expertise, and Subjects Covered
- Teaching Expertise and Subjects Covered use a type-and-press-Enter tag input
- Toast on success/failure, redirect to the Tutors page after adding

### My Tutors Page (private)

- Table of all tutors created by the logged-in user, with search and pagination
- Friendly empty state when the user has not added any tutors yet
- Edit opens a pre-filled Update Tutor modal and saves without a full page reload
- Delete opens a confirm modal before removing a tutor

### My Booked Sessions Page (private)

- Table of the logged-in user's own booked sessions only
- Filter by status (Upcoming, Completed, Cancelled)
- Cancel opens a confirm modal, then cancels the booking and restores the tutor's slot
- Session Pass sidebar showing the user's most relevant session's access token
- Friendly empty state with a link to browse tutors

### Profile Page (private)

- Shows the logged-in user's photo, name, email, verification status, and member-since date, sourced directly from the auth session
- Sign out

### Global

- Dynamic per-route page titles
- A custom 404 page and a custom error boundary page
- A shared loading spinner used across every loading state (page loads, form submissions, modal actions)
- Toast notifications for every create/update/delete action, no `alert()` anywhere in the app
- JWT sent with every private API call and verified by the backend

### Tutor Slot System

TutorCue automatically manages weekly tutor availability behind the scenes:

- Generates session time slots from a tutor's available time range
- Matches a tutor's `availableDays` with the actual dates of the current and next week
- Prepares separate slot data for each available day
- Adds an initial `available` status to every generated slot
- Stores slot information in MongoDB, with total and available slot counts
- Prevents the same tutor's slot data for the same day/date from being inserted more than once, even under concurrent requests
- Restores a slot back to `available` when its booking is cancelled

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

The Express server (see the [backend repository](https://github.com/sufianWG/tutorcue-server) for full endpoint documentation) handles:

- `GET /tutors` — tutor list with search, filtering, sorting, pagination
- `GET /tutors/:id` — single tutor details
- `POST /tutors` — add a tutor (private)
- `PATCH /tutors/:id` — update a tutor the logged-in user owns (private)
- `DELETE /tutors/:id` — delete a tutor the logged-in user owns (private)
- `GET /my-tutors` — tutors created by the logged-in user (private)
- `GET /tutorslots/:tutorId` — a tutor's current and next week slots, auto-generating them if they don't exist yet
- `POST /booking` — book an available slot (private)
- `GET /my-bookings` — the logged-in user's own bookings (private)
- `PATCH /bookings/:id/cancel` — cancel a booking and restore its slot (private)

Private routes verify the JWT sent from the frontend before running.

## Technologies Used

### Frontend

- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- HeroUI
- Swiper
- React Paginate
- React Icons
- React Toastify
- Next Themes
- BetterAuth (email/password + Google, JWT plugin)
- JWT

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- CORS
- dotenv
- jose (JWT verification via JWKS)

## Theme

TutorCue supports both light and dark themes, defaulting to dark for new visitors. Once a visitor switches themes from the navbar, their choice is remembered for future visits.

The main color direction of the project uses:

- Deep Teal as the primary color
- Dark Navy for headings and strong text
- Warm Amber for important highlights

The UI is designed to keep tutor discovery, availability, and session scheduling easy to understand.

Some reusable utility functions are kept inside the `lib` folder, including date formatting, current week calculation, time formatting, and time slot generation.

## Environment Variables

Create a `.env.local` (or `.env`) file in the frontend project and add:

```env
NEXT_PUBLIC_TUTORCUE_SERVER_URL=https://tutorcue-server.vercel.app
TUTORCUE_SERVER_URL=https://tutorcue-server.vercel.app
NEXT_PUBLIC_SITE_URL=your_deployed_frontend_url
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=your_deployed_frontend_url
MONGODB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

For the backend, create a `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=your_deployed_frontend_url
PORT=6028
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

## Project Status

TutorCue is complete. The full flow — discovering tutors, registering/logging in, adding a tutor, browsing and filtering tutors, booking an available session, managing your own tutors, managing your own booked sessions, and cancelling a booking — is implemented end to end, on both the frontend and the backend.

## Author

**Md. Abu Sufian**

- GitHub: [https://github.com/sufianWG](https://github.com/sufianWG)
- Portfolio: [https://myportfolio-frontend-five.vercel.app/](https://myportfolio-frontend-five.vercel.app/)
