# 📅 Attendance Tracker

A full-stack web application designed to efficiently manage attendance for groups and events. The app allows users to organize activities, create events, and monitor member participation in a simple and intuitive way.

## Check it out here
[www.attendancetracker.online](https://www.attendancetracker.online)

## 👥 The Team
This project was built in collaboration by:
* **Zanescu Costel**
* **Voicu Andreea-Diana**

---

## 🚀 How to Run the Application

To run the project locally, you will need to set up the environment variables and start both the Backend (server) and Frontend (client).

### Prerequisites
* [Node.js](https://nodejs.org/) installed.
* **MySQL** database installed and running locally.

---

### Step 1: Start the Backend (Server)

1.  Open a terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```

2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

3.  **Configuration (.env):**
    Create a file named `.env` inside the `backend` folder. You need to provide your own local MySQL database credentials. Copy and paste the template below and fill in your details:

    ```env
    # Database Configuration
    DB_HOST=127.0.0.1          # Usually 127.0.0.1 or localhost
    DB_USER=your_mysql_user    # Your MySQL username (e.g., root)
    DB_PASS=your_mysql_pass    # Your MySQL password
    DB_NAME=attendance_db      # The name of the database
    DB_DIALECT=mysql

    # Security & Server
    JWT_SECRET=add_a_complex_secret_string_here
    PORT=3000
    ```

    > **⚠️ Important:** Before starting the server, make sure to create the database manually in your MySQL Workbench or CLI:
    > ```sql
    > CREATE DATABASE attendance_db;
    > ```

4.  Start the server:
    ```bash
    node app.js
    ```
    *The server should now be running on port 3000.*

---

### Step 2: Start the Frontend (Interface)

1.  Open a **second terminal** (keep the first one running) and navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Configuration (.env):**
    Create a file named `.env` inside the `frontend` folder and add the API URL:

    ```env
    VITE_BASE_URL=http://localhost:3000
    ```

4.  Start the React application:
    ```bash
    npm run dev
    ```

5.  Access the link shown in the terminal (usually `http://localhost:5173`) to use the application.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, CSS Modules
* **Backend:** Node.js, Express
* **Database:** Sequelize ORM (MySQL)
