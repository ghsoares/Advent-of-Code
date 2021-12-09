// https://adventofcode.com/2021/day/9
import { colorize, config, loadInputLines } from '../../utils.js';
config.sampleMode = false;

const grid 			= 	loadInputLines().map(l => l.split('').map(c => Number(c)));
const gridHeight 	= 	grid.length;
const gridWidth 	= 	grid[0].length;

const evaluateLocalMinimum = (x, y) => {
	const h = grid[y][x];
	if (x > 0) {
		if (grid[y][x - 1] <= h) return false;
	}
	if (x < gridWidth - 1) {
		if (grid[y][x + 1] <= h) return false;
	}
	if (y > 0) {
		if (grid[y - 1][x] <= h) return false;
	}
	if (y < gridHeight - 1) {
		if (grid[y + 1][x] <= h) return false;
	}
	return true;
}

const basinSize = (x, y) => {
	const visited = {};

	const recursive = (prev, x, y) => {
		const pos = `${x}_${y}`;
		if (visited[pos] !== undefined) return;
		const h = grid[y][x];
		if (h === 9) return;
		if (h < prev) return;
		
		visited[pos] = h;

		if (x > 0) recursive(h, x - 1, y);
		if (x < gridWidth - 1) recursive(h, x + 1, y);
		if (y > 0) recursive(h, x, y - 1);
		if (y < gridHeight - 1) recursive(h, x, y + 1);
	}

	recursive(-1, x, y);

	return Object.values(visited).length;
}

let basins = [];

for (let y = 0; y < gridHeight; y++) {
	for (let x = 0; x < gridWidth; x++) {
		const h = grid[y][x];
		if (evaluateLocalMinimum(x, y)) {
			process.stdout.write(colorize(h.toString(), [127, 255, 127]));
			basins.push(basinSize(x, y));
		} else {
			process.stdout.write(colorize(h.toString(), [127, 127, 127]));
		}
	}
	process.stdout.write('\n');
}

basins = basins.sort((a, b) => b - a).filter((_, idx) => idx < 3);
let res = basins.reduce((prev, curr) => prev * curr);

console.log(`Basins areas: ${basins}`);
console.log(`Result: ${res}`);




