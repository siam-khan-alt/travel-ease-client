import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const useRole = () => {
    const { users, loading } = useContext(AuthContext);
    const instanceAxios = useAxios();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: [users?.email, 'role'],
        enabled: !loading && !!users?.email,
        queryFn: async () => {
            const res = await instanceAxios.get(`/users/role/${users?.email}`);
            return res.data.role;
        }
    });
    return [role, isRoleLoading];
};

export default useRole;