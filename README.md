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
    "@headlessui/react": "^2.2.6",
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.5.0",
    "@tailwindcss/vite": "^4.1.11",
    "@tanstack/react-query": "^5.83.0",
    "@tanstack/react-query-devtools": "^5.83.0",
    "axios": "^1.10.0",
    "daisyui": "^5.0.46",
    "firebase": "^12.0.0",
    "motion": "^12.23.12",
    "react": "^19.1.0",
    "react-calendar": "^6.0.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.61.0",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0",
    "react-responsive-carousel": "^3.2.23",
    "react-router": "^7.7.0",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5",
    "recharts": "^3.1.2",
    "tailwindcss": "^4.1.11"
  },
  "devDependencies": {
    "@eslint/js": "^9.30.1",
    "@tanstack/eslint-plugin-query": "^5.81.2",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.6.0",
    "eslint": "^9.30.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "prettier": "^3.6.2",
    "prettier-plugin-tailwindcss": "^0.6.14",
    "vite": "^7.0.4"
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
     npm install
     ```
   - For server:
     ```bash
     cd server
     npm install
     ```
4. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory.
   - Add: `MONGO_URI=your_mongo_uri`, `JWT_SECRET=your_jwt_secret`
   - Create a `.env` file in the `client` directory.
   - Add: `VITE_API_URL=your_backend_url`
5. **Run the Backend**:
   ```bash
   cd server
   npm start
   ```
6. **Run the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
7. Open `http://localhost:5173` in your browser.

## 🔗 Resources
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
