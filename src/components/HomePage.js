import React, { useEffect, useState } from "react";
import { swiggy_restaurants_list_url } from "../utils/constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [restList, setRestList] = useState([]);
  const [filteredRestList, setFilteredRestList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const isOnline = useSelector((sub) => sub.Online.isOnline);

  const fetchRestautantsListFromSwiggy = async () => {
    try {
      const response = await fetch(swiggy_restaurants_list_url);
      if (!response.ok) {
        throw new Error("ERROR IN FETCHING DATA...");
      }
      const jsonData = await response.json();
      const restList = jsonData.data.cards.filter((item) => {
        return item?.card?.card?.id === "restaurant_grid_listing";
      });

      setRestList(
        restList?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    } catch (err) {
      console.log(err);
    }
  };

  function filterDataAndUpdateScreen(restToSearch) {
    const filteredData = restList.filter((e) =>
      e?.info?.name?.toLowerCase()?.includes(restToSearch.toLowerCase())
    );
    setFilteredRestList(filteredData);
  }

  function handleSearchChanges(e) {
    setSearchText(e.target.value); // this doesnt update searchtext instantly, it updates on next render **
    filterDataAndUpdateScreen(e.target.value); // thats why we passed "e.target.value" instead of searchText
  }

  useEffect(() => {
    fetchRestautantsListFromSwiggy();
  }, []);

  if (!isOnline) {
    return (
      <div className="font-bold w-1/2 text-center mx-auto mt-40">
        <span>&#9888;</span>Oops Looks like you lost Internet Connectivity
      </div>
    );
  }

  return (
    <div className="mt-5">
      {restList.length === 0 ? (
        <Shimmer />
      ) : (
        <div>
          <div className="sm:w-1/2 sm:mx-auto m-10  border-2 rounded-full">
            <input
              className="w-full p-3  rounded-full"
              type="search"
              placeholder="Enter Restaurant's name"
              value={searchText}
              onChange={handleSearchChanges}
            />
          </div>
          {searchText.length > 0 ? (
            filteredRestList?.length === 0 ? (
              <div className="text-center">
                No Restaurant found with name : {searchText}
              </div>
            ) : (
              <div className="sm:mx-24 flex flex-wrap justify-center">
                {filteredRestList?.map((item) => (
                  <a
                    href={"/restaurant/" + item?.info?.id}
                    key={item?.info?.id}
                  >
                    <RestaurantCard restInfo={item?.info} />
                  </a>
                ))}
              </div>
            )
          ) : (
            <div>
              <div className="text-center text-2xl font-extrabold font-serif">
                Top restaurant chains in Mumbai
              </div>
              <div className="sm:mx-24 flex flex-wrap justify-center">
                {restList.map((item) => (
                  <a
                    href={"/restaurant/" + item?.info?.id}
                    key={item?.info?.id}
                  >
                    <RestaurantCard restInfo={item?.info} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

/**
 * POST to https://www.swiggy.com/dapi/restaurants/list/update
 * {
    "lat": 19.0759837,
    "lng": 72.8776559,
    "nextOffset": "COVCELQ4KICQhu7KuqysdTCnEzgC",
    "widgetOffset": {
        "NewListingView_Topical_Fullbleed": "",
        "NewListingView_Topical_Version2": "",
        "NewListingView_category_bar_chicletranking_TwoRows": "",
        "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
        "Restaurant_Group_WebView_PB_Theme": "",
        "Restaurant_Group_WebView_SEO_PB_Theme": "",
        "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": "10",
        "inlineFacetFilter": "",
        "restaurantCountWidget": ""
    },
    "filters": {},
    "seoParams": {
        "seoUrl": "https://www.swiggy.com/",
        "pageType": "FOOD_HOMEPAGE",
        "apiName": "FoodHomePage"
    },
    "page_type": "DESKTOP_WEB_LISTING",
    "_csrf": "lOLeq7DGdNSD-rslNEZtOxxph6H3N8AOlPc6CgI0"
}
 */
