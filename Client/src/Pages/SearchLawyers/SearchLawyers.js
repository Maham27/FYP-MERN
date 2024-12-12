import React, { useEffect, useState } from "react";
import "./SearchLawyers.css";

import Footer from "../../Components/Footer/Footer";
import SearchContainer from "../../Components/SearchContainer/SearchContainer";
import Lawyers from "../../Components/Lawyers/Lawyers";
import NNavbar from "../Home/Navbar";
import { useParams } from "react-router-dom";

const SearchLawyers = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    setCategory(params?.category);
  }, [params?.category]);
  return (
    <>
      
        <NNavbar />
        <div className="search__lawyers">
          <SearchContainer
            setSearchTerm={setSearchTerm}
            setSortBy={setSortBy}
          />

          <Lawyers
            searchTerm={searchTerm}
            sortBy={sortBy}
            category={category}
          />
        </div>
      
      <Footer />
    </>
  );
};

export default SearchLawyers;
