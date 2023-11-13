import React from "react";
import { swiggy_img_url } from "../utils/constants";

const SuggestionCard = ({ info }) => {
  console.log(info);
  return (
    <div className="flex space-x-5 m-5 p-2">
      <div>
        <img
          className="w-20 rounded-lg"
          src={swiggy_img_url + info?.cloudinaryId}
        />
      </div>
      <div>
        <div>{info?.text}</div>
        <div>{info?.type}</div>
      </div>
    </div>
  );
};

export default SuggestionCard;
