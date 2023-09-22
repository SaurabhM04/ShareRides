"use client";

import { useState, useEffect } from "react";

import RideCard from "./RideCard";
import LoadingSpinner from "./LoadingSpinner";

const RideCardList = ({ data }) => {
  return (
    <div className='sm:mt-16 mt-4 ride_layout'>
      {data.map((ride) => (
        <RideCard
          key={ride._id}
          ride={ride}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allRides, setAllRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchRides = async () => {
    const response = await fetch("/api/ride");
    const data = await response.json();
    setIsLoading(false);
    setAllRides(data);
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const filterRides = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allRides.filter(
      (ride) =>
        // regex.test(item.creator.username) ||
        // regex.test(item.tag) ||
        regex.test(ride.to)||
        regex.test(ride.from)||
        regex.test(ride.time)||
        regex.test(ride.price)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterRides(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

 
  return (
    <section className='feed'>
      <form className='relative  flex-center sm:w-full w-2/3'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Rides */}
      {searchText ? (
        isLoading ? <LoadingSpinner /> : <RideCardList
          data={searchedResults}
        />
      ) : (
        isLoading ? <LoadingSpinner /> : <RideCardList data={allRides} />
      )}

      
    </section>
  );
};

export default Feed;