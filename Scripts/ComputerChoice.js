const player2ChoiceText = document.getElementById("player2Choice");
const resultsText = document.getElementById("results");
const player1ChoiceText = document.getElementById("player1Choice");
const player1ScoreText = document.getElementById("player1Score");
const player2ScoreText = document.getElementById("player2Score");
const roundText = document.getElementById("round");
const menuLink = document.querySelector(".menu-link");

let player1Choice = null;
let computerChoice = null;
let player1Score = 0;
let computerScore = 0;
let currentRound = 1;
let totalRounds = 1;
const gameModetxt = localStorage.getItem("gameMode");

if (gameModetxt === "1 Win") totalRounds = 1;
else if (gameModetxt === "3 Out Of 5") totalRounds = 5;
else if (gameModetxt === "4 Out Of 7") totalRounds = 7;

//Update scores and round--------------------------------------------------
function updateRoundAndScore(winner) {
  if (winner === "player1") player1Score++;
  else if (winner === "computer") computerScore++;

  if (!isGameOver()) {
    currentRound++;
  }

  player1ScoreText.textContent = player1Score;
  player2ScoreText.textContent = computerScore;
  roundText.textContent = `Round: ${currentRound} / ${totalRounds}`;

  if (currentRound > totalRounds) {
    document.getElementById("returnToMenuLink").style.display = "block";
  }
}

// Player1 selection---------------------------------------------------------------------------
document
  .getElementById("rockBTN1")
  .addEventListener("click", () => handlePlayerChoice("Rock"));
document
  .getElementById("paperBTN1")
  .addEventListener("click", () => handlePlayerChoice("Paper"));
document
  .getElementById("scissorsBTN1")
  .addEventListener("click", () => handlePlayerChoice("Scissors"));
document
  .getElementById("lizardBTN1")
  .addEventListener("click", () => handlePlayerChoice("Lizard"));
document
  .getElementById("spockBTN1")
  .addEventListener("click", () => handlePlayerChoice("Spock"));

function handlePlayerChoice(choice) {
  if (!player1Choice) {
    player1ChoiceText.textContent = `Player 1 chose ${choice}`;
    player1Choice = choice;
    fetchComputerChoice(player1Choice);
  }
}

// Computer Fetch----------------------------------------------------------------------------------
async function fetchComputerChoice(playerChoice) {
  try {
    const response = await fetch(
      `http://localhost:5170/api/game/computer/${playerChoice}`
    );

    computerChoice = await response.text();
    player2ChoiceText.textContent = `Computer chose ${computerChoice}`;
    playGameRound();
  } catch (error) {
    player2ChoiceText.textContent = "Error fetching computer choice";
  }
}

// Play game round and update score----------------------------------------------------------------
function playGameRound() {
  if (player1Choice && computerChoice) {
    let winner = playGame(player1Choice, computerChoice);

    if (winner === "player1") {
      player1Score++;
      player1ScoreText.textContent = player1Score;
      resultsText.textContent = "Player 1 Wins!";
    } else if (winner === "computer") {
      computerScore++;
      player2ScoreText.textContent = computerScore;
      resultsText.textContent = "Computer Wins!";
    } else {
      resultsText.textContent = "It's a tie!";
    }

    currentRound++;
    roundText.textContent = `Round: ${currentRound} / ${totalRounds}`;

    // Puts small Delay in results---------------------------------------------------------
    if (isGameOver()) {
      setTimeout(() => {
        handleGameEnd();
      }, 2000);
    } else {
      setTimeout(() => {
        resetRound();
      }, 2000);
    }

    console.log(`Round ${currentRound - 1} result: ${resultsText.textContent}`);
  }
}

// Game logic-------------------------------------------------------------------------------------
function playGame(player1Choice, computerChoice) {
  const rules = {
    Rock: { beats: ["Scissors", "Lizard"] },
    Paper: { beats: ["Rock", "Spock"] },
    Scissors: { beats: ["Paper", "Lizard"] },
    Lizard: { beats: ["Spock", "Paper"] },
    Spock: { beats: ["Scissors", "Rock"] },
  };

  if (player1Choice === computerChoice) {
    return "tie";
  }
  return rules[player1Choice].beats.includes(computerChoice)
    ? "player1"
    : "computer";
}

function isGameOver() {
  if (gameModetxt === "1 Win") {
    return player1Score > 0 || computerScore > 0;
  } else if (gameModetxt === "3 Out Of 5") {
    return player1Score >= 3 || computerScore >= 3 || currentRound > 5;
  } else if (gameModetxt === "4 Out Of 7") {
    return player1Score >= 4 || computerScore >= 4 || currentRound > 7;
  }
  return false;
}

function resetRound() {
  player1Choice = null;
  computerChoice = null;
  player1ChoiceText.textContent = "--";
  player2ChoiceText.textContent = "--";
  resultsText.textContent = "--";
}

function handleGameEnd() {
  disableButtons();
  menuLink.style.display = "block";

  let finalResult;
  if (player1Score > computerScore) {
    finalResult = "Player 1 wins the game!";
  } else if (computerScore > player1Score) {
    finalResult = "Computer wins the game!";
  } else {
    finalResult = "It's a tie game!";
  }

  resultsText.textContent = finalResult;
}

// Disable the buttons after the game ends----------------------------------------------------
function disableButtons() {
  document
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = true));
}
