import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {Map} from './components/Map';
import {CountryInfo} from './components/CountryInfo';
import './App.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

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
