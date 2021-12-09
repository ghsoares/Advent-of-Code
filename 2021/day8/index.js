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
let numbers = [
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
];

for (let i = 0; i < numPairs; i++) {
    numbers = numbers.map(_ => new Set());

    const [input, output] = pairs[i];
    const digits = [...input, ...output];

    for (let j = 0; j < digits.length; j++) {
        const d = digits[j];

        switch (d.length) {
            case 2: {
                numbers[1].add(d[0]);
                numbers[1].add(d[1]);
                break;
            }
        }
    }

    numbers = numbers.map(s => Array.from(s).sort().join(''));

    console.log(numbers);
}