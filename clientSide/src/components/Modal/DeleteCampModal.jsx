import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DeleteCampModal = ({ deleteClose, deleteIsOpen, camp, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const deleteCamp = async () => {
    try {
      const { data } = await axiosSecure.delete(`/delete-camp/${camp._id}`);
      console.log(data);
      toast.success("Camp data deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
      deleteClose();
    }
  };

  return (
    <Dialog
      open={deleteIsOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={deleteClose}
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
              Deleting Camp
            </DialogTitle>

            <p className="pt-8 pb-5 text-center">
              Are you sure? <br /> This can not be undone!
            </p>

            <div className="flex justify-between">
              <button
                className="btn btn-soft btn-primary mt-4"
                onClick={deleteClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-soft btn-error mt-4"
                onClick={deleteCamp}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteCampModal;
