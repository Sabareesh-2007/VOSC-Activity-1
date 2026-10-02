# VOSC Activity-1 – Tic-Tac-Toe

A simple two-player Tic-Tac-Toe game built with only **HTML, CSS and JavaScript** as part of the VOSC prerequisite activity.

## Features

- Two modes: **two players** on one device, or **vs computer**
- Computer opponent with two difficulty levels: **Easy** (random moves) and **Hard** (wins when it can, blocks your winning move, then prefers the center and corners)
- Detects wins (rows, columns, diagonals) and draws
- Highlights the winning line
- Scoreboard for X wins, O wins and draws
- "New round" button (the starting player alternates) and "Reset scores" button
- Responsive layout and keyboard-friendly buttons

## Project Structure

```
VOSC Activity-1/
├── index.html   # Page structure
├── style.css    # Styling
├── script.js    # Game logic
└── README.md    # Project documentation
```

## How to Run

1. Download or clone this repository:
   ```
   git clone https://github.com/<your-username>/VOSC-Activity-1.git
   ```
2. Open the project folder.
3. Double-click `index.html` to open it in any modern browser. No installation or server needed.

## How to Play

1. Choose a mode from the dropdown. In **Vs computer** mode you play X and the computer plays O; pick Easy or Hard.
2. Player X goes first. Click any empty square to place your mark.
3. Players alternate turns.
4. The first player to get three marks in a row (horizontal, vertical or diagonal) wins the round.
5. If all nine squares fill up with no winner, the round is a draw.
6. Click **New round** to play again, or **Reset scores** to start fresh.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (no libraries or frameworks)
