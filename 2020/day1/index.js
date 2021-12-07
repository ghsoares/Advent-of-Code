// https://adventofcode.com/2020/day/1
import { loadInputLines, config } from '../../utils.js';
config.sampleMode = false;
const numbers = loadInputLines().map(l => Number(l));
const numNumbers = numbers.length;

let [num1, num2, num3] = [null, null, null];
let found = false;

for (let i = 0; i < numNumbers; i++) {
	for (let j = 0; j < numNumbers; j++) {
		for (let k = 0; k < numNumbers; k++) {
			if (i === j || i === k || k === j) continue;
	
			const sum = numbers[i] + numbers[j] + numbers[k];
			
			if (sum === 2020) {
				[num1, num2, num3] = [numbers[i], numbers[j], numbers[k]];
				found = true;
				break;
			}
		}
		if (found) break;
	}
	if (found) break;
}

console.log(num1 * num2 * num3);