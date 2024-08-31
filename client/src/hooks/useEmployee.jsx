import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useEmployee = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isEmployee, isLoading: isEmployeeLoading } = useQuery({
    queryKey: ["isEmployee", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/employee/${user?.email}`);
      console.log("is Employee response", res);
      return res.data.employee;
    },
  });
  return [isEmployee, isEmployeeLoading];
};
export default useEmployee;
