let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");

document.getElementById("start-btn").addEventListener("click", function () {
    if (!started) {
      console.log("Game is started");
      started = true;
      levelUp(); // Corrected the function call here
    }
  });

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash"); // After 250ms, remove the flash class
    }, 250);
}
  
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
      btn.classList.remove("userflash"); // After 250ms, remove the userflash class
    }, 250);
}

function levelUp() {
    userseq = []; // Reset user sequence when a new level starts
    level++;
    console.log(level);
  
    h2.innerText = `Level ${level}`; // Corrected the template literal

    let randIdx = Math.floor(Math.random() * 4); // Generate random index (0-3)
    let randColor = btns[randIdx]; // Get the corresponding color
    let randBtn = document.getElementById(randColor); // Select the button by its ID

    gameseq.push(randColor); // Add the random color to the game sequence
  
    gameFlash(randBtn); // Flash the random button
}
  
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
      // If the user's choice matches the game sequence
      if (userseq.length === gameseq.length) {
        setTimeout(levelUp, 1000); // Move to the next level if the user completed the current level
      }
    } else {
      h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br> Press the button to Start again`;
      document.querySelector("body").style.backgroundColor = "red"; // Flash the screen red on wrong input
      setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white"; // Reset the background color
      }, 150);
  
      highscore(); // Check and update high score
      reset(); // Reset the game
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
  
    let userColor = btn.getAttribute("id"); // Fetch the color from the button's id
    userseq.push(userColor); // Add to the user's sequence
  
    checkAns(userseq.length - 1); // Check if the user's sequence is correct
}
  
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress); // Add event listeners to all buttons
}
  
function reset() {
    started = false;
    userseq = [];
    gameseq = [];
    level = 0;
}

function highscore() {
    if (level > highestScore) {
        highestScore = level;
        h3.innerText = `High Score: ${highestScore}`; // Display the high score
    }
}
