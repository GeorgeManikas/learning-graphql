import React, { useState } from "react";
import ArtistData from "./ArtistData";

const SearchForm = () => {
  const [currentArtist, setCurrentArtist] = useState("");

  const handleSubmit = (e) => {
    setCurrentArtist("");
  };
  return (
    <>
      <div className="flex p-8 w-full h-12 bg-indigo-300 justify-end md:justify-between items-center shadow-md opacity-75">
        <form onSubmit={handleSubmit}>
        <label htmlFor="artist" className="inline-flex mr-5 text-2xl text-gray-700"> Artist name: </label>
          <input
            autoComplete="false"
            id="artist"
            type="text"
            value={currentArtist}
            onChange={(e) => setCurrentArtist(e.target.value)}
            placeholder="pick an artist... "
            className="bg-transparent text-gray-200 text-2xl placeholder-gray-700  border-b border-indigo-900 focus:outline-none"
          />
        </form>
        
      </div>
      {currentArtist !== "" ? <ArtistData artist={currentArtist} /> : null}
    </>
  );
};

export default SearchForm;
