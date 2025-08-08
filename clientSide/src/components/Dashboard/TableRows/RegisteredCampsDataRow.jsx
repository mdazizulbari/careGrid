import React, { useState } from "react";
import CancelRegistrationModal from "../../Modal/CancelRegistrationModal";

const RegisteredCampsDataRow = ({ participant, refetch }) => {
  const {
    campName,
    campFee,
    participantName,
    paymentStatus,
    paymentConfirmation,
  } = participant;
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <tr className="hover:bg-base-200">
      <td className="text-primary">{campName}</td>
      <td>{campFee}$</td>
      <td>{participantName}</td>
      <td>{paymentStatus ? "Paid" : "Unpaid"}</td>
      <td>{paymentConfirmation ? "Confirmed" : "Pending"}</td>
      <td>
        <button
          onClick={() => setIsOpen(true)}
          className={`btn btn-sm btn-primary btn-soft ${paymentStatus ? "btn-disabled" : ""}`}
        >
          Cancel
        </button>
        <CancelRegistrationModal
          isOpen={isOpen}
          participant={participant}
          close={close}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default RegisteredCampsDataRow;
