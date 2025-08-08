import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import Container from "../Container";
import logo from "/logo.png";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { Link } from "react-router";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-base-200 fixed z-10 w-full rounded-br-4xl rounded-bl-4xl shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link
              className="btn bg-base-300 flex items-center gap-1 rounded-full"
              to="/"
            >
              <img src={logo} alt="logo" className="h-8 w-8" />
              <span className="font-gummy text-primary text-3xl">CareGrid</span>
            </Link>
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="aquaDark"
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}

                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="btn bg-base-100 flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-none p-4 transition hover:shadow-md md:px-2 md:py-1"
                >
                  <AiOutlineMenu color="primary" />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="bg-base-200 absolute top-12 right-0 w-[40vw] overflow-hidden rounded-xl text-sm shadow-md md:w-[20vw]">
                  <div className="flex cursor-pointer flex-col text-center">
                    {user && (
                      <span className="cursor-not-allowed px-4 py-3 font-semibold">
                        {user?.displayName}
                      </span>
                    )}
                    <Link
                      to="/"
                      className="hover:bg-base-300 block px-4 py-3 font-semibold transition"
                    >
                      Home
                    </Link>
                    <Link
                      to="/available-camps"
                      className="hover:bg-base-300 block px-4 py-3 font-semibold transition"
                    >
                      Available Camps
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="hover:bg-base-300 px-4 py-3 font-semibold transition"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="hover:bg-base-300 cursor-pointer px-4 py-3 font-semibold transition"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="hover:bg-base-300 px-4 py-3 font-semibold transition"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="hover:bg-base-300 px-4 py-3 font-semibold transition"
                        >
                          Join Us
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
