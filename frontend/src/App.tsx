import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Deals from './Deals.tsx';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/deals/:id" element={<Deals/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
