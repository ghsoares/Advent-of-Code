// https://adventofcode.com/2020/day/6
import { config, loadInput } from '../../utils.js';
config.sampleMode = false;

const input = loadInput();
const groups = input.split(/\n{2}/g).map(g => {
	return g.split('\n');
});
const numGroups = groups.length;

let totalCount = 0;
for (let i = 0; i < numGroups; i++) {
	const group = groups[i];
	const numPersons = group.length;
	const qMap = {};

	for (let j = 0; j < numPersons; j++) {
		const person = group[j];
		const numQuestions = person.length;

		for (let k = 0; k < numQuestions; k++) {
			const q = person[k];

			if (!qMap[q]) {
				qMap[q] = 1;
			} else {
				qMap[q]++;
			}
		}
	}

	const yesQuestions = Object.keys(qMap);

	for (const k of yesQuestions) {
		if (qMap[k] === numPersons) totalCount++;
	}
}

console.log(`Total: ${totalCount}`);






