# 👨‍💻 User Management App

A simple full-stack User Management Application built with:

- ✅ **ASP.NET Core Minimal API (.NET 8)**
- ✅ **Angular 17** (Standalone Components)
- ✅ **JSONPlaceholder** API simulation
- ✅ **Client-side validation**

---

## 📁 Project Structure

```
UserManagementApp/
├── UserManagementApi/       # .NET backend (Minimal API)
└── user-management-ui/      # Angular 17 frontend
```

---

## 🚀 How to Run the App

### 🔧 Backend - ASP.NET Core Minimal API

1. Navigate to the API project folder:
   ```bash
   cd UserManagementApi
   ```

2. Run the API:
   ```bash
   dotnet run
   ```
---

### 🌐 Frontend - Angular 17

1. Navigate to the Angular frontend folder:
   ```bash
   cd user-management-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open the app in your browser:
   ```
   http://localhost:4200
   ```

---

## ✅ Features

- 🔍 View all users (initial data fetched from JSONPlaceholder)
- ➕ Add new users
- ✏️ Edit existing users
- ❌ Delete users
- 🛡 Client-side validation (name and email)
- 💾 In-memory persistence (resets on backend restart)

---

## 📌 Notes

- Remote users from JSONPlaceholder are fetched **once on first request**, and then **cached in memory**
- All Add/Edit/Delete actions are performed on the local in-memory list
- No database is used — this project simulates real-world logic using memory only

---


