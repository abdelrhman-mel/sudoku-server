// puzzleGenerator.js

// Helper function to check if a number is valid to place at a given position
function isValid(grid, row, col, num) {
  // Check if the number is already present in the current row or column
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }

  // Check if the number is already present in the current 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

// Recursive function to solve the Sudoku puzzle using backtracking
function solveSudoku(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Function to generate a new Sudoku puzzle of the specified difficulty
function generateSudokuPuzzle(difficulty) {
  const grid = [];
  // Initialize empty grid
  for (let i = 0; i < 9; i++) {
    grid.push(Array(9).fill(0));
  }

  // Solve the empty grid to generate a complete Sudoku solution
  solveSudoku(grid);

  // Based on the difficulty, remove numbers from the complete solution
  let numToRemove;
  if (difficulty === "easy") {
    numToRemove = 19;
  } else if (difficulty === "medium") {
    numToRemove = 28;
  } else if (difficulty === "hard") {
    numToRemove = 37;
  } else if (difficulty === "expert") {
    numToRemove = 46;
  } else if (difficulty === "insane") {
    numToRemove = 55;
  } else {
    throw new Error("Invalid difficulty level");
  }

  // Randomly remove numbers from the grid to create the puzzle
  let removedCount = 0;
  while (removedCount < numToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removedCount++;
    }
  }

  return grid;
}

module.exports = { generateSudokuPuzzle };
