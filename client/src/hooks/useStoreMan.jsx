import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStoreMan = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isStoreMan, isLoading: isStoreManLoading } = useQuery({
    queryKey: ["isStoreMan", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/storeMan/${user?.email}`);
      console.log("is StoreMan response", res);
      return res.data.storeMan;
    },
  });
  return [isStoreMan, isStoreManLoading];
};
export default useStoreMan;
