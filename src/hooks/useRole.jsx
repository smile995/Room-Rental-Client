import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/role/${user?.email}`);
      return data;
    },
  });
  return [role, isLoading];
};

export default useRole;
