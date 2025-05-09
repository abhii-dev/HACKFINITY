import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import Navbar and Footer Components
import Navbar2 from '../components/Navbar2.jsx';
import Footer from '../components/Footer.jsx';

const PlayerDashboard = () => {
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showMyBorrowings, setShowMyBorrowings] = useState(false);
  const [myBorrowings, setMyBorrowings] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/equipment', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      setEquipment(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch equipment.');
    }
  };

  const handleBorrow = async () => {
    try {
      await axios.post(
        'http://localhost:8080/api/requests',
        { equipmentId: selectedEquipment, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Borrow request sent!');
      setShowBorrowModal(false);
    } catch (err) {
      console.error(err);
      alert('Borrow request failed.');
    }
  };

  const handleReturnFromList = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/requests/return/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Equipment returned!');
      fetchMyBorrowings(); // Refresh the borrowings list
    } catch (err) {
      console.error(err);
      alert('Failed to return equipment.');
    }
  };

  const fetchMyBorrowings = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/requests/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMyBorrowings(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch borrowings.');
    }
  };

  const handleOpenMyBorrowings = () => {
    fetchMyBorrowings();
    setShowMyBorrowings(true);
  };

  return (
    <div  >
      {/* Navbar Component */}
      <Navbar2 />

      <div className="p-6 mt-3 text-center absolute top-0 left-190 ">
        {/* <h1 className="text-2xl font-bold mb-6 text-purple-700">Player Dashboard</h1> */}
        <button
          onClick={() => setShowBorrowModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full mr-4 transition"
        >
          Borrow Equipment
        </button>
        <button
          onClick={handleOpenMyBorrowings}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
        >
          My Borrowings
        </button>

        {/* My Borrowings Modal */}
        {showMyBorrowings && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-auto">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">My Borrowings</h2>
              {myBorrowings.length === 0 ? (
                <p className="text-gray-600">No borrowings found.</p>
              ) : (
                <table className="w-full text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Equipment</th>
                      <th className="p-2 border">Quantity</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Return</th> {/* Removed the Action section */}
                    </tr>
                  </thead>
                  <tbody>
                    {myBorrowings.map((req) => (
                      <tr key={req._id} className="border-b">
                        <td className="p-2 border">{req.equipment?.name || 'N/A'}</td>
                        <td className="p-2 border">{req.quantity}</td>
                        <td className="p-2 border">{new Date(req.createdAt).toLocaleDateString()}</td>
                        <td className="p-2 border capitalize">{req.status}</td>
                        <td className="p-2 border">
                          {/* {req.status === 'approved' && ( */}
                            <button
                              onClick={() => handleReturnFromList(req._id)} // Return specific equipment
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                            >
                              Return
                            </button>
                          {/* )} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowMyBorrowings(false)}
                  className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Borrow Equipment Modal */}
{showBorrowModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-purple-700">Borrow Equipment</h2>
      
      <label className="block mb-2 text-left font-medium">Select Equipment</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        value={selectedEquipment}
        onChange={(e) => setSelectedEquipment(e.target.value)}
      >
        <option value="">-- Select --</option>
        {equipment.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name} ({item.quantity} available)
          </option>
        ))}
      </select>

      <label className="block mb-2 text-left font-medium">Quantity</label>
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={handleBorrow}
          disabled={!selectedEquipment || quantity <= 0}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Submit
        </button>
        <button
          onClick={() => setShowBorrowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default PlayerDashboard;
