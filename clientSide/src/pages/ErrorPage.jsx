import React from "react";
import { useNavigate } from "react-router";
import Button from "../components/Shared/Button/Button";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center md:max-w-xl">
          <p className="bg-base-300 text-primary rounded-full p-3 text-3xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="text-primary font-gummy mt-3 text-3xl font-semibold md:text-5xl">
            Something Went Wrong!
          </h1>
          <p className="mt-4">Here are some helpful links:</p>

          <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <Button label={"Go Back"} onClick={() => navigate(-1)} />
            <Button
              accent
              label={"Take Me Home"}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
