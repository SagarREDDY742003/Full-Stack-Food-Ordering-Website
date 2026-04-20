import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../state/Restaurant/Action";

const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllRestaurants(jwt));
  }, [dispatch, jwt]);

  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-5xl font-bold z-10 py-5">Hungry Hut</p>
          <p className="z-10 text-gray-200 text-xl lg:text-3xl">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeOut"></div>
      </section>

      <section className="px-10 py-2 lg:py-2 lg:px-20">
        <p className="text-2xl font-semibold text-gray-300 py-3 pb-5 lg:pb-6">
          Top Meels
        </p>
        <MultiItemCarousel />
      </section>
      {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
        <section className="px-5 lg:px-20 pt-5">
          <h1 className="text-2xl font-semibold text-gray-300 pb-8">
            Order From Our Handpicked Favourites
          </h1>
          <div className="flex flex-wrap gap-5 justify-around">
            {restaurant.restaurants.map((item) => (
              <RestaurantCard item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
