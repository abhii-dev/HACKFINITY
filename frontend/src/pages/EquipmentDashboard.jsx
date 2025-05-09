// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import EquipmentForm from '../components/EquipmentForm';
// import Sidebar from '../components/Sidebar';

// const EquipmentDashboard = () => {
//   const [equipment, setEquipment] = useState([]);
//   const [editingItem, setEditingItem] = useState(null);

//   const fetchEquipment = async () => {
//     try {
//         const res = await axios.get('http://localhost:8080/api/equipment', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//       console.log(res.data); // Log to check the response
//       setEquipment(res.data); // Ensure it's an array
//       console.log(res);
//     } catch (error) {
//       console.error('Error fetching equipment:', error);
//     }
//   };
  

//   const handleEdit = (item) => setEditingItem(item);

//   const handleFormSubmit = async (data) => {
//     if (editingItem) {
//       await axios.put(`http://localhost:8080/api/equipment/${editingItem._id}`, data);
//     } else {
//       await axios.post('/api/equipment', data);
//     }
//     setEditingItem(null);
//     fetchEquipment();
//   };

//   useEffect(() => {
//     fetchEquipment();
//   }, []); // Fetch equipment when the component mounts

//   return (
//     <div className="min-h-screen  text-black p-6">
//         <Sidebar />
//       <h1 className="text-3xl font-bold mb-6">Equipment Management</h1>

//       {/* <EquipmentForm
//         onSubmit={handleFormSubmit}
//         initialData={editingItem}
//         onCancel={() => setEditingItem(null)}
//       /> */}

//       <div className="mt-8">
//         <h2 className="text-2xl mb-4">Inventory</h2>
//         <table className="w-full table-auto rounded">
//           <thead>
//             <tr className="text-left">
//               <th className="p-3">Name</th>
//               <th className="p-3">Quantity</th>
//               <th className="p-3">Location</th>
//               <th className="p-3">Threshold</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(equipment) && equipment.length > 0 ? (
//               equipment.map((item) => (
//                 <tr key={item._id} className="border-b">
//                   <td className="p-3">{item.name}</td>
//                   <td className="p-3">{item.quantity}</td>
//                   <td className="p-3">{item.location}</td>
//                   <td className="p-3">{item.threshold}</td>
//                   <td className="p-3">
//                     <button
//                       className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
//                       onClick={() => handleEdit(item)}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-3">No equipment found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EquipmentDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent  flex justify-center items-center z-50">
      <div className=" p-8 rounded-lg bg-white shadow-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-enter">
        <h2 className="text-2xl mb-4">Edit Equipment</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-semibold">Location</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="threshold" className="block text-sm font-semibold">Threshold</label>
            <input
              type="number"
              id="threshold"
              value={formData.threshold}
              onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EquipmentDashboard = () => {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    location: '',
    threshold: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/equipment', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEquipment(res.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity,
      location: item.location,
      threshold: item.threshold,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingItem) {
        // Update existing item
        await axios.put(
          `http://localhost:8080/api/equipment/${editingItem._id}`,
          formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
        );
      } else {
        // Create new item
        await axios.post('/api/equipment', formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({
        name: '',
        quantity: '',
        location: '',
        threshold: '',
      });
      fetchEquipment(); // Refresh the list
    } catch (error) {
      console.error('Error saving equipment:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      quantity: '',
      location: '',
      threshold: '',
    });
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div className="min-h-screen text-black p-6">
      <Sidebar />
      <h1 className="text-3xl font-bold mb-6">Equipment Management</h1>

      {/* Modal for Editing Equipment */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <div className="mt-8">
        <h2 className="text-2xl mb-4">Inventory</h2>
        <table className="w-full table-auto rounded">
          <thead>
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Location</th>
              <th className="p-3">Threshold</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipment.length > 0 ? (
              equipment.map((item) => (
                <tr key={item._id} className="border-b">
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

// CSS (Add this to your global CSS or inside a <style> tag in the component)
const styles = `
  @keyframes modal-enter {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes modal-exit {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  .animate-modal-enter {
    animation: modal-enter 0.3s forwards;
  }

  .animate-modal-exit {
    animation: modal-exit 0.3s forwards;
  }
`;
// Inject styles into the document
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
