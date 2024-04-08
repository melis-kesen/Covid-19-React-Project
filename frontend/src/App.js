import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {Map} from './Map';
import {CountryInfo} from './CountryInfo';
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<Map />} />
      <Route path="/:name" element={<CountryInfo></CountryInfo>} />
      </Routes>
    </Router>
  );
}

export default App;
