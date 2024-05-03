const { Sequelize } = require('sequelize');
const sequelize = require('../config/db.js');


const getTicketCountForLastMonth = async (req, res) => {
  try {
    const query = 'SELECT dbo.GetTicketCountForLastMonth() AS ticket_count';
    const result = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    res.status(200).json(result[0]);
  } catch (error) {
    throw error;
  }
};

const getTicketCountPerMovie = async (req, res) => {
    try {
      const query = 'SELECT * FROM dbo.GetTicketCountPerMovie() ORDER BY ticket_count DESC'; 
      const result = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  };

const getTicketCountsByTimeOfDay = async (req, res) => {
  try {
    const query = 'SELECT * FROM dbo.GetTicketCountsByTimeOfDay()';
    const result = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    res.status(200).json(result[0]);
  } catch (error) {
    throw error;
  }
};

const getTotalRevenueLastMonth = async (req, res) => {
  try {
    const query = 'SELECT dbo.GetTotalRevenueLastMonth() AS total_revenue;'
    const result = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
   
    res.status(200).json(result[0]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTicketCountForLastMonth,
  getTicketCountPerMovie,
  getTicketCountsByTimeOfDay,
  getTotalRevenueLastMonth,
};
