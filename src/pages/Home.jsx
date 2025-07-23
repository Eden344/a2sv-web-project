import React from 'react';
import { useGetOpportunitiesQuery } from '../features/api/apiSlice';
import OpportunityCard from '../components/OpportunityCard';

const Home = () => {
  const { data, isLoading, isError, error } = useGetOpportunitiesQuery();
  const loadingMessages = [
  "Fetching opportunities...",
  "Loading available roles...",
  "Connecting to the backend...",
  "Hang tight, almost there...",
  "Just a sec..."
];
const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  const opportunities = data?.data || [];

 if (isLoading) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">{randomMessage}</p>
    </div>
  );
}
  if (isError) return <h2 style={{ color: 'red' }}>Error: {error.error || 'Fetch failed'}</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className ="opps">OPPORTINITIES</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </div>
  );
};

export default Home;
