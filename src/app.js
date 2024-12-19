// app.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Database and Passport Configuration
require('./config/database');
require('./config/passport')(passport);

// Routes
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
