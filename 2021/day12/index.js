// https://adventofcode.com/2021/day/12
import { config, loadInputLines } from '../../utils.js';
config.sampleMode = false;

const lines = loadInputLines();
const caves = {};
const smallCaves = new Set();
for (let i = 0; i < lines.length; i++) {
	const [a, b] = lines[i].split('-');

	const caveA = caves[a] || { 'isBig': a === a.toUpperCase(), connections: [] };
	const caveB = caves[b] || { 'isBig': b === b.toUpperCase(), connections: [] };

	if (a !== 'start' && !caveA.isBig) smallCaves.add(a);
	if (b !== 'end' && !caveB.isBig) smallCaves.add(b);

	caveA.connections.push(b);
	caveB.connections.push(a);
	caves[a] = caveA;
	caves[b] = caveB;
}

const paths = new Set();
let currSmallCave = '';

const pathCount = (path = [], el = '') => {
	let c = 0;

	path.forEach(e => {
		if (e === el) c++;
	});

	return c;
}

const findPath = (caveName, path = []) => {
	path.push(caveName);
	if (caveName === 'end') {
		paths.add(JSON.stringify(path));
		return;
	}

	const cave = caves[caveName];

	cave.connections.forEach(other => {
		if (other === 'start') return;
		if (!caves[other].isBig) {
			if (other === currSmallCave && pathCount(path, other) > 1) return;
			else if (other !== currSmallCave && path.indexOf(other) !== -1) return;
		}
		const pathCopy = [...path];
		findPath(other, pathCopy);
	});
}

smallCaves.forEach(c => {
	currSmallCave = c;
	const start = caves['start'];
	start.connections.forEach(b => {
		const path = ['start'];
		findPath(b, path);
	});
})

console.log(paths.size);




