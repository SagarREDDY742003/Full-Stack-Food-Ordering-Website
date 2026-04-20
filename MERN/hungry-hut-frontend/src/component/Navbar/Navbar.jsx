import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { auth, cart } = useSelector((store) => store);

  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant/details");
    }
  };

  return (
    <div className="px-3 sticky z-50 top-0 py-2 bg-[#b80742] lg:px-10 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-2">
        <img
          className="h-[3.4rem] w-[3.4rem] object-cover object-center rounded-full "
          alt=""
          src="https://res.cloudinary.com/debpngulj/image/upload/v1758378624/Aldjwx9IZEnqwEt1zYxhBySZE3_rTGMgKm-9fIUnrX12_eHw6Mg7EevhnP14BLfDjkI_fjerry.png"
        />
        <li
          className="logo font-semibold italic text-gray-100 text-2xl list-none"
          onClick={() => navigate("/")}
        >
          Hungry Hut
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
            <IconButton>
              <SearchIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          )}
        </div>

        <div className="">
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: "#b80742" }}
            >
              {auth.user.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>

        <div>
          {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
            <IconButton onClick={() => navigate("/cart")}>
              <Badge color="secondary" badgeContent={cart.cartItems.length}>
                <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
              </Badge>
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
