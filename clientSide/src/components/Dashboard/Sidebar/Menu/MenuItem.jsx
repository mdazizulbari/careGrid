/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      // className={({ isActive }) =>
      //   `my-5 flex transform items-center px-4 py-2 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-700 ${
      //     isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
      //   }`
      // }
      className={({ isActive }) =>
        `btn hover:btn-primary w-full justify-start text-left ${isActive ? "btn-primary" : ""}`
      }
    >
      <Icon className="h-5 w-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
