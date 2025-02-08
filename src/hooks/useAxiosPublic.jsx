import axios from "axios";

export const axiosPublc = axios.create({
  baseURL: import.meta.env.VITE_ROOT,
});
const useAxiosPublic = () => {
  return axiosPublc;
};

export default useAxiosPublic;
