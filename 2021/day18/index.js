// https://adventofcode.com/2021/day/18
import { config, loadInputLines } from '../../utils.js';
config.sampleMode = false;

const lines = loadInputLines().map(l => JSON.parse(l));

class Node {
	constructor(value = null) {
		this.value = value;
		this.parent = null;
		this.left = null;
		this.right = null;
		this.coord = '';
	}

	toString(space = '', depth = 0) {
		let s = '';

		if (this.value === null) {
			if (space != '') {
				s += '\n';
				s += space.repeat(depth);
			}
			s += `[${this.left.toString(space, depth + 1)},${this.right.toString(space, depth + 1)}`;
			if (space != '') {
				s += '\n';
				s += space.repeat(depth);
			}
			s += ']';
		} else {
			if (space != '') {
				s += '\n';
				s += space.repeat(depth);
			}
			s += `${this.value}`;
		}

		return s;
	}

	magnitude() {
		let mag = 0;

		if (this.value === null) {
			mag = this.left.magnitude() * 3 + this.right.magnitude() * 2;
		} else {
			mag = this.value;
		}

		return mag;
	}

	static isSameSubtree(a, b) {
		return b.parent.coord.startsWith(a.parent.coord);
	}

	static addToSideMost(n, val = 0, left = true) {
		let alreadySearched = new Set();
		let node = null;
		alreadySearched.add(n.coord);

		if (left) {
			if (n.parent.left != n) {
				node = n.parent.left;
			} else {
				node = n.parent;
			}
		} else {
			if (n.parent.right != n) {
				node = n.parent.right;
			} else {
				node = n.parent;
			}
		}

		while (node != null) {
			if (node.value != null) {
				node.value += val;
				break;
			} else {
				let nested = false;

				if (left) {
					if (!Node.isSameSubtree(node.right, n)) {
						if (!alreadySearched.has(node.right.coord)) {
							alreadySearched.add(node.right.coord);
							node = node.right;
							nested = true;
						}
					}
					if (!nested) {
						if (!alreadySearched.has(node.left.coord)) {
							alreadySearched.add(node.left.coord);
							node = node.left;
							nested = true;
						}
					}
				} else {
					if (!Node.isSameSubtree(node.left, n)) {
						if (!alreadySearched.has(node.left.coord)) {
							alreadySearched.add(node.left.coord);
							node = node.left;
							nested = true;
						}
					}
					if (!nested) {
						if (!alreadySearched.has(node.right.coord)) {
							alreadySearched.add(node.right.coord);
							node = node.right;
							nested = true;
						}
					}
				}

				if (!nested) {
					alreadySearched.add(node.coord);
					node = node.parent;
				}
			}
		}
	}

	static reduce(n) {
		let modified = true;

		function explode(n, depth = 0) {
			if (n.value === null) {
				explode(n.left, depth + 1);
				if (modified) return n;
				explode(n.right, depth + 1);
				if (modified) return n;

				if (n.left.value !== null) {
					if (depth >= 4) {
						Node.addToSideMost(n, n.left.value);
						Node.addToSideMost(n, n.right.value, false);

						if (n.parent.left === n) {
							const nn = new Node(0);
							nn.parent = n.parent;
							n.parent.left = nn;
						} else if (n.parent.right === n) {
							const nn = new Node(0);
							nn.parent = n.parent;
							n.parent.right = nn;
						}
						modified = true;
					}
				}
			}
			return n;
		}

		function split(n) {
			if (modified) return n;
			if (n.value === null) {
				split(n.left);
				split(n.right);
			} else if (n.value >= 10) {
				const l = Math.floor(n.value / 2);
				const r = Math.ceil(n.value / 2);
				const nl = new Node(l);
				const nr = new Node(r);
				const node = new Node();
				node.coord = n.coord;
				node.parent = n.parent;
				node.left = nl;
				node.right = nr;
				nl.parent = node;
				nr.parent = node;

				if (n.parent.left === n) {
					n.parent.left = node;
				} else if (n.parent.right === n) {
					n.parent.right = node;
				}
				modified = true;
			}
			return n;
		}

		while (modified) {
			modified = false;
			n = Node.updatePath(n);
			n = explode(n);
			n = split(n);
		}

		return n;
	}

	static updatePath(a) {
		a.coord = 'r';

		function rec(n) {
			if (n.left) {
				n.left.coord = `${n.coord}0`;
				rec(n.left);
			}
			if (n.right) {
				n.right.coord = `${n.coord}1`;
				rec(n.right);
			}
			return n;
		}

		return rec(a);
	}

	static add(a, b) {
		var n = new Node();
		n.left = a;
		n.right = b;
		a.parent = n;
		b.parent = n;
		return Node.reduce(n);
	}

	static fromArr(arr) {
		arr = JSON.parse(JSON.stringify(arr));
		var root = new Node();

		function add(a, b, r) {
			if (typeof a === 'number') {
				var an = new Node(a);
				r.left = an;
				an.parent = r;
			} else {
				var an = new Node();
				r.left = an;
				an.parent = r;
				add(a[0], a[1], an);
			}
			if (typeof b === 'number') {
				var bn = new Node(b);
				r.right = bn;
				bn.parent = r;
			} else {
				var bn = new Node();
				r.right = bn;
				bn.parent = r;
				add(b[0], b[1], bn);
			}
		}

		add(arr[0], arr[1], root);

		return root;
	}
}

// Part 1
let num = Node.fromArr(lines[0]);

for (let i = 1; i < lines.length; i++) {
	num = Node.add(num, Node.fromArr(lines[i]));
}

//[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]
//[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]
console.log(num.toString(''));
console.log(num.magnitude());


// Part 2
let max = 0;

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines.length; j++) {
		if (i === j) continue;
		const num1 = Node.fromArr(lines[i]);
		const num2 = Node.fromArr(lines[j]);
		const sum = Node.add(num1, num2);
		max = Math.max(max, sum.magnitude());
	}
}

console.log(max);