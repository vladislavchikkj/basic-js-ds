const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this.tree = null;
  }
  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addWithin(this.tree, data);

    function addWithin(node, data) {
        if (!node) {
            return new Node(data);
        }

        if (node.data === data) {
            return node;
        }

        if (data < node.data) {
            node.left = addWithin(node.left, data);
        } else {
            node.right = addWithin(node.right, data);
        }

        return node;
    }
}
  has(data) {
    return !(!this.find(data));  
  }
  find(data) {
    return findWithin(this.tree, data);

    function findWithin(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data ?
        findWithin(node.left, data) :
        findWithin(node.right, data);
    }
  }
  remove(data) {
    this.tree = remove(this.tree, data);
		function remove(node, data) {
			if (!node) {
				return null;
			} else if (data > node.data) {
				node.right = remove(node.right, data);
				return node;
			} else if (data < node.data) {
				node.left = remove(node.left, data);
				return node;
			} else {
				if ((!node.left) && (!node.right)) {
					return null;
				} else if (!node.left) {
					node = node.right;
					return node;
				} else if (!node.right) {
					node = node.left;
					return node;
				}
				let min = node.right;
				while (min.left) {
					min = min.left;
				}
				node.data = min.data;
				node.right = remove(node.right, min.data);
				return node;
			}
		}  
  }
  min() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }
  max() {
    let current = this.tree;
    while(current.right !== null){
        current = current.right;
    }
    return current.data
  }
}

module.exports = {
  BinarySearchTree
};