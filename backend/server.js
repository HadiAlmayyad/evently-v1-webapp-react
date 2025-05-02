const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./backend/routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Evently API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


