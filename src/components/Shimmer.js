import React from "react";
import ShimmerComp from "./ShimmerComp";

const Shimmer = () => {
  return (
    <div className="m-10 flex flex-wrap">
      {Array(9)
        .fill("")
        .map((item, index) => (
          <ShimmerComp key={index} />
        ))}
    </div>
  );
};

export default Shimmer;
