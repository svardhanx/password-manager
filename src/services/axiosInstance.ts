import { baseURL } from "@/utils/constants";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
