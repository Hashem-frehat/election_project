import React, { useState, useEffect } from 'react';
// import { FiUsers, FiList, FiFlag, FiCheckSquare, FiRefreshCw } from 'react-icons/fi';
import { FiUsers, FiList, FiFlag, FiCheckSquare, FiRefreshCw } from 'react-fi';
import axios from 'axios';

const formatNumber = (num) => new Intl.NumberFormat('ar-EG').format(num);

const OverviewPanel = () => {
  const [stats, setStats] = useState([
    { name: 'إجمالي الناخبين', value: '0', icon: FiUsers, color: 'bg-blue-500' },
    { name: 'القوائم المحلية', value: '0', icon: FiList, color: 'bg-green-500' },
    { name: 'القوائم الحزبية', value: '0', icon: FiFlag, color: 'bg-purple-500' },
    { name: 'أصوات القوائم المحلية', value: '0', icon: FiCheckSquare, color: 'bg-yellow-500' },
    { name: 'أصوات القوائم الحزبية', value: '0', icon: FiCheckSquare, color: 'bg-red-500' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/overview-stats');
      setStats([
        { ...stats[0], value: formatNumber(response.data.totalVoters) },
        { ...stats[1], value: formatNumber(response.data.totalLocalLists) },
        { ...stats[2], value: formatNumber(response.data.totalPartyLists) },
        { ...stats[3], value: formatNumber(response.data.totalLocalVotes) },
        { ...stats[4], value: formatNumber(response.data.totalPartyVotes) },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">لوحة المعلومات</h2>
        <button 
          onClick={fetchData} 
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          disabled={loading}
        >
          <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          تحديث البيانات
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="mr-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {loading ? 'جارِ التحميل...' : item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions section remains unchanged */}
    </div>
  );
};

export default OverviewPanel;