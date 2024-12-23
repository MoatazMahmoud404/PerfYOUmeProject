# Flask Application README

---

## Development Team  

We are a team of students studying at Ahram Canadian University in the College of Computer Science & AI.  

**PerfYoume** is an innovative AI-powered personalized perfume selection platform designed to revolutionize how users discover and choose fragrances. By utilizing cutting-edge AI technologies and ChatGPT API, PerfYoume tailors recommendations to individual preferences, personality traits, and lifestyle choices. The project aims to provide an engaging and interactive experience where users can answer prompts or quizzes, allowing the AI to suggest the perfect fragrance match.  

Here's an overview of our team:  

| Name                       | Student ID | Group | What the student done                                    |
| -------------------------- | ---------- | ----- | -------------------------------------------------------- |
| Moataz Mahmoud Mohamed     | 42210055   | C1    | View perfumes                                            |
| Mahmoud Naif               | 42210052   | C1    | View questions                                           |
| Khaled Ashraf              | 42210103   | C1    | Admin panel                                              |
| Abdelrahman Ahmed          | 42210259   | C1    | Log in and signup                                        |
| Adel Adel Ahmed            | 42210211   | C1    | Home page and view recommendations                       |
| Mohammed Abdulfattah Fathy | 42210180   | C1    | Edit username and password                               |
| Ahmed Haytham              | 42210126   | C1    | View one perfume                                         |
| Ahmed Farhat               | 42210249   | C1    | Add questions to questionnaire                           |
| AhmedF                     | 42210249   | C1    | View questionnaires, edit username and password         |
| Abdo                       | 42210126   | C1    | View questionnaires, home page and view recommendations  |

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


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MoatazMahmoud404/PerfYOUmeProject.git
cd PerfYoume
```

### 2. Install Dependencies

Ensure you have `pip` installed, then install the required Python dependencies:

```bash
pip install -r req.txt
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and configure your environment variables for the Flask app. Example:

```env
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

### 4. Database Setup

Ensure you have a database set up and accessible via the `DATABASE_URL` environment variable. Run the following command to initialize the database:

```bash
flask db upgrade
```

### 5. Running the Application

Start the Flask development server:

```bash
flask run
```

By default, the app will be available at `http://127.0.0.1:5000/`.

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

## **Comparison of `role_requiredV1` and `role_requiredV2`**

1. **`role_requiredV1`**:
   - **Approach**: 
     - Retrieves the current user's identity from the JWT (`get_jwt_identity`).
     - Queries the database (`Accounts` table) to fetch the user's role based on their `account_Id`.
     - Compares the role from the database with the required role.
   - **Use Case**: 
     - Useful when the role in the JWT might not always be trusted or up-to-date, and you want to verify the user's role directly from the database.
   - **Drawback**: 
     - Requires a database query for every request, which can introduce latency and increase server load.

2. **`role_requiredV2`**:
   - **Approach**: 
     - Retrieves the current user's role directly from the JWT (`get_jwt_identity`).
     - Compares the role from the JWT with the required role.
   - **Use Case**: 
     - Suitable when the JWT is trusted and contains accurate role information.
     - Eliminates the need for a database query, making it more efficient.
   - **Drawback**: 
     - Relies entirely on the JWT payload. If the JWT is compromised or tampered with, the role validation could be bypassed.

## OrmModels.py

- The OrmModels.py file defines the structure of the database using SQLAlchemy's ORM (Object-Relational Mapping) system. It represents different entities in the application as Python classes, each of which corresponds to a table in the database.

## **Error Codes**
- **400 Bad Request:** Invalid input or request.
- **401 Unauthorized:** Authentication failure or missing token.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** An unexpected error occurred.

## Security

- Passwords are hashed using bcrypt.
- JWT is used for secure token-based authentication.
- Role-based access control (RBAC) is implemented for certain endpoints.
