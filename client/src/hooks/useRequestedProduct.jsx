import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRequestedProduct = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: requestedProduct = [] } = useQuery({
    queryKey: ["requestedProduct"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/requestedProduct`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [requestedProduct, refetch];
};
export default useRequestedProduct;
