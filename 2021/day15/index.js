// https://adventofcode.com/2021/day/15
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput();
const grid = input.split('\n').map(l => l.split('').map(c => Number(c)));
const height = grid.length;
const width = grid[0].length;

const getCell = (x, y) => {
	let ix = Math.floor(x / width);
	let iy = Math.floor(y / height);
	let c = grid[y % height][x % width] + ix + iy;
	return ((c - 1) % 9) + 1;
}

const debug = () => {
	for (let y = 0; y < height * 5; y++) {
		for (let x = 0; x < width * 5; x++) {
			if (x % width === 0) process.stdout.write(" ");
			process.stdout.write("" + getCell(x, y));
		}
		if (y % height === 0) process.stdout.write("\n");
		process.stdout.write('\n');
	}
}

const findPath = () => {
	const openSet = {};
	const closedSet = {};
	const targetX = width * 5 - 1;
	const targetY = height * 5 - 1;
	openSet[`0 0`] = {
		pos: [0, 0],
		cost: 0
	};
	let openSetLength = 1;
	let closedSetLength = 0;

	while (openSetLength > 0) {
		let lowP = Object.keys(openSet)[0];
		for (const p in openSet) {
			if (openSet[p].cost < openSet[lowP].cost) lowP = p;
		}
		const currentNode = openSet[lowP];

		if (currentNode.pos[0] === targetX && currentNode.pos[1] === targetY) {
			return currentNode;
		}

		//process.stdout.write(`${currentNode.pos[0]} ${currentNode.pos[1]}\n`)

		delete openSet[lowP];
		openSetLength--;
		closedSet[lowP] = currentNode;
		closedSetLength++;
		const [px, py] = currentNode.pos;
		const offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]];

		for (const [ox, oy] of offsets) {
			let x = px + ox;
			let y = py + oy;
			if (x < 0 || x >= width * 5) continue;
			if (y < 0 || y >= height * 5) continue;
			if (closedSet[`${x} ${y}`]) continue;

			let cost = currentNode.cost;
			let neighbour = openSet[`${x} ${y}`];

			if (!neighbour) {
				cost = cost + getCell(x, y);
				neighbour = {
					pos: [x, y],
					cost
				};
				openSet[`${x} ${y}`] = neighbour;
				openSetLength++;
			}
		}
	}

	return {};
}

//debug();

const path = findPath();
console.log(path);





