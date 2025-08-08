import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ParticipatedCampsDataRow from "../TableRows/ParticipatedCampsDataRow";
import PaymentHistoryDataRow from "../TableRows/PaymentHistoryDataRow";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const query = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/payments/${user?.email}`);
      return data;
    },
  });
  console.log(query);
  const { data: camps, isLoading } = query;
  console.log(camps);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-primary">
            <th>Camp Name</th>
            <th>Camp Fee</th>
            <th>Payment</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {camps.map((camp) => (
            <PaymentHistoryDataRow key={camp?._id} camp={camp} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
