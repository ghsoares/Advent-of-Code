// https://adventofcode.com/2021/day/10
import { config, loadInputLines } from '../../utils.js';
config.sampleMode = false;

const lines = loadInputLines();
const numLines = lines.length;
const openChars 	= "([{<";
const closeChars 	= ")]}>";

let scores = [];

for (let i = 0; i < numLines; i++) {
	const line = lines[i];
	const lineLength = line.length;
	const stack = [];
	let corrupted = false;
	
	for (let j = 0; j < lineLength; j++) {
		const char = line[j];
		const openIdx = openChars.indexOf(char);
		const closeIdx = closeChars.indexOf(char);
		if (openIdx !== -1) {
			stack.push(openIdx);
		} else if (closeIdx !== -1) {
			if (stack.pop() !== closeIdx) {
				corrupted = true;
				break;
			}
		} else {
			throw new Error(`Invalid character ${char}`);
		}
	}

	if (!corrupted) {
		if (stack.length > 0) {
			stack.reverse();
			let lineScore = 0;
			for (let j = 0; j < stack.length; j++) {
				lineScore *= 5;
				lineScore += stack[j] + 1;
			}
			scores.push(lineScore);
		}
	}
}

scores.sort((a, b) => a - b);
const middle = scores[Math.floor(scores.length / 2)];
console.log(`Middle score: ${middle}`);

//console.log(`Total score: ${totalScore}`);







