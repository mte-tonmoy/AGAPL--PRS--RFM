import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAddPr = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: addPr = [] } = useQuery({
    queryKey: ["addPr"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/addPr`);
      console.log("res from axios", res);
      return res.data;
    }, 
  });

  return [addPr, refetch];
};
export default useAddPr;
