# 🌍 Travel Ease

**Travel Ease** is a modern **React + Vite** web application for vehicle booking and travel management, with Firebase authentication for secure login and registration.

## 🔗 Live Demo
[Visit Live Site](https://monumental-licorice-6fb8c3.netlify.app)

---

## 📖 Project Overview
Travel Ease allows users to:  
- Browse different types of vehicles for rent or travel.  
- Book vehicles and manage their bookings.  
- Add and manage their own vehicle listings (authenticated users).  
- Enjoy smooth dark/light mode toggling and responsive UI.  

The application uses a **single layout** for all pages (Navbar + Footer). Protected routes like `My Bookings` and `Add Vehicle` require authentication.

---

## 🏠 Pages Overview

### 1. Homepage
- Hero banner with CTA buttons.  
- Dynamic section showing latest 6 vehicles (sorted by creation date).  
- Optional sections: Top Categories, Featured Owner, About Travel Ease.  
- Fully responsive for all screen sizes.

### 2. All Vehicles Page
- Displays all vehicles in a grid/table.  
- Includes filter/sort functionalities.  
- Each vehicle has a "View Details" button.

### 3. Vehicle Details Page (Private)
- Complete info for selected vehicle.  
- "Book Now" button stores booking in the database.

### 4. Add Vehicle Page (Private)
- Form fields: Vehicle Name, Owner Name, Category, Price, Location, Availability, Description, Cover Image, User Email.  
- Adds new vehicle to MongoDB and shows toast notifications.

### 5. My Vehicles Page (Private)
- Displays vehicles added by logged-in user.  
- Options to View, Update, or Delete each vehicle.

### 6. My Bookings Page (Private)
- Displays all bookings placed by logged-in user.

### 7. Update Vehicle Page (Private)
- Prefilled form to edit vehicle info.  
- Shows toast notifications on success/failure.

### 8. Authentication Pages
- **Login:** Email/Password, Google Login, link to Register.  
- **Register:** Name, Email, Photo URL, Password validation.

### 9. Others
- Loading spinners for API requests.  
- Custom 404 Page.  
- Axios for API calls.  
- Private routes protected (`/addVehicle`, `/myVehicles`, `/myBookings`, `/updateVehicle/:id`).  

---

## ⚡ Features
- User-friendly booking system.  
- Dark & Light theme toggle (Tailwind + DaisyUI).  
- Authentication via Firebase (Email/Password + Google).  
- Fully responsive design.  
- Interactive UI components with Tailwind CSS & Framer Motion.  
- Advanced filter and sorting on All Vehicles page.  
- Optional: Top Rated Vehicles section on homepage.  

---

## 🛠️ Technologies & Packages
- **Frontend:** React, Vite, TailwindCSS, DaisyUI, Framer Motion, React Router Dom, Axios, React Toastify, SweetAlert2  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** Firebase  
- **Hosting:** Netlify (Client), Vercel (Server)  

**Dependencies (npm):**
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "axios": "^1.13.2",
    "date-fns": "^4.1.0",
    "firebase": "^12.5.0",
    "framer-motion": "^12.23.24",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.5",
    "react-toastify": "^11.0.5",
    "sweetalert2": "^11.26.3",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "daisyui": "^5.4.7",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }
}
````

### 💻 Local Setup

1. **Clone the repository**  
 ```base
   git clone https://github.com/siam-khan-alt/travel-ease-client.git
   cd travel-ease
   npm install
   npm run dev
````


 2. **Setup Environment Variables**

#### Create a `.env` file in the root and add your Firebase config
```base
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID



