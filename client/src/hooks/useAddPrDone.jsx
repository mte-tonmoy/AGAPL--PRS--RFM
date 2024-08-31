// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAddPrDone = () => {
//   const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();
//   const { refetch, data: addPrDone = [] } = useQuery({
//     queryKey: ["addPrDone"],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure(`/addPrDone`);
//       console.log("res from axios", res);
//       return res.data;
//     },
//   });

//   return [addPrDone, refetch];
// };
// export default useAddPrDone;

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAddPrDone = (page = 1, limit = 70, search = "") => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: addPrDone = {} } = useQuery({
    queryKey: ["addPrDone", page, limit, search],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/addPrDone`, {
        params: { page, limit, search },
      });
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [addPrDone, refetch];
};

export default useAddPrDone;
