import React from "react";
import { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders/Orders";
import Favourites from "./Favourites";
import Address from "./Address";
import Payments from "./Payments";
import Notifications from "./Notifications";
import Events from "./Events";
import MenuIcon from '@mui/icons-material/Menu';

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="lg:flex justify-between w-full">
      <button
        className="lg:hidden p-2 text-white m-3"
        onClick={() => setOpenSideBar(true)}
      >
        <MenuIcon fontSize="large" />
      </button>
      <div className="sticky lg:h-[80vh] lg:w-[20%]">
        <ProfileNavigation
          open={openSideBar}
          handleClose={() => setOpenSideBar(false)}
        />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
