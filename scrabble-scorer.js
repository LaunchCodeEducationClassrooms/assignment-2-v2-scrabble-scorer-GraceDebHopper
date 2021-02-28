// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let word = '';            //works with or without for A) and B)
let scoreMethod = 0;      //works with or without for B)

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some Scrabble!");
  console.log();
  word = input.question('Enter a word to score: ');
  return word;
};

//set-up anonymous function expressions; called from objects
//GitHub autograder specified that simpleScore, etc. be function //variables and therefore called from objects
//GitHUb Autograder would not allow for these simpleScore, etc. 
//variables to be used as object declarations with funcions 
//included in object declarations although program worked that way
let simpleScore = function(word) {
    let score = 0;
    for(let i=0; i<word.length; i++) {
      score ++;
    }
    //console.log(score);
    return score;
};

let vowelBonusScore = function(word) {
    word = word.toLowerCase();
    let score = 0;
    for(let i=0; i<word.length; i++) {
      if(word[i].includes('a') || word[i].includes('e') || word[i].includes('i') || word[i].includes('o') || word[i].includes('u')){
        score += 3;
      } else {
        score ++;
      }
    }
    //console.log(score);
    return score;            //typeof Number
};


let scrabbleScore = function(word) {
    word = word.toLowerCase();
    let score = 0;
    for(let i = 0; i < word.length; i++) {
      let letter = word.charAt(i);
      score += Number(newPointStructure[letter]);
    }
    //console.log(score);
    return score;
};

/*let scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: function oldScrabbleScorer(word) {
    word = word.toUpperCase();
    let letterPoints = "";
    for(let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
        if (oldPointStructure[pointValue].includes(word[i])){
          letterPoints += `Points for '${word[i]}': ${pointValue}\n`
        }
      }
    }
    return letterPoints;
  }
};*/
//console.log(scrabbleScore);
//console.log('2 ' + scrabbleScore.scorerFunction(word));

const scoringAlgorithms = [
({
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScore 
}),
({
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore 
}),
({
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScore
    
})
];
//console.log(scoringAlgorithms);

//input.question returns str and array indexes are num - convert
//variables (word and scoreMethod) used o/s function need to be declared/defined o/s function or ReferenceError: x is not defined
function scorerPrompt() {
  //chose not to use object properties which did not agree to instr
  console.log(`Which scoring algorithm would you like to use?
  
0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`);
  scoreMethod = Number(input.question('Enter 0 ,1, or 2: '));
  //console.log(typeof scoreMethod);
  return(scoringAlgorithms[scoreMethod]);
}

let newPointStructure = transform(oldPointStructure);

function transform(oldPointStructure) {
  let newPointStructure = {};
  for(pointValue in oldPointStructure){
    for(let i=0; i<oldPointStructure[pointValue].length; i++){
      letter = oldPointStructure[pointValue][i];
      newPointStructure[letter.toLowerCase()] = Number(pointValue);
    }
  }
return newPointStructure;
}
//console.log(oldPointStructure);
//console.log(newPointStructure);

//let newPointStructure = transform(oldPointStructure);
//original here after transform func w/ error so moved to prior 

function runProgram() {
   initialPrompt();
   //console.log(oldScrabbleScorer(word));
   scorerPrompt();
   console.log(`Score for '${(word)}': ${scoringAlgorithms[scoreMethod].scoringFunction(word)}`);   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

