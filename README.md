#Film Hall Ticket Booking Backend 🎬

This is the backend for the Film Hall Ticket Booking System, built using Node.js, Express, Prisma, and MySQL. It provides a RESTful API to manage tickets, movies, schedules, seats, and user roles with authentication and authorization.

Front-End URL
https://github.com/ssulochanaherath/Ticket_Booking_Frontend.git

Key Features
✅ CRUD operations for tickets, movies, schedules, and seats

✅ User authentication & role-based access control (Customer, Admin)

✅ MySQL database integration with Prisma ORM

✅ Secure environment configuration using .env

✅ RESTful API endpoints with Express

Tech Stack
Backend: Node.js, Express.js
Database: MySQL (Prisma ORM)
Authentication: JWT (JSON Web Token)
Environment Management: dotenv

Setup & Run
1️⃣ Clone the repository:

`git clone https://github.com/ssulochanaherath/Ticket_Booking_Backend.git
cd film-hall-ticket-backend `

2️⃣ Install dependencies:

npm install

3️⃣ Set up environment variables in .env file:

DATABASE_URL="mysql://username:password@localhost:3306/film_hall_db" PORT=5000 
JWT_SECRET=your_secret_key

4️⃣ Start the server:

npm run dev
