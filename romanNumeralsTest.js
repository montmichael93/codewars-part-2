class RomanNumerals {
  static toRoman(num) {
  const alphaRange = ['I', 'V', 'X', 'L', 'C', 'D', 'M']; 
  let ThousandInteg =  Math.floor(num / 1000);
  let hundredsInteg = Math.floor(num % 1000 /100);
  let twoDigitInt = Math.floor(num % 100 / 10);
  let singleDigit = Math.floor(num % 10);
//Kilos 1000
if (ThousandInteg <= 3) {
  ThousandInteg = alphaRange[6].repeat(ThousandInteg);   
} 
//Benjamins 100
if (hundredsInteg <= 3 && hundredsInteg < 4) {
    hundredsInteg = alphaRange[4].repeat(hundredsInteg);
} else if (hundredsInteg === 4) {
    hundredsInteg = alphaRange[4] + alphaRange[5];
 }
 else if (hundredsInteg === 5) {
    hundredsInteg = alphaRange[5];
 }
 else if (hundredsInteg <= 6 || hundredsInteg < 9) {
    let modHundredsInteg = hundredsInteg % 5
   hundredsInteg = alphaRange[5] + alphaRange[4].repeat(modHundredsInteg)
 }
 if (hundredsInteg === 9) {
   hundredsInteg = alphaRange[4] + alphaRange[6];
 }
  //tens
 if (twoDigitInt <= 3 && twoDigitInt < 4) {
     twoDigitInt = alphaRange[2].repeat(twoDigitInt);
 } else if (twoDigitInt === 4){
     twoDigitInt = alphaRange[2] + alphaRange[3];
 }  else if (twoDigitInt === 5) {
     twoDigitInt = alphaRange[3];
  }  
  else if (twoDigitInt <= 6 || twoDigitInt < 9) {
    let modTwoDigitInt = twoDigitInt % 5
    twoDigitInt = alphaRange[3] + alphaRange[2].repeat(modTwoDigitInt)
 }
  else if (twoDigitInt === 9) {
     twoDigitInt = alphaRange[2] + alphaRange[4];
 }
  //single digits
    if (singleDigit <= 3) {
      singleDigit = alphaRange[0].repeat(singleDigit)
  } else if (singleDigit === 4) {
      singleDigit =alphaRange[0] + alphaRange[1];
  } else if (singleDigit === 5) {
      singleDigit = alphaRange[1]
  } else if (singleDigit <= 6 || singleDigit < 9) {
    let modSingleDigit = singleDigit % 5
    singleDigit = alphaRange[1] + alphaRange[0].repeat(modSingleDigit)
  } else if (singleDigit === 9) {
    singleDigit = alphaRange[0] + alphaRange[2];
 }
    
  return ThousandInteg + hundredsInteg + twoDigitInt + singleDigit;

}
  
  static fromRoman(str) {

  let finalNum = 0;
  
  let frequency = {};
for (let i = 0; i < str.length; i++) {
     let char = str[i];
     frequency[char] = (frequency[char] || 0) + 1;   
}
    
    
      for (const char in frequency) {
      
       if (char === 'M' ) {
      finalNum += frequency[char] * 1000;
     }
      if (char === 'D') {
      finalNum += frequency[char] * 500;
     }
      if (char === 'C') {
      finalNum += frequency[char] * 100;
      }
       if (char === 'L') {
      finalNum +=   frequency[char] * 50;
      }
       if (char === 'X') {
       finalNum += frequency[char] * 10;
      }
       if (char === 'V') {
         finalNum += frequency[char] * 5;
       }
        if (char === 'I') {
          finalNum += frequency[char] * 1;
        } 
   }
    

  if (str.includes('IV')) {
     finalNum  += -2;
  }  
  if (str.includes('IX')){
      finalNum +=  -2;
  }
  if (str.includes('XL')){
      finalNum  += -20;
  }
  if (str.includes('XC')) {
    finalNum  += -20; 
  }
  if (str.includes('CD')) {
    finalNum  += -200; 
  }
  if (str.includes('CM')) {
    finalNum  += -200; 
  }
    
    return finalNum
    
 }   
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


let numberInput = 1589;

function returnRoman(num) {
  const alphaRange = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  let ThousandInteg =  Math.floor(num / 1000);
  let hundredsInteg = Math.floor(num % 1000 /100);
  let twoDigitInt = Math.floor(num % 100 / 10);
  let singleDigit = Math.floor(num % 10);
//Kilos 1000
if (ThousandInteg <= 3) {
  ThousandInteg = alphaRange[6].repeat(ThousandInteg);   
} 
//Benjamins 100
if (hundredsInteg <= 3 && hundredsInteg < 4) {
    hundredsInteg = alphaRange[4].repeat(hundredsInteg);
} else if (hundredsInteg === 4) {
    hundredsInteg = alphaRange[4] + alphaRange[5];
 }
 else if (hundredsInteg === 5) {
    hundredsInteg = alphaRange[5];
 }
 else if (hundredsInteg <= 6 || hundredsInteg < 9) {
    let modHundredsInteg = hundredsInteg % 5
   hundredsInteg = alphaRange[5] + alphaRange[4].repeat(modHundredsInteg)
 }
 if (hundredsInteg === 9) {
   hundredsInteg = alphaRange[4] + alphaRange[6];
 }
  //tens 
 if (twoDigitInt <= 3 && twoDigitInt < 4) {
     twoDigitInt = alphaRange[2].repeat(twoDigitInt);
 } else if (twoDigitInt === 4){
     twoDigitInt = alphaRange[2] + alphaRange[3];
 }  else if (twoDigitInt === 5) {
     twoDigitInt = alphaRange[3];
  }  
  else if (twoDigitInt <= 6 || twoDigitInt < 9) {
    let modTwoDigitInt = twoDigitInt % 5
    twoDigitInt = alphaRange[3] + alphaRange[2].repeat(modTwoDigitInt)
 }
  else if (twoDigitInt === 9) {
     twoDigitInt = alphaRange[2] + alphaRange[4];
 }
  //single digits
    if (singleDigit <= 3) {
      singleDigit = alphaRange[0].repeat(singleDigit)
  } else if (singleDigit === 4) {
      singleDigit =alphaRange[0] + alphaRange[1];
  } else if (singleDigit === 5) {
      singleDigit = alphaRange[1]
  } else if (singleDigit <= 6 || singleDigit < 9) {
    let modSingleDigit = singleDigit % 5
    singleDigit = alphaRange[1] + alphaRange[0].repeat(modSingleDigit)
  } else if (singleDigit === 9) {
    singleDigit = alphaRange[0] + alphaRange[2];
 }
  return ThousandInteg + hundredsInteg + twoDigitInt + singleDigit;
}

console.log(returnRoman(numberInput))

/////////////////////////////////

let romanNum = 'MDLXXXIX';

function romanConvert(num) {
  let finalNum = 0;
  let specialNums = 0;
  let frequency = {};
for (let i = 0; i < num.length; i++) {
     let char = num[i];
     frequency[char] = (frequency[char] || 0) + 1;   
}
console.log(frequency);
  
      for (const char in frequency) {
      console.log(char)
 
      if (char === 'M' ) {
      finalNum += frequency[char] * 1000;
     }
      if (char === 'D') {
      finalNum += frequency[char] * 500;
     }
      if (char === 'C') {
      finalNum += frequency[char] * 100;
      }
       if (char === 'L') {
      finalNum +=   frequency[char] * 50;
      }
       if (char === 'X') {
       finalNum += frequency[char] * 10;
      }
       if (char === 'V') {
         finalNum += frequency[char] * 5;
       }
       if (char === 'I') {
         finalNum += frequency[char] * 1;
       } 
   }
 
  if (num.includes('IV')) {
     finalNum  += -2;
  }  
  if (num.includes('IX')){
      finalNum += -2;
  }
  if (num.includes('XL')){
      finalNum  += -40;
  }
  if (num.includes('XC')) {
    finalNum  += -90; 
  }
  if (num.includes('CD')) {
    finalNum  += -400; 
  }
  if (num.includes('CM')) {
    finalNum  += -900; 
  }

   console.log(finalNum);
}


romanConvert(romanNum)