# 📡 Attendance Tracker API Documentation

Complete REST API documentation for the Attendance Tracker backend.

**Base URL:** `http://localhost:3000/api`

---

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After login, include the token in subsequent requests:

```
Authorization: Bearer <your_token_here>
```

---

## 📚 API Endpoints

### 1. Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "userId": 1
}
```

**Error Responses:**
- `400` - Email or name already exists
- `500` - Server error

---

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400` - Invalid credentials
- `500` - Server error

---

### 2. Event Groups Routes (`/api/groups`)

🔒 **All routes require authentication**

#### Create Event Group
```http
POST /api/groups
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Spring 2024 Workshops"
}
```

**Success Response (201):**
```json
{
  "message": "Event Group created!",
  "group": {
    "id": 1,
    "name": "Spring 2024 Workshops",
    "ownerId": 1,
    "createdAt": "2024-12-12T10:00:00.000Z",
    "updatedAt": "2024-12-12T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing name field
- `401` - Not authorized
- `500` - Server error

---

#### Get User's Groups
```http
GET /api/groups
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "Spring 2024 Workshops",
    "ownerId": 1,
    "createdAt": "2024-12-12T10:00:00.000Z",
    "updatedAt": "2024-12-12T10:00:00.000Z",
    "events": [
      {
        "id": 1,
        "name": "React Workshop",
        "startTime": "2024-12-15T14:00:00.000Z",
        "endTime": "2024-12-15T16:00:00.000Z"
      }
    ]
  }
]
```

---

#### Get Group by ID
```http
GET /api/groups/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "id": 1,
  "name": "Spring 2024 Workshops",
  "ownerId": 1,
  "createdAt": "2024-12-12T10:00:00.000Z",
  "updatedAt": "2024-12-12T10:00:00.000Z",
  "events": [...]
}
```

**Error Responses:**
- `404` - Group doesn't exist or access denied
- `401` - Not authorized
- `500` - Server error

---

#### Delete Group
```http
DELETE /api/groups/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Group deleted!"
}
```

**Error Responses:**
- `404` - Group not found
- `401` - Not authorized
- `500` - Server error

---

### 3. Events Routes (`/api/events`)

🔒 **All routes require authentication**

#### Create Event
```http
POST /api/events
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "groupId": 1,
  "name": "React Workshop",
  "startTime": "2024-12-15T14:00:00.000Z",
  "endTime": "2024-12-15T16:00:00.000Z"
}
```

**Success Response (201):**
```json
{
  "message": "Event created successfully!",
  "event": {
    "id": 1,
    "groupId": 1,
    "name": "React Workshop",
    "accessCode": "A3K9L2",
    "startTime": "2024-12-15T14:00:00.000Z",
    "endTime": "2024-12-15T16:00:00.000Z",
    "createdAt": "2024-12-12T10:00:00.000Z",
    "updatedAt": "2024-12-12T10:00:00.000Z"
  }
}
```

**Notes:**
- `accessCode` is automatically generated (6 characters, alphanumeric)

**Error Responses:**
- `400` - Missing required fields
- `404` - Group not found
- `401` - Not authorized
- `500` - Server error

---

#### Get Events by Group
```http
GET /api/events/group/:groupId
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "groupId": 1,
    "name": "React Workshop",
    "accessCode": "A3K9L2",
    "startTime": "2024-12-15T14:00:00.000Z",
    "endTime": "2024-12-15T16:00:00.000Z",
    "createdAt": "2024-12-12T10:00:00.000Z",
    "updatedAt": "2024-12-12T10:00:00.000Z"
  }
]
```

**Error Responses:**
- `404` - Group not found
- `401` - Not authorized
- `500` - Server error

---

#### Get Event by ID
```http
GET /api/events/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "id": 1,
  "groupId": 1,
  "name": "React Workshop",
  "accessCode": "A3K9L2",
  "startTime": "2024-12-15T14:00:00.000Z",
  "endTime": "2024-12-15T16:00:00.000Z",
  "createdAt": "2024-12-12T10:00:00.000Z",
  "updatedAt": "2024-12-12T10:00:00.000Z",
  "group": {
    "id": 1,
    "name": "Spring 2024 Workshops",
    "ownerId": 1
  }
}
```

**Error Responses:**
- `404` - Event not found or access denied
- `401` - Not authorized
- `500` - Server error

---

### 4. Attendance Routes (`/api/attendances`)

🔒 **All routes require authentication**

#### Join Event (Mark Attendance)
```http
POST /api/attendances/join
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "accessCode": "A3K9L2"
}
```

**Success Response (201):**
```json
{
  "message": "You attended: React Workshop"
}
```

**Error Responses:**
- `404` - Unavailable Event (invalid code)
- `400` - Event not in valid timeframe ("Too late, too late")
- `400` - Already attended this event
- `401` - Not authorized
- `500` - Server error

**Notes:**
- Attendance can only be marked during the event's time window (between `startTime` and `endTime`)
- Users cannot mark attendance twice for the same event

---

#### Get Event Participants
```http
GET /api/attendances/event/:eventId
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "userId": 2,
    "eventId": 1,
    "joinedAt": "2024-12-15T14:30:00.000Z",
    "createdAt": "2024-12-15T14:30:00.000Z",
    "updatedAt": "2024-12-15T14:30:00.000Z",
    "user": {
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
]
```

**Error Responses:**
- `404` - Event doesn't exist or access denied
- `401` - Not authorized
- `500` - Server error

**Notes:**
- Only the event owner (organizer) can view participants

---

#### Export Event Attendance (CSV)
```http
GET /api/attendances/export/event/:eventId
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```csv
Name,Email,Joined At,Event
Jane Smith,jane@example.com,12/15/2024 2:30:00 PM,React Workshop
John Doe,john@example.com,12/15/2024 2:35:00 PM,React Workshop
```

**Response Headers:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="Attendees_React Workshop.csv"
```

**Error Responses:**
- `404` - Access denied
- `401` - Not authorized
- `500` - Export error

**Notes:**
- Only the event owner can export attendance
- Returns a downloadable CSV file

---

#### Export Group Attendance (CSV)
```http
GET /api/attendances/export/group/:groupId
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```csv
Event,Date,Name,Email,Hour
React Workshop,12/15/2024,Jane Smith,jane@example.com,2:30:00 PM
React Workshop,12/15/2024,John Doe,john@example.com,2:35:00 PM
Node.js Workshop,12/16/2024,-,-
```

**Response Headers:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="Report_Spring 2024 Workshops.csv"
```

**Error Responses:**
- `404` - Invalid group
- `401` - Not authorized
- `500` - Export error

**Notes:**
- Only the group owner can export attendance
- Events with no participants show "-" for name/email
- Returns a downloadable CSV file

---

## 🔧 Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created successfully |
| `400` | Bad request (validation error) |
| `401` | Unauthorized (missing/invalid token) |
| `404` | Resource not found |
| `500` | Internal server error |

---

## 🧪 Testing with cURL

### Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Create a group (with token):
```bash
curl -X POST http://localhost:3000/api/groups \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"Test Group"}'
```

### Join an event:
```bash
curl -X POST http://localhost:3000/api/attendances/join \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"accessCode":"A3K9L2"}'
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Access codes are 6-character alphanumeric strings (uppercase)
- JWT tokens expire after 1 day
- Passwords are hashed using bcrypt with salt rounds of 10
- All protected routes require a valid JWT token in the Authorization header

---

## 🚀 Getting Started

1. Start the backend server: `npm run dev`
2. Server runs on `http://localhost:3000`
3. Use Postman, Insomnia, or cURL to test the endpoints
4. Remember to include the JWT token for protected routes!

---

**Project created for Web Technologies - 2024/2025**
