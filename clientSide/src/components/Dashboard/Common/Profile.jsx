import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import UpdateProfileInfoModal from "../../Modal/UpdateProfileInfoModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
// import useImage from "../../../hooks/useImage";

const Profile = () => {
  const { user } = useAuth();
  // const [role, isImageLoading] = useImage();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
  };

  const query = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/data/${user?.email}`);
      return data;
    },
  });
  const { data: userData, isLoading, refetch } = query;
  console.log({ userData });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="hero bg-base-200 min-h-[calc(100vh-40px)] rounded-2xl">
      <div className="hero-content flex-col">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="space-y-2 text-center">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </div>
              <h4 className="font-bold">{user.email}</h4>
              <h1 className="font-gummy text-4xl font-bold">
                {user.displayName}
              </h1>

              <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    <tr className="hover:bg-base-200 transition ease-in-out">
                      <th>Gender</th>
                      <th>
                        {userData?.gender
                          ? `${userData.gender}`
                          : "Haven't Added"}
                      </th>
                    </tr>
                    <tr className="hover:bg-base-200 transition ease-in-out">
                      <th>Age</th>
                      <th>
                        {userData?.age ? `${userData.age}` : "Haven't Added"}
                      </th>
                    </tr>
                    <tr className="hover:bg-base-200 transition ease-in-out">
                      <th>Phone Number</th>
                      <th>
                        {userData?.phoneNumber
                          ? `${userData.phoneNumber}`
                          : "Haven't Added"}
                      </th>
                    </tr>
                    <tr className="hover:bg-base-200 transition ease-in-out">
                      <th>Emergency Contact</th>
                      <th>
                        {userData?.emergencyContact
                          ? `${userData.emergencyContact}`
                          : "Haven't Added"}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-soft btn-primary"
              >
                Update Information
              </button>
              <UpdateProfileInfoModal
                isOpen={isOpen}
                userData={userData}
                close={close}
                refetch={refetch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
