# Student Management System API

A simple API for managing students, tasks, and roles. It includes an admin panel and a student interface with authentication and task management features.

## Features

- **Admin Panel**:

  - Admin can log in.
  - Admin can add new students (name, email, department, password).
  - Admin can assign tasks to students with a due date.

- **Student Interface**:
  - Students can log in.
  - Students can view tasks assigned to them.
  - Students can change the status of tasks to completed.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rrahul32/student-management-system.git
   cd student-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Open the `.env` file and set your environment variables:

## Environment Variables

| Variable         | Description                           |
| ---------------- | ------------------------------------- |
| `PORT`           | Port for the server (default: `3000`) |
| `MONGO_URL`      | MongoDB Atlas connection URL          |
| `DATABASE_NAME`  | The name of the database              |
| `JWT_SECRET`     | JWT secret used for signing tokens    |
| `ADMIN_EMAIL`    | Admin's email for login               |
| `ADMIN_PASSWORD` | Admin's password for login            |

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. To test the API endpoints for adding students, assigning tasks, etc., use Postman. Refer to the [API Documentation](https://planetary-star-151582.postman.co/workspace/Team-Workspace~d7b1f5be-5629-44aa-8462-daeb3c5c0a4d/collection/41550613-4115e632-6b61-451d-8e10-fe2dc6bbe383?action=share&creator=41550613).
