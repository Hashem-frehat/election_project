import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, UserPlus, Check } from "lucide-react";

function PartyListForm() {
  const [parties, setParties] = useState([]);
  const [selectedPartyId, setSelectedPartyId] = useState("");
  const [members, setMembers] = useState([{ nationalId: "" }]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parties");
      setParties(response.data);
    } catch (error) {
      console.error("Error fetching parties:", error);
      setError("فشل في جلب قائمة الأحزاب. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleAddMember = () => {
    setMembers([...members, { nationalId: "" }]);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index].nationalId = value;
    setMembers(newMembers);
  };

  const handleRemoveMember = (index) => {
    if (index === 0) return; // Prevent removing the first input
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
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
      // Reset form
      setSelectedPartyId("");
      setMembers([{ nationalId: "" }]);
    } catch (error) {
      console.error(
        "Error creating party list:",
        error.response?.data?.error || error.message
      );
      setError("فشل في إنشاء قائمة الحزب. الرجاء المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 text-indigo-900">
        نموذج قائمة الحزب
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10"
      >
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
            className="w-full px-4 py-3 text-gray-700 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-lg"
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
                className="flex-grow px-4 py-3 text-gray-700 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-lg"
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
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center"
          >
            <UserPlus size={24} className="mr-2" />
            إضافة عضو آخر
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 text-xl flex items-center"
          >
            <Check size={24} className="mr-2" />
            إنشاء قائمة الحزب
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

export default PartyListForm;
