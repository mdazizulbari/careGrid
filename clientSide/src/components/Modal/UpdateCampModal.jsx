import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";

const UpdateCampModal = ({ close, isOpen, camp, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(camp.campImage);
  const [imageUploadError, setImageUploadError] = useState(false);

  let localDateTime;
  if (camp?.dateTime) {
    localDateTime = new Date(camp?.dateTime).toISOString().slice(0, 16);
  }

  useEffect(() => {
    setUploadedImage(camp.campImage);
  }, [camp]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    if (!image) return;
    try {
      // image url response from imgbb
      const imageUrl = await imageUpload(image);
      console.log(imageUrl);
      setImageUploadError(false);
      setUploadedImage(imageUrl);
    } catch (err) {
      setImageUploadError("Image Upload Failed");
      console.log(err);
    }
  };

  const onSubmit = async (campData) => {
    setIsUploading(true);
    campData.campImage = uploadedImage;
    campData.participantCount = Number(campData.participantCount);
    campData.campFee = Number(campData.campFee);
    try {
      // console.table(campData);
      const { data } = await axiosSecure.put(
        `/update-camp/${camp._id}`,
        campData,
      );
      console.table(data);
      toast.success("Camp data updated successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setUploadedImage("");
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
              Update Camp
            </DialogTitle>

            <div className="card-body mx-auto w-full max-w-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  id="name"
                  type="text"
                  className="input"
                  placeholder="Camp Name"
                  defaultValue={camp.name}
                />
                {errors.name?.type === "required" && (
                  <p className="text-error">Name is required</p>
                )}

                <label className="label" htmlFor="healthcareProfessional">
                  Healthcare Professional
                </label>
                <input
                  {...register("healthcareProfessional", { required: true })}
                  name="healthcareProfessional"
                  id="healthcareProfessional"
                  type="text"
                  className="input"
                  placeholder="Healthcare Professional Name"
                  defaultValue={camp.healthcareProfessional}
                />
                {errors.healthcareProfessional?.type === "required" && (
                  <p className="text-error">
                    Healthcare Professional Name is required
                  </p>
                )}

                <label className="label" htmlFor="dateTime">
                  Date and Time
                </label>
                <input
                  {...register(
                    "dateTime",
                    // { required: true }
                  )}
                  name="dateTime"
                  id="dateTime"
                  type="datetime-local"
                  className="input"
                  defaultValue={localDateTime}
                />
                {errors.dateTime?.type === "required" && (
                  <p className="text-error">Date and Time is required</p>
                )}

                <label className="label" htmlFor="description">
                  Description
                </label>
                <input
                  {...register("description", { required: true })}
                  name="description"
                  id="description"
                  type="text"
                  className="input"
                  placeholder="Camp Description"
                  defaultValue={camp.description}
                />
                {errors.description?.type === "required" && (
                  <p className="text-error">Description is required</p>
                )}

                <label className="label" htmlFor="location">
                  Location
                </label>
                <input
                  {...register("location", { required: true })}
                  name="location"
                  id="location"
                  type="text"
                  className="input"
                  placeholder="Camp Location"
                  defaultValue={camp.location}
                />
                {errors.location?.type === "required" && (
                  <p className="text-error">Location is required</p>
                )}

                <label className="label" htmlFor="campFee">
                  Fees
                </label>
                <input
                  {...register("campFee", { required: true })}
                  name="campFee"
                  id="campFee"
                  type="number"
                  className="input"
                  placeholder="Camp Fees"
                  defaultValue={camp.campFee}
                />
                {errors.campFee?.type === "required" && (
                  <p className="text-error">Camp Fee is required</p>
                )}

                <label className="label" htmlFor="campImage">
                  Camp Image (Try using small Image for fast upload)
                </label>
                <input
                  {...register(
                    "campImage",
                    // { required: true }
                  )}
                  name="campImage"
                  id="campImage"
                  type="file"
                  className="file-input"
                  onChange={handleImageUpload}
                  accept="image/*"
                  // defaultValue={camp.campImage}
                />
                {errors.campImage?.type === "required" && (
                  <p className="text-error">Camp Image is required</p>
                )}
                <div className="flex w-full justify-center py-2">
                  {uploadedImage && (
                    <img src={uploadedImage} className="w-26 rounded-2xl" />
                  )}
                </div>
                {imageUploadError && (
                  <p className="text-error text-center">{imageUploadError}</p>
                )}

                <div className="flex justify-between">
                  <button
                    className="btn btn-soft btn-error mt-4"
                    onClick={close}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-soft btn-primary mt-4"
                  >
                    {isUploading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateCampModal;
