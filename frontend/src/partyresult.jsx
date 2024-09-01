import React, { useState, useEffect } from "react";
import axios from "axios";

const VotingResults = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("generalStats");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/voting/results"
        );
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch voting results");
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!results) return null;

  return (
    <div className="container mx-auto p-4 text-right">
      <h1 className="text-3xl font-bold mb-6">
        نتائج الأنتخابات الأردنبة البرلمانية
      </h1>

      <div className="bg-white shadow-md rounded-lg mb-6">
        <div className="flex justify-center border-b">
          <button
            className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
              activeTab === "generalStats"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("generalStats")}
          >
            الإحصائيات العامة
          </button>
          <button
            className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
              activeTab === "qualifiedLists"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("qualifiedLists")}
          >
            القوائم اللتي تعدت العتبة الأنتخابية
          </button>
          <button
            className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
              activeTab === "seatsPerList"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("seatsPerList")}
          >
            عدد المقاعد لكل قائمة حزبية
          </button>
          <button
            className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
              activeTab === "electedCandidates"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("electedCandidates")}
          >
            الناجحون في القوائم الحزبية
          </button>
        </div>

        {activeTab === "generalStats" && (
          <div className="p-6 text-right">
            <h2 className="text-2xl font-bold mb-4">الإحصائيات العامة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-gray-600 mb-2 font-bold text-xl">
                  عدد المقترعين
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {results.totalPartyVoters}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-gray-600 mb-2 font-bold text-xl">
                  العتبة الإنتخابية
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {results.threshold.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-gray-600 mb-2 font-bold text-xl">
                  الورقة البيضاء
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {results.blankVotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "qualifiedLists" && (
          <div className="p-6 text-right">
            <h2 className="text-2xl font-bold mb-4">
              القوائم اللتي تجاوزت العتبة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.qualifiedLists.map((list) => (
                <div key={list.LIST_ID} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">{list.LIST_NAME}</h3>
                  <p>
                    عدد الأصوات:{" "}
                    <span className="font-bold text-green-500">
                      {list.COUNT_OF_VOTES}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "seatsPerList" && (
          <div className="p-6 text-right">
            <h2 className="text-2xl font-bold mb-4">
              عدد المقاعد لكل قائمة حزبية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.seatsPerList.map((list) => (
                <div key={list.LIST_ID} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">{list.LIST_NAME}</h3>
                  <p>
                    عدد المقاعد:{" "}
                    <span className="font-bold text-green-600">
                      {list.seats}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "electedCandidates" && (
          <div className="p-6 text-right">
            <h2 className="text-2xl font-bold mb-4">
              الناجحون في القوائم الحزبية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.electedCandidates.map((candidate) => (
                <div
                  key={candidate.NATIONAL_ID}
                  className="bg-gray-100 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-bold mb-2">
                    {candidate.FULL_NAME}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingResults;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const VotingResults = () => {
//   const [stats, setStats] = useState({
//     localVoteCount: 0,
//     listsInfo: [],
//     candidatesInfo: [],
//     votingRateByCircle: [],
//     thresholdByCircle: [],
//     listsInfoWithThreshold: {},
//     topCandidates: {},
//     specialSeats: {},
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("generalStats");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/stats");
//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const filteredLists = Object.values(stats.listsInfoWithThreshold)
//     .flatMap((circle) => circle.lists)
//     .filter(
//       (list) =>
//         list.LIST_NAME !== "ورقة بيضاء" &&
//         list.LIST_NAME.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   const filteredCandidates = stats.candidatesInfo.filter((candidate) =>
//     candidate.FULL_NAME.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen text text-right ">
//       <header className="bg-blue-800 text-white p-6">
//         <h1 className="text-4xl font-bold text-center">
//           نتائج الانتخابات 2024
//         </h1>
//       </header>

//       <div className="container mx-auto p-6">
//         <div className="mb-8">
//           <input
//             type="text"
//             placeholder="ابحث عن قائمة أو مرشح..."
//             className="w-full p-3 border-2 border-blue-300 rounded-lg text-lg focus:outline-none focus:border-green-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="flex justify-center border-b mb-6">
//           <button
//             className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
//               activeTab === "generalStats"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("generalStats")}
//           >
//             إحصائيات عامة
//           </button>
//           <button
//             className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
//               activeTab === "lists"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("lists")}
//           >
//             القوائم
//           </button>
//           <button
//             className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
//               activeTab === "candidates"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("candidates")}
//           >
//             المرشحون
//           </button>
//           <button
//             className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
//               activeTab === "thresholdInfo"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("thresholdInfo")}
//           >
//             معلومات العتبة
//           </button>
//           <button
//             className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
//               activeTab === "topCandidates"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("topCandidates")}
//           >
//             أبرز المرشحين
//           </button>
//           <button
//             className={`px-6 py-3 text-lg rounded-t-lg font-bold text-xl ${
//               activeTab === "specialSeats"
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             onClick={() => setActiveTab("specialSeats")}
//           >
//             المقاعد الخاصة
//           </button>
//         </div>

//         {activeTab === "generalStats" && (
//           <section className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
//               إحصائيات عامة
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
//               <div className="bg-blue-100 p-4 rounded-lg">
//                 <h3 className="text-xl font-semibold mb-2">
//                   عدد الأصوات المحلية
//                 </h3>
//                 <p className="text-3xl font-bold text-green-500">
//                   {stats.localVoteCount}
//                 </p>
//               </div>
//               {/* يمكن إضافة المزيد من الإحصائيات هنا */}
//             </div>
//           </section>
//         )}

//         {activeTab === "lists" && (
//           <section className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
//               القوائم
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredLists.map((list, index) => (
//                 <div
//                   key={index}
//                   className="border rounded-lg p-4 hover:shadow-md transition"
//                 >
//                   <h3 className="text-xl font-semibold mb-2">
//                     {list.LIST_NAME}
//                   </h3>
//                   <p>
//                     الأصوات:{" "}
//                     <span className="font-bold text-green-600">
//                       {list.COUNT_OF_VOTES}
//                     </span>
//                   </p>
//                   <p>
//                     المقاعد المخصصة:{" "}
//                     <span className="font-bold text-green-600">
//                       {list.allocatedSeats || 0}
//                     </span>
//                   </p>
//                   <p>
//                     فوق العتبة:{" "}
//                     <span
//                       className={`font-bold ${
//                         list.aboveThreshold ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       {list.aboveThreshold ? "نعم" : "لا"}
//                     </span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {activeTab === "candidates" && (
//           <section className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
//               المرشحون
//             </h2>
//             <Swiper
//               modules={[Navigation, Pagination]}
//               spaceBetween={30}
//               slidesPerView={1}
//               navigation
//               pagination={{ clickable: true }}
//               breakpoints={{
//                 640: {
//                   slidesPerView: 2,
//                 },
//                 768: {
//                   slidesPerView: 4,
//                 },
//                 1024: {
//                   slidesPerView: 7,
//                 },
//               }}
//             >
//               {filteredCandidates.map((candidate, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="border rounded-lg p-4 h-full flex flex-col justify-between">
//                     <h3 className="text-lg font-semibold mb-2">
//                       {candidate.FULL_NAME}
//                     </h3>
//                     <p className="text-2xl font-bold text-green-500">
//                       {candidate.COUNT_OF_VOTES}
//                     </p>
//                     <p className="text-sm text-gray-600">صوت</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </section>
//         )}

//         {activeTab === "thresholdInfo" && (
//           <section className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">
//               معلومات القوائم مع العتبة
//             </h2>
//             {Object.keys(stats.listsInfoWithThreshold).length > 0 ? (
//               Object.entries(stats.listsInfoWithThreshold).map(
//                 ([circleId, circleData]) => (
//                   <div
//                     key={circleId}
//                     className="mb-8 bg-gray-50 rounded-lg p-6"
//                   >
//                     <h3 className="text-2xl font-semibold mb-4">
//                       الدائرة: {circleId}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div className="bg-green-100 p-3 rounded-lg">
//                         <p className="font-semibold">المقاعد المخصصة</p>
//                         <p className="text-2xl font-bold text-green-600">
//                           {circleData.allocatedSeats +
//                             circleData.remainingSeats}
//                         </p>
//                       </div>
//                       <div className="bg-green-100 p-3 rounded-lg">
//                         <p className="font-semibold">إجمالي الأصوات</p>
//                         <p className="text-2xl font-bold text-green-500">
//                           {circleData.totalVotes}
//                         </p>
//                       </div>
//                     </div>
//                     {circleData.lists && circleData.lists.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {circleData.lists.map((list, index) => (
//                           <div
//                             key={index}
//                             className="border rounded-lg p-4 bg-white"
//                           >
//                             <h4 className="text-lg font-semibold mb-2">
//                               {list.LIST_NAME}
//                             </h4>
//                             <p>
//                               الأصوات:{" "}
//                               <span className="font-bold text-green-500">
//                                 {list.COUNT_OF_VOTES}
//                               </span>
//                             </p>
//                             {list.LIST_NAME !== "ورقة بيضاء" && (
//                               <>
//                                 <p>
//                                   فوق العتبة:{" "}
//                                   <span
//                                     className={`font-bold ${
//                                       list.aboveThreshold
//                                         ? "text-green-600"
//                                         : "text-red-600"
//                                     }`}
//                                   >
//                                     {list.aboveThreshold ? "نعم" : "لا"}
//                                   </span>
//                                 </p>
//                                 <p>
//                                   المقاعد المخصصة:{" "}
//                                   <span className="font-bold text-purple-600">
//                                     {list.allocatedSeats}
//                                   </span>
//                                 </p>
//                               </>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-600">
//                         لا توجد قوائم متاحة لهذه الدائرة.
//                       </p>
//                     )}
//                   </div>
//                 )
//               )
//             ) : (
//               <p className="text-gray-600">لا تتوفر معلومات العتبة.</p>
//             )}
//           </section>
//         )}

//         {activeTab === "topCandidates" && (
//           <section className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
//               أبرز المرشحين لكل قائمة
//             </h2>
//             {Object.entries(stats.topCandidates).map(
//               ([circleId, candidates]) => (
//                 <div key={circleId} className="mb-8">
//                   <h3 className="text-2xl font-semibold mb-4">
//                     الدائرة: {circleId}
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {candidates.map((candidate, index) => (
//                       <div
//                         key={index}
//                         className="border rounded-lg p-4 bg-gray-50"
//                       >
//                         <h4 className="text-lg font-semibold mb-2">
//                           {candidate.FULL_NAME}
//                         </h4>
//                         <p>
//                           القائمة:{" "}
//                           <span className="font-bold text-green-500">
//                             {candidate.LIST_NAME}
//                           </span>
//                         </p>
//                         <p>
//                           نوع المقعد:{" "}
//                           <span className="font-bold text-purple-600">
//                             {candidate.TYPE_OF_CHAIR}
//                           </span>
//                         </p>
//                         <p>
//                           الأصوات:{" "}
//                           <span className="font-bold text-green-500">
//                             {candidate.COUNT_OF_VOTES}
//                           </span>
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             )}
//           </section>
//         )}

//         {activeTab === "specialSeats" && (
//           <section className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold mb-6 text-green-500 border-b pb-2">
//               المقاعد الخاصة
//             </h2>
//             {Object.entries(stats.specialSeats).map(
//               ([circleId, candidates]) =>  (
//                 <div key={circleId} className="mb-8">
//                   <h3 className="text-2xl font-semibold mb-4">
//                     الدائرة: {circleId}
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {candidates.map((candidate, index) => (
//                       <div
//                         key={index}
//                         className="border rounded-lg p-4 bg-gray-50"
//                       >
//                         <h4 className="text-lg font-semibold mb-2">
//                           {candidate.FULL_NAME}
//                         </h4>
//                         <p>
//                           نوع المقعد:{" "}
//                           <span className="font-bold text-purple-600">
//                             {candidate.TYPE_OF_CHAIR}
//                           </span>
//                         </p>
//                         <p>
//                           الأصوات:{" "}
//                           <span className="font-bold text-green-600">
//                             {candidate.COUNT_OF_VOTES}
//                           </span>
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;
