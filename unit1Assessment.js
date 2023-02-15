////////////////////////////////////////////
// Unit 1 Assessment Coding Challenges /////
////////////////////////////////////////////

////////////////////////////////////////////

// Problem 1:
// Is the given word an anagram of a palindrome?

// Description:
// A palindrome is a word that reads the same forward and backwards
// (eg, "racecar", "tacocat"). An anagram is a rescrambling of a word
// (eg for "racecar", you could rescramble this as "arceace").

// Determine if the given word is a re-scrambling of a palindrome.
// The word will only contain lowercase letters, a-z.

// Example test cases:

//     >>> isAnagramOfPalindrome("a")
//     True

//     >>> isAnagramOfPalindrome("ab")
//     False

//     >>> isAnagramOfPalindrome("aab")
//     True

//     >>> isAnagramOfPalindrome("arceace")
//     True

//     >>> isAnagramOfPalindrome("arceaceb")
//     False

function isAnagramOfPalindrome(word) {
  // Is the given word an anagram of a palindrome?

  // YOUR CODE HERE
  //to do this we would need to check how many times each letter appears and use %2 to see if the amount of times that it appears is an even number. If there are more than 2 instances of the letter count %2 not being 0 then we know that it cannot be a scramble of a palindrome.

  //we would start by iterating through the given word and mapping the letter to the number of times that it appears.
  const map = new Map();

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (map.has(letter)) {
      let number = map.get(letter);
      number++;
      map.set(letter, number);
    } else {
      map.set(letter, 1);
    }
  }

  //then we would parse through the map and see if the number of times that it appears %2 is 0. If it is not 0 then we would add one to our "odd" counter.
  let odd = 0;
  map.forEach(function (value, count) {
    if (value % 2 != 0) {
      odd++;
    }
  });

  //once we've parsed the map, if "odd" is greater than 1 then we can conclusively say that it is not a palendrome. If "odd" <= 1 then we can say that it is.

  if (odd < 1) {
    // return false;
    console.log("False");
  } else {
    // return true;
    console.log("True");
  }

  //Alternatively, we could have just removed the value from the map if it already existed so that at the end, only the letters that appear an odd number of times will be inside the map. If the length of the map is greater than 1 it will return false, otherwise it is true. I hadn't thought about it initially but was running my code by some friends after I came up with the solution above to see if there was any way to improve it and they suggested that I do it in a single pass to make my efficiency O(n) instead of O(2n) as it stands right now.

  const map2 = new Map();
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (map2.has(letter)) {
      map2.delete(letter);
    } else {
      map2.set(letter, true);
    }
  }

  return map2.size <= 1;
}

////////////////////////////////////////////

////////////////////////////////////////////

// Problem 2:
// Decode a string.

// Description:
// A valid "secret code" is a sequence of numbers and letter, always starting with a number
// and ending with letter(s).

// Each number tells you how many characters to skip before finding a good letter.
// After each good letter should come the next "skip" number.

// For example, the string "hey" could be encoded by "0h1ae2bcy". This means
// "skip 0, find the 'h', skip 1, find the 'e', skip 2, find the 'y'".

// A single letter should work:

//     >>> decode("0h")
//     'h'

//     >>> decode("2abh")
//     'h'

// Longer patterns should also work:

//     >>> decode("0h1ae2bcy")
//     'hey'

function decode(secretString) {
  // Decode a string.
  // YOUR CODE HERE

  let final = [];

  //for this one I just need to create a 'cursor' of sorts that moves throughout the word. From there we start at index 0 which *should* be a number if the secret code is put in correctly. From there, we'll get the number of spaces we need to skip, move that many spaces over + 1, and then add the letter that the cursor now sits on to our array of final letters. Move to the next letter and repeat the process (Was initially using a while loop but switched to a for loop when I realized that I needed to move a single position over at the end of every cycle).

  //lastly we just need to take our array and cast it to a string and remove the commas by replacing them with nothing.

  for (let c = 0; c < secretString.length; c++) {
    //It took me a year to realize that I needed to type cast this because I was constantly getting 001 when adding c + skip + 1
    c += Number(secretString[c]) + 1;
    final.push(secretString[c]);
  }
  //   return final.toString().replaceAll(",", "");

  //I think the only optimization I could have done here is to just add the values of the index positions together instead of pushing them to an array, that way I wouldn't have to cast it to a string and then replace all the commas.

  let final2 = "";
  for (let idx = 0; idx < secretString.length; idx++) {
    idx += Number(secretString[idx]) + 1;
    final2 += secretString[idx];
  }
  return final2;
}
////////////////////////////////////////////

////////////////////////////////////////////

// Finished? Try calling your functions and
// passing different arguments to test them!

// console.log(isAnagramOfPalindrome("arceace"));

console.log(decode("0h1ae2bcy"));
// console.log(decode("2abh3acbe6sjeliwy"));
