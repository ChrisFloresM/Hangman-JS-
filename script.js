const input = require('sync-input');

/* Variables used for the game: Secret word picked from words array*/
const words = ["python", "java", "swift", "javascript"];
let secretWord = getRandomWord(); /* Converted as an array */

let totalVictories = 0;

/* Welcome message */
console.log("H A N G M A N # 8 attempts");

/* Word placeholder initialize and show */
let placeHolder = generateWordPlaceholder();
let attempts = 8;

while (true) {
    let userOption = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
    let exitMenu = false;

    switch(userOption) {
        case "playa":
            play();
            break;

        case "results":
            console.log(`You won: ${totalVictories} times`);
            break;

        case "exita":
            exitMenu = true;
            break;

        default:
            console.log("Invalid option!");
            break;
    }

    if(exitMenu) break;
}

/* FUNCTION: Main function to play the game */
function play() {
    while (attempts > 0) {
        console.log("\n" + placeHolder);

        let attempt = input("Input a letter: ");
        let succesAttempt = false;

        if (!validateLetter(attempt)) {
            continue;
        }

        succesAttempt = checkLetter(attempt.toLowerCase());

        if (!succesAttempt) {
            attempts--;
        }

        if (placeHolder === secretWord) {
            console.log(`You guessed the word ${placeHolder}!\nYou survived!`);
            totalVictories++;
            break;
        }

        if (attempts === 0) {
            console.log("You lost!");
            break;
        }
    }
}


/* FUNCTION: Get a random word from the words array */
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

/* FUNCTION: Generate the placeholder from - to show instead of the word */
function generateWordPlaceholder() {
    return "-".repeat(secretWord.length);
}

/* FUNCTION: Validate if an input is correct or not */
function validateLetter(letter) {
    const regexCorrect = /^[a-z]$/;
    const regexSingle = /([a-z].+)|(%s+)|(^$)/

    if (regexSingle.test(letter)){
        console.log("Please, input a single letter");
        return false;
    }

    if (!regexCorrect.test(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        return false;
    }

    return true;
}

/* FUNCTION: CheckLetter to verify if the input letter by the user is part of the secret word */
function checkLetter(letter) {
    let idx = [];

    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord.charAt(i) === letter) {
            idx.push(i);
        }
    }

    if (idx.length === 0) {
        console.log("That letter doesn't appear in the word.");
        return false;
    }

    if (placeHolder.charAt(idx[0]) === "-") {
        for (let i = 0; i < idx.length; i++) {
            placeHolder = placeHolder.slice(0, idx[i]) + letter + placeHolder.slice(idx[i] + 1);
        }
    } else {
        console.log("You've already guessed this letter.");
    }

    return true;
}


