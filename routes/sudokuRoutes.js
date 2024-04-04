const express = require("express");
const {
  generateSudoku,
  saveScore,
  getScores,
} = require("../controllers/sudokuController");
const router = express.Router();

// Route to generate a new Sudoku puzzle
router.post(`/puzzles`, generateSudoku);
router.post("/scores", saveScore);
router.get("/scores", getScores);

module.exports = router;
