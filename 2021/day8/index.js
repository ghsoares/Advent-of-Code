// https://adventofcode.com/2021/day/8
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput();
const pairs = input.split('\n').map(
	p => p.split(' | ').map(d => d.split(' '))
);

const numPairs = pairs.length;

let numbers = Array.from(new Array(10));

const toBinary = (n = 0, size = 7, reverse = true) => {
    const s = n.toString(2).padStart(size, '0');
    if (reverse) {
        return s.split('').reverse().join('');
    }
    return s;
}

const lettersToNumber = (letters = '') => {
    let b = 0;

    for (let i = 0; i < letters.length; i++) {
        b |= 1 << (letters.charCodeAt(i) - 97);
    }

    return b;
}

const addLetters = (n = 0, letters = '') => {
    numbers[n] |= lettersToNumber(letters);
}

const numContains = (a = 0, b = 0) => (a & b) === a;

const printNumbers = () => {
    console.log(`   abcdefg`);
    numbers.forEach((el, idx) => {
        console.log(`${idx}: ${toBinary(el)}`);
    });
}

let outputSum = 0;

for (let i = 0; i < numPairs; i++) {
    numbers = numbers.map(_ => 0);

    const [input, output] = pairs[i];
    const digits = [...input, ...output];

    // Identify easy digits
    for (let j = 0; j < digits.length; j++) {
        let letters = digits[j];
        switch (letters.length) {
            case 2: {
                addLetters(1, letters);
                break;
            }
            case 4: {
                addLetters(4, letters);
                break;
            }
            case 3: {
                addLetters(7, letters);
                break;
            }
            case 7: {
                addLetters(8, letters);
                break;
            }
        }
    }

    // Fourdiff, based on https://www.reddit.com/r/adventofcode/comments/rbvpui/2021_day_8_part_2_my_logic_on_paper_i_used_python/
    const fourdiff = numbers[4] & ~(numbers[4] & numbers[1]);

    for (let j = 0; j < digits.length; j++) {
        let letters = digits[j];
        const num = lettersToNumber(letters);
        
        switch (letters.length) {
            case 5: {
                // Contains one, so it is 3
                if (numContains(numbers[1], num)) {
                    numbers[3] = num;
                // Contains fourdiff, so it is 5
                } else if (numContains(fourdiff, num)) {
                    numbers[5] = num;
                // It is 2
                } else {
                    numbers[2] = num;
                }
                break;
            }
            case 6: {
                // Contains four, so it is 9
                if (numContains(numbers[4], num)) {
                    numbers[9] = num;
                // Contains fourdiff, so it is 6
                } else if (numContains(fourdiff, num)) {
                    numbers[6] = num;
                // It is 0
                } else {
                    numbers[0] = num;
                }
                break;
            }
        }
    }
    
    // Build a binary map from the numbers
    const binMap = {};
    for (let j = 0; j < 10; j++) {
        binMap[numbers[j]] = j;
    }

    //printNumbers();

    // Finally, let's decode output
    let decoded = 0;
    for (let j = 0; j < output.length; j++) {
        const num = lettersToNumber(output[j]);
        decoded += binMap[num] * Math.pow(10, (output.length - j) - 1);
    }
    outputSum += decoded;
}

console.log(outputSum);