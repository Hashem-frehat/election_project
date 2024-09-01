import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdvertisementsSection() {
  const [approvedAds, setApprovedAds] = useState([]);

  useEffect(() => {
    fetchApprovedAds();
  }, []);

  const fetchApprovedAds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/advertisements');
      const approved = response.data.filter(ad => ad.STATUS === 'APPROVED');
      setApprovedAds(approved.slice(0, 3)); // Limit to 3 ads for display
    } catch (error) {
      console.error('Error fetching approved ads:', error);
    }
  };

  return (
    <div className="mb-8">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedAds.map((ad) => (
          <div key={ad.ID} className="border p-4 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <h3 className="font-bold text-lg mb-2">{ad.TITLE}</h3>
            <p className="text-sm mb-2">{ad.DESCRIPTION.substring(0, 100)}...</p>
            <a href={ad.URL} className="text-blue-500 hover:underline">مشاهدة الإعلان</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvertisementsSection;