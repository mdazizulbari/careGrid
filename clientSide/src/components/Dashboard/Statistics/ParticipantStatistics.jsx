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
  LineChart,
  Line,
} from "recharts";

// Statistics component for participants
const ParticipantStatistics = () => {
  const { user } = useAuth();

  // Fetch payment history for the logged-in user
  const { data: paymentData } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payments/${user?.email}`,
        { withCredentials: true }
      );
      return data;
    },
    enabled: !!user?.email, // Only fetch if user is logged in
  });

  // Fetch participated camps for the logged-in user
  const { data: campData } = useQuery({
    queryKey: ["participated-camps", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/participated-camps/${user?.email}`,
        { withCredentials: true }
      );
      return data;
    },
    enabled: !!user?.email, // Only fetch if user is logged in
  });

  // Aggregate total fees paid by camp
  const feesPaidData = React.useMemo(() => {
    if (!paymentData || !campData) return [];
    const feeMap = new Map();
    paymentData.forEach((payment) => {
      const camp = campData.find((c) => c.campName === payment.campName);
      if (camp) {
        const fee = parseFloat(payment.campFee) || 0;
        feeMap.set(payment.campName, (feeMap.get(payment.campName) || 0) + fee);
      }
    });
    return Array.from(feeMap, ([camp, fee]) => ({ camp, fee }));
  }, [paymentData, campData]);

  // Aggregate registration activity over time
  const registrationActivityData = React.useMemo(() => {
    if (!campData) return [];
    const activityMap = new Map();
    campData.forEach((camp) => {
      // Use created_at if available, fallback to current date as a safe default
      const createdAt = camp.created_at ? new Date(camp.created_at) : new Date();
      const month = createdAt.toLocaleString("default", { month: "short", year: "numeric" });
      activityMap.set(month, (activityMap.get(month) || 0) + 1);
    });
    return Array.from(activityMap, ([month, count]) => ({ month, count }));
  }, [campData]);

  return (
    <div className="flex min-h-[calc(100vh-110px)] items-center justify-center text-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-6 text-2xl sm:text-3xl">
          Welcome to the CareGrid dashboard <br />
          <span className="text-primary font-gummy text-4xl sm:text-5xl">
            {user.displayName}
          </span>
        </h1>
        <div className="bg-base-300 rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
            Total Fees Paid by Camp
          </h2>
          <div className="w-full overflow-x-auto">
            <BarChart
              width={window.innerWidth < 640 ? window.innerWidth - 40 : 600}
              height={300}
              data={feesPaidData}
              className="mx-auto"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="camp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fee" fill="#13ecf3" />
            </BarChart>
          </div>
        </div>
        <div className="bg-base-300 rounded-2xl p-4 sm:p-6 shadow-lg">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
            Registration Activity Over Time
          </h2>
          <div className="w-full overflow-x-auto">
            <LineChart
              width={window.innerWidth < 640 ? window.innerWidth - 40 : 600}
              height={300}
              data={registrationActivityData}
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
      </div>
    </div>
  );
};

export default ParticipantStatistics;