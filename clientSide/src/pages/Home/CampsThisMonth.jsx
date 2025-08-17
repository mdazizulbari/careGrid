import React from "react";
import CampCard from "./CampCard";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import EmptyState from "../../components/Shared/EmptyState"; // Added import
import Container from "../../components/Shared/Container";

const CampsThisMonth = () => {
  const { data: camps, isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/camps`);
      return data;
    },
  });
  console.log(camps);

  if (isLoading) return <LoadingSpinner />;

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11 (August is 7)
  const currentYear = currentDate.getFullYear(); // 2025

  // Filter camps for the current month
  const campsThisMonth = camps
    ?.filter((camp) => {
      const campDate = new Date(camp.dateTime);
      return (
        campDate.getMonth() === currentMonth &&
        campDate.getFullYear() === currentYear
      );
    })
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)) // Sort by date
    .slice(0, 8); // Limit to 8 camps

  return (
    <Container>
      <div className="mt-16">
        {/* Added margin-top for spacing */}
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          Camps This Happening Month
        </h2>
        {campsThisMonth && campsThisMonth.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {campsThisMonth.map((camp) => (
              <CampCard key={camp._id} camp={camp} />
            ))}
          </div>
        ) : (
          <EmptyState message={"No camps scheduled for this month!"} />
        )}
      </div>
    </Container>
  );
};

export default CampsThisMonth;
