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
  gameNumber = document.getElementById('hiddenNr').innerHTML;
  let initialNr = "";
  initialNr = getUsersNumber();
  if (initialNr == undefined) {
    return;
  }
  changeYourNr(initialNr);
  let cowsAndBulls = [];
 cowsAndBulls = clues(gameNumber, initialNr);
  bulls = cowsAndBulls[0];
  cows = cowsAndBulls[1];
  displayClues(bulls, cows);
  displayGameResult();
}

// Cows and Bulls generate number
var gameNumber = 0;
function generateNumber() {
  gameNumber = Math.floor(Math.random() * 10000);
  if (gameNumber < 1000 && gameNumber > 99) {
    gameNumber = "0" + gameNumber.toString();
  }
  else if (gameNumber < 100 && gameNumber > 9) {
    gameNumber = "00" + gameNumber.toString();
  }
  else if (gameNumber < 10) {
    gameNumber = "000" + gameNumber.toString();
  }
  gameNumber = gameNumber.toString();
  document.getElementById('hiddenNr').innerHTML = gameNumber;
  document.getElementById('playGame').innerHTML = 'Reset Game';
  document.getElementById('number-input').style.display = "block";
  if (round > 1) {
    restartGame();
    document.getElementById('gameResults').style.display = 'none';
  }
}

function restartGame() {
  document.getElementById('youWin').style.display = 'none';
  for( let i = 1; i <= round; i++) {
    let turnSection = document.getElementById('turn' + i);
    turnSection.style.display = 'none';
  }
  round = 1;
}

function getUsersNumber() {
  let userNr = "";
  userNr = document.getElementById("digit1").value[0]
  + document.getElementById("digit2").value[0]
  + document.getElementById("digit3").value[0]
  + document.getElementById("digit4").value[0];
  userNr = userNr.toString();
  if (userNr.includes('undefined')) {
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
  if (round <= 6) {
    let numberField = document.getElementById("your-nr" + round);
    numberField.innerHTML = nr;
    document.getElementById("turn"+round).style.display = "flex";
  }
  else {
    // if > 6 gameover or win
  }
}

// Cows and Bulls Clue 
function clues(gameNr, guess) {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (gameNr.includes(guess[i])) {
      if (gameNr.includes(guess[i]), i) {
        bulls++;
      }
      else {
        cows++;
      }
    }
  }
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
  if (round > 6) {
    document.getElementById('youWin').style.display = 'block';
  }
}

/* To Do 
+ (Change cows and bulls in the html)
+ currently the GO button generates a new number every time it's clicked - make a button to start game and then add a function game play which takes a paramether the generated number and compares it 
+ make input not shown on lines if input is empty
- make input not accept duplicate numbers
- make generated number not contain repeated numbers
- Display You win or You lose at the end 
  OR
- create a variable that equals .turn 
    - so on every turn it creates a new .turn like element
    - adds it to the attempts div
    - styles it the same way
- for phones - add a digit dialpad *if I have time
- style website
- SEMANTIC HTML e.g. nav for navigation links, add links etc.
- add prompts and progress showing
*/
