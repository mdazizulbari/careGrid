import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CampDetails from "../pages/CampDetails/CampDetails";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Statistics from "../components/Dashboard/Common/Statistics";
import OrganizerRoute from "./OrganizerRoute";
import AddCamp from "../components/Dashboard/Organizer/AddCamp";
import ManageCamps from "../components/Dashboard/Organizer/ManageCamps";
import Profile from "../components/Dashboard/Common/Profile";
import ManageRegisteredCamps from "../components/Dashboard/Organizer/ManageRegisteredCamps";
import RegisteredCamps from "../components/Dashboard/Participant/RegisteredCamps";
import PaymentHistory from "../components/Dashboard/Participant/PaymentHistory";
import HealthTipsPage from "../pages/HealthTips/HealthTipsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/camp-details/:id",
        element: <CampDetails />,
      },
      {
        path: "/health-tips",
        element: <HealthTipsPage />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-camp",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <AddCamp />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageCamps />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-registered-camps",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageRegisteredCamps />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "registered-camps",
        element: (
          <PrivateRoute>
            <RegisteredCamps />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
