import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="min-h pt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
