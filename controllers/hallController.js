const { Screening, Hall, Seat, Row, Price } = require('../models/associations.js');

const getHallInfoByScreeningId = async (req, res) => {
  try {
    const { screeningId } = req.params;

    // Знаходимо інформацію про сеанс
    const screening = await Screening.findByPk(screeningId);
    if (!screening) {
      return res.status(404).json({ message: 'Screening not found' });
    }

    // Знаходимо інформацію про зал
    const hall = await Hall.findByPk(screening.hall_id, { include: Row });
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    // Знаходимо інформацію про місця в кожному ряду
    const rows = await Promise.all(hall.Rows.map(async (row) => {
        // Знаходимо ціну для поточного ряду
        const price = await Price.findOne({ where: { row_id: row.id, screening_id: screening.id } });
  
        // Знаходимо місця для поточного ряду
        const seats = await Seat.findAll({ where: { row_id: row.id } });
  
        return { 
          ...row.toJSON(), 
          seats: seats.map(seat => seat.toJSON()), 
          price: price ? price.price : null // Додаємо ціну до ряду
        };
    }));

    // Повертаємо інформацію про зал і його місця
    res.json({ hall: { id: hall.id, name: hall.name, rows: rows } });
  } catch (error) {
    console.error('Error getting hall info by screening id:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getHallByNumber = async (hallNumber) => {
  try {
    const hall = await Hall.findOne({
      where: {
        id: hallNumber
      }
    });
    return hall;
  } catch (error) {
    console.error("Error fetching hall by number:", error);
    throw error;
  }
};

module.exports = { getHallInfoByScreeningId,getHallByNumber };
