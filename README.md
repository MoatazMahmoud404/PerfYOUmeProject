# Flask Application README

---

## Development Team  

We are a team of students studying at Ahram Canadian University in the College of Computer Science & AI.  

**PerfYoume** is an innovative AI-powered personalized perfume selection platform designed to revolutionize how users discover and choose fragrances. By utilizing cutting-edge AI technologies and ChatGPT API, PerfYoume tailors recommendations to individual preferences, personality traits, and lifestyle choices. The project aims to provide an engaging and interactive experience where users can answer prompts or quizzes, allowing the AI to suggest the perfect fragrance match.  

Here's an overview of our team:  

| Name                       | Student ID | Group |
| -------------------------- | ---------- | ----- |
| Moataz Mahmoud Mohamed     | 42210055   | C1    |
| Mahmoud Naif               | 42210052   | C1    |
| Khaled Ashraf              | 42210103   | C1    |
| Abdelrahman Ahmed          | 42210259   | C1    |
| Adel Adel Ahmed            | 42210211   | C1    |
| Mohammed Abdulfattah Fathy | 42210180   | C1    |
| Ahmed Haytham              | 42210126   | C1    |
| Ahmed Farhat               | 42210249   | C1    |

**Lecturer:**  
- **Dr. Sherif ElSahfei**  

**TA:**  
- **Eng. Ahmed Karem**  
- **Eng. Ahmed Hamdy**  
- **Eng. Mayar Atef**  

---  

## Overview
This is a Flask-based web application that provides functionality for user authentication, account management, and questionnaire management. The application uses SQLAlchemy for database interactions, Flask-Bcrypt for password hashing, and Flask-JWT-Extended for JSON Web Token (JWT) authentication.

## Features

- **User Authentication:**
  - User signup with email and password validation.
  - User login with JWT token generation.

- **Account Management:**
  - Password reset with validation.
  - Username update with constraints.

- **Questionnaire Management:**
  - Add new questionnaires (Admin-only).
  - Add questions to existing questionnaires (Admin-only).

- **Database Connection Testing:**
  - Test the database connection with a simple query.

## Technologies Used

- **Backend Framework:** Flask
- **Database ORM:** SQLAlchemy
- **Authentication:** Flask-JWT-Extended
- **Password Hashing:** Flask-Bcrypt
- **CORS Handling:** Flask-CORS
- **Database:** Configurable via environment variables

## **Endpoints**

### **1. Database Connection Test**

**Endpoint:** `/database/test`  
**Method:** `GET`  
**Description:** Tests the connection to the database.  
**Response:**
- **200 OK:** Database connection successful.
- **500 Internal Server Error:** Database connection failed.

---

### **2. User Signup**

**Endpoint:** `/signup`  
**Method:** `POST`  
**Description:** Creates a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

**Response:**
- **201 Created:** Account created successfully.
- **400 Bad Request:** Invalid inputs or user already exists.

---

### **3. User Login**

**Endpoint:** `/login`  
**Method:** `POST`  
**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- **201 Created:** Login successful with access token.
- **401 Unauthorized:** Invalid email or password.
- **500 Internal Server Error:** An error occurred during login.

---

### **4. Reset Password**

**Endpoint:** `/Account/reset-password`  
**Method:** `PUT`  
**Description:** Allows a logged-in user to reset their password.

**Request Headers:**
- `Authorization: Bearer <JWT>`

**Request Body:**
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

**Response:**
- **200 OK:** Password updated successfully.
- **400 Bad Request:** Invalid password format or same as the old password.
- **401 Unauthorized:** Invalid credentials.

---

### **5. Change Username**

**Endpoint:** `/account/username`  
**Method:** `PUT`  
**Description:** Allows a logged-in user to change their username.

**Request Headers:**
- `Authorization: Bearer <JWT>`

**Request Body:**
```json
{
  "newUsername": "string"
}
```

**Response:**
- **200 OK:** Username changed successfully.
- **400 Bad Request:** Username already exists or invalid input.
- **404 Not Found:** User not found.

---

### **6. Add Questionnaire**

**Endpoint:** `/questionaire`  
**Method:** `POST`  
**Description:** Allows an admin to add a new questionnaire.

**Request Headers:**
- `Authorization: Bearer <JWT>`

**Request Body:**
```json
{
  "title": "string",
  "description": "string (optional)"
}
```

**Response:**
- **201 Created:** Questionnaire added successfully.
- **400 Bad Request:** Missing or invalid inputs.
- **500 Internal Server Error:** An error occurred.

---

### **7. Add Questions to a Questionnaire**

**Endpoint:** `/questionaire/<int:questionnaire_Id>/questions`  
**Method:** `POST`  
**Description:** Allows an admin to add questions to an existing questionnaire.

**Request Headers:**
- `Authorization: Bearer <JWT>`

**Request Body:**
```json
{
  "questions": [
    {
      "questionText": "string",
      "questionType": "string",
      "isRequired": "boolean (default: true)"
    }
  ]
}
```

**Response:**
- **201 Created:** Questions added successfully.
- **400 Bad Request:** Missing or invalid inputs.
- **404 Not Found:** Questionnaire not found.
- **500 Internal Server Error:** An error occurred.

### **8. `/perfume` Endpoint (GET)**:
   - **Purpose**: Retrieves a paginated list of perfumes.
   - **Parameters**:
     - `take`: Specifies the number of items to fetch (default: 10).
     - `skip`: Specifies the number of items to skip (default: 0).
   - **Responses**:
     - **200 OK**: Returns a JSON array of perfumes.
     - **400 Bad Request**: Returned if `take` is less than or equal to 0 or `skip` is negative.
     - **404 Not Found**: Returned if no perfumes are found.
     - **500 Internal Server Error**: Returned if an exception occurs.

### **9. `/perfume/<int:perfume_Id>` Endpoint (GET)**:
   - **Purpose**: Retrieves details of a specific perfume by its ID.
   - **Parameters**:
     - `perfume_Id`: The ID of the perfume to fetch.
   - **Responses**:
     - **200 OK**: Returns the details of the requested perfume.
     - **404 Not Found**: Returned if the perfume with the specified ID is not found.
     - **500 Internal Server Error**: Returned if an exception occurs.

---

## **Authentication**

Most endpoints require a valid JWT token. Include the token in the `Authorization` header as follows:
```
Authorization: Bearer <JWT>
```

---

## **Error Codes**
- **400 Bad Request:** Invalid input or request.
- **401 Unauthorized:** Authentication failure or missing token.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** An unexpected error occurred.

## Security

- Passwords are hashed using bcrypt.
- JWT is used for secure token-based authentication.
- Role-based access control (RBAC) is implemented for certain endpoints.
