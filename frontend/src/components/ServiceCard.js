import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow service-card">
      <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl text-white">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-amber-950">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;