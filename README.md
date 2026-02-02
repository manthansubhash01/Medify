# Medify

Hospital appointment management system built with TypeScript and MongoDB.

## What it does

Patients can book appointments with doctors. Doctors need to confirm appointments before they're finalized. The system tracks appointment status (pending, confirmed, canceled, etc.) and manages patient and doctor information.

## Tech Stack

- TypeScript
- Express.js
- MongoDB + Mongoose
- Node.js

## Setup

1. Clone the repo

```bash
git clone https://github.com/manthansubhash01/Medify.git
cd Medify
```

2. Install packages

```bash
npm install
```

3. Create `.env` file in root folder

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. Setup MongoDB Atlas

- Go to mongodb.com and create free account
- Create a cluster
- Add your IP to Network Access (or use 0.0.0.0/0)
- Create database user
- Copy connection string to `.env` file

5. Run the server

```bash
npx tsx src/server.ts
```

Server runs on http://localhost:5000

## API Endpoints

**Appointments**

- GET `/api/appointments` - list all appointments
- POST `/api/appointments` - create appointment
- PUT `/api/appointments/:id/confirm` - doctor confirms
- PUT `/api/appointments/:id/cancel` - cancel appointment
- DELETE `/api/appointments/:id` - delete appointment

**Patients**

- GET `/api/patients` - list patients
- POST `/api/patients` - add patient
- GET `/api/patients/:id` - get patient details
- PUT `/api/patients/:id` - update patient
- DELETE `/api/patients/:id` - delete patient

**Doctors**

- GET `/api/doctors` - list doctors
- POST `/api/doctors` - add doctor
- GET `/api/doctors/:id` - get doctor details
- PUT `/api/doctors/:id` - update doctor
- DELETE `/api/doctors/:id` - delete doctor

## Query Filters

You can filter results using query parameters:

```
/api/appointments?status=CONFIRMED&page=1&limit=10
/api/doctors?specialization=Cardiology
/api/patients?type=OUTPATIENT
```

## How appointments work

1. Patient creates appointment → status is PENDING
2. Doctor confirms or rejects it → status changes to CONFIRMED/REJECTED
3. After visit → status becomes COMPLETED
4. Can be CANCELED anytime

## Project Structure

```
src/
  ├── controllers/    # handle HTTP requests
  ├── services/       # business logic
  ├── models/         # database schemas
  ├── routes/         # API routes
  └── utils/          # interfaces and classes
```

## Common Issues

**Database not connecting**

- Check MongoDB URI in .env
- Make sure IP is whitelisted in Atlas
- Verify database user credentials

**Port already in use**

- Change PORT in .env file
- Or kill the process: `lsof -ti:5000 | xargs kill`
