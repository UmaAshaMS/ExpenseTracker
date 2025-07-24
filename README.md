
This project is a full-stack Expense Tracker application built using the MVC (Model-View-Controller) architecture. It includes role-based access for users and admins, with clearly separated functionalities.
Features
 User Functionality
Sign up and log in using credentials
Role assigned as user
Add, view, and track their own expenses

 Admin Functionality
Role assigned as admin
Secure admin login
Access to the Admin Dashboard
View a list of all users
View all expenses across all users
Filter expenses by status

Change the status of any expense (Pending → Approved/Rejected)
Tech Stack
Backend
Node.js
Express.js
MongoDB with Mongoose
Authentication using cookies
Role-based access control middleware

Frontend
React.js
Axios for API calls
React Router for navigation
Tailwind CSS (or any preferred UI framework)

Architecture
MVC Structure
Models: Define schemas for User and Expense
Controllers: Handle business logic for users, expenses, and admin
Routes: Organized routes for /user and /admin
Middleware: Auth and role-based access control
Authentication
Login sets a cookie with the session
Middleware checks the role before allowing access to admin routes
