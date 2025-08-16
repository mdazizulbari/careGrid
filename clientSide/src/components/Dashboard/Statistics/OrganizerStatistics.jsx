import React from "react";
import useAuth from "../../../hooks/useAuth";

const OrganizerStatistics = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-[calc(100vh-110px)] items-center justify-center text-center">
      <h1 className="text-2xl">
        Welcome to the CareGrid dashboard <br />
        <span className="text-primary font-gummy text-4xl">
          {user.displayName}
        </span>
      </h1>
    </div>
  );
};

export default OrganizerStatistics;
