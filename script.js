//Enter Username JS
function getInput() {
  var username = document.getElementById("string").value;
  let x = 0;
  if (checkLength(username)) {
    x++;
  }
  if (checkCase(username)) {
    x++;
  }
  if (checkNumbers(username)) {
    x++;
  }
  colorScheme(false, 3);
  colorScheme(true, x); 
}

function checkUsername() {
  var username = document.getElementById("string").value;
  if (checkLength(username) && checkCase(username) && checkNumbers(username)) {
    greetUser(username);
  } else {
    alert("Please check codename contains at least:\n- one lowercase letter\n- one uppercase letter\n- two numbers");
  } 
}

function checkLength(x) {
  if (x.length > 5) {
    return true;
  } else {
    return false;
  }
}

function checkCase(x) {
  if (x.toUpperCase() !== x && x.toLowerCase() !== x) {
    return true;
  } else {
    return false;
  }
}

function checkNumbers(x) {
  let count = 0;
  for (let i = 0; i < x.length; i++) {
    if (isDigitCode(x.charCodeAt(i))) {
      count++;
    }
  }
  if (count >=2) {
    return true;
  } else {return false;}
}

const charCodeZero = "0".charCodeAt(0);
const charCodeNine = "9".charCodeAt(0);

function isDigitCode(n) {
   return(n >= charCodeZero && n <= charCodeNine);
}

function colorScheme(highlight, count) {
  let color = '#ffff78';
  if (highlight) {
    color = 'lightgreen';
  }
  for (let i = 1; i <= count; i++) {
    let bar = document.getElementById("bar"+i);
    bar.style.backgroundColor = color;
  }
}
// _____________________________________________
// Greeting


function greetUser(name) {
  var user = document.getElementById('user');
  var enterUsername = document.getElementById('enter-username'); 
  var button = document.getElementById('reset-username');
  var project1 = document.getElementById('project1');
  user.innerHTML = name;
  document.getElementById('userMessage').innerHTML = user.innerHTML;
  enterUsername.style.display = 'none'; 
  button.style.display = 'block';
  project1.style.display = 'flex';
}

function resetUsername() {
  var user = document.getElementById('user');
  var enterUsername = document.getElementById('enter-username'); 
  var button = document.getElementById('reset-username');
  var project1 = document.getElementById('project1');
  user.innerHTML = 'User';
  enterUsername.style.display = 'block'; 
  button.style.display = 'none';
  project1.style.display = 'block';
}
// ________________________________________________________________________________________________

//        B U L L S  A N D  C O W S         // 
function startGame() {
  gameNumber = document.getElementById('hiddenNr1').innerHTML;
  let initialNr = "";
  initialNr = getUsersNumber();
  if (initialNr == undefined) {
    return;
  }
  changeYourNr(initialNr.join(""));
  let cowsAndBulls = [];
  cowsAndBulls = clues(gameNumber, initialNr);
  bulls = cowsAndBulls[0];
  cows = cowsAndBulls[1];
  displayClues(bulls, cows);
  displayGameResult();
}

// Cows and Bulls generate number
function generateNumber() {
  let gameNumber = '';
  gameNumber = noDuplicates();
  document.getElementById('hiddenNr1').innerHTML = gameNumber.join("");
  document.getElementById('hiddenNr2').innerHTML = gameNumber.join("");  
  document.getElementById('playGame').innerHTML = 'Reset Game';
  document.getElementById('number-input').style.display = "block";
  if (round > 1) {
    restartGame();
    document.getElementById('gameWin').style.display = 'none';
  }
}

function noDuplicates() {
  let gameNumber = [];
  let gameRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let gameRangeIndex = -1;
  for (let index = 1; index <= 4; index++) {
    gameRangeIndex = Math.floor(Math.random() * gameRange.length);
    gameNumber.push(gameRange[gameRangeIndex]);
    gameRange.splice(gameRangeIndex, 1);
  }
  return gameNumber;
}

function restartGame() {
  document.getElementById('gameWin').style.display = 'none';
  for( let i = 1; i < round; i++) {
    let turnSection = document.getElementById('turn' + i);
    turnSection.style.display = 'none';
  }
  round = 1;

}

function getUsersNumber() {
  let userNr = [];
  let urDigit = 0;
  for (let i = 1; i <= 4; i++) {
    urDigit = document.getElementById("digit" + i).value[0];
    userNr.push(urDigit);
  }
  if (userNr.includes('undefined') || userNr == 'NaN') {
    alert('Please enter a valid number');
  } 
  else {
    return userNr;  
  }
}

function checkLen() {
  let id = 'digit';
  for (let nr = 1; nr <= 4; nr++) {
    var el = document.getElementById(id+nr).value;
  if (el.length > 1) {
    document.getElementById(id+nr).value = el.slice(el.length - 1);  
  }
  }
}

var round = 1;
function changeYourNr(nr) {
  if (round <= 10) {
    let numberField = document.getElementById("your-nr" + round);
    numberField.innerHTML = nr;
    document.getElementById("turn"+round).style.display = "flex";
  }
  else {
    return;
  }
  // else {
  //  if > 6 gameover or win
  // }
}

// Cows and Bulls Clue 
function clues(guess, gameNr) {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] == gameNr[i]) {
        bulls++;
      }
    if (gameNr.includes(guess[i])) {
      cows++;
    }
    }
    cows = cows - bulls;
  return [bulls, cows];
}

function displayClues(bulls, cows) {
  
  let bullClue = document.getElementById("bull" + round);
  bullClue.innerHTML = bulls;
  let cowClue = document.getElementById("cow" + round);
  cowClue.innerHTML = cows;
  round++;
}

function displayGameResult() {
  if (round > 10) {
    document.getElementById('gameWin').style.display = 'block';
  }
}

/* To Do 
- to have 10 rounds
- to focus next input field on keypress / switch to next input box automatically
- SEMANTIC HTML e.g. nav for navigation links, add links etc.
- Display You win or You lose at the end 
- for phones - add a digit dialpad *if I have time
- style website
- add prompts and progress showing
+ COW AND BULL CLUES NOT WORKING PROPERLY!!!
+ Change cows and bulls in the html
+ make input not shown on lines if input is empty
-- make input not accept duplicate numbers --> actually it can stay, it's useful
+ make generated number not contain repeated numbers
*/
