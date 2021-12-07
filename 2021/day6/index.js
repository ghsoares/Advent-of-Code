// https://adventofcode.com/2021/day/6

import { loadInput } from '../../utils.js';

const input = loadInput();
const initialFishes = input.split(',').map(f => Number(f));

let fishes = new Array(9);
for (let i = 0; i < 9; i++) {
	fishes[i] = 0;
}
for (const fishIdx of initialFishes) {
	fishes[fishIdx]++;
}

const dayTick = () => {
	const newFishes = [...fishes];

	for (let i = 0; i < 9; i++) {
		if (fishes[i] > 0) {
			const dif = fishes[i];
			newFishes[i] -= dif;
			if (i === 0) {
				newFishes[6] += dif;
				newFishes[8] += dif;
			} else {
				newFishes[i - 1] += dif;
			}
		}
	}

	fishes = newFishes;
}

const total = () => {
	let c = 0;

	for (let i = 0; i < 9; i++) {
		c += fishes[i];
	}

	return c;
}

for (let i = 0; i < 256; i++) {
	dayTick();
	console.log(`Total: ${total()}`);
}

