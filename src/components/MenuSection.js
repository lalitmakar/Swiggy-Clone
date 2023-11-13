import React from "react";
import MenuItem from "./MenuItem";

const MenuSection = ({ info, showVegOnly }) => {
  const vegList = info?.itemCards?.filter((item) => item?.card?.info?.isVeg);

  //if show veg only is true and this section doesnt have any veg items return null
  if (showVegOnly && vegList.length === 0) {
    return null;
  }

  return (
    <div>
      <hr />
      <div className="font-semibold text-2xl">{info?.title}</div>
      <div>
        {showVegOnly ? (
          <div className="divide-y">
            {vegList.map((item) => (
              <MenuItem key={item?.card?.info?.id} info={item?.card?.info} />
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {info?.itemCards.map((item) => (
              <MenuItem key={item?.card?.info?.id} info={item?.card?.info} />
            ))}
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default MenuSection;
