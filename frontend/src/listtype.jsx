import React from "react";
import axios from "axios";
import background2 from "./assets/jorflag.jpg";
import { useNavigate } from "react-router-dom";

const ElectionCircleSelection = () => {
  const navigate = useNavigate();

  const national_id = "2000000289";
  // const national_id = sessionStorage.getItem("national_id");

  const handleButtonClick = (type) => {
    console.log("Button clicked:", type);
    if (type === "القوائم المحلية") {
      navigate("/area");
    } else if (type === "القوائم الحزبية") {
      navigate("/partyVote");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h1 style={{ color: "white", marginBottom: "20px" }}>
        الرجاء اختيار الدائرة المناسبة
      </h1> */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {["القوائم الحزبية", "القوائم المحلية"].map((circle, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(circle)}
            className="bg-white text-2xl    font-bold leading-10     w-[18rem] h-[15rem] rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105 shadow-lg"
          >
            {circle}
            <br />
            صوّت الآن
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElectionCircleSelection;
