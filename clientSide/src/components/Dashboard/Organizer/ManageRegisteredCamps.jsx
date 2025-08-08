import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import RegisteredCampsDataRow from "../TableRows/RegisteredCampsDataRow";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: participants,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const { data } = await axiosSecure("/participants");
      return data;
    },
  });
  console.log(participants);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-primary">
            <th>Camp Name</th>
            <th>Camp Fee</th>
            <th>Participant Name</th>
            <th>Payment</th>
            <th>Confirmation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {participants.map((participant) => (
            <RegisteredCampsDataRow
              key={participant?._id}
              refetch={refetch}
              participant={participant}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRegisteredCamps;
