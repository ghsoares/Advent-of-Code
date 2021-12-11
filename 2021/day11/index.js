// https://adventofcode.com/2021/day/11
import { colorize, config, loadInputLines } from '../../utils.js';
config.sampleMode = true;

const input = loadInputLines();
const gridWidth = 10;
const gridHeight = 10;

let grid = input.map(l => l.split('').map(c => Number(c)));
let gridCopy = grid.slice().map(l => l.slice());

let flashes = 0;

const applyCopy = () => {
	for (let y = 0; y < gridHeight; y++) {
		for (let x = 0; x < gridWidth; x++) {
			gridCopy[y][x] = grid[y][x];
		}
	}
}

const cellChanged = (x, y) => grid[y][x] !== gridCopy[y][x];

const tick = () => {
	for (let y = 0; y < gridHeight; y++) {
		for (let x = 0; x < gridWidth; x++) {
			grid[y][x]++;
			if (grid[y][x] > 9) grid[y][x] = 0;
		}
	}

	while (true) {
		let modified = false;

		for (let y = 0; y < gridHeight; y++) {
			for (let x = 0; x < gridWidth; x++) {
				if (grid[y][x] === 0) continue;
				for (let iy = y - 1; iy <= y + 1; iy++) {
					for (let ix = x - 1; ix <= x + 1; ix++) {
						if (ix < 0 || ix >= gridWidth) continue;
						if (iy < 0 || iy >= gridHeight) continue;
						if (iy === y || ix === x) continue;

						if (cellChanged(ix, iy)) {
							if (grid[iy][ix] === 0) {
								grid[y][x]++;
								if (grid[y][x] > 9) grid[y][x] = 0;
								modified = true;
							}
						}
					}
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
for (let i = 0; i < 3; i++) {
	tick();
	debug();
}

console.log(flashes);



