import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const createChallengeFolder = (year, day) => {
	const folder = `${year}/day${day}`;

	const index = `// https://adventofcode.com/${year}/day/${day}\nimport { loadInputLines } from '../../utils.js';`;

	if (!fs.existsSync(folder)) fs.mkdirSync(folder);

	fs.writeFileSync(path.join(folder, `index.js`), index);
	fs.writeFileSync(path.join(folder, `input.txt`), '');
}

const runChallenge = (year, day) => {
	const cmd = `cd ./${year}/day${day} && node index.js`;

	console.log(`executing ${cmd}`);
	exec(cmd, (error, stdout, stderr) => {
		process.stdout.write(stdout);
		process.stderr.write(stderr);
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
}

yargs(hideBin(process.argv))
	.command('create', 'Creates the challenge folder', {
		year: {
			describe: 'The challenge year, defaults to the current year',
			default: -1,
			alias: 'y',
			type: 'number'
		},
		day: {
			describe: 'The challenge day, defaults to the current day',
			default: -1,
			alias: 'd',
			type: 'number'
		},

	}, argv => {
		let { day, year } = argv;
		if (year === -1) year = new Date(Date.now()).getFullYear();
		if (day === -1) day = new Date(Date.now()).getDate();

		createChallengeFolder(year, day);
	})

	.command('run', 'Runs a challenge', {
		year: {
			describe: 'The challenge year, defaults to the current year',
			default: -1,
			alias: 'y',
			type: 'number'
		},
		day: {
			describe: 'The challenge day, defaults to the current day',
			default: -1,
			alias: 'd',
			type: 'number'
		},

	}, argv => {
		let { day, year } = argv;
		if (year === -1) year = new Date(Date.now()).getFullYear();
		if (day === -1) day = new Date(Date.now()).getDate();

		runChallenge(year, day);
	})

	.parse();