import React, { useState, useEffect } from 'react';
// import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiRefreshCw  } from 'react-fi';
import axios from 'axios';

const CandidatesPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', party: '', list: 'حزبي', votes: 0, seatType: 'عادي' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(10);
  const [stats, setStats] = useState({
    totalLocalCandidates: 0,
    approvedLocalCandidates: 0,
    totalPartyCandidates: 0,
    approvedPartyCandidates: 0,
    totalLocalVotes: 0,
    totalPartyVotes: 0,
  });

  useEffect(() => {
    fetchCandidates();
    fetchStats();
  }, []);

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/candidates');
      const { localLists, partyCandidates } = response.data;
      
      const formattedCandidates = [
        ...localLists.map(candidate => ({
          id: candidate.NATIONAL_ID,
          name: candidate.NAME,
          party: 'Local List',
          list: 'محلي',
          votes: candidate.VOTES || 0,
          seatType: candidate.SEAT_TYPE || 'عادي'
        })),
        ...partyCandidates.map(candidate => ({
          id: candidate.NATIONAL_ID,
          name: candidate.NAME,
          party: candidate.PARTY_NAME,
          list: 'حزبي',
          votes: candidate.VOTES || 0,
          seatType: candidate.SEAT_TYPE || 'عادي'
        }))
      ];
  
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
    setIsLoading(false);
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/overview-stats');
      setStats({
        totalLocalCandidates: response.data.totalLocalCandidates,
        approvedLocalCandidates: response.data.approvedLocalCandidates,
        totalPartyCandidates: response.data.totalPartyCandidates,
        approvedPartyCandidates: response.data.approvedPartyCandidates,
        totalLocalVotes: response.data.totalLocalVotes,
        totalPartyVotes: response.data.totalPartyVotes,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate({ ...newCandidate, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!newCandidate.name.trim()) tempErrors.name = "الاسم مطلوب";
    if (!newCandidate.party.trim()) tempErrors.party = "الحزب مطلوب";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let endpoint = newCandidate.list === 'حزبي' ? '/api/party-candidates' : '/api/local-lists';
        const response = await axios.post(endpoint, {
          NATIONAL_ID: newCandidate.id, // You might need to generate this
          NAME: newCandidate.name,
          PARTY_NAME: newCandidate.party, // Only for party candidates
          VOTES: newCandidate.votes,
          SEAT_TYPE: newCandidate.seatType,
          // Add any other necessary fields
        });
        
        // Assuming the API returns the newly created candidate
        const newCandidateData = response.data;
        setCandidates([...candidates, formatCandidateData(newCandidateData)]);
        setNewCandidate({ name: '', party: '', list: 'حزبي', votes: 0, seatType: 'عادي' });
        setShowForm(false);
      } catch (error) {
        console.error('Error adding candidate:', error);
      }
    }
  };
  
  // Helper function to format candidate data
  const formatCandidateData = (data) => ({
    id: data.NATIONAL_ID,
    name: data.NAME,
    party: data.PARTY_NAME || 'Local List',
    list: data.PARTY_NAME ? 'حزبي' : 'محلي',
    votes: data.VOTES || 0,
    seatType: data.SEAT_TYPE || 'عادي'
  });

  const handleEdit = (id) => {
    // Implement edit logic
    console.log(`Edit candidate with id: ${id}`);
  };

  const handleDelete = async (id, listType) => {
    try {
      const endpoint = listType === 'حزبي' ? `/api/party-candidates/${id}` : `/api/local-lists/${id}`;
      await axios.delete(endpoint);
      setCandidates(candidates.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <div className="text-center mt-8">جاري التحميل...</div>;


  return (
    <div>
            <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة المرشحين</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <FiPlus className="ml-2" /> إضافة مرشح جديد
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">المرشحون المحليون</h3>
          <p>الإجمالي: {stats.totalLocalCandidates}</p>
          <p>المعتمدون: {stats.approvedLocalCandidates}</p>
          <p>الأصوات: {stats.totalLocalVotes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">المرشحون الحزبيون</h3>
          <p>الإجمالي: {stats.totalPartyCandidates}</p>
          <p>المعتمدون: {stats.approvedPartyCandidates}</p>
          <p>الأصوات: {stats.totalPartyVotes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">إجمالي الأصوات</h3>
          <p>{stats.totalLocalVotes + stats.totalPartyVotes}</p>
        </div>
      </div>

      
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">إضافة مرشح جديد</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <input
                type="text"
                name="name"
                placeholder="اسم المرشح"
                value={newCandidate.name}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="text"
                name="party"
                placeholder="الحزب"
                value={newCandidate.party}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
                required
              />
              {errors.party && <p className="text-red-500 text-xs mt-1">{errors.party}</p>}
            </div>
            <select
              name="list"
              value={newCandidate.list}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            >
              <option value="حزبي">قائمة حزبية</option>
              <option value="محلي">قائمة محلية</option>
            </select>
            <input
              type="number"
              name="votes"
              placeholder="عدد الأصوات"
              value={newCandidate.votes}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <select
              name="seatType"
              value={newCandidate.seatType}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            >
              <option value="عادي">عادي</option>
              <option value="كوتا">كوتا</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 sm:col-span-3">
              إضافة المرشح
            </button>
          </form>
        </div>
      )}

      <div className="mb-4 flex items-center">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="بحث عن مرشح..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md flex-grow"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عدد الاصوات</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القائمة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع القائمة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع المقعد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td className="px-6 py-4 whitespace-nowrap text-right">{candidate.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{candidate.votes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{candidate.party}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{candidate.list}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{candidate.seatType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                  <button onClick={() => handleEdit(candidate.id)} className="text-indigo-600 hover:text-indigo-900 ml-3">
                    <FiEdit2 />
                  </button>
                  <button onClick={() => handleDelete(candidate.id, candidate.list)} className="text-red-600 hover:text-red-900">
  <FiTrash2 />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredCandidates.length / candidatesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CandidatesPanel;