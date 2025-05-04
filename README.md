# 📘 Evently - "Eventually, You Will Use Evently"

## 📝 Description
KFUPM hosts a wide variety of events throughout the year, offering valuable opportunities for students, faculty, and businesses to engage in academic, social, and professional activities. However, the current event management system has several inefficiencies:
- Event announcements are primarily sent via email, leading to cluttered inboxes.
- Last-minute notifications offer little preparation time.
- No centralized platform exists to track past and upcoming events.

To address these issues, we developed **Evently** – a web-based platform that streamlines event organization and participation. It enables organizers to create, edit, and customize events, while attendees can browse, register, and receive real-time updates. Filtering by category, location, or date enhances discoverability and engagement.

---

## ⚙️ Setup and Installation

1. **Clone the repository:**
```bash
git clone https://github.com/KenanKaddoura/Evently-v1-webApp-react
```

2. **Navigate to the project folder:**
```bash
cd Evently-v1-webApp-react
```

3. **Install dependencies and start the app (Frontend):**
```bash
cd frontend
npm install
npm start
```
The application should now be running at [http://localhost:3000](http://localhost:3000)

4. **Configure the backend (.env):**
Inside the `backend` folder, create a `.env` file and add:
```env
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/evently
```

5. **Install dependencies and start the server (Backend):**
```bash
cd backend
npm install
node server.js
```
The server will now run at [http://localhost:5000](http://localhost:5000)

---

## 👥 How to Use

The app supports 3 user roles:
- **Admin**
- **Organizer**
- **Attendee**

> Use the frontend to sign up with 3 users. All start as "Attendee" by default.

Then, use this request to promote:
```http
PUT /api/users/:id
```
**Body Example:**
```json
{
  "role": "Organizer"
}
```

Test by logging in as each role and trying relevant features (create event, view dashboard, etc).

---

## 📘 API Documentation – Evently Back-End

### 🔐 Authentication Endpoints (`/api`)

#### POST `/signup`
Registers a new user.
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepass",
  "stuId": "2023001"
}
```

#### POST `/login`
Logs in an existing user.
```json
{
  "email": "john@example.com",
  "password": "securepass"
}
```

---

### 👥 User Endpoints (`/api/users`)

#### GET `/` – All users *(Admin only)*
#### GET `/:id` – Single user with events
#### PUT `/:id` – Update profile
#### POST `/:id/register/:eventId` – Register to event
#### PUT `/:userId/feedback/:eventId` – Submit feedback
#### DELETE `/:userId/unregister/:eventId` – Unregister from event

---

### 📅 Event Endpoints (`/api/events`)

#### GET `/` – All events
#### GET `/:id` – Event by ID
#### POST `/` – Create event
```json
{
  "title": "Hackathon",
  "description": "24h coding event",
  "category": "Tech",
  "venue": "Main Hall",
  "date": "2025-05-20T15:00:00.000Z",
  "registrationRequired": "true",
  "registrationMethod": "Google Form",
  "organiser": "John Doe"
}
```
#### PUT `/:id` – Update event
#### DELETE `/:id` – Delete event

---

### 🏷️ Category Endpoints (`/api/categories`)

#### GET `/` – All categories
#### POST `/` – Create new
```json
{ "title": "Workshop" }
```
#### PUT `/:id` – Update category
#### DELETE `/:id` – Remove category

---

### 🏛️ Venue Endpoints (`/api/venues`)

#### GET `/` – All venues
#### GET `/:id` – Single venue
#### POST `/` – Create venue
```json
{
  "name": "Building 22 - R101",
  "capacity": 80,
  "location": "KFUPM Campus",
  "availability": "Available"
}
```
#### PUT `/:id` – Update venue
#### DELETE `/:id` – Remove venue

---

### 🔐 Authorization Notes
Use this header on protected routes:
```http
Authorization: Bearer <your-token>
```
All responses are JSON. Errors:
```json
{ "error": "message" }
```

---

## 👨‍💻 Tech Stack
- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT

---

## 👨‍👩‍👧‍👦 Team Members
- **Kenan Kaddoura** 
- **Omar Alaiydi** 
- **Hadi Almayyad**
- **Muath Alzahrani**
- **Basil Alghamdi**

