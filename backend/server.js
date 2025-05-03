const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const venueRoutes = require('./routes/venueRoutes');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categoryRoutes');


dotenv.config();

const app = express();
app.use(bodyParser.json());  // Parse JSON bodies
app.use(cors())
const PORT = process.env.PORT || 5000;

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);


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
  console.log('MongoDB connecting .....')

});
