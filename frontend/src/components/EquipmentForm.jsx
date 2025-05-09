import React, { useEffect, useState } from 'react';

const EquipmentForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    location: '',
    threshold: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        quantity: initialData.quantity,
        location: initialData.location,
        threshold: initialData.threshold,
      });
    } else {
      setFormData({
        name: '',
        quantity: '',
        location: '',
        threshold: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', quantity: '', location: '', threshold: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl">
      <h3 className="text-xl mb-4">{initialData ? 'Edit Equipment' : 'Add New Equipment'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Equipment Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="number"
        name="threshold"
        placeholder="Threshold"
        value={formData.threshold}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        required
      />
      <div className="flex justify-between">
        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          {initialData ? 'Update' : 'Add'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="text-red-400 hover:underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EquipmentForm;
