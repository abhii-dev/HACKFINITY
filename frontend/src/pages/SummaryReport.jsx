import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the summary report data from the backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('/api/reports/summary'); // Adjust the endpoint URL
        setReportData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching report');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Summary Report</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Report Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl">Total Users</h3>
            <p className="text-3xl font-bold">{reportData.totalUsers}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl">Total Equipment</h3>
            <p className="text-3xl font-bold">{reportData.totalEquipment}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl">Total Requests</h3>
            <p className="text-3xl font-bold">{reportData.totalRequests}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl">Active Requests</h3>
            <p className="text-3xl font-bold">{reportData.activeRequests}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl">Returned Requests</h3>
            <p className="text-3xl font-bold">{reportData.returnedRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
