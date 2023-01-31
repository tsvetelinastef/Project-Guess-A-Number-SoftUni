function guessANumberProject() {
    const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    let task = "";
    let level;
    let guess;
    let isHardcore = false;
    let difficulty = '';
    let tries = 0;
    let hintCount = 0;
    let computerGuess = Math.random();
   // All questions
    let hardcoreOrNot = function(){
        rl.question("Default or Hardcore (5 tries only)? (D / H): ",(choice) => {
            switch (choice) {
                case 'D': tries = Number.POSITIVE_INFINITY; isHardcore = false; hintCount = 4; challenge(); break;
                case 'H': tries = 5; isHardcore = true; hintCount = 0; challenge(); break;
                default: console.log("Wrong input"); hardcoreOrNot(); break;
            }
        });
    }
    hardcoreOrNot();
    let challenge = function(){
        rl.question("Choose difficulty (1, 2 or 3): ",(option) => {
            switch (option) {
                case '1': difficulty = '1'; task = "0-100"; computerGuess = Math.floor(computerGuess * 100); game(); break;
                case '2': difficulty = '2'; task = "0-200"; computerGuess = Math.floor(computerGuess * 200); game(); break;
                case '3': difficulty = '3'; task = "0-300"; computerGuess = Math.floor(computerGuess * 300); game(); break;
                default: console.log("Wrong input"); challenge(); break;
            }
        });
    }
    challenge();
    let endGame = function () {
        rl.question("Are you sure you want to quit? (Yes/No): ",(yn) => {
            switch (yn) {
                case 'Yes': return rl.close();
                case 'No': game(); break;
                default: console.log("Wrong input"); endGame(); break;
            }
        });
    }
    // Main Function - Game Code
    let game = function () {
        rl.question(`Guess the number (${task}): `, (input) => {
        guess = input;
        switch(difficulty){
            case '1': level = (guess <= 100 && guess >= 0); break;
            case '2': level = (guess <= 200 && guess >= 0); break;
            case '3': level = (guess <= 300 && guess >= 0); break;
        }
            if (level) {
                if (guess == computerGuess) {
                    console.log("You guessed the number. Congratulations!");
                    return rl.close();
                } else if (guess < computerGuess) {
                    console.log("Higher!");
                    if(isHardcore){
                        tries--;
                        console.log(`Remaining tries: ${tries}`);
                    }
                    game();
                } else if (guess > computerGuess) {
                    console.log("Lower!");
                    if(isHardcore){
                        tries--;
                        console.log(`Remaining tries: ${tries}`);
                    }                    
                    game();
                }if(tries === 0){
                    console.log(`\nYou lost! The number was: ${computerGuess}`);
                    return rl.close();
                }
            }else if(guess === "end"){
                    endGame();
            }/*else if(guess === "wn"){ // dev tools --> Prints the number
                    console.log(computerGuess);
                    game();
            }*/else if(guess === "hint"){
                hintCount--
                switch(hintCount){
                    case 3: console.log(`${hintCount} hints left.`); console.log(computerGuess % 10 === 0 ? "The number ends with 0" : "The number doesn't end with 0"); game(); break;
                    case 2: console.log(`${hintCount} hints left.`); console.log(`The number's last digit is: ${computerGuess % 10}`); game(); break;
                    case 1: console.log(`${hintCount} hints left.\n`); let randomNum = Math.floor(Math.random() * 4) + 1;
                    switch (randomNum) {
                        case 1: console.log(`x = ${computerGuess * 5} / 5`); game(); break;
                        case 2: console.log(`x = ${computerGuess * 8} / 8`); game(); break;
                        case 3: console.log(`x = ${computerGuess - 43} + 43`); game(); break;
                        case 4: console.log(`x = ${computerGuess + 96} - 96`); game(); break;
                        case 5: console.log(`x = ${computerGuess / 10 } * 10`); game(); break;
                    } break;
                    default: console.log("\nYou don't have any hints left\n"); game(); break;
                }
            }else {
                console.log("Invalid Input! Try again...");
                game();
            }
    });
  };
  game();
}
guessANumberProject();