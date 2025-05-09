import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestDashboard = () => {
  const [equipment, setEquipment] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [requestData, setRequestData] = useState({ equipmentId: '', quantity: '' });

  useEffect(() => {
    // Fetch equipment list
    axios.get('http://localhost:8080/api/equipment')
      .then(response => setEquipment(response.data))
      .catch(err => console.error('Error fetching equipment:', err));

    // Fetch the user's requests
    axios.get('http://localhost:8080/api/equipment/borrow')
      .then(response => setMyRequests(response.data))
      .catch(err => console.error('Error fetching requests:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/requests', requestData)
      .then(response => {
        setMyRequests([...myRequests, response.data.request]);
        setRequestData({ equipmentId: '', quantity: '' });
      })
      .catch(err => console.error('Error submitting request:', err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Request Equipment</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <select
          name="equipmentId"
          value={requestData.equipmentId}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select Equipment</option>
          {equipment.map(item => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={requestData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          required
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Request Equipment</button>
      </form>

      <h2 className="text-2xl mb-4">My Requests</h2>
      <table className="w-full table-auto bg-gray-800 rounded">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-3">Equipment</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.map((request) => (
            <tr key={request._id} className="border-b border-gray-700">
              <td className="p-3">{request.equipment.name}</td>
              <td className="p-3">{request.quantity}</td>
              <td className="p-3">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestDashboard;
