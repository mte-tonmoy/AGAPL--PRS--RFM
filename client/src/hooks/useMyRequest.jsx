// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useMyRequest = () => {
//   const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();
//   const { refetch, data: myRequest = [] } = useQuery({
//     queryKey: ["myRequest", user?.email],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure(`/myRequest?email=${user?.email}`);
//       console.log("res from axios", res);
//       return res.data;
//     },
//   });

//   return [myRequest, refetch];
// };
// export default useMyRequest;

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyRequest = (page = 1, limit = 10, searchTerm = "") => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  
  const { refetch, data: myRequest = { total: 0, requests: [] } } = useQuery({
    queryKey: ["myRequest", user?.email, page, limit, searchTerm],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/myRequest?email=${user?.email}&page=${page}&limit=${limit}&search=${searchTerm}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [myRequest.requests, myRequest.total, refetch];
};

export default useMyRequest;
