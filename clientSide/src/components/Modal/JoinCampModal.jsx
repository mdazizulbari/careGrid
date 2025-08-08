import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { FaEnvelope, FaMobileAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const JoinCampModal = ({ camp, isOpen, close, user, refetch }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (participantData) => {
    setIsUploading(true);
    participantData.paymentStatus = false;
    participantData.paymentConfirmation = false;
    console.log(participantData);
    try {
      const { data: participantResult } = await axiosSecure.post(
        "/participant",
        participantData,
      );
      console.log(participantResult);

      const { data: participantCountData } = await axiosSecure.patch(
        `/participant-count-update/${camp._id}`,
      );
      console.log(participantCountData);

      if (
        participantResult?.insertedId &&
        participantCountData?.modifiedCount == 1
      ) {
        toast.success("Registration Successful");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
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
            className="bg-base-100 w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="font-gummy text-primary text-center text-3xl font-bold"
            >
              Registration Form
            </DialogTitle>

            <div className="card-body mx-auto w-full max-w-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                <label className="label" htmlFor="campName">
                  Camp Name
                </label>
                <input
                  {...register("campName", { required: true })}
                  name="campName"
                  id="campName"
                  type="text"
                  className="input w-full cursor-not-allowed"
                  defaultValue={camp.name}
                  readOnly
                />

                <label className="label" htmlFor="campFee">
                  Fees
                </label>
                <input
                  {...register("campFee", { required: true })}
                  name="campFee"
                  id="campFee"
                  type="number"
                  className="input w-full cursor-not-allowed"
                  defaultValue={camp.campFee}
                  readOnly
                />

                <label className="label" htmlFor="healthcareProfessional">
                  Healthcare Professional
                </label>
                <input
                  {...register("healthcareProfessional", {
                    required: true,
                  })}
                  name="healthcareProfessional"
                  id="healthcareProfessional"
                  type="text"
                  className="input w-full cursor-not-allowed"
                  defaultValue={camp.healthcareProfessional}
                  readOnly
                  placeholder="Healthcare Professional Name"
                />

                <label className="label" htmlFor="location">
                  Location
                </label>
                <input
                  {...register("location", { required: true })}
                  name="location"
                  id="location"
                  type="text"
                  required
                  className="input w-full cursor-not-allowed"
                  defaultValue={camp.location}
                  readOnly
                  placeholder="Camp Location"
                />

                <label className="label" htmlFor="participantName">
                  Participant Name
                </label>
                <label
                  htmlFor="participantName"
                  className="input validator w-full"
                >
                  <IoPerson />
                  <input
                    {...register("participantName", { required: true })}
                    name="participantName"
                    id="participantName"
                    type="text"
                    required
                    className="input w-full cursor-not-allowed"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                </label>

                <label className="label" htmlFor="participantEmail">
                  Participant Email
                </label>
                <label
                  htmlFor="participantEmail"
                  className="input validator w-full"
                >
                  <FaEnvelope />
                  <input
                    {...register("participantEmail", { required: true })}
                    name="participantEmail"
                    id="participantEmail"
                    type="text"
                    required
                    className="input w-full cursor-not-allowed"
                    defaultValue={user?.email}
                    readOnly
                  />
                </label>

                <label className="label" htmlFor="age">
                  Age
                </label>
                <input
                  {...register("age", { required: true })}
                  name="age"
                  id="age"
                  type="number"
                  className="input w-full"
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

export default JoinCampModal;
