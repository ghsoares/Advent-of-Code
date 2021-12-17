// https://adventofcode.com/2021/day/17
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput().slice(13);
const [xTargetRangeStr, yTargetRangeStr] = input.split(', ').map(c => c.slice(2).split(".."));
const [xTargetStart, xTargetEnd] = [Number(xTargetRangeStr[0]), Number(xTargetRangeStr[1])];
const [yTargetStart, yTargetEnd] = [Number(yTargetRangeStr[0]), Number(yTargetRangeStr[1])];

const vSet = new Set();

const simulate = (v0x, v0y) => {
	let px = 0;
	let py = 0;
	let vx = v0x;
	let vy = v0y;
	while (true) {
		px += vx;
		py += vy;
		if (vx != 0) vx -= Math.sign(vx);
		vy -= 1;

		if (px >= xTargetStart && px <= xTargetEnd) {
			if (py >= yTargetStart && py <= yTargetEnd) {
				vSet.add(`${v0x} ${v0y}`);
				break;
			}
		}

		if (px > xTargetEnd) break;
		if (py < yTargetStart) break;
	}
}

const simulateTrajectories = (tx) => {
	const vMinX = Math.round(Math.sqrt(tx + tx));
	const vMaxX = tx;
	const vMinY = yTargetStart;
	const vMaxY = -yTargetStart;
	for (let vx = vMinX; vx <= vMaxX; vx++) {
		for (let vy = vMinY; vy <= vMaxY; vy++) {
			simulate(vx, vy);
		}
	}
}

for (let tx = xTargetStart; tx <= xTargetEnd; tx++) {
	simulateTrajectories(tx);
}

console.log(vSet.size);