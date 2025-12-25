# 🕒 Attendance Tracker

A web application for monitoring event attendance, designed for both organizers and participants.  
**Project created for the Web Technologies course.**

---

## 🎯 About

This application allows:
- ✅ Creating and managing events
- 🔑 Automatic generation of unique access codes
- 📋 Confirming attendance via code
- 📊 Real-time participant lists
- 📥 Data export in CSV format

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Node.js + Express
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)

---

## 👥 User Roles

### 🔹 Organizer
- Creates events and event groups
- Generates unique access codes
- Views participants in real-time
- Exports attendance lists (CSV)

### 🔹 Participant
- Enters access code to confirm attendance
- Can view personal attendance history

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MySQL
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
DB_NAME=attendance_db
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=your_secret_key_here
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🗂️ Database Structure

| Table | Description |
|-------|-------------|
| **users** | Users (organizers & participants) |
| **event_groups** | Groups of events |
| **events** | Individual events with unique codes |
| **attendances** | Many-to-many relationship between users and events |

---

## 🚀 Key Features

- ✨ **Secure authentication** with JWT
- 🎲 **Unique codes** automatically generated for each event
- ⏰ **Time validation** - attendance can only be marked during event timeframe
- 🔒 **Duplicate registration protection**
- 📤 **CSV export** for individual events or entire groups

---

## 📝 API Endpoints (examples)

```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/groups                 # Create event group
POST   /api/events                 # Create event
POST   /api/attendances/join       # Mark attendance
GET    /api/attendances/event/:id  # List participants
GET    /api/attendances/export/... # Export CSV
```

---

## 👨‍💻 Author

Project created for **Web Technologies** - 2024/2025
