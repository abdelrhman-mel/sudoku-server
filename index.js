const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//db connection using mongoose connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//make an endpoint for generating a soduko game based on a certain difficulty easy medium high impossible
app.use("/api", require("./routes/authRoutes"));
app.use("/api/sudoku", verifyToken, require("./routes/sudokuRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
