// https://adventofcode.com/2021/day/2

import { loadInputLines } from '../utils.js';

const inputLines = loadInputLines();
const numSteps = inputLines.length;

let depth = 0;
let pos = 0;
let aim = 0;

const forward = (steps) => {
	pos += steps;
	depth += steps * aim;
}
const up = (steps) => {
	aim -= steps;
}
const down = (steps) => {
	aim += steps;
}

const forwardStep = /^forward (\d+)/;
const upStep = /^up (\d+)/;
const downStep = /^down (\d+)/;

for (let i = 0; i < numSteps; i++) {
	const step = inputLines[i];

	let match = null;
	if ((match = forwardStep.exec(step))) {
		forward(Number(match[1]));
	} else if (match = upStep.exec(step)) {
		up(Number(match[1]));
	} else if (match = downStep.exec(step)) {
		down(Number(match[1]));
	}
}

console.log(`${depth} ${pos} ${depth * pos}`);