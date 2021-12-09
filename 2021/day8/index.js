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
   xxx
  x   x
1 x   x 2
  x 3 x
   xxx
  x   x
4 x   x 5
  x 6 x
   xxx 
*/
const segments = [
	127, 127, 127, 127,
	127, 127, 127
];
const findSegment = (bits = [0], letters = '') => {
	let b = 0;

	for (let i = 0; i < bits.length; i++) {
		b |= 1 << (letters.charCodeAt(i) - 97);		
	}

	for (let i = 0; i < bits.length; i++) {
		segments[bits[i]] &= b;
	}
}

for (let i = 0; i < numPairs; i++) {
	const [input, output] = pairs[i];
	const inputLen = input.length;
	for (let j = 0; j < inputLen; j++) {
		const n = input[j];
		const numDigits = n.length;

		switch (numDigits) {
			// 1
			case 2: {
				findSegment([2, 5], n);
				break;
			}
			// 4
			case 4: {
				findSegment([1, 2, 3, 5], n);
				break;
			}
			// 7
			case 3: {
				findSegment([0, 2, 5], n);
				break;
			}
			// 8
			case 7: {
				findSegment([0, 1, 2, 3, 4, 5, 6], n);
				break;
			}
		}
	}
}

segments.forEach(s => {
	console.log(s.toString(2).padStart(7, '0'));
})