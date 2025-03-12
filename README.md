Expense Tracker (MERN Stack) 

A full-stack Expense Tracker application built with the MERN stack (MongoDB, Express, React, Node.js) to help users manage their expenses efficiently.

Features

->User Authentication – Secure login & signup using JWT

->Expense Management – Add, edit, delete, and categorize expenses

->Pagination – View expenses in pages (10 per page)

->Charts & Analytics – Interactive Pie Chart & Bar Chart for insights

->File Upload – Attach bill receipts while adding expenses

->Profile Section – View and update user details

Tech Stack

Frontend:

React,
Bootstrap,
Chart.js / Recharts


Backend:

Node.js,
Express.js,
MongoDB,
JWT (Authentication),
bcrypt (Password hashing)


Setup Instructions

1️. Clone the Repository:

git clone https://github.com/SREYASIVAN3/expense-tracker.git

cd expense-tracker

2️. Install Dependencies:

Backend:

cd server,
npm install

install the wanted dependencies


Frontend:

cd client,
npm install

install the wanted dependencies


3️. Set Up Environment Variables

Create a .env file in the backend folder and add:

DB=mongodb+srv://your-mongo-uri

JWT_SECRET=your-secret-key

PORT=8000

4.Run the Application

Backend:

cd backend,
npm start


Frontend:

cd frontend,
npm start

This is the Signup Page
![Screenshot 2025-03-12 141249](https://github.com/user-attachments/assets/3647347f-7aeb-4509-8066-55cf8b982d5b)

Login page
![Screenshot 2025-03-12 141307](https://github.com/user-attachments/assets/4ba520c4-f19d-4e13-aac7-1001bdb7b23b)

After loggin in, it directs to dashboard
![Screenshot 2025-03-12 141353](https://github.com/user-attachments/assets/dced4eac-bcf9-4aa2-945c-e6869d0fba98)

If you click MyExpense, it directs to
![Screenshot 2025-03-12 141817](https://github.com/user-attachments/assets/6a5c1d8b-3fcd-401c-89c8-09dcecfe2043)

Add expense
![Screenshot 2025-03-12 141911](https://github.com/user-attachments/assets/b091ff6a-0455-44b2-97d2-d95e8f7e4ce9)







