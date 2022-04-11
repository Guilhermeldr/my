import { AxiosInstance, AxiosRequestConfig } from "axios";
import { firebaseAuth } from "../firebase";

export const applyInterceptors = (axios: AxiosInstance) => {
  accessTokenInterceptor(axios);
  emptyPostBodyInterceptor(axios);
};

export const accessTokenInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use(
    async (config): Promise<AxiosRequestConfig> => {
      if (config.url && !config.url.includes("/analytics")) {
        try {
          const token = await firebaseAuth?.currentUser?.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        } catch (err) {
          console.error(err);
        }
      }
      return config;
    },
    async (error): Promise<AxiosRequestConfig> => {
      if (error.status !== 401 && error.status !== 403) {
        return Promise.reject(error);
      }

      const token = await firebaseAuth?.currentUser?.getIdToken();
      error.response.config.headers.Authorization = `Bearer ${token}`;

      return axios(error.response.config);
    }
  );
};

// This is used because swagger-axios-codegen assigns null as body
export const emptyPostBodyInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use(
    async (config): Promise<AxiosRequestConfig> => {
      if (config.method === "post" && config.data === null) {
        config.data = {};
      }
      return config;
    }
  );
};
