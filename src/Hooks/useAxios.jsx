import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  
  
});
const useAxios=()=>{
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.error("Token expired or unauthorized access");
      }
      return Promise.reject(error);
    }
  );
return instance
}
export default useAxios