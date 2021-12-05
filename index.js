import fs from 'fs';
import { exec } from 'child_process';

const source = fs.readdirSync('./', { withFileTypes: true });
const folders = source
	.filter(f => f.isDirectory() && f.name.startsWith('day'))
	.map(f => f.name);
const current = folders[folders.length - 1];

const cmd = `cd ./${current} && node index.js`;
console.log(`executing ${cmd}`);
exec(cmd, (error, stdout, stderr) => {
	process.stdout.write(stdout);
	process.stderr.write(stderr);
	if (error !== null) {
		console.log(`exec error: ${error}`);
	}
});