"use strict";

/** Textual markov chain generator. */


const TEST_TEXT_1 = `We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it 
Inside, we both know what's been going on
We know the game and we're gonna play it
And if you ask me how I'm feeling
Don't tell me you're too blind to see
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it
Inside, we both know what's been going on
We know the game and we're gonna play it
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you`

const TEST_TEXT_2 = "The cat is in the hat. The cat is the cat. The cat is a hat."

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * 
   * */
  //get rid of snakecase
  getChains() {

    const chains = new Map();
    //use generic for i loop
    for (let wordIndex in this.words) {

      wordIndex = Number(wordIndex);

      const currentWord = this.words[wordIndex];
      const nextWord = this.words[wordIndex + 1] || null;

      if (chains.has(currentWord)) {
        const chainWords = chains.get(currentWord);
        chainWords.push(nextWord);
      }
      else {
        chains.set(currentWord, [nextWord]);
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  getText() {
 
    let currWord = this.chains.keys().next().value;
    let nextWord;
    let text = currWord + " ";
    //exit condition in while loop instead of if statement
    while (true) {

      const wordsToChooseFrom = this.chains.get(currWord);
      nextWord = sample(wordsToChooseFrom);

      if (nextWord === null) {
        return text;
      }

      text += nextWord + " ";
      currWord = nextWord;

    } 
  }
}


/** given an array, returns 1 element at random */
function sample(arr) {

  const randIndex = Math.floor(Math.random()*arr.length);
  return arr[randIndex];

}

// const m = new MarkovMachine(TEST_TEXT_1);
// console.log(m.chains);
// console.log(m.getText());

module.exports = { MarkovMachine };