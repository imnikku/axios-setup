import axios, { AxiosHeaders } from "axios";
const axiosInstance = axios.create({
  baseURL: proccess.env.base_url,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token") || "";
    const language = localStorage.getItem("i18nextLng") || "";
    if (config.headers) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
      (config.headers as AxiosHeaders).set("language", `${language}`);
      (config.headers as AxiosHeaders).set("device-type", `web_enable`);
      (config.headers as AxiosHeaders).set(
        "url",
        `${
          process.env.NODE_ENV === "development"
            ? yoururl
            : window.location.origin
        }`
      );
      (config.headers as AxiosHeaders).set(
        "store-id",
        JSON.parse(localStorage.getItem("store") as any)?.store_id || ""
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
   
    if (error.response.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
