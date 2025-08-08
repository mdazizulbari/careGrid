import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import CampsDataRow from "../TableRows/CampsDataRow";

const ManageCamps = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: camps,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axiosSecure("/camps");
      return data;
    },
  });
  console.log(camps);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-primary">
            <th>Name</th>
            <th>Professional</th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {camps.map((camp) => (
            <CampsDataRow key={camp?._id} refetch={refetch} camp={camp} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCamps;
