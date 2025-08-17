import { useState, useEffect } from "react"; // Explicitly import useEffect
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Shared/Button/Button";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinCampModal from "../../components/Modal/JoinCampModal";
import axios from "axios";

// Component to display detailed camp information and handle registration
const CampDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false); // Track if user has joined the camp
  console.log(isOpen);

  // Open the registration modal
  const open = () => {
    setIsOpen(true);
  };

  // Close the registration modal
  const close = () => {
    setIsOpen(false);
  };

  // Fetch camp details using TanStack Query
  const query = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/camp/${id}`);
      return data;
    },
    enabled: !!id, // Ensure query only runs when id is available
  });
  console.log(query);
  const { data: camp, isLoading, refetch } = query;
  console.log(camp);
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

  // Check local storage for joined status only once on mount or id change
  useEffect(() => {
    const joinedCamps = JSON.parse(localStorage.getItem("joinedCamps")) || [];
    if (joinedCamps.includes(id)) {
      setIsJoined(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Dependency on id only to avoid re-renders

  if (isLoading) return <LoadingSpinner />;
  if (!camp || typeof camp !== "object") return <p>No camps available</p>;

  return (
    <Container>
      <div className="hero bg-base-200 rounded-4xl min-h-[565px]">
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
                disabled={!user || isJoined} // Disable if not logged in or already joined
                onClick={open}
                label={isJoined ? "Already Joined" : user ? "Join Camp" : "Login to join camp"}
              ></Button>
            </div>

            <JoinCampModal
              isOpen={isOpen}
              close={close}
              camp={camp}
              user={user}
              refetch={refetch}
              setIsJoined={setIsJoined} // Pass function to update joined status
              campId={id} // Pass camp ID for tracking
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CampDetails;