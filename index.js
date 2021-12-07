import { exec } from 'child_process';

const year = '2021';
const day = 'day1';

const cmd = `cd ./${year}/${day} && node index.js`;
console.log(`executing ${cmd}`);
exec(cmd, (error, stdout, stderr) => {
	process.stdout.write(stdout);
	process.stderr.write(stderr);
	if (error !== null) {
		console.log(`exec error: ${error}`);
	}
});