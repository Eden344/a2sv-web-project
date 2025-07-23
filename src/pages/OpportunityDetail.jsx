import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/OpportunityCard.css';

const OpportunityDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <h2>No data found. Please go back and try again.</h2>;

  const { title, requirements, responsibilities } = state;

  return (
    <div className='details'>
      <h2 className='detail-title'>{title}</h2>
      <h3>Responsibilities</h3>
      <p className='responsibility'>{responsibilities || "Not provided"}</p>
      <h3>Requirements</h3>
      <p className='requirment'>{requirements || "Not provided"}</p>
      <button onClick={() => navigate(-1)} className='detail-btn'>← Back</button>
    </div>
  );
};

export default OpportunityDetail;
