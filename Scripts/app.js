// Fully loads DOM before running Code------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // ID Section-----------------------------------------------------------------------------------------------
  let oneBTN = document.getElementById("oneBTN");
  let threeBTN = document.getElementById("threeBTN");
  let fourBTN = document.getElementById("fourBTN");
  let playButton = document.getElementById("playButton");

  // Event Listener Section-----------------------------------------------------------------------------------
  oneBTN.addEventListener("click", function () {
    localStorage.setItem("gameMode", "1 Win");
    enablePlayButton();
  });

  threeBTN.addEventListener("click", function () {
    localStorage.setItem("gameMode", "3 Out Of 5");
    enablePlayButton();
  });

  fourBTN.addEventListener("click", function () {
    localStorage.setItem("gameMode", "4 Out Of 7");
    enablePlayButton();
  });

  // Enables the Select Mode button (Play button)-------------------------------------------------------------
  function enablePlayButton() {
    playButton.removeAttribute("disabled");
    playButton.style.pointerEvents = "auto";
    playButton.style.opacity = 1;
  }

  // Disables the Select Mode button (Play button)-------------------------------------------------------------
  function disablePlayButton() {
    playButton.setAttribute("disabled", "true");
    playButton.style.pointerEvents = "none";
    playButton.style.opacity = 0.5;
  }

  // Check game mode is selected-------------------------------------------------------------------------------
  if (localStorage.getItem("gameMode")) {
    enablePlayButton();
  } else {
    disablePlayButton();
  }
});
