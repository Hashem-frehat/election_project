import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./page/Header";
import { Image } from "lucide-react";
import bglocal from "./assets/localvote-removebg-preview.png";

const VotingSystem = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const circleId = sessionStorage.getItem("Circle_id");
    if (!circleId) {
      setError("فشل في الحصول على معرف الدائرة");
      return;
    }

    fetchLists(circleId);
    checkVoteStatus();

    // sessionStorage.setItem("national_id", "2000000289");
  }, []);
  const fetchLists = async (circleId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/lists/${circleId}`
      );
      if (Array.isArray(response.data)) {
        setLists(response.data);
        if (response.data.length > 0) {
          fetchCandidates(response.data[0].LIST_ID);
        }
      } else {
        setError("Received invalid data for lists");
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
      setError("Failed to fetch lists. Please try again.");
    }
  };

  const fetchCandidates = async (listId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/candidates/${listId}`
      );
      if (Array.isArray(response.data)) {
        setCandidates(response.data);
      } else {
        setError("Received invalid data for candidates");
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to fetch candidates. Please try again.");
    }
  };

  const handleListSelection = (listId) => {
    setSelectedList(listId);
    fetchCandidates(listId);
    setSelectedCandidates([]);
  };

  const handleCandidateSelection = (candidateId) => {
    if (selectedList) {
      setSelectedCandidates((prev) =>
        prev.includes(candidateId)
          ? prev.filter((id) => id !== candidateId)
          : [...prev, candidateId]
      );
    }
  };

  const checkVoteStatus = async () => {
    const nationalId = sessionStorage.getItem("national_id");
    if (!nationalId) {
      console.error("لم يتم العثور على معرف المستخدم في التخزين المؤقت للجلسة");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/check-vote-status/${nationalId}`
      );
      setHasVoted(response.data.hasVoted);
    } catch (error) {
      console.error("خطأ في التحقق من حالة التصويت:", error);
      setError("فشل في التحقق من حالة التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedList) {
      setError("الرجاء اختيار قائمة أولاً");
      return;
    }

    const nationalId = sessionStorage.getItem("national_id");

    try {
      const response = await axios.post("http://localhost:5000/api/vote-list", {
        listId: selectedList,
        nationalId: nationalId,
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (selectedCandidates.length > 0) {
        await axios.post("http://localhost:5000/api/vote-candidates", {
          candidateIds: selectedCandidates,
        });
      }

      alert("تم تسجيل التصويت بنجاح");
      setHasVoted(true);
      setShowConfirmation(false);
      setSelectedList(null);
      setSelectedCandidates([]);
      setCandidates([]);
      fetchLists(sessionStorage.getItem("Circle_id"));
    } catch (error) {
      console.error("خطأ في تسجيل التصويت:", error);
      setError("فشل في تسجيل التصويت. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationClose = (confirm) => {
    if (confirm) {
      handleSubmit();
    } else {
      setShowConfirmation(false);
    }
  };

  if (error) {
    return <div className="text-red-600 text-center text-xl mt-8">{error}</div>;
  }

  const selectedListName =
    lists.find((list) => list.LIST_ID === selectedList)?.LIST_NAME || "";
  const selectedCandidateNames = candidates
    .filter((candidate) => selectedCandidates.includes(candidate.CANDIDATE_ID))
    .map((candidate) => candidate.FULL_NAME);

  return (
    <div className="container mx-auto px-4 py-8 text-right">
      {/* <h1 className="text-3xl font-bold text-center mb-8">نظام التصويت</h1> */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold my-12">مارس حقك الإنتخابي</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(lists) && lists.length > 0 ? (
            lists.map((list) => (
              <div
                key={list.LIST_ID}
                className={`relative bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
                  selectedList === list.LIST_ID
                    ? "border-4 border-green-600"
                    : "hover:shadow-lg"
                }`}
                style={{
                  backgroundImage: `url(${bglocal})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10 p-6">
                  <div className="flex items-center text-xxl mb-4" dir="rtl">
                    <input
                      type="radio"
                      id={`list-${list.LIST_ID}`}
                      name="list"
                      value={list.LIST_ID}
                      checked={selectedList === list.LIST_ID}
                      onChange={() => handleListSelection(list.LIST_ID)}
                      className="mr-3 h-5 w-5 text-green-600 ml-[1rem]"
                    />
                    <label
                      htmlFor={`list-${list.LIST_ID}`}
                      className="text-lg font-medium cursor-pointer"
                    >
                      {list.LIST_NAME}
                    </label>
                  </div>
                  {selectedList === list.LIST_ID && (
                    <div className="mt-4" dir="rtl">
                      <h3 className="text-md font-semibold text-xl mb-2">
                        المرشحون
                      </h3>
                      {Array.isArray(candidates) && candidates.length > 0 ? (
                        candidates.map((candidate) => (
                          <div key={candidate.CANDIDATE_ID} className="mb-2">
                            <label className="flex items-center space-x-2 rtl:space-x-reverse font-bold">
                              <input
                                type="checkbox"
                                id={`candidate-${candidate.CANDIDATE_ID}`}
                                value={candidate.CANDIDATE_ID}
                                checked={selectedCandidates.includes(
                                  candidate.CANDIDATE_ID
                                )}
                                onChange={() =>
                                  handleCandidateSelection(
                                    candidate.CANDIDATE_ID
                                  )
                                }
                                className="h-4 w-4 text-green-600 rounded text-right"
                                disabled={
                                  !selectedList || selectedList !== list.LIST_ID
                                }
                              />
                              <span className="text-sm">
                                {candidate.FULL_NAME}
                              </span>
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          لا يوجد مرشحون متاحون لهذه القائمة
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              لا توجد قوائم متاحة
            </p>
          )}
        </div>
      </div>
      <div className="text-center mt-8">
        {hasVoted ? (
          <p className="text-green-600 font-semibold">
            لقد قمت بالتصويت بالفعل
          </p>
        ) : (
          <button
            onClick={handleConfirmation}
            disabled={!selectedList}
            className={`px-6 py-3 rounded-full text-white font-semibold ${
              selectedList
                ? "bg-green-700 hover:bg-green-500"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors duration-300`}
          >
            تأكيد التصويت
          </button>
        )}
      </div>
      {showConfirmation && (
        <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
            <h2 className="text-lg font-bold mb-4">تأكيد التصويت</h2>
            <p className="mb-4">
              هل أنت متأكد أنك تريد التصويت للقائمة "{selectedListName}" مع
              المرشحين: {selectedCandidateNames.join(", ")}؟
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => handleConfirmationClose(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                نعم، تأكيد
              </button>
              <button
                onClick={() => handleConfirmationClose(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
    
  );
};

export default VotingSystem;
