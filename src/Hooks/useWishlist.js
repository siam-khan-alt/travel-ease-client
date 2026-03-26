import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxios from "./useAxios";
import Swal from "sweetalert2";


const useWishlist = (vehicleId) => {
  const { users } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (users) {
      axiosPublic.get(`/my-wishlist/${users.email}`).then((res) => {
        const found = res.data.find((item) => item.vehicleId === vehicleId);
        setIsWished(!!found);
      });
    } else {
      const localWish = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsWished(localWish.includes(vehicleId));
    }
  }, [vehicleId, users]);

  const toggleWish = async () => {
    const action = isWished ? "remove" : "add";

    if (users) {
      const res = await axiosPublic.patch("/wishlist/toggle", {
        vehicleId,
        userEmail: users.email,
        action,
      });
      if (res.data.success) setIsWished(!isWished);
    } else {
      let localWish = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (action === "add") {
        localWish.push(vehicleId);
      } else {
        localWish = localWish.filter((id) => id !== vehicleId);
      }
      localStorage.setItem("wishlist", JSON.stringify(localWish));

      await axiosPublic.patch("/wishlist/toggle", { vehicleId, action });
      setIsWished(!isWished);
    }

    Swal.fire({
      toast: true, position: "top-end",
      icon: "success",
      title: action === "add" ? "Added to Secure Vault" : "Removed from Vault",
      showConfirmButton: false, timer: 1500,
      background: "var(--card-bg)", color: "var(--text-main)"
    });
  };

  return { isWished, toggleWish };
};

export default useWishlist;