import axios from "axios";
import { IMAGE_SERVER_BASE_URL } from "./constants";

export const imageDbService = axios.create({
  baseURL: IMAGE_SERVER_BASE_URL,
  timeout: 3000,
});
