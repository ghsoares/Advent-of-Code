// https://adventofcode.com/2021/day/1

import { loadInputLines } from '../utils.js';

const inputLines = loadInputLines().map(line => Number(line));
const inputLength = inputLines.length;

let increased = 0;

const measurement = (i) => inputLines[i] + inputLines[i + 1] + inputLines[i + 2];

for (let i = 1; i < inputLength - 2; i++) {
	const curr = measurement(i);
	const prev = measurement(i - 1);

	if (curr > prev) increased++;
}

console.log(increased);