// https://adventofcode.com/2021/day/5

import { colorize, loadInputLines } from '../../utils.js';

const inputLines = loadInputLines();
const segments = inputLines.map(l => l.split(" -> ").map(p => p.split(",").map(n => Number(n))));
const mappedPoints = {};
let overlaps = 0;
let [minX, minY] = [-1, -1];
let [maxX, maxY] = [-1, -1];

const markPoint = (x, y) => {
	if (minX === -1) minX = x;
	if (minY === -1) minY = y;
	if (maxX === -1) maxX = x;
	if (maxY === -1) maxY = y;

	minX = Math.min(minX, x);
	minY = Math.min(minY, y);
	maxX = Math.max(maxX, x);
	maxY = Math.max(maxY, y);

	const hash = `(${x}, ${y})`;

	if (mappedPoints[hash]) {
		mappedPoints[hash] += 1;
		if (mappedPoints[hash] === 2) {
			overlaps++;
		}
	} else {
		mappedPoints[hash] = 1;
	}
}

const debug = () => {
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			const hash = `(${x}, ${y})`;
			const v = mappedPoints[hash];
			if (v) {
				process.stdout.write(
					colorize(v, [127, 255, 127])
				);
			} else {
				process.stdout.write('.');
			}
		}
		process.stdout.write("\n");
	}
}

for (const seg of segments) {
	let [[x1, y1], [x2, y2]] = seg;

	
	if (x1 === x2) {

		if (y1 > y2) [y1, y2] = [y2, y1];
		for (let y = y1; y <= y2; y++) {
			markPoint(x1, y);
		}

	} else if (y1 === y2) {

		if (x1 > x2) [x1, x2] = [x2, x1];
		for (let x = x1; x <= x2; x++) {
			markPoint(x, y1);
		}

	} else {
		let xDir = 1;
		let yDir = 1;
		let x = x1;
		let y = y1;

		if (x1 >= x2) {
			xDir = -1;
		}
		if (y1 >= y2) {
			yDir = -1;
		}

		while (true) {
			markPoint(x, y);

			x += xDir;
			y += yDir;

			if (xDir === 1) {
				if (x > x2) break;
			} else {
				if (x < x2) break;
			}

			if (yDir === 1) {
				if (y > y2) break;
			} else {
				if (y < y2) break;
			}
		}
	}
}

console.log(overlaps);