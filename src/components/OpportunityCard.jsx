import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OpportunityCard.css';

const OpportunityCard = ({ opportunity }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/opportunity/${opportunity.id}`, { state: opportunity });
  };

  return (
    <div className="card">
      <h2 className="card-title">{opportunity.title}</h2>
      <p className="card-description">{opportunity.description}</p>
      <div className="card-footer">
        <p><strong>Company:</strong> {opportunity.company || 'N/A'}</p>
        <p><strong>Location:</strong> {opportunity.location || 'N/A'}</p>
        <button onClick={handleViewDetails} className="card-button">
          Required Skills
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
