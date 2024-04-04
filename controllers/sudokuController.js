const { generateSudokuPuzzle } = require("../services/sudoku/puzzleGenerator");
const Score = require("../models/scoreModel");

// Generate a new Sudoku puzzle
//GET /api/sudoku/puzzles
const generateSudoku = (req, res) => {
  const { dif } = req.body;
  try {
    // Generate a new Sudoku puzzle
    if (!dif) {
      res.status(400).json({ message: "Please provide difficulty." });
    }
    const puzzle = generateSudokuPuzzle(dif);
    res.status(200).json({ puzzle });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate Sudoku puzzle." });
  }
};

// Save the score
//POST /api/sudoku/scores
const saveScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    if (!username || !score) {
      return res
        .status(400)
        .json({ message: "Please provide username and score." });
    }
    // Save the score to the database
    const userScore = new Score({ username, score });
    await userScore.save();
    res.status(201).json({ message: "Score saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to save score." });
  }
};

// Get the high scores
//GET /api/sudoku/scores
const getScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json({ scores });
  } catch (error) {
    res.status(500).json({ message: "No High Scores" });
  }
};
module.exports = {
  generateSudoku,
  saveScore,
  getScores,
};
