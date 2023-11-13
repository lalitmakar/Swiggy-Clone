import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { swiggy_img_url, swiggy_restaurant_URL } from "../utils/constants";
import MenuSection from "./MenuSection.js";
import Shimmer from "./Shimmer.js";
import { useSelector } from "react-redux";

const RestaurantPage = () => {
  const isOnline = useSelector((sub) => sub.Online.isOnline);
  const { id } = useParams();
  const [vegOnly, setVegOnly] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState([]);

  const info = restaurantInfo?.[0]?.card?.card?.info;

  const groupedMenuList =
    restaurantInfo?.[restaurantInfo.length - 1]?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards;

  const sections = groupedMenuList?.filter(
    (element) =>
      element?.card?.card?.title !== undefined &&
      element?.card?.card?.itemCards !== undefined
  );

  const fetchRestaurantInfo = async () => {
    try {
      const response = await fetch(swiggy_restaurant_URL + id);
      if (!response.ok) {
        console.log("RESPONSE NOT OKKKKKKK");
        throw new Error("ERROR IN FETCHING DATA...");
      }
      const jsonData = await response.json();

      // console.log(jsonData);
      if (jsonData.statusCode === 1) {
        throw new Error("SOMETHING WENT WRONG");
      }
      setRestaurantInfo(jsonData?.data?.cards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRestaurantInfo();
  }, []);

  const handleVegOnlyItems = () => {
    setVegOnly(!vegOnly);
  };

  if (!isOnline) {
    return (
      <div className="font-bold w-1/2 text-center mx-auto mt-40">
        Oops Looks like you lost Internet Connectivity
      </div>
    );
  }

  if (restaurantInfo.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="w-1/2 mx-auto mt-10">
      <div>
        {/* <img src={swiggy_img_url + info?.cloudinaryImageId} /> */}
        <div className="flex justify-between">
          <div>
            <div className="text-3xl ">{info?.name}</div>

            <div className="font-light tracking-wide">
              {info?.cuisines?.join(", ")}
            </div>
            <div className="font-light tracking-wide">{info?.areaName}</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-10 h-10"
              src="https://icons-for-free.com/iconfiles/png/512/green+star+icon-1320183463950302962.png"
            />
            <span>{info?.avgRating}</span>
          </div>
        </div>

        <hr />
        <div className="flex font-semibold space-x-4 my-5">
          <span className="flex space-x-1">
            <img
              className="w-5"
              src="https://thumbs.dreamstime.com/b/cycle-time-icon-trendy-flat-style-isolated-cycle-time-icon-trendy-flat-style-isolated-eps-178753849.jpg"
            />
            <span>{info?.sla?.slaString}</span>
          </span>
          <span className="flex space-x-1">
            <img
              className="w-5"
              src="https://banner2.cleanpng.com/20180429/kie/kisspng-indian-rupee-sign-banknote-computer-icons-5ae575bd53e6f0.6222419715249873253437.jpg"
            />
            <span>{info?.costForTwoMessage}</span>
          </span>
        </div>
        <hr />
        {/* <div>Restaurant {info?.isOpen ? "Open Now" : "Closed Now"}</div> */}
      </div>
      <div>
        <div className="flex space-x-3 mt-5">
          <div className="font-bold">Veg Only</div>
          <input
            className="w-4"
            type="checkbox"
            value={vegOnly}
            onClick={handleVegOnlyItems}
          />
        </div>

        <div className="mt-5 divide-y-4">
          {sections?.map((element) => (
            <h1 key={element?.card?.card?.title}>
              <MenuSection info={element?.card?.card} showVegOnly={vegOnly} />
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
