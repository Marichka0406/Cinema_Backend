const { Ticket } = require('../models/associations.js');
const { literal } = require('sequelize');

const createTicket = async (req, res) => {
  try {
    console.log(req.body)
    const seatId = req.body.seat_id;
    const userId = req.body.user_id;
    const screeningId = req.body.screening_id;

    // Перевірити, чи передані айді сидіння та айді користувача
    if (!seatId || !userId) {
      return res.status(400).json({ message: 'Seat ID and user ID are required' });
    }


    const currentDate = literal('CURRENT_TIMESTAMP');

// Construct SQL-compatible datetime string
    console.log(currentDate)

    // Створити квиток у базі даних
    const ticket = await Ticket.create({
      screening_id: screeningId,
      seat_id: seatId,
      user_id: userId,
      purchase_date: currentDate,
    });

    // Повернути створений квиток
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Error creating ticket' });
  }
};

const getTicketsByScreeningId = async (req, res) => {
    try {
      const { screeningId } = req.params;
  
      // Перевірка, чи передано айді сеансу
      if (!screeningId) {
        return res.status(400).json({ message: 'Screening ID is required' });
      }
  
      // Отримання квитків за айді сеансу з бази даних
      const tickets = await Ticket.findAll({ where: { screening_id: screeningId } });
  
      // Повернення списку квитків
      res.status(200).json(tickets || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ message: 'Error fetching tickets' });
    }
};

module.exports = { createTicket, getTicketsByScreeningId };
