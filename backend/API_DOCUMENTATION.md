# URL Shortener Backend API Documentation

## Overview
This API allows users to shorten URLs, manage their own shortened URLs, and use API keys for third-party integrations. It supports user registration, login (JWT-based), and API key management (max 5 per user).

---

## Authentication
- **Register** and **login** to get a JWT token.
- Use the JWT token (as `Bearer <token>`) for protected endpoints.
- Generate API keys to use the API as a third-party (send in `x-api-key` header).

---

## Endpoints

### 1. Register
- **POST** `/api/auth/register`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Response:**
- `201 Created`:
```json
{ "message": "User registered" }
```
- `400 Bad Request` or `409 Conflict` for errors.

---

### 2. Login
- **POST** `/api/auth/login`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Response:**
- `200 OK`:
```json
{ "token": "<JWT_TOKEN>" }
```
- `401 Unauthorized` for invalid credentials.

---

### 3. List API Keys
- **GET** `/api/auth/api-keys`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
```json
{
  "apiKeys": [
    { "keyId": "...", "createdAt": "2024-05-01T12:00:00Z", "lastUsed": "2024-05-02T10:00:00Z" }
  ]
}
```

---

### 4. Generate API Key
- **POST** `/api/auth/api-keys`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
- `201 Created`:
```json
{ "apiKey": "<NEW_API_KEY>" }
```
- `400 Bad Request` if user already has 5 keys.

---

### 5. Revoke API Key
- **DELETE** `/api/auth/api-keys/{keyId}`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
```json
{ "message": "API key revoked" }
```

---

### 6. Shorten a URL
- **POST** `/api/shorten`
- **Headers:**
  - Either `Authorization: Bearer <JWT_TOKEN>` **or** `x-api-key: <API_KEY>`
- **Request Body:**
```json
{
  "originalUrl": "https://example.com"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "originalUrl": "https://example.com",
    "shortUrl": "http://localhost:5000/abc123",
    "urlCode": "abc123",
    "qrCode": "data:image/png;base64,...",
    "clicks": 0,
    "createdAt": "2024-05-01T12:00:00Z",
    "lastAccessed": "2024-05-01T12:00:00Z"
  },
  "message": "URL shortened successfully"
}
```
- **Errors:**
  - `400 Bad Request` for invalid URL
  - `401 Unauthorized` for missing/invalid auth

---

### 7. List User's Shortened URLs (History)
- **GET** `/api/history`
- **Headers:**
  - Either `Authorization: Bearer <JWT_TOKEN>` **or** `x-api-key: <API_KEY>`
- **Description:** Returns only the URLs created by the authenticated user.
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "originalUrl": "https://example.com",
      "shortUrl": "http://localhost:5000/abc123",
      "createdAt": "2024-05-01T12:00:00Z",
      "clicks": 5,
      "qrCode": "data:image/png;base64,..."
    }
  ]
}
```

---

### 8. Redirect to Original URL
- **GET** `/api/{code}`
- **Description:** Redirects to the original URL and increments click count.
- **Response:**
  - `302 Found` (redirect)
  - `404 Not Found` if code is invalid

---

### 9. Get URL Statistics
- **GET** `/api/stats/{code}`
- **Headers:**
  - Either `Authorization: Bearer <JWT_TOKEN>` **or** `x-api-key: <API_KEY>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "originalUrl": "https://example.com",
    "shortUrl": "http://localhost:5000/abc123",
    "urlCode": "abc123",
    "qrCode": "data:image/png;base64,...",
    "clicks": 5,
    "createdAt": "2024-05-01T12:00:00Z",
    "lastAccessed": "2024-05-02T10:00:00Z"
  }
}
```

---

### 10. Get Current User Profile
- **GET** `/api/auth/me`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "user@example.com"
}
```

---

### 11. Update User Profile
- **PUT** `/api/auth/me`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```json
{
  "name": "New Name",
  "email": "newemail@example.com"
}
```
- **Response:**
```json
{
  "message": "Profile updated",
  "user": {
    "_id": "...",
    "name": "New Name",
    "email": "newemail@example.com"
  }
}
```

---

### 12. Change Password
- **PUT** `/api/auth/me/password`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
```json
{
  "oldPassword": "currentpassword",
  "newPassword": "newpassword"
}
```
- **Response:**
```json
{
  "message": "Password updated" 
}
```

---

### 13. Get Site Metrics
- **GET** `/api/metrics`
- **Description:** Returns the total number of users, total number of shortened URLs, and total number of clicks across all URLs.
- **Response:**
```json
{
  "totalUsers": 123,
  "totalUrls": 456,
  "totalClicks": 7890
}
```

---

## Authentication Methods
- **JWT:**
  - Register/login to get a JWT token.
  - Send as `Authorization: Bearer <token>` header.
- **API Key:**
  - Generate via `/api/auth/api-keys`.
  - Send as `x-api-key: <API_KEY>` header.
  - Each user can have up to 5 active API keys.

---

## Error Responses
- All error responses are JSON with an `error` or `message` field.
- Example:
```json
{ "error": "Invalid credentials" }
```

---

## Notes
- All endpoints (except registration, login, and redirect) require authentication (JWT or API key).
- API keys are sensitive: keep them secret!
- Rate limiting: 100 requests per 15 minutes per IP. 