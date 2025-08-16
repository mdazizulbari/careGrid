import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { FaBarsStaggered } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router";
import logo from "/logo.png";
import OrganizerMenu from "./Menu/OrganizerMenu";
import ParticipantMenu from "./Menu/ParticipantMenu";
import MenuItem from "./Menu/MenuItem";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  // Responsive Sidebar Handler
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-base-200 flex justify-between rounded-br-3xl rounded-bl-3xl md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="40"
              />
            </Link>
          </div>
        </div>

        <button onClick={handleToggle} className="mobile-menu-button p-4">
          <FaBarsStaggered className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-base-200 absolute inset-y-0 left-0 z-10 flex w-64 transform flex-col justify-between space-y-6 overflow-x-hidden rounded-r-2xl px-2 py-4 md:fixed ${
          isActive && "-translate-x-full"
        } transition duration-200 ease-in-out md:translate-x-0`}
      >
        <div>
          <Link
            className="bg-base-300 hover:bg-base-100 mx-auto flex w-full flex-col items-center justify-center rounded-2xl px-4 py-2 shadow-lg"
            to="/"
          >
            <img
              // className='hidden md:block'
              src={logo}
              alt="logo"
              width="100"
            />
            <span className="font-gummy text-primary text-3xl">CareGrid</span>
          </Link>

          {/* Nav Items /dashboard/profile*/}
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav>
              {/*  Menu Items */}
              <MenuItem
                icon={IoHomeOutline}
                label="Home"
                address="/"
              />
              {role === "participant" && <ParticipantMenu />}
              {role === "organizer" && <OrganizerMenu />}
            </nav>
          </div>
        </div>

        <div>
          <div className="divider"></div>

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />

          <button
            className="btn btn-ghost btn-primary w-full justify-start text-left"
            onClick={logOut}
          >
            {/* <button
            onClick={logOut}
            className="mt-5 flex w-full transform items-center px-4 py-2 transition-colors duration-300 hover:bg-primary hover:text-gray-700"
          > */}
            <GrLogout className="h-5 w-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
