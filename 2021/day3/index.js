// https://adventofcode.com/2021/day/3
// First part

import { loadInputLines } from '../../utils.js';

const inputLines = loadInputLines();
const binLen = inputLines[0].length;

const getBits = (pos, list = inputLines) => {
	let zeros = 0;
	let ones = 0;
	let length = list.length;

	for (let j = 0; j < length; j++) {
		if (list[j][pos] === '0') zeros++;
		else ones++;
	}

	return [zeros, ones];
}

const toDecimal = (bin = "") => {
	const len = bin.length;

	let res = 0;
	for (let i = 0; i < len; i++) {
		res += Number(bin[i]) * Math.pow(2, (len - 1) - i);
	}

	return res;
}

let gammaBin = "";
let epsilonBin = "";

for (let i = 0; i < binLen; i++) {
	const [zeros, ones] = getBits(i);

	if (ones > zeros) {
		gammaBin += "1";
		epsilonBin += "0";
	} else {
		gammaBin += "0";
		epsilonBin += "1";
	}
}

const gamma = toDecimal(gammaBin);
const epsilon = toDecimal(epsilonBin);

console.log(`${gamma} ${epsilon} ${gamma * epsilon}`);

// Second part
let oxygen = 0;
let co2 = 0;

let numbers = [...inputLines];

for (let i = 0; i < binLen; i++) {
	const [zeros, ones] = getBits(i, numbers);
	const digit = ones >= zeros ? '1' : '0';

	for (let j = numbers.length - 1; j >= 0; j--) {
		if (numbers[j][i] !== digit) numbers.splice(j, 1);
	}

	if (numbers.length === 1) {
		oxygen = toDecimal(numbers[0]);
		break;
	}
}

numbers = [...inputLines];

for (let i = 0; i < binLen; i++) {
	const [zeros, ones] = getBits(i, numbers);
	const digit = zeros <= ones ? '0' : '1';

	for (let j = numbers.length - 1; j >= 0; j--) {
		if (numbers[j][i] !== digit) numbers.splice(j, 1);
	}

	if (numbers.length === 1) {
		co2 = toDecimal(numbers[0]);
		break;
	}
}

console.log(`${oxygen} ${co2} ${oxygen * co2}`);
