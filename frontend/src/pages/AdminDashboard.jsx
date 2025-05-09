import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import EquipmentDashboard from './EquipmentDashboard';
import AddEquipment from './AddEquipment';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/requests/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res);

        // Handle both plain array or { requests: [...] } format
        const result = Array.isArray(res.data) ? res.data : res.data.requests;

        if (Array.isArray(result)) {
          setRequests(result);
        } else {
          setError('Unexpected response format.');
          console.error('Response was not an array:', res.data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleApproveRequest = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/requests/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(res.data);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: 'approved' } : req
        )
      );
      alert('Request approved!');
    } catch (err) {
      console.error(err);
      alert('Failed to approve request.');
    }
  };

  return (
    <div className="p-6">
      <Sidebar />

      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - All Requests</h2>
      {error && <p className="text-red-500">{error}</p>}
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Equipment</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Requested At</th>
              <th className="border px-4 py-2">Return Date</th>
              <th className="border px-4 py-2">Approve</th> {/* New Approve column */}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="border px-4 py-2">{req.user?.name || 'Unknown'}</td>
                <td className="border px-4 py-2">{req.equipment?.name || 'Unknown'}</td>
                <td className="border px-4 py-2">{req.quantity}</td>
                <td className="border px-4 py-2">{req.status}</td>
                <td className="border px-4 py-2">{new Date(req.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  {req.returnDate ? new Date(req.returnDate).toLocaleString() : 'N/A'}
                </td>
                <td className="border px-4 py-2">
                  {req.status === 'requested' && (
                    <button
                      onClick={() => handleApproveRequest(req._id)} // Trigger approval action
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
