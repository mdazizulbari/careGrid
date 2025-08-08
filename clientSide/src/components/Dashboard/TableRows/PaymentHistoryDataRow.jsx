import React, { useState } from "react";
import CancelParticipationModal from "../../Modal/CancelParticipationModal";
import FeedbackModal from "../../Modal/FeedbackModal";
import PaymentModal from "../../Modal/PaymentModal";

const PaymentHistoryDataRow = ({ camp }) => {
  const { campName, campFee, paymentStatus, paymentConfirmation } = camp;

  return (
    <tr className="hover:bg-base-200">
      <td className="text-primary">{campName}</td>
      <td>{campFee}$</td>
      <td>{paymentStatus ? "Paid" : "Unpaid"}</td>
      <td>{paymentConfirmation ? "Confirmed" : "Pending"}</td>
    </tr>
  );
};

export default PaymentHistoryDataRow;
