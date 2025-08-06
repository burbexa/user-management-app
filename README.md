# 🧑‍💻 User Management App

A simple full-stack User Management Application built with:

- ✅ ASP.NET Core Minimal API (.NET 8)
- ✅ Angular 17 (Standalone Components)
- ✅ JSONPlaceholder API simulation
- ✅ Client-side validation

---

## 📂 Project Structure

UserManagementApp/
├── UserApi/ # .NET backend
└── user-management-ui/ # Angular frontend


---

## 🚀 How to Run the App

### 🔧 Backend (ASP.NET Minimal API)

1. Navigate to the API folder:
   bash
   cd UserManagementApi
	dotnet run
	
	
🌐 Frontend (Angular 17)
        Navigate to the frontend folder:
	cd user-management-ui
	npm install
	ng serve
	
	
	✅ Features
View all users (initial data fetched from JSONPlaceholder)

Add new users

Edit existing users

Delete users

Client-side validation for name and email

Fully in-memory persistence (resets on backend restart)

📌 Notes
Remote users from JSONPlaceholder are cached locally on first request and treated as local users afterward.

No database is used — data is stored in-memory.


