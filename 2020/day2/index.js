// https://adventofcode.com/2020/day/2
import { config, loadInputLines, MODE_SAMPLE, MODE_INPUT } from '../../utils.js';
config.mode = MODE_INPUT;

const passwords = loadInputLines().map(l => {
	const reg = /(\d+)-(\d+) (\w): (.+)/g;
	const match = reg.exec(l);

	return [Number(match[1]), Number(match[2]), match[3], match[4]];
});
const numPasswords = passwords.length;

const testPassword = (pos1, pos2, letter, str) => {
	let l1 = str[pos1 - 1] === letter;
	let l2 = str[pos2 - 1] === letter;

	return l1 ? !l2 : l2;
}

let valid = 0;
for (let i = 0; i < numPasswords; i++) {
	const [pos1, pos2, letter, str] = passwords[i];
	if (testPassword(pos1, pos2, letter, str)) valid++;
}
console.log(valid);





