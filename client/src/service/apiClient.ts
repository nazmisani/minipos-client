import axios from "axios";
import { baseUrl } from "./api";

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default apiClient;
