import path from 'path';
import fs from 'fs';

export let config = {
	sampleMode: false
};

export const loadInput = () => {
	const folder = process.cwd();
	const inputPath = path.join(folder, config.sampleMode ? "sample.txt" : "input.txt");
	return fs.readFileSync(inputPath, 'utf-8').replace(/\r\n/g, '\n');
}

export const loadInputLines = () => {
	return loadInput().split(/\r\n|\n/g);
}

export const colorize = (str, color = [0, 0, 0]) => {
	const [r,g,b] = color;
	return `\x1b[38;2;${r};${g};${b}m${str}\x1b[37m`;
}