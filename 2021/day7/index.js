// https://adventofcode.com/2021/day/7

import { loadInput } from '../../utils.js';

const input = loadInput();
const positions = input.split(`,`).map(p => Number(p));
const numPositions = positions.length;
const minPos = positions.reduce((prev = Number.MAX_VALUE, curr) => Math.min(prev, curr));
const maxPos = positions.reduce((prev = Number.MIN_VALUE, curr) => Math.max(prev, curr));

let minUsed = Number.MAX_VALUE;

for (let i = minPos; i <= maxPos; i++) {
	let total = 0;
	for (let j = 0; j < numPositions; j++) {
		let c = Math.abs(i - positions[j]);
		c = (c * (c + 1)) / 2;
		total += c;
	}
	minUsed = Math.min(minUsed, total);
}

console.log(minUsed);