import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cart = useSelector((sub) => sub.Cart.items);

  return (
    <div className="shadow-lg flex items-center justify-around">
      <div className="flex items-center">
        <Link to="/">
          <img
            className="w-16"
            src="https://i.pinimg.com/736x/b3/8a/a1/b38aa1b21050b0e769a97eb751d12829.jpg"
            alt="swiggy-logo"
          />
        </Link>
        <Link to="/">
          <h2>Mumbai, Maharashtra, India</h2>
        </Link>
      </div>
      <ul className="flex justify-around space-x-12">
        <Link to="/search">
          <li className="hover:text-orange-400 flex space-x-1">
            <img
              className="w-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/768px-Search_Icon.svg.png"
            />
            <span>Search</span>
          </li>
        </Link>
        <Link to="/offers">
          <li className="hover:text-orange-400 flex space-x-1">
            <img
              className="w-5"
              src="https://cdn-icons-png.flaticon.com/512/2956/2956869.png"
            />
            <span>Offers</span>
          </li>
        </Link>
        <Link to="/help">
          <li className="hover:text-orange-400 flex space-x-1">
            <img
              className="w-5"
              src="https://cdn.icon-icons.com/icons2/1993/PNG/512/circle_customer_help_info_information_service_support_icon_123208.png"
            />
            <span>Help</span>
          </li>
        </Link>
        <Link to="/signin">
          <li className="hover:text-orange-400 flex space-x-1">
            <img
              className="w-5"
              src="https://cdn-icons-png.flaticon.com/512/3106/3106773.png"
            />
            <span>Sign In</span>
          </li>
        </Link>
        <Link to="/cart">
          <li className="hover:text-orange-400 flex space-x-1">
            <img
              className="w-5"
              src="https://www.iconpacks.net/icons/2/free-add-to-cart-icon-3046-thumb.png"
            />
            <span>Cart - {cart.length}</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
