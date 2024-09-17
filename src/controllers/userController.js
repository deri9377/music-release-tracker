// controllers/userController.js
const db = require('../db/db');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Controller to add a user
exports.addUser = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error inserting user' });
  }
};
