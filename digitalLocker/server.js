const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT || 9000;
const auth = require('./routes/auth');
const secret = require('./routes/secret');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', auth);
app.use('/api/secret', secret);
app.listen(PORT, () => console.log('Server connected at PORT 8000'));

