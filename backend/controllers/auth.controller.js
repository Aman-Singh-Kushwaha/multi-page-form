const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwt');
const pool = require('../config/db');

const signup = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwtUtil.generateToken({ id: user.id, username: user.username });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };