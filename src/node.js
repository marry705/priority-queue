class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;

	}

	appendChild(node) {
		if (node != null) {
			if (this.left >= 0) this.left = node;
			else if (this.right >= 0) this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if ( this.left === node ) this.left = null;
		else {
			if ( this.right === node ) this.right = null;
			else throw Error("Not this child");
		}
		node.parent = null;
	}

	remove() {
		if (this.parent != null) this.parent.removeChild(this);
	}

	swapWithParent() { 
	 	if (this.parent != null) {
			let grandparent = this.parent.parent;
			let is_grandparent = (grandparent != null && grandparent.left === this.parent)?true:false;
			this.parent.parent = this;
			let left = this.left;
			let right = this.right;
			this.left = null;
			this.right = null;
			if (this.parent.right === this) {
				this.right = this.parent;
				this.appendChild(this.parent.left);
				this.parent.left = null;
				this.parent.right = null;
				if (left != null) {
					this.parent.left = left;
					left.parent = this.parent;
				}
				if ( right != null) {
					this.parent.right = right;
					right.parent = this.parent;
				}
			}
			if (this.parent.left === this) {
				this.left = this.parent;
				this.appendChild(this.parent.right);
				this.parent.left = null;
				this.parent.right = null;
				if ( right != null) {
					this.parent.right = right;
					right.parent = this.parent;
				}
				if (left != null) {
					this.parent.left = left;
					left.parent = this.parent;
				}
			}
			this.parent.parent.parent = grandparent;
			if (grandparent != null) {
				if (is_grandparent) grandparent.left = this;
				else grandparent.right = this;
			}
		}
	}
}

module.exports = Node;
