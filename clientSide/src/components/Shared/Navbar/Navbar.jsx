import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import logo from "/logo.png";
import avatarImg from "../../../assets/images/placeholder.png";
import { Link } from "react-router";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li>
        <Link
          to="/"
          className="hover:bg-base-300 block px-4 py-3 font-semibold transition"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/available-camps"
          className="hover:bg-base-300 block px-4 py-3 font-semibold transition"
        >
          Available Camps
        </Link>
      </li>

      {user ? (
        <>
          <li>
            <Link
              to="/dashboard"
              className="hover:bg-base-300 px-4 py-3 font-semibold transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <div
              onClick={logOut}
              className="hover:bg-base-300 cursor-pointer px-4 py-3 font-semibold transition"
            >
              Logout
            </div>
          </li>
          <li>
            <Link
              to="/available-camps"
              className="hover:bg-base-300 block px-4 py-3 font-semibold transition"
            >
              Contact Developer
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/login"
              className="hover:bg-base-300 px-4 py-3 font-semibold transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="hover:bg-base-300 px-4 py-3 font-semibold transition"
            >
              Join Us
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-200 fixed z-10 w-full rounded-br-4xl rounded-bl-4xl shadow-sm">
      <div className="py-2">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex gap-2">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="aquaDark"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              {/* Logo */}
              <Link
                className="btn bg-base-300 hover:bg-base-100 flex items-center gap-1 rounded-full"
                to="/"
              >
                <img src={logo} alt="logo" className="h-8 w-8" />
                <span className="font-gummy text-primary text-3xl">
                  CareGrid
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden flex-none lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-soft m-1">
                <FaBarsStaggered />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {links}
              </ul>
            </div>

            {/* User Details */}
            <Link
              to={"/dashboard/profile"}
              className="btn hover:bg-base-300 hidden items-center gap-2 lg:flex"
            >
              {user && (
                <span className="font-semibold">{user?.displayName}</span>
              )}

              {/* Avatar */}
              <figure className="">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt="profile"
                />
              </figure>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
