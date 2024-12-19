const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } = req.body;

    // Check if required fields are present
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está en uso' });
    }

    // Create a new user instance
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: bcrypt.hashSync(password, 10), // Hash the password
      cart,
      role: role || 'user', // Default role to 'user'
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Validate password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

