//Enter Username JS
function getInput() {
  var username = document.getElementById("string").value;
  console.log(username);
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

//Enter Username JS

// Greeting


function greetUser(name) {
  var user = document.getElementById('user');
  var enterUsername = document.getElementById('enter-username'); 
  var button = document.getElementById('reset-username');
  var project1 = document.getElementById('project1');
  user.innerHTML = name;
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

// Bulls and Cows

function startGame() {
  let initialNr = document.getElementById("digit1").value
  + document.getElementById("digit2").value
  + document.getElementById("digit3").value
  + document.getElementById("digit4").value;
  alert('thanks, your number is:  ' + initialNr);
  return initialNr;
}

function checkLen() {
  let id = 'digit';
  for (let nr = 1; nr <=4; nr ++) {
    var el = document.getElementById(id+nr).value;
  if (el.length > 1) {
    document.getElementById(id+nr).value = el.slice(el.length - 1);  
  }
  }
}

// change id="your-nr1"

function changeYourNr() {
  document.getElementById('your-nr1').value = startGame();
  
}