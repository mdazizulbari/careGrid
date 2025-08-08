import React from "react";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const OrganizerMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Camps" address="manage-camps" />
      <MenuItem icon={BsFillHouseAddFill} label="Add Camp" address="add-camp" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Registered Camps"
        address="manage-registered-camps"
      />
    </>
  );
};

export default OrganizerMenu;
