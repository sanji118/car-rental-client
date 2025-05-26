# 🚗 Car Rental Platform : DriveRental

A modern full-stack car rental web application where users can browse, view details, and book cars. Built with React, Tailwind CSS, Firebase Auth, Node.js, Express, and MongoDB, this platform provides seamless booking and personalized user experiences.

---

## 🌐 Live URL

[👉 View Live Client-Website](https://drive-rental-ca07b.web.app)


[👉 View Live Server-Website](https://car-rental-server-eta.vercel.app)
---

## 🎯 Project Purpose

The Car Rental platform was created to allow users to:

- Browse available rental cars
- View detailed specifications and pricing
- Book cars securely with user authentication
- Manage personal bookings
- Experience responsive and stylish UI

---

## 🚀 Key Features

- 🔐 **Authentication**: Login, Register, Google Sign-in (using Firebase Auth)
- 🚘 **Car Listing**: Browse all cars, view availability and rental prices
- 📄 **Car Details**: Detailed view with booking button and secure confirmation
- 🧾 **Booking System**: Book available cars and track your bookings
- 🧍 **Private Routes**: My Cars & My Bookings pages accessible only to authenticated users
- 💅 **Responsive UI**: Styled with Tailwind CSS and DaisyUI for a modern design
- 🎉 **Notifications**: Toast and modal alerts for actions like booking confirmation
- ⚙️ **Admin/API Features** (in backend): CRUD operations for cars, JWT auth for protected routes

---

## 📦 Technologies & NPM Packages Used

### 🔧 Frontend (React)

- `react`
- `react-router-dom`
- `axios`
- `firebase`
- `react-icons`
- `lucide-react`
- `react-hot-toast`
- `sweetalert2`
- `tailwindcss`
- `daisyui`
- `classnames`

### 🌐 Backend (Node.js + Express)

- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `cookie-parser`
- `mongodb`

---

## ✅ Environment Variables

Create `.env` files in both `client` and `server` directories for your API endpoints, Firebase keys, and JWT secrets.

---




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
