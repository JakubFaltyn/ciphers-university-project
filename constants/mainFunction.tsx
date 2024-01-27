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
        return vigenereEncrypt(input);
      } else {
        return vigenereDecrypt(input);
      }
    case "Playfair":
        if (action == "encrypt") {
            return playfairEncrypt(input);
        } else {
            return playfairDecrypt(input);
        }
  }
}

function caesarEncrypt(input: string) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (char.match(/[a-z]/i)) {
      let code = input.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + 3) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + 3) % 26) + 97);
      }
    }
    output += char;
  }
  return output;
}

function caesarDecrypt(input: string) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (char.match(/[a-z]/i)) {
      let code = input.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 - 3 + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 - 3 + 26) % 26) + 97);
      }
    }
    output += char;
  }
  return output;
}

function vigenereEncrypt(input: string) {
  let output = "";
  let key = "key";
  let j = 0;

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    if (currentChar.match(/[a-z]/i)) {
      // Check if it's an alphabetic character
      const charCode = currentChar.charCodeAt(0);
      const offset = charCode >= 65 && charCode <= 90 ? 65 : 97; // Uppercase or lowercase
      const keyCharCode = key[j % key.length].toUpperCase().charCodeAt(0) - 65;
      output += String.fromCharCode(
        ((charCode - offset + keyCharCode) % 26) + offset
      );
      j++;
    } else {
      output += currentChar; // Non-alphabetic characters are not changed
    }
  }
  return output;
}

function vigenereDecrypt(input: string) {
  let output = "";
  let key = "key";
  let j = 0;

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    if (currentChar.match(/[a-z]/i)) {
      // Check if it's an alphabetic character
      const charCode = currentChar.charCodeAt(0);
      const offset = charCode >= 65 && charCode <= 90 ? 65 : 97; // Uppercase or lowercase
      const keyCharCode = key[j % key.length].toUpperCase().charCodeAt(0) - 65;
      output += String.fromCharCode(
        ((charCode - offset - keyCharCode + 26) % 26) + offset
      );
      j++;
    } else {
      output += currentChar; // Non-alphabetic characters are not changed
    }
  }
  return output;
}