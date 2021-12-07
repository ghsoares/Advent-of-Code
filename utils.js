import path from 'path';
import fs from 'fs';

export const MODE_SAMPLE = 0;
export const MODE_INPUT = 1;

export let config = {
	mode: MODE_INPUT
};

export const loadInput = () => {
	const folder = process.cwd();
	const inputPath = path.join(folder, config.mode === MODE_SAMPLE ? "sample.txt" : "input.txt");
	return fs.readFileSync(inputPath, 'utf-8');
}

export const loadInputLines = () => {
	return loadInput().split(/\r\n|\n/g);
}

export const colorize = (str, color = [0, 0, 0]) => {
	const [r,g,b] = color;
	return `\x1b[38;2;${r};${g};${b}m${str}\x1b[37m`;
}