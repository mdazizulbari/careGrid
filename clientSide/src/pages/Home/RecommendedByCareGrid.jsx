import React from "react";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Shared/Button/Button";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinCampModal from "../../components/Modal/JoinCampModal";
import axios from "axios";
import { useState } from "react";

const RecommendedByCareGrid = () => {
  const hardcodedCampId = "68a127f873a239ce4e672073"; // Hardcoded objectId for a specific camp
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const query = useQuery({
    queryKey: ["recommendedCamp", hardcodedCampId],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/camp/${hardcodedCampId}`,
      );
      return data;
    },
  });
  console.log(query);
  const { data: camp, isLoading, refetch } = query;

  const {
    name,
    campFee,
    campImage,
    dateTime,
    description,
    location,
    healthcareProfessional,
    participantCount,
    _id,
  } = camp || {};

  if (isLoading) return <LoadingSpinner />;
  if (!camp || typeof camp !== "object") return <p>No camp available</p>;

  return (
    <Container>
      <div className="flex justify-center">
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          Recommended By
          <span className="flex items-center justify-center gap-1">
            <img src="/logo.png" alt="logo" className="h-8 w-8" />
            CareGrid
          </span>
        </h2>
      </div>

      <div className="hero bg-base-200 mt-8 min-h-[565px] rounded-4xl">
        <div className="hero-content flex-col gap-8 p-8 lg:flex-row">
          <img
            src={campImage}
            className="max-w-xs rounded-4xl shadow-2xl md:max-w-xl"
          />
          <div>
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="pt-2 pb-6">{description}</p>

            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Healthcare Professional</th>
                    <th>{healthcareProfessional}</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Event Time</th>
                    <th>{dateTime}</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Location</th>
                    <th>{location}</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Already Participated</th>
                    <th>{participantCount} People</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Camp Fee</th>
                    <th>{campFee}$</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <Button
                disabled={!user}
                onClick={open}
                label={user ? "Join Camp" : "Login to join camp"}
              ></Button>
            </div>

            <JoinCampModal
              isOpen={isOpen}
              close={close}
              camp={camp}
              user={user}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecommendedByCareGrid;
