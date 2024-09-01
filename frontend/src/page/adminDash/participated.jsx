import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiEdit, FiSave, FiX, FiChevronLeft, FiChevronRight } from 'react-fi';

const Participated = () => {
  const [voters, setVoters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalVoters: 0,
    localVotes: 0,
    partyVotes: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [votersPerPage] = useState(10);

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/voters');
      setVoters(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching voters:', error);
      setError('Failed to fetch voters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (voterData) => {
    const total = voterData.length;
    const local = voterData.filter(v => v.IS_LOCAL_VOTE).length;
    const party = voterData.filter(v => v.IS_PARTY_VOTE).length;
    setStats({ totalVoters: total, localVotes: local, partyVotes: party });
  };



  const handleEditClick = (voter) => {
    setEditingId(voter.NATIONAL_ID);
    setEditEmail(voter.EMAIL);
  };

  const handleSaveClick = async (voter) => {
    try {
      await axios.put(`http://localhost:5000/api/voters/${voter.NATIONAL_ID}/email`, { email: editEmail });
      setEditingId(null);
      fetchVoters(); // Refresh the voter list
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditEmail('');
  };
  const filteredVoters = voters.filter(voter =>
    voter.FULL_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voter.NATIONAL_ID.toString().includes(searchTerm) ||
    voter.EMAIL.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current voters
  const indexOfLastVoter = currentPage * votersPerPage;
  const indexOfFirstVoter = indexOfLastVoter - votersPerPage;
  const currentVoters = filteredVoters.slice(indexOfFirstVoter, indexOfLastVoter);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الناخبين</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-800">إجمالي الناخبين</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalVoters}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800">الأصوات المحلية</h3>
          <p className="text-3xl font-bold text-green-600">{stats.localVotes}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-800">الأصوات الحزبية</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.partyVotes}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث عن الناخبين..."
              className="w-full pr-10 pl-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الرقم الوطني</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجنس</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الميلاد</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القائمة المحلية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القائمة الحزبية</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعديل</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVoters.map(voter => (
                <tr key={voter.NATIONAL_ID}>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{voter.FULL_NAME}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{voter.NATIONAL_ID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {editingId === voter.NATIONAL_ID ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      voter.EMAIL
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{voter.GENDER}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{new Date(voter.BIRTH_DATE).toLocaleDateString('ar-JO')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      voter.IS_LOCAL_VOTE ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {voter.IS_LOCAL_VOTE ? 'نعم' : 'لا'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      voter.IS_PARTY_VOTE ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {voter.IS_PARTY_VOTE ? 'نعم' : 'لا'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {editingId === voter.NATIONAL_ID ? (
                      <div className="flex space-x-2">
                        <button onClick={() => handleSaveClick(voter)} className="text-green-600 hover:text-green-900">
                          <FiSave className="w-5 h-5" />
                        </button>
                        <button onClick={handleCancelClick} className="text-red-600 hover:text-red-900">
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleEditClick(voter)} className="text-blue-600 hover:text-blue-900">
                        <FiEdit className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
        <span className="text-gray-600">
          صفحة {currentPage} من {Math.ceil(filteredVoters.length / votersPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredVoters.length / votersPerPage)}
          className="px-4 py-2 border rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Participated;