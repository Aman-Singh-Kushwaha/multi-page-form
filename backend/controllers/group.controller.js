const pool = require('../config/db.js');


const createGroup = async (req, res, next) => {
  const { name, admin_name, members_count, niches, channel_screenshot_url, image_date_updated } = req.body;
  try {
    const query = `
      INSERT INTO groups (name, admin_name, members_count, niches, channel_screenshot_url, image_date_updated)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, admin_name, members_count, JSON.stringify(niches), channel_screenshot_url, image_date_updated];
    
    const result = await pool.query(query, values);
    res.status(201).json({ group: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

// [TODO] Should implement filtering and pagination
const getGroups = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM groups ORDER BY id DESC');
    res.status(200).json({ groups: result.rows });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGroup, getGroups };