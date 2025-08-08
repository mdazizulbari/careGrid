import React, { useState } from "react";
import CancelParticipationModal from "../../Modal/CancelParticipationModal";
import FeedbackModal from "../../Modal/FeedbackModal";
import PaymentModal from "../../Modal/PaymentModal";

const ParticipatedCampsDataRow = ({ camp, refetch }) => {
  const {
    campName,
    campFee,
    participantName,
    paymentStatus,
    paymentConfirmation,
    _id,
  } = camp;
  const [isOpen, setIsOpen] = useState(false);
  const [paymentIsOpen, setPaymentIsOpen] = useState(false);
  const [feedbackIsOpen, setFeedbackIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };
  const closePayment = () => {
    setPaymentIsOpen(false);
  };
  const closeFeedback = () => {
    setFeedbackIsOpen(false);
  };

  return (
    <tr className="hover:bg-base-200">
      <td className="text-primary">{campName}</td>
      <td>{campFee}</td>
      <td>{participantName}</td>
      <td>
        {paymentStatus ? (
          "Paid"
        ) : (
          <>
            <button
              onClick={() => setPaymentIsOpen(true)}
              className="btn btn-sm btn-primary"
            >
              Pay
            </button>
            <PaymentModal
              closePayment={closePayment}
              paymentIsOpen={paymentIsOpen}
              camp={camp}
              refetch={refetch}
            />
          </>
        )}
      </td>
      <td>{paymentConfirmation ? "Confirmed" : "Pending"}</td>
      <td>
        <button
          onClick={() => setIsOpen(true)}
          className={`btn btn-sm btn-error btn-soft ${paymentStatus ? "btn-disabled" : ""}`}
        >
          Cancel
        </button>
        <CancelParticipationModal
          isOpen={isOpen}
          camp={camp}
          close={close}
          refetch={refetch}
        />
      </td>
      <td>
        <button
          onClick={() => feedbackIsOpen(true)}
          className={`btn btn-sm btn-primary btn-soft ${paymentStatus ? "" : "btn-disabled"}`}
        >
          Feedback
        </button>
        <FeedbackModal
          feedbackIsOpen={feedbackIsOpen}
          closeFeedback={closeFeedback}
          camp={camp}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default ParticipatedCampsDataRow;
