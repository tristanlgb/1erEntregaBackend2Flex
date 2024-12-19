// app.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();


const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(passport.initialize());

// Db y passport
require('./config/database');
require('./config/passport')(passport);

// ruteo
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);

// puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
