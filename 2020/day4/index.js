// https://adventofcode.com/2020/day/4
import { config, loadInput, MODE_INPUT, MODE_SAMPLE } from '../../utils.js';
config.mode = MODE_INPUT;

const input = loadInput();
const batches = input.split(/\n{2}/g);
const passports = batches.map(b => {
	const info = {};
	const reg = /(\w+):(\S+)/g

	while (true) {
		const m = reg.exec(b);
		if (m) {
			info[m[1]] = m[2];
			b.slice(m.index + m.length);
		} else break;
	}

	return info;
});

let required = [
	'byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid'
];

let count = 0;

for (const pass of passports) {
	let valid = true;
	for (const req of required) {
		const val = pass[req];

		if (!val) {
			valid = false;
			break;
		}

		switch (req) {
			case 'byr': {
				valid = (val.length === 4) && (val >= '1920' && val <= '2002');
				break;
			}
			case 'iyr': {
				valid = (val.length === 4) && (val >= '2010' && val <= '2020');
				break;
			}
			case 'eyr': {
				valid = (val.length === 4) && (val >= '2020' && val <= '2030');
				break;
			}
			case 'hgt': {
				const reg = /^(\d+)(cm|in)$/g;
				const match = reg.exec(val);
				if (!match) valid = false;
				else {
					const [s, t] = [match[1], match[2]];

					if (t === 'cm') valid = s >= '150' && s <= '193';
					else if (t === 'in') valid = s >= '59' && s <= '76';
					else valid = false;
				}
				break;
			}
			case 'hcl': {
				const reg = /^#[0-9a-f]{6}$/g;
				valid = reg.exec(val) !== null;
				break;
			}
			case 'ecl': {
				valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(val) !== -1;
				break;
			}
			case 'pid': {
				const reg = /^\d{9}$/g;
				valid = reg.exec(val) !== null;
				break;
			}
		}

		if (!valid) break;
	}
	if (valid) count++;
}

console.log(count);


