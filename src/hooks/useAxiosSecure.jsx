import axios from "axios";
import { useEffect } from "react";
// import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_ROOT,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      async (res) => {
        return res;
      },
      async (error) => {
        console.log("error tracked in the interceptor", error?.response);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
