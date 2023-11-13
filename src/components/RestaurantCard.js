import React from "react";
import { swiggy_img_url } from "../utils/constants";

const RestaurantCard = ({ restInfo }) => {
  return (
    <div className="w-64 m-5 shadow-2xl rounded-2xl hover:scale-95 h-80">
      <img
        className="object-cover h-40 w-full rounded-2xl"
        src={swiggy_img_url + restInfo?.cloudinaryImageId}
      />
      <div className="p-3">
        <h1 className="font-semibold text-ellipsis overflow-hidden">
          {restInfo?.name}
        </h1>
        <div className="flex space-x-1 font-semibold">
          <img
            className="w-5"
            src="https://icons-for-free.com/iconfiles/png/512/green+star+icon-1320183463950302962.png"
          />
          <span>{restInfo?.avgRating} - </span>
          <span>{restInfo?.sla?.slaString}</span>
        </div>
        <div className="text-sm">{restInfo?.cuisines.join(", ")}</div>
        <div className="text-sm">{restInfo?.areaName}</div>
      </div>
    </div>
  );
};

export default RestaurantCard;
