import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = ({ setSearchTerm, setSortBy }) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const handleSortChange = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };
  return (
    <div className="search__container">
      <div className="search__heading">
        <h1>Find and Book professional lawyers</h1>
      </div>
      <div className="input__area">
        <SearchIcon />
        <input
          type="text"
          placeholder="search lawyers by their title..."
          onChange={(e) => handleSearchChange(e)}
        />

        {/* <button>
          {width < 768 ? (
            <SearchIcon />
          ) : (
            <>
              <SearchIcon />{" "}
              <p style={{ display: "inline", color: "white" }}>Search</p>
            </>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default SearchContainer;
