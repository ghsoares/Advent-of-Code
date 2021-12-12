// https://adventofcode.com/2021/day/11
import { colorize, config, loadInputLines } from '../../utils.js';
config.sampleMode = false;

const input = loadInputLines();
const gridWidth = 10;
const gridHeight = 10;

let grid = input.map(l => l.split('').map(c => Number(c)));
let gridCopy = grid.slice().map(l => l.slice());
let flashes = 0;
let tickFlashes = 0;

const applyCopy = () => {
	for (let y = 0; y < gridHeight; y++) {
		for (let x = 0; x < gridWidth; x++) {
			gridCopy[y][x] = grid[y][x];
		}
	}
}

const cellFlashed = (x, y) => gridCopy[y][x] > 0 && grid[y][x] === 0;

const outOfBounds = (x, y) => x < 0 || x >= gridWidth || y < 0 || y >= gridHeight;

const tick = () => {
	for (let y = 0; y < gridHeight; y++) {
		for (let x = 0; x < gridWidth; x++) {
			grid[y][x]++;
			if (grid[y][x] > 9) grid[y][x] = 0;
		}
	}

	tickFlashes = 0;

	while (true) {
		let modified = false;

		for (let y = 0; y < gridHeight; y++) {
			for (let x = 0; x < gridWidth; x++) {
				if (cellFlashed(x, y)) {
					for (let iy = y - 1; iy <= y + 1; iy++) {
						for (let ix = x - 1; ix <= x + 1; ix++) {
							if (outOfBounds(ix, iy)) continue;
							if (grid[iy][ix] === 0) continue;

							grid[iy][ix]++;
							if (grid[iy][ix] > 9) grid[iy][ix] = 0;
						}
					}

					gridCopy[y][x] = grid[y][x];
					modified = true;
					flashes++;
					tickFlashes++;
				}
			}
		}

		if (!modified) break;
	}

	applyCopy();
}

const debug = () => {
	for (let y = 0; y < gridHeight; y++) {
		for (let x = 0; x < gridWidth; x++) {
			const c = grid[y][x];
			if (c === 0) {
				process.stdout.write(colorize("" + c, [127, 255, 127]));
			} else {
				process.stdout.write(colorize("" + c, [127, 127, 127]));
			}
		}
		process.stdout.write('\n');
	}
	process.stdout.write('\n');
}

debug();
let steps = 0;
while (true) {
	steps++;
	tick();
	debug();
	if (tickFlashes === gridWidth * gridHeight) break;
}

console.log(steps);



