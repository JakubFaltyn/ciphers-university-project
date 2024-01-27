export default function getOutput(
  cipherType: string,
  action: string,
  input: string
) {
  switch (cipherType) {
    case "Caesar":
      if (action == "encrypt") {
        return caesarEncrypt(input);
      } else {
        return caesarDecrypt(input);
      }
    case "Vigenere":
      if (action == "encrypt") {
        return vigenereEncrypt(input, "abc");
      } else {
        return vigenereDecrypt(input, "abc");
      }
    case "Polybius":
        if (action == "encrypt") {
            return polybiusEncrypt(input);
        } else {
            return polybiusDecrypt(input);
        }
    case "Trithemius":
        if (action == "encrypt") {
            return trithemiusEncrypt(input);
        } else {
            return trithemiusDecrypt(input);
        }
  }
}

function caesarEncrypt(input: string) {
  const polishAlphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
  const shift = 3;
  let output = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isUpperCase = char === char.toUpperCase();
    let index = polishAlphabet.indexOf(char.toLowerCase());

    if (index !== -1) {
      // Found in the Polish alphabet
      index = (index + shift) % polishAlphabet.length;
      output += isUpperCase
        ? polishAlphabet[index].toUpperCase()
        : polishAlphabet[index];
    } else {
      // Character not in Polish alphabet, leave unchanged
      output += char;
    }
  }

  return output;
}

function caesarDecrypt(input: string) {
  const polishAlphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
  const shift = 3;
  let output = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isUpperCase = char === char.toUpperCase();
    let index = polishAlphabet.indexOf(char.toLowerCase());

    if (index !== -1) {
      // Found in the Polish alphabet
      index = (index - shift + polishAlphabet.length) % polishAlphabet.length;
      output += isUpperCase
        ? polishAlphabet[index].toUpperCase()
        : polishAlphabet[index];
    } else {
      // Character not in Polish alphabet, leave unchanged
      output += char;
    }
  }

  return output;
}

function vigenereEncrypt(input: string, key: string) {
  const polishAlphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
  let output = "";
  let j = 0;

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    const isUpperCase = currentChar === currentChar.toUpperCase();
    let index = polishAlphabet.indexOf(currentChar.toLowerCase());

    if (index !== -1) {
      const keyIndex = polishAlphabet.indexOf(
        key[j % key.length].toLowerCase()
      );
      index = (index + keyIndex) % polishAlphabet.length;
      output += isUpperCase
        ? polishAlphabet[index].toUpperCase()
        : polishAlphabet[index];
      j++;
    } else {
      output += currentChar;
    }
  }

  return output;
}

function vigenereDecrypt(input: string, key: string) {
  const polishAlphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
  let output = "";
  let j = 0;

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    const isUpperCase = currentChar === currentChar.toUpperCase();
    let index = polishAlphabet.indexOf(currentChar.toLowerCase());

    if (index !== -1) {
      const keyIndex = polishAlphabet.indexOf(
        key[j % key.length].toLowerCase()
      );
      index =
        (index - keyIndex + polishAlphabet.length) % polishAlphabet.length;
      output += isUpperCase
        ? polishAlphabet[index].toUpperCase()
        : polishAlphabet[index];
      j++;
    } else {
      output += currentChar;
    }
  }

  return output;
}

// Polybius square

// Initialize the Polybius square for the Polish alphabet
const polybiusSquare = [
    ['a', 'ą', 'b', 'c', 'ć', 'd'],
    ['e', 'ę', 'f', 'g', 'h', 'i'],
    ['j', 'k', 'l', 'ł', 'm', 'n'],
    ['ń', 'o', 'ó', 'p', 'r', 's'],
    ['ś', 't', 'u', 'w', 'y', 'z'],
    ['ź', 'ż', '-', '-', '-', '-'] // "-" can be used for spaces or punctuation
  ];
  
  // Function to encrypt plaintext using the Polybius square
  function polybiusEncrypt(input: string) {
    let output = '';
    for (let char of input.toLowerCase()) {
      let found = false;
      for (let row = 0; row < polybiusSquare.length && !found; row++) {
        for (let col = 0; col < polybiusSquare[row].length; col++) {
          if (polybiusSquare[row][col] === char) {
            // Append coordinates, adjusted for human-friendly indexing (1-based)
            output += `${row + 1}${col + 1} `;
            found = true;
            break;
          }
        }
      }
      if (!found) {
        output += '00 '; // A way to handle characters not found, adjust as needed
      }
    }
    return output.trim();
  }
  
  // Function to decrypt ciphertext using the Polybius square
  function polybiusDecrypt(input: string) {
    let output = '';
    const pairs = input.match(/\d{2}/g); // Match pairs of digits
  
    if (pairs) {
      for (let pair of pairs) {
        const row = parseInt(pair[0], 10) - 1; // Adjust back to 0-based indexing
        const col = parseInt(pair[1], 10) - 1;
        if (row >= 0 && row < polybiusSquare.length && col >= 0 && col < polybiusSquare[row].length) {
          output += polybiusSquare[row][col];
        } else {
          output += '?'; // A way to mark invalid coordinates
        }
      }
    }
  
    return output;
  }
  
  function trithemiusEncrypt(input: string) {
    const polishAlphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż';
    let output = '';
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const isUpperCase = char === char.toUpperCase();
      let index = polishAlphabet.indexOf(char.toLowerCase());
  
      if (index !== -1) {
        // Found in the Polish alphabet
        // Incrementally shift the character based on its position
        index = (index + i) % polishAlphabet.length;
        output += isUpperCase ? polishAlphabet[index].toUpperCase() : polishAlphabet[index];
      } else {
        // Character not in Polish alphabet, leave unchanged
        output += char;
      }
    }
  
    return output;
  }
  
  function trithemiusDecrypt(input: string) {
    const polishAlphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż';
    let output = '';
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const isUpperCase = char === char.toUpperCase();
      let index = polishAlphabet.indexOf(char.toLowerCase());
  
      if (index !== -1) {
        // Found in the Polish alphabet
        // Reverse the incremental shift based on its position
        index = (index - i + polishAlphabet.length) % polishAlphabet.length;
        output += isUpperCase ? polishAlphabet[index].toUpperCase() : polishAlphabet[index];
      } else {
        // Character not in Polish alphabet, leave unchanged
        output += char;
      }
    }
  
    return output;
  }
  