const Equipment = require('../models/Equipment.js');

exports.getAllEquipment = async (req, res) => {
  const equipment = await Equipment.find();
  res.json(equipment);
};

exports.addEquipment = async (req, res) => {
  const { name, quantity, location, threshold } = req.body;
  const newItem = await Equipment.create({ name, quantity, location, threshold });
  res.status(201).json(newItem);
};

exports.editEquipment = async (req, res) => {
  const { id } = req.params;
  const updated = await Equipment.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};
