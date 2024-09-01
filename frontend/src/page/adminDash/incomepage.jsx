import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomesPage = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/incomes');
      console.log('Axios response:', response);
      
      // Validate and process the data
      const validatedData = response.data.map(item => ({
        ...item,
        amount: parseFloat(item.amount) || 0, // Convert to number, default to 0 if invalid
        created_at: new Date(item.created_at) // Convert to Date object
      })).filter(item => !isNaN(item.amount) && item.created_at instanceof Date);

      setIncomeData(validatedData);
    } catch (error) {
      console.error('Error fetching income data:', error);
      setError(error.message || 'An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = {
    labels: incomeData.map(item => item.created_at.toLocaleDateString()),
    datasets: [
      {
        label: 'Income',
        data: incomeData.map(item => item.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income Over Time',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Incomes</h1>
      {incomeData.length > 0 ? (
        <>
          <div className="bg-white shadow-md rounded-lg p-6">
            <Line data={chartData} options={options} />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Income Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Currency</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2">{item.created_at.toLocaleDateString()}</td>
                      <td className="px-4 py-2">{item.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.currency}</td>
                      <td className="px-4 py-2">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>No income data available.</p>
      )}
    </div>
  );
};

export default IncomesPage;