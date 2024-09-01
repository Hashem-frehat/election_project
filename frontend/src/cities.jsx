import React, { useEffect, useState } from "react";
import axios from "axios";
import flag from "./assets/jrdan_flag.png";
import { useNavigate } from "react-router-dom";

const GridItem = ({ city, circle_num, onClick, clickable }) => (
  <div
    className={`bg-white p-4 rounded-lg shadow-md flex flex-col hover:scale-105 transition-transform duration-300 items-center ${
      clickable ? "cursor-pointer shadow-green-800" : "cursor-not-allowed"
    }`}
    onClick={clickable ? onClick : undefined}
  >
    <div className="w-40 h-40 mb-4 ">
      <img src={flag} alt="علم الأردن" className="w-full h-full object-cover" />
    </div>
    <p className="text-lg font-semibold mb-2">{city}</p>
    <div className="bg-gray-100 rounded-full px-3 py-1">
      <span className="text-sm">الدائرة {circle_num}</span>
    </div>
  </div>
);

const ArabicGrid = () => {
  const navigate = useNavigate();
  const [circleId, setCircleId] = useState(null);

  useEffect(() => {
    const checkLocalVoteStatus = async () => {
      try {
        const national_id = "1234567906";
        // const national_id = sessionStorage.getItem("national_id");

        const response = await axios.get(
          `http://localhost:5000/voting/${national_id}`
        );
        console.log(response);
        const circleIdFromResponse = `${response.data.CIRCLE_ID}`;
        setCircleId(circleIdFromResponse);
        sessionStorage.setItem("Circle_id", circleIdFromResponse);
      } catch (error) {
        console.error("Error fetching vote status:", error);
      }
    };

    checkLocalVoteStatus();
  }, []);

  const handleClick = () => {
    navigate("/localVote");
  };

  const data = [
    { city: "الزرقاء", circle_num: "الأولى" },
    { city: "عمان", circle_num: "الأولى" },
    { city: "عمان", circle_num: "الثانية" },
    { city: "عمان", circle_num: "الثالثة" },
    { city: "إربد", circle_num: "الأولى" },
    { city: "إربد", circle_num: "الثانية" },
    { city: "الكرك", circle_num: "الأولى" },
    { city: "الطفيلة", circle_num: "الأولى" },
    { city: "معان", circle_num: "الأولى" },
    { city: "المفرق", circle_num: "الأولى" },
    { city: "السلط", circle_num: "الأولى" },
    { city: "جرش", circle_num: "الأولى" },
    { city: "العقبة", circle_num: "الأولى" },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
          {" "}
          {data.map((item, index) => {
            const isClickable =
              (circleId === "3" &&
                item.city === "عمان" &&
                item.circle_num === "الثالثة") ||
              (circleId === "2" &&
                item.city === "الزرقاء" &&
                item.circle_num === "الأولى") ||
              (circleId === "1" &&
                item.city === "عمان" &&
                item.circle_num === "الأولى");

            return (
              <GridItem
                key={index}
                city={item.city}
                circle_num={item.circle_num}
                onClick={handleClick}
                clickable={isClickable}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArabicGrid;
