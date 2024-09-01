import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Requests() {
    const [isApproving, setIsApproving] = useState(false);

    const [ads, setAds] = useState([]);
    
    useEffect(() => {
        fetchAds();
    }, []);
    
    const fetchAds = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/submit-advertisements');
          setAds(response.data);
        } catch (error) {
          console.error('Error fetching ads:', error);
        }
      };
    
    
      const approveAd = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/toggle-advertisement/${id}`);
            fetchAds(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving ad:', error);
        }
    };
    const toggleAdStatus = async (id) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/advertisement/${id}`);
          console.log(response.data.message);
          fetchAds(); // Refresh the list after toggling
        } catch (error) {
          console.error('Error toggling ad status:', error);
        }
      };


  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    {Array.isArray(ads) ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad.ID} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{ad.TITLE}</h2>
            <p className="text-gray-600">{ad.DESCRIPTION.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">Status: {ad.STATUS}</p>
            <button
    onClick={() => approveAd(ad.ID)}
    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    disabled={ad.STATUS === 'APPROVED' || isApproving}
>
    {ad.STATUS === 'APPROVED' ? 'Approved' : isApproving ? 'Approving...' : 'Approve'}
</button>


          </div>
        ))}
      </div>
    ) : (
        <p>Loading ads....</p>
    )}
    </div>
  );
}

export default Requests;