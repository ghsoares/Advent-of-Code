// https://adventofcode.com/2021/day/14
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput();
const [templateStr, pairsStr] = input.split(/\n{2}/g);

let elementCount = {};
let pairs = {};

for (const t of templateStr.split('')) {
	if (elementCount[t]) elementCount[t]++;
	else elementCount[t] = 1;
}
for (const p of pairsStr.split('\n')) {
	const [pair, output] = p.split(' -> ');
	pairs[pair] = { count: 0, output };
	for (let i = 0; i < templateStr.length; i++) {
		if (templateStr.slice(i).startsWith(pair)) pairs[pair].count++;
	}
}

const incrementElement = (el, times) => {
	if (elementCount[el]) elementCount[el] += times;
	else elementCount[el] = times;
}

const step = () => {
	const newPairs = JSON.parse(JSON.stringify(pairs));

	for (const pair in pairs) {
		const { count, output } = pairs[pair];
		if (count > 0) {
			incrementElement(output, count);

			const left = pair[0] + output;
			const right = output + pair[1];

			if (newPairs[left]) newPairs[left].count += count;
			if (newPairs[right]) newPairs[right].count += count;

			newPairs[pair].count -= count;
		}
	}

	pairs = newPairs;
}

const debug = () => {
	let str = "";
	for (const el in elementCount) {
		const count = elementCount[el];
		if (count > 0) {
			str += el.repeat(count);
		}
	}
	console.log(str);
}

for (let i = 0; i < 40; i++) {
	step();
}

let minCount = Number.MAX_SAFE_INTEGER;
let maxCount = Number.MIN_SAFE_INTEGER;

for (const el in elementCount) {
	const count = elementCount[el];
	minCount = Math.min(minCount, count);
	maxCount = Math.max(maxCount, count);
}

console.log(`${maxCount} - ${minCount} = ${maxCount - minCount}`);