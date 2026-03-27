# 🌍 Travel Ease 🚗💨

**Travel Ease** is a high-performance, full-stack vehicle booking ecosystem designed for seamless travel management. Featuring a sophisticated multi-role dashboard, real-time analytics, and secure payment processing, it provides a premium experience for both vehicle owners and travelers.

## 🔗 Quick Links
- 🌐 **Live Platform:** [Travel Ease Live](https://travel-ease-drab.vercel.app)
- 🖥️ **Server API:** [Vercel API](https://travel-ease-server-iota.vercel.app)

---

## 📸 Project Showcases (Dark & Light Experience)

<h3> 1. Home Page & Hero Experience (Visualized) </h3>

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <p><b>☀️ Light Mode</b></p>
        <a href="https://i.ibb.co.com/d01DPJpX/screencapture-travel-ease-drab-vercel-app-2026-03-27-09-27-55.png">
          <img src="https://i.ibb.co.com/d01DPJpX/screencapture-travel-ease-drab-vercel-app-2026-03-27-09-27-55.png" 
               alt="Home Light" 
               height="450" />
        </a>
      </td>
      <td align="center" width="50%">
        <p><b>🌙 Dark Mode</b></p>
        <a href="https://i.ibb.co.com/N67NKGKC/screencapture-travel-ease-drab-vercel-app-2026-03-27-09-35-39.png">
          <img src="https://i.ibb.co.com/N67NKGKC/screencapture-travel-ease-drab-vercel-app-2026-03-27-09-35-39.png" 
               alt="Home Dark" 
               height="450" />
        </a>
      </td>
    </tr>
  </table>
  <p><i>(Tip: Click on the images to see the full long-page view)</i></p>
</div>
  <br />

  <h3>2. User Dashboard (Customer)</h3>
  <table width="100%">
    <tr>
      <td width="50%">
        <img src="https://i.ibb.co.com/Wv63Zd2L/screencapture-travel-ease-drab-vercel-app-dashboard-overview-2026-03-27-09-38-00.png" alt="User Light" />
      </td>
      <td width="50%">
        <img src="https://i.ibb.co.com/KjJczTdC/screencapture-travel-ease-drab-vercel-app-dashboard-overview-2026-03-27-09-36-56.png" alt="User Dark" />
      </td>
    </tr>
  </table>

  <br />

  <h3>3. Host Dashboard (Owner)</h3>
  <table width="100%">
    <tr>
      <td width="50%">
        <img src="https://i.ibb.co.com/qYrTnmh2/screencapture-travel-ease-drab-vercel-app-dashboard-overview-2026-03-27-09-39-07-1.png" alt="Host Light" />
      </td>
      <td width="50%">
        <img src="https://i.ibb.co.com/6Rhj1Q86/screencapture-travel-ease-drab-vercel-app-dashboard-overview-2026-03-27-09-40-05.png" alt="Host Dark" />
      </td>
    </tr>
  </table>

  <br />

  <h3>4. Admin Dashboard (Orchestrator)</h3>
  <table width="100%">
    <tr>
      <td width="50%">
        <img src="https://i.ibb.co.com/VYhgQL4Z/screencapture-travel-ease-drab-vercel-app-dashboard-overview-2026-03-27-09-43-50.png" alt="Admin Light" />
      </td>
      <td width="50%">
        <img src="https://i.ibb.co.com/prKCGBP6/screencapture-travel-ease-drab-vercel-app-dashboard-overview-2026-03-27-09-42-19.png" alt="Admin Dark" />
      </td>
    </tr>
  </table>
  
  <p><i>Premium glassmorphism and theme toggles are implemented across all dashboard layers.</i></p>
</div>

---

## 🚀 Specialized Role-Based Features

### 🛠 Admin (The Orchestrator)
- **User Management:** Full control over user roles (Admin, Host, User) and status updates.
- **Listing Verification:** Approve or reject vehicle listings to maintain platform quality.
- **Revenue Analytics:** Monitor platform growth and financial health with **Recharts** visualizations.
- **Content Management:** Oversee community feedback through web reviews and manage promotion requests.

### 🏠 Host (The Provider)
- **Smart Listing:** Sophisticated form to add and manage vehicles with multi-image support.
- **Booking Management:** Real-time request handling (Accept/Reject) with instant notifications.
- **Host Analytics:** Track personal earnings, booking trends, and vehicle popularity.
- **Promotions:** Request featured spots to increase listing visibility and conversion.

### 👤 User (The Traveler)
- **Advanced Discovery:** High-speed filter and sort functionality through a wide range of verified vehicles.
- **Secure Checkout:** Fully integrated **Stripe** payment gateway for 100% safe transactions.
- **Personalized Space:** Dedicated dashboard to manage wishlist, booking history, and review shared experiences.

---

## 🛠 Tech Stack & Core Dependencies

### Frontend Excellence
- **React 19 & Vite:** Next-gen performance and lightning-fast development cycle.
- **Tailwind CSS 4 & DaisyUI:** Cutting-edge styling including glassmorphism and multi-theme support.
- **Framer Motion:** Cinematic animations and fluid UI transitions.
- **TanStack Query v5:** Professional state management and high-efficiency data caching.

### Backend Robustness
- **Node.js & Express:** Scalable and optimized API architecture.
- **MongoDB:** Flexible document-based database for complex booking relationships.
- **Firebase Admin SDK:** Secure server-side identity and role-based access control (RBAC).
- **Stripe API:** Industry-standard secure payment processing.

---
  

**Dependencies (npm):**
```json
{
  "dependencies": {
    "@stripe/react-stripe-js": "^5.6.1",
    "@stripe/stripe-js": "^8.11.0",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.94.5",
    "axios": "^1.13.2",
    "date-fns": "^4.1.0",
    "firebase": "^12.5.0",
    "framer-motion": "^12.23.24",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.5",
    "react-toastify": "^11.0.5",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.3",
    "swiper": "^12.0.3",
    "tailwindcss": "^4.1.17"
  }
}
````

### 💻 Local Setup:

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



