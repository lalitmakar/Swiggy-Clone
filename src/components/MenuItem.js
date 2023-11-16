import React from "react";
import { swiggy_img_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../utils/Store/CartSlice";

const MenuItem = ({ info }) => {
  const placeholderImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
  const cartItems = useSelector((sub) => sub.Cart.items);

  let updatedInfoFromCart;
  cartItems.map((item) => {
    if (item.id === info.id) {
      // console.log("ITEM PRESENT IN CART...");
      updatedInfoFromCart = item;
    }
  });

  const dispatch = useDispatch();

  const handleAddItemToCart = () => {
    if (info["cartCount"] === undefined) {
      info["cartCount"] = 1;
    }
    dispatch(addItemToCart(info));
  };

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCart(info));
  };
  return (
    <>
      <div className="flex justify-between p-5">
        <div>
          {info?.isVeg ? (
            <img
              className="w-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
              alt="veg"
            />
          ) : (
            <img
              className="w-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png"
              alt="non-veg"
            />
          )}
          <div className="font-semibold">{info?.name}</div>
          <div className="flex items-center space-x-1">
            <img
              className="w-4 h-4"
              src="https://cdn-icons-png.flaticon.com/512/846/846194.png"
            />
            <div>
              {(info?.price ? info?.price : info?.defaultPrice) / 100} Rs
            </div>
          </div>

          <div className="font-light text-sm">{info?.description}</div>
        </div>
        <div className="relative">
          <img
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
            className="w-24 h-24 max-w-7xl rounded-2xl bg-cover"
            src={swiggy_img_url + info?.imageId}
            alt="Image not available"
          />
          {updatedInfoFromCart === undefined ? (
            <button
              className="hover:bg-green-400 hover:text-white border border-green-400 my-1 bottom-1 w-auto px-2 rounded-lg ml-6 bg-white text-green-700 font-semibold"
              onClick={handleAddItemToCart}
            >
              Add
            </button>
          ) : (
            <div className=" flex justify-between border border-green-700 p-1 m-1">
              <button
                className=" w-full  bottom-0 bg-white rounded-lg text-red-700 font-bold text-lg"
                onClick={handleRemoveItemFromCart}
              >
                -
              </button>

              <button className=" w-full bottom-0 bg-white rounded-lg">
                {updatedInfoFromCart.cartCount}
              </button>

              <button
                className=" w-full  bottom-0  bg-white rounded-lg text-green-700 font-bold text-lg"
                onClick={handleAddItemToCart}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuItem;
