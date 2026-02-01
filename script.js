const vals = 3;
const rock = 0;
const paper = 1;
const scissor = 2;

function selector(max) {
    return (Math.floor((Math.random() * 10)) % max);
}


function getComputerChoice() {
    return(selector(vals));
}

function getHumanChoice() {
    let temp = prompt("rock, paper, or scissor?");
    let result = temp.toLowerCase();
    if (result == "rock") {
        return rock;
    } else if (result == "paper") {
        return paper;
    } else if (result == "scissor") {
        return scissor;
    } else {
        return null;
    }
}

function playRound(computerChoice, humanChoice) {
    if (computerChoice == humanChoice) {
        return null;
    } else if ((computerChoice == rock && humanChoice == paper) 
        ||(computerChoice == paper && humanChoice == scissor) || (computerChoice == scissor && humanChoice == rock)) {
        return true;
    } else {
        return false;
    }
}

function playGame() {
    let compScore = 0;
    let humScore = 0;
    while (compScore < 5 && humScore < 5) {
        console.log("computer score is " + compScore + " human score is " + humScore);
        let compval = getComputerChoice();
        console.log(compval);
        let humval = getHumanChoice();
        console.log(humval);
        let round = playRound(compval, humval);
        console.log(round);
        if (round) {
            humScore++;
        } else if (round == false){
            compScore++;
        }
    }
    if (compScore > humScore) {
        alert("computer won");
    } else {
        alert("human won");
    }
}

playGame();
