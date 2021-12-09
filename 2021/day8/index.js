// https://adventofcode.com/2021/day/8
import { config, loadInput } from '../../utils.js';
config.sampleMode = true;

const input = loadInput();
const pairs = input.split('\n').map(
	p => p.split(' | ').map(d => d.split(' '))
);
const numPairs = pairs.length;

/*
     0
   a a a
  b     c
1 b     c 2
  b  3  c
   d d d
  e     f
4 e     f 5
  e  6  f
   g g g 
*/

let segments = [
	0, 0, 0, 0,
	0, 0, 0
];

const toBinary = (n = 0, size = 7) => {
    return n.toString(2).padStart(7, '0').split('').reverse().join('');
}

const numOnes = (n = 0, size = 7) => {
    let count = 0;

    for (let i = 0; i < size; i++) {
        if ((n & (1 << i)) > 0) count++;
    }

    return count;
}

const firstOne = (n = 0, size = 7) => {
    for (let i = 0; i < size; i++) {
        if ((n & (1 << i)) > 0) return i;
    }
    return -1;
}

const findSegment = (bits = [0], letters = '') => {
    let b = 0;

    for (let i = 0; i < bits.length; i++) {
        b |= 1 << (letters.charCodeAt(i) - 97);
    }

	for (let i = 0; i < bits.length; i++) {
		segments[bits[i]] &= b;
	}
}

const findLessBit = (i = 0) => {
    let lesser = -1;
    let idx = -1;

    for (let j = 0; j < 7; j++) {
        const b = segments[i] & (1 << j);
        if (b === 0) continue;

        let count = 0;
        for (let k = 0; k < 7; k++) {
            const b2 = segments[k] & (1 << j);
            if (b2 > 0) count++;
        }

        if (idx === -1 || count < lesser) {
            lesser = count;
            idx = j;
        }
    }

    return idx;
}

const printSegments = () => {
    console.log(`   abcdefg`);
    segments.forEach((s, idx) => {
        console.log((idx) + ": " + toBinary(s));
    });
    console.log('');
}

const filterSegments = () => {
    for (let i = 0; i < 7; i++) {
        const lessIdx = findLessBit(i);
        const b = (1 << lessIdx);

        for (let j = 0; j < 7; j++) {
            if (i === j) {
                segments[j] &= b;
            } else {
                segments[j] &= 127 & ~b;
            }
        }

        printSegments();
    }
}

// First filter
for (let i = 0; i < numPairs; i++) {
    segments = segments.map(s => 127);
	const [input, output] = pairs[i];
    const digits = [...input, ...output];
	const digitsLen = digits.length;

    // First filter
	for (let j = 0; j < digitsLen; j++) {
		const n = digits[j];
		const numDigits = n.length;

		switch (numDigits) {
			// 1
			case 2: {
				findSegment([2, 5], n);
				break;
			}
            // 7
			case 3: {
				findSegment([0, 2, 5], n);
				break;
			}
			// 4
			case 4: {
				findSegment([1, 2, 3, 5], n);
				break;
			}
			// 8
			case 7: {
				findSegment([0, 1, 2, 3, 4, 5, 6], n);
				break;
			}
		}
	}

    printSegments();

    filterSegments();
}