const { Row } = require('../models/associations.js');

const getRowByNumber = async (req, res) => {
  const { number } = req.params;

  try {
    const row = await Row.findOne({
      where: { number },
    });

    if (!row) {
      return res.status(404).json({ message: 'Row not found' });
    }

    res.json(row);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while getting row by number' });
  }
};

module.exports = {
  getRowByNumber,
};