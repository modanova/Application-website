function showMe(id) {
  let element = '';
  element = document.getElementById(id);
  if (element.style.display == 'none' || element.style.display == '') {
    element.style.display = 'block';
  } else if (element.style.display == 'block') {
    element.style.display = 'none';
  }
}

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
  document.getElementById('yourName').innerHTML = user.innerHTML;
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
  document.getElementById('hiddenNr').innerHTML = gameNumber.join("");
  document.getElementById('playGame').innerHTML = 'Restart Game';
  document.getElementById('number-input').style.display = "flex";
  if (round > 1) {
    restartGame();
    document.getElementById('gameResult').style.display = 'none';
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
  document.getElementById('gameResult').style.display = 'none';
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
    urDigit = document.getElementById("digit" + i).value;
    userNr.push(urDigit);
    urDigit = document.getElementById("digit" + i).value = '';
  }
  document.getElementById("digit1").focus();
  if (userNr.includes('') || userNr.join("").length > 4) {
    alert('Please enter a valid number');
  } 
  else {
    return userNr;  
  }
}

function nextInput(element) {
  if (element.value.length > 1 ) {
    element.value = element.value[element.value.length-1];
  }
  if (element.value.length >= 1 && element.nextElementSibling) {
    element.nextElementSibling.focus();
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
  let user = document.getElementById("user").innerHTML;
  let yourName = document.getElementById("yourName").innerHTML;
  yourName = user;
  let bullClue = parseInt(document.getElementById("bull" + (round-1)).innerHTML);
  if (bullClue == 4) {
    let yourGame = document.getElementById("yourGame");
    yourGame.innerHTML = 'Hooray, ';
    document.getElementById('gameResult').style.display = 'flex';   
    document.getElementById("number-input").style.display = 'none';
  }
  if (round > 10 && bullClue != 4) {
    yourGame.innerHTML = 'Good try, ';
    document.getElementById('gameResult').style.display = 'flex';
    document.getElementById("number-input").style.display = 'none';
  }
  document.getElementById('hiddenNr').focus(); 
}

/* To Do 
+ to have 10 rounds
+ to focus next input field on keypress / switch to next input box automatically
+ Display You win or You lose at the end 
- SEMANTIC HTML e.g. nav for navigation links, add links etc.
-- for phones - add a digit dialpad *if I have time
- style website
- add prompts and progress showing
+ COW AND BULL CLUES NOT WORKING PROPERLY!!!
+ Change cows and bulls in the html
+ make input not shown on lines if input is empty
-- make input not accept duplicate numbers --> actually it can stay, it's useful
+ make generated number not contain repeated numbers
*/
