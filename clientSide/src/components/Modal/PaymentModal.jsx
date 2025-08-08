import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Form/CheckoutFrom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentModal = ({ camp, closePayment, paymentIsOpen, refetch }) => {
  return (
    <Dialog
      open={paymentIsOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closePayment}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-base-200 w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="font-gummy text-primary text-center text-3xl font-bold"
            >
              {camp.campName}
            </DialogTitle>

            <div className="mt-5 overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Professional</th>
                    <th>{camp.healthcareProfessional}</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Location</th>
                    <th>{camp.location}</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Camp Fee</th>
                    <th>{camp.campFee}$</th>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-center">Pay For Registration</p>
            {/* stripe checkout form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                closePayment={closePayment}
                camp={camp}
                refetch={refetch}
              />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
