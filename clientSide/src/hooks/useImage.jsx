import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useImage = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: image, isLoading: isImageLoading } = useQuery({
    queryKey: ["image", user?.email],
    enabled: !loading && !!user?.email, // need a boolean value
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/image/${user?.email}`);
      return data;
    },
  });
  console.log(image, isImageLoading);
  return [image?.image, isImageLoading];
};

export default useImage;
