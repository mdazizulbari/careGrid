import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { GrUserAdmin } from "react-icons/gr";
import { BsClockHistory, BsFingerprint } from "react-icons/bs";

const ParticipantMenu = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="Registered Camps"
        address="registered-camps"
      />

      <MenuItem
        icon={BsClockHistory}
        label="Payment History"
        address="payment-history"
      />

      {/* <div
        onClick={() => setIsOpen(true)}
        className="mt-5 flex transform cursor-pointer items-center px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-300 hover:text-gray-700"
      >
        <GrUserAdmin className="h-5 w-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div> */}

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  );
};

export default ParticipantMenu;
