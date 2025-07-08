function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
 var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
 return alphabet[rand(0,alphabet.length - 1)]
}
function getRandomWord(word) {
  //var text = word.innerHTML
  
  var finalWord = ''
  for(var i=0;i<word.length;i++) {
    finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
  }
 
  return finalWord
}

var word = document.getElementById("text")
var interv = 'undefined'
var canChange = false
var globalCount = 0
var count = 0
var INITIAL_WORD = word.innerHTML;
var isGoing = false
var words = ["Software Engineer","Cybersecurity Engineer","Embedded Engineer"]

async function init(newWord) {
  if (isGoing) return;
  INITIAL_WORD = newWord;
  isGoing = true;
  var randomWord = getRandomWord(newWord);
  word.innerHTML = randomWord;

  return new Promise((resolve) => {
    interv = setInterval(function() {
      var finalWord = '';
      for (var x = 0; x < INITIAL_WORD.length; x++) {
        if (x <= count && canChange) {
          finalWord += INITIAL_WORD[x];
        } else {
          finalWord += getRandomLetter();
        }
      }
      word.innerHTML = finalWord;
      if (canChange) {
        count++;
      }
      if (globalCount >= 5) {
        canChange = true;
      }
      if (count >= INITIAL_WORD.length) {
        clearInterval(interv);
        count = 0;
        canChange = false;
        globalCount = 0;
        isGoing = false;
        resolve(); // Resolve the promise when the animation is complete
      }
      globalCount++;
    }, 100);
  });
}

async function runWords() {
  while (true) {
    for (var i = 0; i < words.length; i++) {
      await init(words[i]); // Wait for each animation to finish

      // Delay before cycling to the next word
      await new Promise((resolve) => {
        setTimeout(resolve, 2000); // Adjust the delay duration as desired (in milliseconds)
      });
    }
  }
}

runWords();






