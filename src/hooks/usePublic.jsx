import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tech-boat-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;