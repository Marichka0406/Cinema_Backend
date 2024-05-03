const { Price, Screening, Row, Movie} = require('../models/associations.js');

const getAllPrices = async (req, res) => {
    try {
      const prices = await Price.findAll({
        include: [
          {
            model: Screening,
            attributes: ['id', 'movie_id', 'hall_id', 'date_time'],
            include: [
              {
                model: Movie,
                attributes: ['title'], // Додавання атрибуту назви фільму
              }
            ],
          },
          {
            model: Row,
            attributes: ['id', 'hall_id', 'number'],
          },
        ],
      });
  
      res.json(prices);
    } catch (error) {
      console.error('Error fetching prices:', error);
      res.status(500).json({ message: 'Error fetching prices' });
    }
};


// Контролер для створення ціни
const createPrice = async (req, res) => {
  const { screeningId, rowId, price } = req.body;

  try {
    const newPrice = await Price.create({ screeningId, rowId, price });
    res.status(201).json(newPrice);
  } catch (error) {
    console.error('Error creating price:', error);
    res.status(500).json({ message: 'Error creating price' });
  }
};

// Контролер для оновлення ціни
const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { screeningId, rowId, price } = req.body;
  console.log(req.body)
  try {
    const updatedPrice = await Price.findByPk(id);
    if (!updatedPrice) {
      return res.status(404).json({ message: 'Price not found' });
    }

    updatedPrice.screening_id = screeningId;
    updatedPrice.row_id = rowId;
    updatedPrice.price = price;
    await updatedPrice.save();

    res.json(updatedPrice);
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ message: 'Error updating price' });
  }
};

// Контролер для видалення ціни
const deletePrice = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPrice = await Price.findByPk(id);
    if (!deletedPrice) {
      return res.status(404).json({ message: 'Price not found' });
    }

    await deletedPrice.destroy();

    res.json({ message: 'Price deleted successfully' });
  } catch (error) {
    console.error('Error deleting price:', error);
    res.status(500).json({ message: 'Error deleting price' });
  }
};

module.exports = {
  createPrice,
  updatePrice,
  deletePrice,
  getAllPrices 
};
