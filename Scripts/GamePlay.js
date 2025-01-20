const gameChoices = [
  { choice: "Rock", beats: ["Scissors", "Lizard"] },
  { choice: "Paper", beats: ["Rock", "Spock"] },
  { choice: "Scissors", beats: ["Paper", "Lizard"] },
  { choice: "Lizard", beats: ["Spock", "Paper"] },
  { choice: "Spock", beats: ["Scissors", "Rock"] },
];

let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
let totalRounds = 1;

const gameModetxt = localStorage.getItem("gameMode");
const gameModePlaytxt = localStorage.getItem("gameModePlay");
const menuLink = document.querySelector(".menu-link");

if (gameModetxt === "1 Win") totalRounds = 1;
else if (gameModetxt === "3 Out Of 5") totalRounds = 5;
else if (gameModetxt === "4 Out Of 7") totalRounds = 7;

const gameMode = document.getElementById("gameMode");
const gameModePlay = document.getElementById("gameModePlay");

if (gameModetxt) {
  gameMode.textContent = `Game Mode: ${gameModetxt}`;
} else {
  gameMode.textContent = "Game Mode: No selection made";
}

// Player1 buttons---------------------------------------------------
let rockBTN1 = document.getElementById("rockBTN1");
let paperBTN1 = document.getElementById("paperBTN1");
let scissorsBTN1 = document.getElementById("scissorsBTN1");
let lizardBTN1 = document.getElementById("lizardBTN1");
let spockBTN1 = document.getElementById("spockBTN1");

// Player2 buttons----------------------------------------------------
let rockBTN2 = document.getElementById("rockBTN2");
let paperBTN2 = document.getElementById("paperBTN2");
let scissorsBTN2 = document.getElementById("scissorsBTN2");
let lizardBTN2 = document.getElementById("lizardBTN2");
let spockBTN2 = document.getElementById("spockBTN2");

const player1ChoiceText = document.getElementById("player1Choice");
const player2ChoiceText = document.getElementById("player2Choice");
const resultsText = document.getElementById("results");
const player1ScoreText = document.getElementById("player1Score");
const player2ScoreText = document.getElementById("player2Score");
const roundText = document.getElementById("round");

let player1Choice = null;
let player2Choice = null;

// Update scores and round------------------------------------------------
function updateRoundAndScore(winner) {
  if (winner === "player1") player1Score++;
  else if (winner === "player2") player2Score++;

  if (!isGameOver()) {
    currentRound++;
  }

  player1ScoreText.textContent = player1Score;
  player2ScoreText.textContent = player2Score;
  roundText.textContent = `Round: ${currentRound} / ${totalRounds}`;

  // Hides Return to menu button------------------------------------------
  if (currentRound > totalRounds) {
    document.getElementById("returnToMenuLink").style.display = "block";
  }
}

// game logic----------------------------------------------------------------
function playGame(player1Choice, player2Choice) {
  let player1 = gameChoices.find((choice) => choice.choice === player1Choice);
  let player2 = gameChoices.find((choice) => choice.choice === player2Choice);

  if (player1.choice === player2.choice) return "It's a tie!";
  if (player1.beats.includes(player2.choice)) return "player1";
  return "player2";
}

// Stop Buttons when needed--------------------------------------------------
function disableButtons() {
  rockBTN1.disabled = true;
  paperBTN1.disabled = true;
  scissorsBTN1.disabled = true;
  lizardBTN1.disabled = true;
  spockBTN1.disabled = true;

  rockBTN2.disabled = true;
  paperBTN2.disabled = true;
  scissorsBTN2.disabled = true;
  lizardBTN2.disabled = true;
  spockBTN2.disabled = true;
}

// Run buttons when needed------------------------------------------------------
function enableButtons() {
  rockBTN1.disabled = false;
  paperBTN1.disabled = false;
  scissorsBTN1.disabled = false;
  lizardBTN1.disabled = false;
  spockBTN1.disabled = false;

  rockBTN2.disabled = false;
  paperBTN2.disabled = false;
  scissorsBTN2.disabled = false;
  lizardBTN2.disabled = false;
  spockBTN2.disabled = false;
}

// Player1 buttons--------------------------------------------------------------
rockBTN1.addEventListener("click", function () {
  if (!player1Choice) {
    player1Choice = "Rock";
    player1ChoiceText.textContent = "--"; 
  }
});

paperBTN1.addEventListener("click", function () {
  if (!player1Choice) {
    player1Choice = "Paper";
    player1ChoiceText.textContent = "--"; 
  }
});

scissorsBTN1.addEventListener("click", function () {
  if (!player1Choice) {
    player1Choice = "Scissors";
    player1ChoiceText.textContent = "--"; 
  }
});

lizardBTN1.addEventListener("click", function () {
  if (!player1Choice) {
    player1Choice = "Lizard";
    player1ChoiceText.textContent = "--"; 
  }
});

spockBTN1.addEventListener("click", function () {
  if (!player1Choice) {
    player1Choice = "Spock";
    player1ChoiceText.textContent = "--"; 
  }
});

// Player2 buttons------------------------------------------  
rockBTN2.addEventListener("click", function () {
  player2ChoiceText.textContent = "Player 2 chose Rock";
  player2Choice = "Rock";
  showPlayer1Choice(); 
  playGameRound();
});

paperBTN2.addEventListener("click", function () {
  player2ChoiceText.textContent = "Player 2 chose Paper";
  player2Choice = "Paper";
  showPlayer1Choice(); 
  playGameRound();
});

scissorsBTN2.addEventListener("click", function () {
  player2ChoiceText.textContent = "Player 2 chose Scissors";
  player2Choice = "Scissors";
  showPlayer1Choice(); 
  playGameRound();
});

lizardBTN2.addEventListener("click", function () {
  player2ChoiceText.textContent = "Player 2 chose Lizard";
  player2Choice = "Lizard";
  showPlayer1Choice(); 
  playGameRound();
});

spockBTN2.addEventListener("click", function () {
  player2ChoiceText.textContent = "Player 2 chose Spock";
  player2Choice = "Spock";
  showPlayer1Choice(); 
  playGameRound();
});

// Function to show Player 1's choice after Player 2 selects theirs---------
function showPlayer1Choice() {
  if (player1Choice) {
    player1ChoiceText.textContent = `Player 1 chose ${player1Choice}`;
  }
}


function isGameOver() {
  if (gameModetxt === "1 Win") {
    return player1Score > 0 || player2Score > 0;
  } else if (gameModetxt === "3 Out Of 5") {
    return player1Score >= 3 || player2Score >= 3 || currentRound > 5;
  } else if (gameModetxt === "4 Out Of 7") {
    return player1Score >= 4 || player2Score >= 4 || currentRound > 7;
  }
  return false;
}

function playGameRound() {
  if (player1Choice && player2Choice) {
    let winner = playGame(player1Choice, player2Choice);
    resultsText.textContent =
      winner === "player1"
        ? "Player 1 wins"
        : winner === "player2"
        ? "Player 2 wins"
        : "It's a tie!";
    updateRoundAndScore(winner);

    if (isGameOver()) {
      setTimeout(() => {
        handleGameEnd();
      }, 2000);
    } else {
      setTimeout(() => {
        resetRound();
      }, 2000);
    }

    disableButtons();
  }
}

//Reset round---------------------------------------------------
function resetRound() {
  player1Choice = null;
  player2Choice = null;
  player1ChoiceText.textContent = "--";
  player2ChoiceText.textContent = "--";
  enableButtons();

  if (currentRound <= totalRounds) {
    document.getElementById("returnToMenuLink").style.display = "none";
  }
}

//Show the rreturn to menu button---------------------------------
function handleGameEnd() {
  disableButtons();
  menuLink.style.display = "block";

  let finalResult;
  if (player1Score > player2Score) {
    finalResult = "Player 1 wins the game!";
  } else if (player2Score > player1Score) {
    finalResult = "Player 2 wins the game!";
  } else {
    finalResult = "It's a tie game!";
  }

  resultsText.textContent = finalResult;
}
