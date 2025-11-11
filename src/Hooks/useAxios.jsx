import axios from "axios";

const instance = axios.create({
  baseURL: 'https://travel-ease-server-83763lbts-siam-khans-projects-3bc1c6be.vercel.app',
  
  
});
const useAxios=()=>{
return instance
}
export default useAxios