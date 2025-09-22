# TicketFlow

**TicketFlow** — A simple yet powerful IT Ticket Management System built with the MERN stack (MongoDB, Express, React, Node).

> Project Goal: Simplify the IT support workflow for organizations. Employees can open, edit, and delete tickets. IT staff can close and resolve tickets. Admins can view and manage all users, tickets, and data.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Roles & Permissions](#roles--permissions)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Setup & Run (local)](#setup--run-local)
7. [Development Tips](#development-tips)
8. [Contributing](#contributing)
9. [Contact](#contact)

---

## Overview
TicketFlow is designed to make internal support requests more consistent and traceable. Users create tickets; tickets are logged, assigned, prioritized, and tracked. Through the Admin panel, users, roles, and all tickets can be managed.

---

## Features
- User Registration / Login (JWT authentication)
- Ticket CRUD operations
- Role-based access control (Admin / Employee / IT)
- **Admin**: manage users, tickets, and data
- **Employee**: open, update, and delete their own tickets
- **IT**: view assigned tickets and mark them as resolved/closed
- MongoDB + Mongoose for database
- REST API with Express.js
- React frontend (dashboard/UI)

---

## Roles & Permissions
- **Admin**
  - View, edit, and delete all tickets and users
  - Manage roles (promote/demote users)
- **Employee**
  - Create new tickets
  - View, edit, or delete their own tickets
- **IT Staff**
  - View assigned tickets
  - Mark tickets as *resolved/closed*

---

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Other:** dotenv, bcrypt, cors, etc.

---

## Project Structure
```
TicketFlow/
├─ Backend/                  # Express API
│  ├─ config/                # Database & JWT configs
│  ├─ controllers/           # Request handlers (ticket, user, auth)
│  ├─ middleware/            # Auth middleware, error handling
│  ├─ models/                # Mongoose schemas (User, Ticket, etc.)
│  ├─ routes/                # API route definitions
│  ├─ utils/                 # Helper functions (if any)
│  ├─ app.js                 # Entry point for backend
│  └─ package.json           # Backend dependencies & scripts
│
├─ Frontend/                 # React application
│  ├─ public/                # Public assets
│  ├─ src/
│  │  ├─ components/         # Reusable UI components
│  │  ├─ pages/              # Main page views (Dashboard, Login, etc.)
│  │  ├─ redux/              # Redux slices & store
│  │  ├─ services/           # API calls (fetch/axios)
│  │  ├─ utils/              # Helper functions
│  │  ├─ App.js              # Main React component
│  │  └─ index.js            # React entry point
│  └─ package.json           # Frontend dependencies & scripts
│
├─ .gitignore
├─ README.md
└─ package.json              
```

---

## Setup & Run (local)
The following steps are for running the project locally.

### Backend
1. Open terminal and navigate into the backend folder:
```bash
cd Backend
```
2. Install dependencies:
```bash
npm install
```
3. Run the application:
- If a `start` script exists in `package.json`:
```bash
npm start
```
- Or directly run the app file:
```bash
node app.js
```
> Note: In this project `app.js` is used — so `node app.js` works fine. `npm start app.js` is not a usual command. Check `package.json` for the right script.

Backend typically runs on the `PORT` specified in `.env` (commonly `5000`).

### Frontend
1. Open a new terminal and navigate to frontend:
```bash
cd Frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the app:
- If using Vite:
```bash
npm run dev
```
- If Create React App:
```bash
npm start
```

> Note: The original info was `npm run de` — this seems to be a typo. The correct command is usually `npm run dev`. Check your `package.json` scripts if unsure.

---

## API - Short Summary (example routes)
> Check `Backend/routes` for actual routes. Example structure:
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — Login (returns JWT)
- `GET /api/users` — List all users (Admin)
- `GET /api/users/:id` — User details (Admin or self)
- `GET /api/tickets` — List tickets (filtered by role)
- `POST /api/tickets` — Create new ticket (Employee)
- `PUT /api/tickets/:id` — Update ticket (owner or Admin)
- `DELETE /api/tickets/:id` — Delete ticket (owner or Admin)
- `PUT /api/tickets/:id/close` — Close ticket (IT)

---

## Development Tips
- Use `nodemon` for backend to restart automatically during development.
- If you face CORS issues, check `CLIENT_URL` and CORS settings in backend.
- For better security, prefer `httpOnly` cookies instead of `localStorage` for JWT tokens (requires extra setup).

---

## Contributing
1. Fork the repo.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Open a Pull Request.

Follow code style guidelines and write meaningful commit messages.


## Contact
For questions or suggestions, please contact via GitHub.

---

**Happy coding!**


