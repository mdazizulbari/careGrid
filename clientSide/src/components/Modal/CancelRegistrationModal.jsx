import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CancelRegistrationModal = ({ close, isOpen, refetch, participant }) => {
  const axiosSecure = useAxiosSecure();

  const handleCancel = async () => {
    try {
      const { data } = await axiosSecure.delete(
        `/delete-registration/${participant._id}`,
      );
      console.log(data);
      toast.success("Registration data deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
      close();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
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
              Cancel Participant Registration
            </DialogTitle>

            <p className="pt-8 pb-5 text-center">
              Are you sure? <br /> This can not be undone!
            </p>

            <div className="flex justify-between">
              <button className="btn btn-soft btn-primary mt-4" onClick={close}>
                Cancel
              </button>
              <button
                className="btn btn-soft btn-error mt-4"
                onClick={handleCancel}
              >
                Cancel Registration
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CancelRegistrationModal;
