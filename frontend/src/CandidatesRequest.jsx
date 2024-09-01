import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, UserPlus, Check, Trash2 } from "lucide-react";

function CombinedListForm() {
  const [formType, setFormType] = useState("local"); // "local" or "party"

  // Local List State
  const [listName, setListName] = useState("");
  const [circleId, setCircleId] = useState("");
  const [candidates, setCandidates] = useState([
    { nationalId: "", typeOfChair: "" },
  ]);

  // Party List State
  const [parties, setParties] = useState([]);
  const [selectedPartyId, setSelectedPartyId] = useState("");
  const [members, setMembers] = useState([{ nationalId: "" }]);

  // Common State
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (formType === "party") {
      fetchParties();
    }
  }, [formType]);

  const fetchParties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parties");
      setParties(response.data);
    } catch (error) {
      console.error("Error fetching parties:", error);
      setError("فشل في جلب قائمة الأحزاب. الرجاء المحاولة مرة أخرى.");
    }
  };

  // Local List Functions
  const handleAddCandidate = () => {
    setCandidates([...candidates, { nationalId: "", typeOfChair: "" }]);
  };

  const handleCandidateChange = (index, field, value) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const handleRemoveCandidate = (index) => {
    if (index === 0) return;
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
  };

  // Party List Functions
  const handleAddMember = () => {
    setMembers([...members, { nationalId: "" }]);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index].nationalId = value;
    setMembers(newMembers);
  };

  const handleRemoveMember = (index) => {
    if (index === 0) return;
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      if (formType === "local") {
        const response = await axios.post(
          "http://localhost:5000/api/local-lists",
          {
            listName,
            circleId,
            candidates,
          }
        );
        console.log("Local list created:", response.data);
        setSuccess("تم إنشاء القائمة المحلية بنجاح!");
        setListName("");
        setCircleId("");
        setCandidates([{ nationalId: "", typeOfChair: "" }]);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/party-lists",
          {
            partyId: parseInt(selectedPartyId, 10),
            members: members.map((member) => ({
              nationalId: member.nationalId,
            })),
          }
        );
        console.log("Party list created:", response.data);
        setSuccess("تم إنشاء قائمة الحزب بنجاح!");
        setSelectedPartyId("");
        setMembers([{ nationalId: "" }]);
      }
    } catch (error) {
      console.error("Error creating list:", error);
      setError(`فشل في إنشاء القائمة. الرجاء المحاولة مرة أخرى.`);
    }
  };

  return (
    <div
      className="container mx-auto px-4 py-12 bg-gradient-to-br   min-h-screen"
      dir="rtl"
    >
      <h1 className="text-5xl font-bold text-center  mb-12 text-green-900">
        {formType === "local" ? "نموذج القائمة المحلية" : "نموذج قائمة الحزب"}
      </h1>
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setFormType("local")}
          className={`px-6 py-3 rounded-r-xl font-bold  text-lg ${
            formType === "local"
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          القائمة المحلية
        </button>
        <button
          onClick={() => setFormType("party")}
          className={`px-6 py-3 rounded-l-xl font-bold text-lg ${
            formType === "party"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          قائمة الحزب
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10"
      >
        {formType === "local" ? (
          <>
            <div className="mb-8">
              <label
                htmlFor="listName"
                className="block text-gray-800 text-xl font-semibold mb-3"
              >
                اسم القائمة
              </label>
              <input
                type="text"
                id="listName"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="w-full px-4 py-3 text-gray-700 border-2 border-green-200 rounded-xl focus:border-green-500  text-lg"
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="circleId"
                className="block text-gray-800 text-xl font-semibold mb-3"
              >
                اسم الدائره
              </label>
              <input
                type="number"
                id="circleId"
                value={circleId}
                onChange={(e) => setCircleId(e.target.value)}
                className="w-full px-4 py-3 text-gray-700 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-lg"
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-800 text-xl font-semibold mb-3">
                المرشحون
              </label>
              {candidates.map((candidate, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-green-700">
                      المرشح {index + 1}
                    </span>
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCandidate(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <Trash2 size={24} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={candidate.nationalId}
                    onChange={(e) =>
                      handleCandidateChange(index, "nationalId", e.target.value)
                    }
                    className="w-full px-4 py-3 text-gray-700 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-lg mb-2"
                    placeholder="أدخل الرقم الوطني"
                    required
                  />
                  <input
                    type="text"
                    value={candidate.typeOfChair}
                    onChange={(e) =>
                      handleCandidateChange(
                        index,
                        "typeOfChair",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 text-gray-700 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-lg"
                    placeholder="أدخل نوع المقعد"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddCandidate}
                className="mt-4 bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center"
              >
                <UserPlus size={24} className="mr-2" />
                إضافة مرشح آخر
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <label
                htmlFor="partySelect"
                className="block text-gray-800 text-xl font-semibold mb-3"
              >
                اختر الحزب
              </label>
              <select
                id="partySelect"
                value={selectedPartyId}
                onChange={(e) => setSelectedPartyId(e.target.value)}
                className="w-full px-4 py-3 text-gray-700 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-lg"
                required
              >
                <option value="">اختر حزبًا</option>
                {parties.map((party) => (
                  <option key={party.PARTY_ID} value={party.PARTY_ID}>
                    {party.PARTY_NAME}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-8">
              <label className="block text-gray-800 text-xl font-semibold mb-3">
                الأعضاء
              </label>
              {members.map((member, index) => (
                <div key={index} className="flex mb-4">
                  <input
                    type="text"
                    value={member.nationalId}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    className="flex-grow px-4 py-3 text-gray-700 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-lg"
                    placeholder="أدخل الرقم الوطني"
                    required
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMember}
                className="mt-4 bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center"
              >
                <UserPlus size={24} className="mr-2" />
                إضافة عضو آخر
              </button>
            </div>
          </>
        )}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 text-xl flex items-center"
          >
            <Check size={24} className="mr-2" />
            {formType === "local"
              ? "إنشاء القائمة المحلية"
              : "إنشاء قائمة الحزب"}
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-500 text-center mt-6 text-xl bg-red-100 p-4 rounded-xl max-w-4xl mx-auto">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 text-center mt-6 text-xl bg-green-100 p-4 rounded-xl max-w-4xl mx-auto">
          {success}
        </p>
      )}
    </div>
  );
}

export default CombinedListForm;
