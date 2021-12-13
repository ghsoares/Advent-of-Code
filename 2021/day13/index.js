// https://adventofcode.com/2021/day/13
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput();
const [chunk1, chunk2] = input.split(/\n{2}/g);
const dotCoordinates = chunk1.split('\n')
	.map(
		l => l.split(',').map(c => Number(c))
	);
const foldInstructions = chunk2.split('\n')
	.map(l => l.split(' ')[2].split('='))
	.map(l => [l[0], Number(l[1])]);

const grid = {};
let sizeX = -1;
let sizeY = -1;

const posKey = (x, y) => `${x}_${y}`;

const debug = () => {
	for (let y = 0; y <= sizeY; y++) {
		for (let x = 0; x <= sizeX; x++) {
			const pos = `${x}_${y}`;
			if (grid[pos]) {
				process.stdout.write('#');
			} else {
				process.stdout.write(' ');
			}
		}
		process.stdout.write('\n');
	}
	process.stdout.write('\n');
}

const visibleDots = () => {
	let c = 0;

	for (let y = 0; y <= sizeY; y++) {
		for (let x = 0; x <= sizeX; x++) {
			const pos = posKey(x, y);
			if (grid[pos]) c++;
		}
	}

	return c;
}

for (let i = 0; i < dotCoordinates.length; i++) {
	const [x, y] = dotCoordinates[i];
	sizeX = Math.max(sizeX, x);
	sizeY = Math.max(sizeY, y);
	const pos = `${x}_${y}`;
	grid[pos] = true;
}

//debug();

for (let i = 0; i < foldInstructions.length; i++) {
	const [direction, off] = foldInstructions[i];

	if (direction === 'y') {
		for (let y = off + 1; y <= sizeY; y++) {
			for (let x = 0; x <= sizeX; x++) {
				const yDest = off - (y - off);
				if (yDest < 0) throw new Error(`Out of bounds`);
				const posA = `${x}_${y}`;
				const posB = `${x}_${yDest}`;
				if (grid[posA]) grid[posB] = true;
			}
		}
		sizeY = off - 1;
	} else if (direction === 'x') {
		for (let x = off + 1; x <= sizeX; x++) {
			for (let y = 0; y <= sizeY; y++) {
				const xDest = off - (x - off);
				if (xDest < 0) throw new Error(`Out of bounds`);
				const posA = `${x}_${y}`;
				const posB = `${xDest}_${y}`;
				if (grid[posA]) grid[posB] = true;
			}
		}
		sizeX = off - 1;
	} else {
		throw new Error(`Invalid direction "${direction}"`);
	}
}

debug();

console.log(`${sizeX} ${sizeY}`);