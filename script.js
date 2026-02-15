const vals = 3;
const rock = 0;
const paper = 1;
const scissor = 2;

const conversion = {
    'rock' : 0,
    'paper' : 1,
    'scissor' : 2,
}

const IMAGES = {
  0 : "img/odin-rock.png",
  1 : "img/odin-paper.png",
  2 : "img/odin-scissor.png",
  'default' : "img/odin-rps-placeholder.png",
  'reset' : "img/restart-icon.png"
};
const choices = document.querySelectorAll(".choice");

const compVal = document.querySelector(".comp-choice")
compVal.disabled = true;

const next = document.querySelector(".nexticon")
next.disabled = true;
const img = document.querySelector('.nexticon img');


const gamestate = {
    'userChoice' : 0,
    'compPlay' : 0,
    'userWins' : 0,
    'compWins' : 0,
}


//User input and takes in a user value, ensuring only the selected value is
//highlighted
//also ensure thats the computer button and next button cannot be pressed
//this turn
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        compVal.disabled = false;

        gamestate.userChoice = conversion[choice.id];
        removeHighlight();
    choice.style.outline = "3px solid #FFFFFF"
  });
})

//resets the game by setting all the gamestates to 0, as well as returning all
// the imgaes to default
// disables computer button and reset button
function resetGame() {
    removeHighlight();
    for(key in gamestate) {
        gamestate[key] = 0;
    }
    choices.forEach((choice) => {
        choice.style.outline = "none";
    })

    const results = document.querySelectorAll('.result');

    results.forEach((result) => {
        result.style.backgroundColor = "";

        const img = result.querySelector("img");
        img.src = IMAGES.default;
        img.style.padding = "";
    });
    compVal.disabled = true;
    next.disabled = true;
}


//Selects the computer choice and updates based off the choice
//contains case for end of game where at 5 wins, all buttons but the reset
//button are available
compVal.addEventListener("click", () => {
    gamestate.compChoice = (Math.floor((Math.random() * 10)) % 3);
    let temp = document.querySelector('#comp-img');
    let disc = document.querySelector('#comp-text');
    if (gamestate.compChoice == 0) {
        temp.src = IMAGES[0];
        disc.textContent = `ROCK`;
    }
    else if (gamestate.compChoice == 1) {
        temp.src = IMAGES[1];
        disc.textContent = `PAPER`;
    } else {
        temp.src = IMAGES[2];
        disc.textContent = `SCISSOR`;
    }
    playRound(gamestate.userChoice, gamestate.compChoice);
    //at 5 wins, locks all butons except reset
    // resets the images and the gamestate
    if (gamestate.compWins == 5 || gamestate.userWins == 5) {
        choices.disabled = true;
        compVal.disabled = true;
        next.disabled = false;
        removeHighlight();
        next.style.outline = "3px solid #FFFFFF"

    }
})

//to go next or reset the game
//toggle on user button and off comp and reset the highlighting when clicked
//should always toggle itslef off at the end
next.addEventListener('click', () => {
    if (gamestate.compWins == 5 || gamestate.userWins == 5) {
        resetGame();
    } else {
        removeHighlight()
        choices.disabled = false;
    }
    next.disabled = true;

})


//plays game and updates image for scores
function playRound(humanChoice, computerChoice) {
    roundWin = (humanChoice - computerChoice + 3) % 3;
    if (roundWin == 1) {
        gamestate.userWins += 1;
        const img = document.querySelector(
            `.human-results [data-index="${gamestate.userWins}"] img`
        );
        img.src = IMAGES[gamestate.userChoice];
        img.style.padding =  "5px";
        const bg = document.querySelector(
            `.human-results [data-index="${gamestate.userWins}"]`)
        bg.style.backgroundColor = "#1E90FF"   
    } else if (roundWin == 2) {
        console.log('computer won')
        gamestate.compWins += 1;
        const img = document.querySelector(
            `.comp-results [data-index="${gamestate.compWins}"] img`
        );
        img.src = IMAGES[gamestate.compChoice];
        img.style.padding =  "5px";
        const bg = document.querySelector(
            `.comp-results [data-index="${gamestate.compWins}"]`)
        bg.style.backgroundColor = "#E60000"
    }
}

function removeHighlight() {
    let highlighted = document.querySelectorAll('button');
    highlighted.forEach((val) => {
        val.style.outline = "none";
    })
}
// function highlightWinner() {
//   const human = document.querySelector(".human-results");
//   const computer = document.querySelector(".comp-results");

//   human.classList.remove("winner-blink");
//   computer.classList.remove("winner-blink");

//   if (gamestate.userWins === 5) {
//     human.classList.add("winner-blink");
//   } else if (gamestate.compWins == 5) {
//     computer.classList.add("winner-blink");
//   }
// }

