// https://adventofcode.com/2021/day/4

import { loadInputLines } from '../utils.js';

const inputLines = loadInputLines().filter(l => l !== "");
const sortOrder = inputLines.splice(0, 1)[0].split(",").map(n => parseInt(n));

class Board {
	constructor(grid) {
		this.grid = [];

		for (let y = 0; y < 5; y++) {
			let line = [];
			for (let x = 0; x < 5; x++) {
				line.push({
					number: grid[y][x],
					checked: false
				});
			}
			this.grid.push(line);
		}

		this.won = false;
	}

	checkNumber(num) {
		for (let y = 0; y < 5; y++) {
			for (let x = 0; x < 5; x++) {
				if (this.grid[y][x].number === num) {
					this.grid[y][x].checked = true;
				}
			}
		}
	}

	testIfWon() {
		// Lines
		for (let y = 0; y < 5; y++) {
			let checked = 0;
			for (let x = 0; x < 5; x++) {
				if (this.grid[y][x].checked) checked++;
			}
			if (checked === 5) {
				this.won = true;
				return true;
			}
		}

		// Columns
		for (let x = 0; x < 5; x++) {
			let checked = 0;
			for (let y = 0; y < 5; y++) {
				if (this.grid[y][x].checked) checked++;
			}
			if (checked === 5) {
				this.won = true;
				return true;
			}
		}
	}

	getScore() {
		let score = 0;
		for (let y = 0; y < 5; y++) {
			for (let x = 0; x < 5; x++) {
				if (!this.grid[y][x].checked)
					score += this.grid[y][x].number;
			}
		}
		return score;
	}

	debug() {
		for (let y = 0; y < 5; y++) {
			for (let x = 0; x < 5; x++) {
				const cell = this.grid[y][x];
				if (cell.checked) {
					process.stdout.write(`\x1b[38;2;127;255;127m`);
					process.stdout.write(cell.number.toString().padEnd(3));
					process.stdout.write(`\x1b[37m`);
				} else {
					process.stdout.write(cell.number.toString().padEnd(3));
				}
			}
			process.stdout.write("\n");
		}
	}
}

const mapLine = (line = "") => {
	const numbers = [];

	for (let i = 0; i < line.length; i += 3) {
		numbers.push(parseInt(line.slice(i, i + 3)));
	}

	return numbers;
}

const boards = [];

while (inputLines.length > 0) {
	const grid = inputLines.splice(0, 5).map(mapLine);

	boards.push(new Board(grid));
}

let score = -1;

for (let i = 0; i < sortOrder.length; i++) {
	for (let j = boards.length - 1; j >= 0; j--) {
		boards[j].checkNumber(sortOrder[i]);
		if (boards[j].testIfWon()) {
			score = boards[j].getScore() * sortOrder[i];
			boards.splice(j, 1);
		}
	}
}

console.log(score);