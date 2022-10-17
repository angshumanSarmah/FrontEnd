export function generateSymbol() {
    const ranges = {
        range1: '33,47',
        range2: '58,63',
        range3: '96,96',
        range4: '123,126',
    }
    const randomNumber = generateRandomNumberInRange('1,4');
    const randomSymbol = generateRandomCharacter(ranges[`range${randomNumber}`]);
    return randomSymbol;
}


function generateRandomCharacter(range) {
    const randomNumberInRange = generateRandomNumberInRange(range);
    const character = String.fromCharCode(randomNumberInRange);
    return character;
}

export function generateRandomNumberInRange(range) {
    const min = Number(range.split(',')[0]);
    const max = Number(range.split(',')[1]) + 1; //to include the last number of incoming max value in range, we need to append 1 
    const randomNumberInRange = Math.floor(Math.random() * (max - min) + min);
    return randomNumberInRange;
}

export function generateRandomNumberInRangeExcludingSome(range, numbersToExclude) {
    let randomNumberInRange = generateRandomNumberInRange(range);
    while (numbersToExclude.includes(randomNumberInRange)) {
        randomNumberInRange = generateRandomNumberInRange(range);
    }
    // console.log("numbersToExclude: ", numbersToExclude )
    // console.log("randomNumberInRange: ", randomNumberInRange )

    return randomNumberInRange;
}

export function generateLowercase() {
    return generateRandomCharacter('97,122')
}
export function generateUppercase() {
    return generateRandomCharacter('65,90')
}
export function generateNumber() {
    return generateRandomCharacter('48,57')
}


