import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyPurchaseRequest = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: myPurchaseRequest = [] } = useQuery({
    queryKey: ["myPurchaseRequest", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/myPurchaseRequest?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [myPurchaseRequest, refetch];
};
export default useMyPurchaseRequest;
