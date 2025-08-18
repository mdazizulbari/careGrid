import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Statistics component for organizers
const OrganizerStatistics = () => {
  const { user } = useAuth();

  // Fetch all camps data
  const { data: campsData } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/camps`, {
        withCredentials: true,
      });
      return data;
    },
  });

  // Prepare data for the bar chart
  const participantCountData = React.useMemo(() => {
    if (!campsData) return [];
    return campsData.map((camp) => ({
      camp: camp.name,
      count: camp.participantCount || 0,
    }));
  }, [campsData]);

  return (
    <div className="flex min-h-[calc(100vh-110px)] items-center justify-center text-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-6 text-2xl sm:text-3xl">
          Welcome to the CareGrid dashboard <br />
          <span className="text-primary font-gummy text-4xl sm:text-5xl">
            {user.displayName}
          </span>
        </h1>
        <div className="bg-base-300 rounded-2xl p-4 sm:p-6 shadow-lg">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
            Participant Count by Camp
          </h2>
          <div className="w-full overflow-x-auto">
            <BarChart
              width={window.innerWidth < 640 ? window.innerWidth - 40 : 600}
              height={300}
              data={participantCountData}
              className="mx-auto"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="camp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#13ecf3" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerStatistics;