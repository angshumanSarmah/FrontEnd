import { generateLowercase, generateUppercase, generateNumber, generateSymbol, generateRandomNumberInRange, generateRandomNumberInRangeExcludingSome } from './utils.js';


const inputRangeElement = document.getElementById('length-range');
const inputLengthElement = document.getElementById('length-number');

inputRangeElement.addEventListener('input', syncRangeAndNumber);
inputLengthElement.addEventListener('input', syncRangeAndNumber);

function syncRangeAndNumber(e) {
    const value = e.target.value;
    inputRangeElement.value = value;
    inputLengthElement.value = value;
}

const includeUppercaseElement = document.getElementById('uppercase');
const includeNumberElement = document.getElementById('number');
const includeSymbolsElement = document.getElementById('symbols');
const maskPasswordElement = document.getElementById('mask-password');
const generateButtonElement = document.getElementById('generate-btn');
const copyButtonElement = document.getElementById('copy-btn');
const generatedPassword = document.getElementById('password-field');

maskPasswordElement.addEventListener('click', () => {
    if (maskPasswordElement.checked) {
        generatedPassword.setAttribute('type', 'password');
    } else {
        generatedPassword.setAttribute('type', 'input');
    }
})

generateButtonElement.addEventListener('click', () => {
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumber = includeNumberElement.checked;
    const includeSymbol = includeSymbolsElement.checked;
    const passwordLength = inputLengthElement.value;
    generatedPassword.value = generatePassword(passwordLength, includeUppercase, includeNumber, includeSymbol)
})

function generatePassword(passwordLength, includeUppercase, includeNumber, includeSymbol) {
    let password = new Array(Number(passwordLength));

    let alreadyFilledPositions = [];
    const possiblePasswordElements = [];
    possiblePasswordElements.push(generateLowercase);
    makeSurePasswordHasAtLeast1FromEachSegment(password, alreadyFilledPositions, passwordLength, generateLowercase);
    if (includeUppercase) {
        possiblePasswordElements.push(generateUppercase);
        makeSurePasswordHasAtLeast1FromEachSegment(password, alreadyFilledPositions, passwordLength, generateUppercase);
    }
    if (includeNumber) {
        possiblePasswordElements.push(generateNumber);
        makeSurePasswordHasAtLeast1FromEachSegment(password, alreadyFilledPositions, passwordLength, generateNumber);
    }
    if (includeSymbol) {
        possiblePasswordElements.push(generateSymbol);
        makeSurePasswordHasAtLeast1FromEachSegment(password, alreadyFilledPositions, passwordLength, generateSymbol);

    }

    for (let i = 0; i < passwordLength; i++) {
        if (!password[i]) {
            const randomNumberToPickTypeOfValue = generateRandomNumberInRangeExcludingSome(`0, ${possiblePasswordElements.length - 1}`, alreadyFilledPositions);
            password[i] = (possiblePasswordElements[randomNumberToPickTypeOfValue]());
        }
    }
    return password.join('');
}

/*
    this method ensures  to insert random character for 
    EACH selected type in a random position
*/
function makeSurePasswordHasAtLeast1FromEachSegment(password, alreadyFilledPositions, passwordLength, method) {
    let randomNumberToPickRandomPosition = generateRandomNumberInRangeExcludingSome(`0, ${passwordLength - 1}`, alreadyFilledPositions);
    while (!password[randomNumberToPickRandomPosition]) {
        randomNumberToPickRandomPosition = generateRandomNumberInRangeExcludingSome(`0, ${passwordLength - 1}`, alreadyFilledPositions);
        password[randomNumberToPickRandomPosition] = method();
    }
    alreadyFilledPositions.push(randomNumberToPickRandomPosition);
}









