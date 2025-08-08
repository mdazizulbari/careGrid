import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import { FaMobileAlt } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const UpdateProfileInfoModal = ({ close, isOpen, userData, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(userData.image);
  const [imageUploadError, setImageUploadError] = useState(false);

  useEffect(() => {
    setUploadedImage(userData.image);
  }, [userData]);

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

  const onSubmit = async (updatedData) => {
    setIsUploading(true);
    updatedData.image = uploadedImage;
    const fullUserData = {
      ...updatedData,
    };
    console.log("Full user data: ", fullUserData);
    try {
      await updateUserProfile(updatedData.name, updatedData.image);
      const { data } = await axiosSecure.put(
        `/update-user/${userData._id}`,
        fullUserData,
      );
      console.table(data);
      toast.success("Profile updated successfully");
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
            className="bg-base-300 w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="font-gummy text-primary text-center text-3xl font-bold"
            >
              Update Profile
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
                  className="input w-full"
                  defaultValue={userData.name}
                />
                {errors.name?.type === "required" && (
                  <p className="text-error">Name is required</p>
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

                <label className="label" htmlFor="age">
                  Age
                </label>
                <input
                  {...register("age", { required: true })}
                  name="age"
                  id="age"
                  type="number"
                  className="input w-full"
                  defaultValue={userData?.age}
                />
                {errors.age?.type === "required" && (
                  <p className="text-error">Age is required</p>
                )}

                <label className="label" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <label className="input validator w-full">
                  <FaMobileAlt />
                  <input
                    {...register("phoneNumber", { required: true })}
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="tabular-nums"
                    placeholder="Phone"
                    pattern="[0-9]{11}"
                    minLength="11"
                    maxLength="11"
                    title="Must be 11 digits"
                    defaultValue={userData?.phoneNumber}
                  />
                </label>
                <p className="validator-hint -my-1">Must be 11 digits</p>
                {errors.phoneNumber?.type === "required" && (
                  <p className="text-error">Phone Number is required</p>
                )}

                <label className="label" htmlFor="emergencyContact">
                  Emergency Contact
                </label>
                <label className="input validator w-full">
                  <MdCall />
                  <input
                    {...register("emergencyContact", { required: true })}
                    type="tel"
                    className="tabular-nums"
                    name="emergencyContact"
                    id="emergencyContact"
                    placeholder="Contact"
                    pattern="[0-9]{11}"
                    minLength="11"
                    maxLength="11"
                    title="Must be 11 digits"
                    defaultValue={userData?.emergencyContact}
                  />
                </label>
                <p className="validator-hint -my-1">
                  Must be exactly 11 digits
                </p>
                {errors.emergencyContact?.type === "required" && (
                  <p className="text-error">Emergency Contact is required</p>
                )}

                <label className="label" htmlFor="gender-male">
                  Gender
                </label>
                <div className="flex gap-5">
                  <div className="flex gap-1">
                    <input
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      type="radio"
                      name="gender"
                      id="gender-male"
                      value="male"
                      defaultChecked={userData.gender === "male"}
                    />
                    <label className="label" htmlFor="gender-male">
                      Male
                    </label>
                  </div>

                  <div className="flex gap-1">
                    <input
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      type="radio"
                      name="gender"
                      id="gender-female"
                      value="female"
                      defaultChecked={userData.gender === "female"}
                    />
                    <label className="label" htmlFor="gender-female">
                      Female
                    </label>
                  </div>

                  <div className="flex gap-1">
                    <input
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      type="radio"
                      value="other"
                      name="gender"
                      id="gender-other"
                      defaultChecked={userData.gender === "other"}
                    />
                    <label className="label" htmlFor="gender-other">
                      Other
                    </label>
                  </div>
                </div>
                {errors.gender?.type === "required" && (
                  <p className="text-error">{errors.gender.message}</p>
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

export default UpdateProfileInfoModal;
