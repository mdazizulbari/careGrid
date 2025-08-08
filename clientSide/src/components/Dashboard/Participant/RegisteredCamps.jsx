import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ParticipatedCampsDataRow from "../TableRows/ParticipatedCampsDataRow";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const query = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/participated-camps/${user?.email}`);
      return data;
    },
  });
  console.log(query);
  const { data: camps, isLoading, refetch } = query;

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
            <th>Cancel</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {camps.map((camp) => (
            <ParticipatedCampsDataRow
              key={camp?._id}
              refetch={refetch}
              camp={camp}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;
