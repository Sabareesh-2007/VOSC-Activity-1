const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];
const CORNERS = [0, 2, 6, 8];

const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const modeEl = document.getElementById("mode");
const difficultyEl = document.getElementById("difficulty");
const difficultyLabel = document.getElementById("difficulty-label");
const labelO = document.getElementById("label-o");
const scoreEls = {
  X: document.getElementById("score-x"),
  O: document.getElementById("score-o"),
  draw: document.getElementById("score-draw")
};

const HUMAN = "X";
const COMPUTER = "O";

let board, current, gameOver, locked;
const scores = { X: 0, O: 0, draw: 0 };
let startingPlayer = "X";

const vsComputer = () => modeEl.value === "cpu";
const playerName = p => (vsComputer() && p === COMPUTER ? "Computer" : `Player ${p}`);

function startRound() {
  board = Array(9).fill("");
  current = startingPlayer;
  gameOver = false;
  locked = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.className = "cell";
  });
  statusEl.textContent = `${playerName(current)}'s turn`;
  maybeComputerTurn();
}

function findWinner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

function placeMark(index) {
  board[index] = current;
  cells[index].textContent = current;
  cells[index].classList.add(current.toLowerCase());
  cells[index].disabled = true;

  const result = findWinner();
  if (result) {
    gameOver = true;
    result.line.forEach(i => cells[i].classList.add("win"));
    scores[result.player]++;
    statusEl.textContent = `${playerName(result.player)} wins!`;
  } else if (board.every(Boolean)) {
    gameOver = true;
    scores.draw++;
    statusEl.textContent = "It's a draw.";
  } else {
    current = current === "X" ? "O" : "X";
    statusEl.textContent = `${playerName(current)}'s turn`;
  }

  if (gameOver) {
    cells.forEach(cell => (cell.disabled = true));
    updateScores();
  } else {
    maybeComputerTurn();
  }
}

function handleClick(e) {
  const index = Number(e.target.dataset.index);
  if (gameOver || locked || board[index]) return;
  placeMark(index);
}

/* ---------- Computer opponent ---------- */

function emptySquares() {
  return board.map((v, i) => (v ? null : i)).filter(i => i !== null);
}

// Returns a square that completes a line for `player`, or null.
function findWinningMove(player) {
  for (const index of emptySquares()) {
    board[index] = player;
    const wins = findWinner() !== null;
    board[index] = "";
    if (wins) return index;
  }
  return null;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function chooseComputerMove() {
  const empty = emptySquares();
  if (difficultyEl.value === "easy") return pickRandom(empty);

  // Hard: win > block > center > corner > anything
  const win = findWinningMove(COMPUTER);
  if (win !== null) return win;

  const block = findWinningMove(HUMAN);
  if (block !== null) return block;

  if (!board[4]) return 4;

  const freeCorners = CORNERS.filter(i => !board[i]);
  if (freeCorners.length) return pickRandom(freeCorners);

  return pickRandom(empty);
}

function maybeComputerTurn() {
  if (!vsComputer() || gameOver || current !== COMPUTER) return;
  locked = true; // ignore clicks while the computer "thinks"
  setTimeout(() => {
    locked = false;
    if (!gameOver) placeMark(chooseComputerMove());
  }, 450);
}

/* ---------- Scores & controls ---------- */

function updateScores() {
  scoreEls.X.textContent = scores.X;
  scoreEls.O.textContent = scores.O;
  scoreEls.draw.textContent = scores.draw;
}

function resetScores() {
  scores.X = scores.O = scores.draw = 0;
  startingPlayer = "X";
  updateScores();
}

function applyModeChange() {
  difficultyLabel.hidden = !vsComputer();
  labelO.textContent = vsComputer() ? "Computer" : "Player O";
  resetScores();
  startRound();
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
modeEl.addEventListener("change", applyModeChange);
difficultyEl.addEventListener("change", () => { resetScores(); startRound(); });

document.getElementById("new-round").addEventListener("click", () => {
  startingPlayer = startingPlayer === "X" ? "O" : "X"; // alternate who starts
  startRound();
});

document.getElementById("reset-scores").addEventListener("click", () => {
  resetScores();
  startRound();
});

applyModeChange();
