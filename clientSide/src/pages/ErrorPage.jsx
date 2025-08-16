import React from "react";
import { useNavigate } from "react-router";
import Button from "../components/Shared/Button/Button";
import errorImage from "../assets/images/error.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center md:max-w-xl">
          <img src={errorImage} className="" alt="" />
          <h1 className="text-primary font-gummy mt-3 text-3xl font-semibold md:text-5xl">
            Something Went Wrong!
          </h1>
          <p className="mt-4">Here are some helpful links:</p>

          <div className="mt-6 flex shrink-0 items-center gap-x-3 sm:w-auto">
            <Button outline label={"Go Back"} onClick={() => navigate(-1)} />
            <Button label={"Take Me Home"} onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
