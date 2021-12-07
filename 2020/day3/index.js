// https://adventofcode.com/2020/day/3
import { config, loadInputLines, MODE_INPUT, MODE_SAMPLE } from '../../utils.js';
config.mode = MODE_INPUT;

const map = loadInputLines();
const height = map.length;
const width = map[0].length;

let [posX, posY] = [0, 0];

const move = (sx, sy) => {
	posX += sx;
	posY += sy;

	posX = ((posX % width) + width) % width;
}

let directions = [
	[1, 1],
	[3, 1],
	[5, 1],
	[7, 1],
	[1, 2],
];

let total = 0;

for (let i = 0; i < directions.length; i++) {
	let count = 0;

	posX = 0;
	posY = 0;
	
	while (posY < height) {
		const cell = map[posY][posX];
	
		if (cell === '#') count++;
	
		move(directions[i][0], directions[i][1]);
	}
	
	console.log(`Right ${directions[i][0]} Down ${directions[i][1]}: ${count}`);
	if (i === 0) total = count;
	else total *= count;
}
console.log(`Total: ${total}`);






