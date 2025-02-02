import axios from "axios";

export const axiosPublc = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosPublic = () => {
  return axiosPublc;
};

export default useAxiosPublic;
