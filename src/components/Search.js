import React, { useEffect, useState } from "react";
import {
  swiggy_prefetch_suggestions_URL,
  swiggy_search_URL,
} from "../utils/constants";
import SuggestionCard from "./SuggestionCard";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchTextChanges = (e) => {
    setSearchText(e.target.value);
    fetchDataFromSwiggyAndUpdateUI(e.target.value);
  };

  const fetchDataFromSwiggyAndUpdateUI = async (searchParam) => {
    const response = await fetch(swiggy_search_URL + searchParam);
    const jsonData = await response.json();
    console.log(jsonData);
    if (jsonData.statusCode === 0) {
      setSuggestions(jsonData?.data?.suggestions);
    }
  };

  const fetchSuggestions = async () => {
    const response = await fetch(swiggy_prefetch_suggestions_URL);
    const jsonData = await response.json();
    console.log(jsonData);
    // if (jsonData.statusCode === 0) {
    //   setSuggestions(jsonData?.data?.suggestions);
    // }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="sm:w-1/2 sm:mx-auto">
      <div className=" m-10  border-2 rounded-full">
        <input
          className="w-full p-3  rounded-full"
          type="search"
          placeholder="Search for restaurants and food "
          value={searchText}
          onChange={handleSearchTextChanges}
        />
      </div>
      <div>
        {suggestions.length === 0
          ? ""
          : suggestions.map((item) => (
              <SuggestionCard key={item.id} info={item} />
            ))}
      </div>
    </div>
  );
};

export default Search;
