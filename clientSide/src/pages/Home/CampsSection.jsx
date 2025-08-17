import React from "react";
import CampCard from "./CampCard";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";

const CampsSection = () => {
  const { data: camps, isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/camps`);
      return data;
    },
  });
  console.log(camps);

  if (isLoading) return <LoadingSpinner />;

  const topCamps = camps
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 8);

  return (
    <Container>
      <div>
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          Popular Medical Camps
        </h2>

        {topCamps && topCamps.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {topCamps.map((camp) => (
              <CampCard key={camp._id} camp={camp} />
            ))}
          </div>
        ) : (
          <EmptyState message={"No camp data available right now!"} />
        )}

        <div className="flex justify-center">
          <Link to={"/available-camps"} className="btn btn-primary mt-10">
            See All Camps
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default CampsSection;
