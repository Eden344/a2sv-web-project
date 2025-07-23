import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OpportunityDetail from './pages/OpportunityDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/opportunity/:id" element={<OpportunityDetail />} />
    </Routes>
  );
}

export default App;
