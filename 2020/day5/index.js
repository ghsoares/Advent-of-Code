// https://adventofcode.com/2020/day/5
import { config, loadInputLines } from '../../utils.js';
config.sampleMode = false;

const lines = loadInputLines();
const numLines = lines.length;

let highest = 0;
let list = [];

for (let i = 0; i < numLines; i++) {
	const line = lines[i];

	let rMin = 0;
	let rMax = 127;
	let r = -1;

	for (let j = 0; j < 7; j++) {
		const char = line[j];
		const rRange = (rMax - rMin);

		if (char === 'F') {
			rMax = rMin + Math.floor(rRange / 2);
		} else {
			rMin += Math.ceil(rRange / 2);
		}

		if (j === 6) {
			if (char === 'B') {
				r = rMin;
			} else {
				r = rMax;
			}
		}
	}

	let cMin = 0;
	let cMax = 7;
	let c = -1;

	for (let j = 0; j < 3; j++) {
		const char = line[7 + j];
		const cRange = (cMax - cMin);

		if (char === 'L') {
			cMax = cMin + Math.floor(cRange / 2);
		} else {
			cMin += Math.ceil(cRange / 2);
		}

		if (j === 2) {
			if (char === 'L') {
				c = cMin;
			} else {
				c = cMax;
			}
		}
	}

	const id = (r * 8) + c;

	highest = Math.max(highest, id);
	list.push(id);
}

for (let i = 0; i <= highest; i++) {
	if (list.indexOf(i) === -1) console.log(`Missing ID: ${i}`);
}

console.log(`Highest: ${highest}`);







