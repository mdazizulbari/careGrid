## CareGrid, Medical Camp Management System (MCMS)

**Empowering seamless coordination of medical camps with cutting-edge technology.**

Welcome to the _Medical Camp Management System (MCMS)_, a full-stack web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). MCMS simplifies the organization and participation in medical camps, offering intuitive dashboards for **Organizers** and **Participants**, responsive design, and secure data management.

---

## Organizer Credentials

- **Email**: jhankar@vai.com
- **Password**: Jhank123

---

## Project Links

- **Front-end Live Site**: [Care Grid Live](https://caregrid-a12.netlify.app/) 

---

## ✨ Core Features
- **Appointment Management**: Schedule and manage medical appointments effortlessly.
- **Secure Authentication**: Implements JWT for safe user access and data protection.
- **Real-Time Updates**: Fetches and displays health data dynamically via APIs.
- **Responsive Design**: Optimized for seamless use across desktop and mobile devices.

---

## All Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop using Tailwind CSS and Material Tailwind components.
- **Dynamic Homepage**:
  - Slider showcasing success stories and impactful moments from past medical camps.
  - Displays up to six popular camps (highest participant count) with details like Camp Name, Image, Fees, Date, Location, Healthcare Professional, and Participant Count.
  - "Feedback and Ratings" section highlights participant experiences from the dashboard.
  - Custom _Community Impact_ section with analytics on camp outreach and benefits.
  - "See All Camps" button links to the Available Camps page.
- **Available Camps Page**:
  - Lists all camps with search (by keywords, dates) and sort options (Most Registered, Camp Fees, Alphabetical Order).
  - Toggles between two- and three-column layouts.
  - Each camp links to a details page with a "Join Camp" modal for registration.
- **Organizer Dashboard (Private)**:
  - **Profile Management**: Update name, image, and contact details.
  - **Add A Camp**: Form with React Hook Form validation to create camps.
  - **Manage Camps**: Table with edit (`/update-camp/:campId`) and delete (`/delete-camp/:campId`) options.
  - **Manage Registered Camps**: Tracks participant registrations with payment status, confirmation status, and cancellation (disabled if paid and confirmed).
- **Participant Dashboard (Private)**:
  - **Analytics**: Recharts-based visualization of lifetime registered camps (e.g., camp names, fees).
  - **Profile Management**: Edit personal details.
  - **Registered Camps**: Table with camp details, payment status, feedback button (post-payment), and cancellation (active pre-payment).
  - **Payment History**: Displays transaction details (Camp Name, Fees, Payment Status, Confirmation Status) via Stripe.
- **Authentication**:
  - Login and registration with React Hook Form and Google social login.
  - JWT-based security for private routes, stored in Local Storage.
- **Data Fetching**: TanStack Query for efficient GET requests.
- **Notifications**: SweetAlert2 for all CRUD operations and authentication feedback.
- **Pagination & Search**: Tables display 10 rows with search by Camp Name, Date, and Healthcare Professional.
- **Animations**: Framer Motion for transitions and AOS for scroll effects.
- **404 Page**: Custom error page for invalid routes.
- **Footer**: Includes links, contact info, and quick navigation.
- **Extra Feature**: _Health Records Management_—Participants can store and manage camp-related medical records securely.

---

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Material Tailwind, Framer Motion, AOS, TanStack Query, React Hook Form, SweetAlert2, React-Awesome-Button, React-Select
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Payment**: Stripe
- **Deployment**: Netlify (client), Vercel/Heroku (server) 

## 📦 Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0",
    "jsonwebtoken": "^9.0.0",
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.9"
  }
}
```

## 🚀 How to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mdazizulbari/careGrid.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd careGrid
   ```
3. **Install Dependencies**:
   - For client:
     ```bash
     cd client