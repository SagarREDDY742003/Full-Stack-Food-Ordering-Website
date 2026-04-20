import { toast } from "react-toastify";

export const Toast = (message, id) => {
  return toast.success(message, {
    style: {
      backgroundColor: "#0D0D0D",
      color: "#ffffff",
      // fontWeight: "l",
      borderRadius: "8px",
    },
    icon: "✅",
    toastId: id,
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
};
