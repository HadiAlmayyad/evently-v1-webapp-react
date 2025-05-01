const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());  // Parse JSON bodies

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Evently API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
