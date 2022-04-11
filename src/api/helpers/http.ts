import axios, { AxiosInstance } from "axios";

import { serviceOptions } from "../sdk";
import { __DEV__ } from "./constants";
import { applyInterceptors } from "./interceptors";

let API_URL: string;

if (__DEV__) {
  API_URL = "http://localhost:5001/bitwild-live/us-east1/api";
} else {
  API_URL = "https://us-east1-bitwild-live.cloudfunctions.net/api";
}

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

serviceOptions.axios = http;

applyInterceptors(http);
