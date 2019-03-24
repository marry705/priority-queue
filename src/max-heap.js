const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeheap = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if ( !this.isEmpty() ) {
			let del = this.root.data;
			let detached = this.detachRoot();
			if (this.parentNodes.length != 0) {
				this.restoreRootFromLastInsertedNode(detached);
				this.shiftNodeDown(this.root);
			}
			return del;
		}
	}

	detachRoot() {
		this.sizeheap--;
		if (this.parentNodes.indexOf(this.root) != -1) this.parentNodes.splice(0, 1);
		let detach = this.root;
		this.root = null;
		return detach;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.root >= 0) {
			let lastnode = this.parentNodes.pop();
			let parent = (lastnode.parent != detached)?lastnode.parent:null;
			let det_left = (detached.left != lastnode)?detached.left:null;
			let det_right = (detached.right != lastnode)?detached.right:null;
			if (det_left != null) det_left.remove();
			if (det_right != null) det_right.remove();
			lastnode.remove();
			lastnode.appendChild(det_right);
			lastnode.appendChild(det_left);
			this.root = lastnode;
			if (lastnode.left >= 0 || lastnode.right >= 0) this.parentNodes.unshift(lastnode);
			if (parent != null && this.parentNodes.indexOf(parent) === -1) {
				const index_arr = [];
				let i = 0;
				let x = parent;
				while(x.parent != null) {
					x = x.parent;
					i++;
				} 
				let index = i;
				this.parentNodes.forEach( element => {
					i = 0;
					x = element;
					while(x.parent != null) {
						x = x.parent;
						i++;
					}
					index_arr.push(i); 
				});
				index_arr.forEach( (element, ind) => {
					if (element > index) this.parentNodes.splice(ind, 0, parent); 
				});
			}
		}
	}

	size() {
		return this.sizeheap;
	}

	isEmpty() {
		return (this.root >= 0)?true:false;
	}

	clear() {
		this.sizeheap = 0;
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root >= 0) this.root = node;
		else {
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right != null && this.parentNodes[0].left != null) {
				this.parentNodes.shift();
			}
		}
		this.sizeheap++;
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (node.parent >= 0) this.root = node;
		else{
			if (node.parent != null && node.priority > node.parent.priority) {
				let index_node = this.parentNodes.indexOf(node);
				let index_pnode = this.parentNodes.indexOf(node.parent);
				let child = node;
				let parent = node.parent;
				node.swapWithParent();
				if (index_node != -1) this.parentNodes.splice(index_node, 1, parent);
				if (index_pnode != -1) this.parentNodes.splice(index_pnode, 1, child);
				this.shiftNodeUp(node);
			} 
		}
	}

	shiftNodeDown(node) {
		if ((node.left != null && node.left.priority > node.priority) 
		|| (node.right != null && node.right.priority > node.priority)) {
			let l_child = (node.right >= 0 || node.left.priority >= node.right.priority)?node.left:node.right;
			let index = this.parentNodes.indexOf(node);
			let index_child = this.parentNodes.indexOf(l_child);
			let node_parent = node;
			l_child.swapWithParent();
			if (index != -1) this.parentNodes.splice(index, 1, l_child);
			if (index_child != -1) this.parentNodes.splice(index_child, 1, node_parent);
			if (node_parent === this.root) this.root = l_child;
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
