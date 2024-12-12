import React, { useState, useEffect } from "react";
import "./CategoryBar.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const CategoryBar = ({ setCategory }) => {
  const [categories, setCategories] = useState([
    "Appliances",
    "Apps & Games",
    "Arts, Crafts, & Sewing",
    "Automotive Parts & Accessories",
    "Baby",
    "Beauty & Personal Care",
    "Books",
    "CDs & Vinyl",
    "Cell Phones & Accessories",
    "Clothing, Shoes and Jewelry",
    "Collectibles & Fine Art",
    "Computers",
    "Electronics",
    "Garden & Outdoor,Grocery & Gourmet Food",
    "Handmade",
    "Health, Household & Baby Care",
    "Home & Kitchen",
    "Industrial & Scientific",
    "Luggage & Travel Gear",
    "Movies & TV",
    "Musical Instruments",
    "Office Products",
    "Pet Supplies",
    "Sports & Outdoors",
    "Tools & Home Improvement",
    "Video Games",
  ]);
  return (
    <div className="category__bar">
      {/* <h1>CategoryBar</h1> */}
      <Splide
        options={{
          rewind: true,
          width: "90%",
          // gap: "0.5rem",
          perPage: 5,
          interval: 5000,

          breakpoints: {
            768: {
              perPage: 2,
              interval: 3000,
              // gap: "0.3rem",
              width: "95%",
            },
          },
        }}
      >
        {categories.map((category) => (
          <SplideSlide onClick={(e) => setCategory(category)}>
            <h1>{category}</h1>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default CategoryBar;
