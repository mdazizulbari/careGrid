import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

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

  // Fetch all participants data (organizer access)
  const { data: participantsData } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/participants`, {
        withCredentials: true,
      });
      return data;
    },
  });

  // Participant Count by Camp
  const participantCountData = React.useMemo(() => {
    if (!campsData) return [];
    return campsData.map((camp) => ({
      camp: camp.name,
      count: camp.participantCount || 0,
    }));
  }, [campsData]);

  // Payment Status Distribution (using participants.paymentStatus)
  const paymentStatusData = React.useMemo(() => {
    if (!participantsData) return [];
    const totalPayments = participantsData.length;
    const statusCount = {
      Paid: participantsData.filter((p) => p.paymentStatus).length,
      Pending: participantsData.filter((p) => !p.paymentStatus && !p.paymentConfirmation).length,
      Cancelled: participantsData.filter((p) => p.paymentConfirmation && !p.paymentStatus).length,
    };
    console.log("Payment Status Data:", statusCount); // Debug log
    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      value: totalPayments ? Math.round((count / totalPayments) * 100) : 0,
    }));
  }, [participantsData]);

  // Camp Registrations Over Time
  const registrationsOverTimeData = React.useMemo(() => {
    if (!participantsData) return [];
    const activityMap = new Map();
    participantsData.forEach((participant) => {
      const createdAt = participant.created_at ? new Date(participant.created_at) : new Date();
      const month = createdAt.toLocaleString("default", { month: "short", year: "numeric" });
      activityMap.set(month, (activityMap.get(month) || 0) + 1);
    });
    return Array.from(activityMap, ([month, count]) => ({ month, count }));
  }, [participantsData]);

  // Average Camp Fees
  const averageCampFeesData = React.useMemo(() => {
    if (!campsData || !participantsData) return [];
    const feeMap = new Map();
    campsData.forEach((camp) => {
      const participantsForCamp = participantsData.filter((p) => p.campName === camp.name);
      const totalFee = participantsForCamp.reduce((sum, p) => sum + (parseFloat(p.campFee) || 0), 0);
      const avgFee = participantsForCamp.length ? totalFee / participantsForCamp.length : camp.campFee || 0;
      feeMap.set(camp.name, avgFee);
    });
    return Array.from(feeMap, ([camp, fee]) => ({ camp, fee }));
  }, [campsData, participantsData]);

  return (
    <div className="flex min-h-[calc(100vh-110px)] items-center justify-center text-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-6 text-2xl sm:text-3xl">
          Welcome to the CareGrid dashboard <br />
          <span className="text-primary font-gummy text-4xl sm:text-5xl">
            {user.displayName}
          </span>
        </h1>
        <div className="space-y-6">
          {/* Participant Count by Camp */}
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

          {/* Payment Status Distribution */}
          <div className="bg-base-300 rounded-2xl p-4 sm:p-6 shadow-lg">
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
              Payment Status Distribution
            </h2>
            <div className="w-full overflow-x-auto flex justify-center">
              <PieChart width={window.innerWidth < 640 ? window.innerWidth - 40 : 400} height={300}>
                <Pie
                  data={paymentStatusData}
                  dataKey="value"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#13ecf3"
                  label
                  // Assign distinct colors to each slice
                  data={paymentStatusData.map((item, index) => ({
                    ...item,
                    fill: index === 0 ? "#13ecf3" : index === 1 ? "#4ecdc4" : "#45b7cd",
                  }))}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Camp Registrations Over Time */}
          <div className="bg-base-300 rounded-2xl p-4 sm:p-6 shadow-lg">
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
              Camp Registrations Over Time
            </h2>
            <div className="w-full overflow-x-auto">
              <LineChart
                width={window.innerWidth < 640 ? window.innerWidth - 40 : 600}
                height={300}
                data={registrationsOverTimeData}
                className="mx-auto"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#13ecf3" />
              </LineChart>
            </div>
          </div>

          {/* Average Camp Fees */}
          <div className="bg-base-300 rounded-2xl p-4 sm:p-6 shadow-lg">
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
              Average Camp Fees
            </h2>
            <div className="w-full overflow-x-auto flex justify-center">
              <RadarChart
                width={window.innerWidth < 640 ? window.innerWidth - 40 : 400}
                height={300}
                data={averageCampFeesData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="camp" />
                <PolarRadiusAxis angle={30} domain={[0, 30]} />
                <Radar dataKey="fee" stroke="#13ecf3" fill="#13ecf3" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerStatistics;