import React, { useState, useEffect } from "react";
import Lawyer from "./Lawyer";
import ReactPaginate from "react-paginate";
import api from "../../utils/api";
import { useParams } from "react-router-dom";

function Items({ currentItems, category, setCurrentItems }) {
  useEffect(() => {
    console.log("current  items to check>>> ", currentItems);

    setCurrentItems([]);
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          padding: "0px",
          marginTop: "30px",
          fontWeight: "bold",
          fontSize: "2.2rem",
          wordSpacing: "10px",
        }}
      >
        {category?.length < 1 ? "Featured" : category}
      </h1>
      <div className="raffle__items">
        {currentItems && currentItems.map((item) => <Lawyer lawyer={item} />)}
      </div>
    </>
  );
}

const Lawyers = ({ searchTerm, sortBy, category }) => {
  const params = useParams();
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [allLiveLawyers, setAllLiveLawyers] = useState([]);
  const [allLawyers, setAllLawyers] = useState([]);
  const [refreshor, setRefreshor] = useState(0);
  useEffect(() => {
    setAllLiveLawyers(
      allLawyers.filter((lawyer) => {
        return lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setItemOffset(0);
  }, [searchTerm]);

  useEffect(() => {
    if (category?.length > 0) {
      console.log("category>> ", category);
      console.log("all LAwyers>> ", allLawyers);
      setAllLiveLawyers(
        allLawyers.filter((lawyer) => {
          return lawyer?.personalInfo?.areasOfPractice.indexOf(category) !== -1;
        })
      );
      setItemOffset(0);
    }
  }, [category, allLawyers, searchTerm, params, category]);

  useEffect(() => {
    api
      .get("/user/lawyers")
      .then((res) => {
        console.log("all live lawyers at raffleItems.js> ", res.data);

        var temp = res.data;
        var array = res.data;
        // var n = array.length;
        // var j = 0;
        // for (var i = 0; i < 40; i++) {
        //   if (j === n) {
        //     i = 0;
        //   }
        //   array.push(temp[j]);
        //   j++;
        // }

        let tempLawyers = array.sort(function (a, b) {
          return new Date(a.expiryDate) - new Date(b.expiryDate);
        });
        setAllLiveLawyers(tempLawyers);
        setAllLawyers(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    width < 768 ? setItemsPerPage(18) : setItemsPerPage(36);
  }, []);
  useEffect(() => {
    console.log("change in all live Lawyers");

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(allLiveLawyers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allLiveLawyers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allLiveLawyers, refreshor, category, params]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allLiveLawyers.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items
        currentItems={currentItems}
        setCurrentItems={setCurrentItems}
        category={category}
      />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Lawyers;
