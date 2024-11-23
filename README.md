# ERP System with JWT Authentication and Employee Management

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

## Installation

### Prerequisites

- **Java 17**: Ensure that Java 17 is installed on your machine.
- **PostgreSQL**: Ensure PostgreSQL is set up and running.
- **Maven**: Install Maven to manage dependencies.

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/your-repository/erp-employee-management.git
cd erp-employee-management
