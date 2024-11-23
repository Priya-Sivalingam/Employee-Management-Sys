# Employee Management System with JWT Authentication 

This project implements a legacy internal application for managing employees within an ERP system. The application features a strong authentication mechanism using JWT, an employee management system, access control, and input validation. 

## Features

1. **Strong Authentication**
   - Authentication mechanism using JWT tokens to protect user sessions.
   - Tokens are valid for 24 hours and need to be refreshed after expiry.

2. **Employee Management**
   - **Authenticated Users** can:
     - Add new employees.
     - Retrieve a list of all employees.
     - Retrieve information for a single employee.
   - **Admin Users** can:
     - Update employee information.
     - Delete employee information.

3. **Access Control**
   - Only authenticated users can access the endpoints.
   - Admin-level users have additional permissions to update or delete employee records.

4. **Input Validation**
   - Data integrity and security ensured through validation on input fields.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Sequence Diagram](#sequence-diagram)
7. [Contributing](#contributing)

---
# Backend Spring Boot
## Installation

### Prerequisites

- **Java 17**: Ensure that Java 17 is installed on your machine.
- **PostgreSQL**: Ensure PostgreSQL is set up and running.
- **Maven**: Install Maven to manage dependencies.

### Steps

1. **Clone the repository:**
   
- git clone [https://github.com/Priya-Sivalingam/Employee-Management-Sys.git](https://github.com/Priya-Sivalingam/Employee-Management-Sys.git)
- cd Employee-Management-Sys

2. Update the src/main/resources/application.properties file with your database and JWT secret key configuration.
### Database Configuration
- spring.datasource.url=jdbc:postgresql://localhost:5432/erp_db
- spring.datasource.username=your_db_username
- spring.datasource.password=your_db_password
- spring.datasource.driver-class-name=org.postgresql.Driver
- spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

### JWT Configuration
- jwt.secret=your_jwt_secret_key
- jwt.expiration=86400000 # 24 hours in milliseconds

3. Build the project:
       - mvn clean install
4. Run the application:
      - mvn spring-boot:run
      - By default, the application will be running on http://localhost:8080.

# Frontend Setup (React)
### Prerequisites
   - Node.js: Ensure you have Node.js installed on your machine.
   - npm: This is the package manager used to manage dependencies for React.
### Steps
1. Clone the repository:
      - cd client
2. Install dependencies:
      - npm install

3. To run the application locally, use:
      - npm start

By default, the React app will be running on http://localhost:3000.


