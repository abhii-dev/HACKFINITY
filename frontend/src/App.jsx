import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EquipmentDashboard from './pages/EquipmentDashboard';
import SummaryReport from './pages/SummaryReport';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar.jsx'
import EquipmentForm from './components/EquipmentForm.jsx';

function App() {
  return (
    <div className="light min-h-screen text-black">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<EquipmentDashboard />} />
           <Route path="/summary-report" element={<SummaryReport />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/club-inventory" element={<EquipmentForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
