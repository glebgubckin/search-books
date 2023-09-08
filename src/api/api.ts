import { apiKey } from "@/lib/constants";
import axios from "axios";

const request = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    maxResults: 30,
    key: apiKey,
  },
});

export default request;
