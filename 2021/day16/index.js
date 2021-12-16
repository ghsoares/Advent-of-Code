// https://adventofcode.com/2021/day/16
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput();
let msg = '';
for (let i = 0; i < input.length; i++) {
	const n = parseInt(input[i], 16);
	msg += n.toString(2).padStart(4, '0');
}
const msgLen = msg.length;
let msgCursor = 0;

const bits = (len = 0) => {
	const str = msg.slice(msgCursor, msgCursor + len);
	msgCursor += len;
	return str;
}

const endOfPacket = () => {
	for (let i = msgCursor; i < msgLen; i++) {
		if (msg[i] === '1') return false;
	}
	return true;
}

const parseHeader = () => {
	const versionBin = bits(3);
	const typeBin = bits(3);

	return [parseInt(versionBin, 2), parseInt(typeBin, 2)];
}

const parseLiteral = () => {
	let bin = '';

	while (true) {
		const group = bits(5);
		bin += group.slice(1);
		if (group[0] === '0') break;
	}

	return parseInt(bin, 2);
}

const parseOperator = (type = 0) => {
	const lengthTypeID = parseInt(bits(1), 2);
	let res = 0;
	let first = true;
	const addValue = (val = 0) => {
		if (first) {
			res = val;
		} else {
			switch (type) {
				case 0: {
					res += val;
				} break;
				case 1: {
					res *= val;
				} break;
				case 2: {
					res = Math.min(res, val);
				} break;
				case 3: {
					res = Math.max(res, val);
				} break;
				case 5: {
					res = res > val ? 1 : 0;
				} break;
				case 6: {
					res = res < val ? 1 : 0;
				} break;
				case 7: {
					res = res === val ? 1 : 0;
				} break;
			}
		}
		first = false;
	}

	if (lengthTypeID === 0) {
		let length = parseInt(bits(15), 2);
		let end = msgCursor + length;

		while (msgCursor < end) {
			const p = parsePacket();
			if (p === null) break;

			addValue(p);
		}

	} else {
		let count = parseInt(bits(11), 2);
		for (let i = 0; i < count; i++) {
			const p = parsePacket();
			if (p === null) break;

			addValue(p);
		}
	}
	return res;
}

const parsePacket = () => {
	if (endOfPacket()) return null;
	const [version, type] = parseHeader();

	if (type === 4) {
		const literal = parseLiteral();
		return literal;
	} else {
		const op = parseOperator(type);
		return op;
	}
}

const packet = parsePacket();
console.log(packet);




