import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddCampForm = ({
  imageUploadError,
  setIsUploading,
  handleImageUpload,
  uploadedImage,
  isUploading,
  setUploadedImage,
}) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (campData) => {
    setIsUploading(true);
    campData.campImage = uploadedImage;
    campData.participantCount = Number(campData.participantCount);
    campData.campFee = Number(campData.campFee);
    try {
      // console.table(campData);
      const { data } = await axiosSecure.post(`/add-camp`, campData);
      console.table(data);
      toast.success("Camp data added successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
      setUploadedImage("");
      reset();
    }
  };

  return (
    <div className="hero bg-base-200 min-h-[calc(100vh-40px)] rounded-2xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="font-gummy text-primary text-5xl font-bold">
            Add Camp
          </h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
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
                {...register("dateTime", { required: true })}
                name="dateTime"
                id="dateTime"
                type="datetime-local"
                className="input"
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
              />
              {errors.campFee?.type === "required" && (
                <p className="text-error">Camp Fee is required</p>
              )}

              <label className="label hidden" htmlFor="participantCount">
                Participants Count
              </label>
              <input
                {...register("participantCount", { required: true })}
                name="participantCount"
                id="participantCount"
                type="number"
                disabled
                className="input hidden"
                placeholder="Participants Count"
                defaultValue={0}
              />
              {errors.participantCount?.type === "required" && (
                <p className="text-error">Participants Count is required</p>
              )}

              <label className="label" htmlFor="campImage">
                Camp Image (Try using small Image for fast upload)
              </label>
              <input
                {...register("campImage", { required: true })}
                name="campImage"
                id="campImage"
                type="file"
                className="file-input"
                onChange={handleImageUpload}
                accept="image/*"
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

              <button type="submit" className="btn btn-soft btn-primary mt-4">
                {isUploading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampForm;
