import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../utils/Store/CartSlice";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer.js";

const Cart = () => {
  const cart = useSelector((sub) => sub.Cart.items);
  const isOnline = useSelector((sub) => sub.Online.isOnline);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  let total = 0;
  cart.map((item) => {
    total =
      total +
      item.cartCount * ((item?.price ? item?.price : item?.defaultPrice) / 100);
  });

  if (!isOnline) {
    return (
      <>
        <div className="font-bold w-1/2 text-center mx-auto mt-40">
          Oops Looks like you lost Internet Connectivity
        </div>
        <Shimmer />
      </>
    );
  }

  return (
    <div className="w-1/2 mx-auto mt-10 self-center">
      <div>
        {cart.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center">
            <h1>Your Cart is Empty</h1>
            <Link to="/">
              <button className="bg-orange-300 p-2 mt-5 text-white font-bold">
                Go to Home Page
              </button>
            </Link>
          </div>
        ) : (
          cart.map((item) => <CartItem key={item.id} info={item} />)
        )}
      </div>

      <div>
        {cart.length === 0 ? (
          ""
        ) : (
          <div>
            <hr />
            <div className="m-5 flex items-center space-x-1">
              <div>Total Price :</div>
              <img
                className="w-4 h-4"
                src="https://cdn-icons-png.flaticon.com/512/846/846194.png"
              />
              <div>{total}</div>
            </div>
            <hr />
            <div className="flex justify-between">
              <button
                className="m-5 p-2 bg-red-500 text-white"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="m-5 p-2 bg-green-500 text-white"
                onClick={() => {}}
              >
                CheckOut
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
