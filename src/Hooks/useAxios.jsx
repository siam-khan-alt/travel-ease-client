import axios from "axios";

const instance = axios.create({
  baseURL: 'https://travel-ease-server-rho.vercel.app',
  
  
});
const useAxios=()=>{
return instance
}
export default useAxios