import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EquipmentForm from '../components/EquipmentForm';

const EquipmentDashboard = () => {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/equipment');
      console.log(res.data); // Log to check the response
      setEquipment(res.data); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleFormSubmit = async (data) => {
    if (editingItem) {
      await axios.put(`http://localhost:8080/api/equipment/${editingItem._id}`, data);
    } else {
      await axios.post('/api/equipment', data);
    }
    setEditingItem(null);
    fetchEquipment();
  };

  useEffect(() => {
    fetchEquipment();
  }, []); // Fetch equipment when the component mounts

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Equipment Management</h1>

      <EquipmentForm
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <div className="mt-8">
        <h2 className="text-2xl mb-4">Inventory</h2>
        <table className="w-full table-auto bg-gray-800 rounded">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Location</th>
              <th className="p-3">Threshold</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(equipment) && equipment.length > 0 ? (
              equipment.map((item) => (
                <tr key={item._id} className="border-b border-gray-700">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.location}</td>
                  <td className="p-3">{item.threshold}</td>
                  <td className="p-3">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3">No equipment found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentDashboard;
