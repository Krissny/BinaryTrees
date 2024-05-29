class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  let mid = parseInt((start + end) / 2);
  let root = new Node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);
  return root;
}

// to print the tree recursively
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

//to remove duplicates
function removeDuplicates(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

function insert(root, data) {
  if (root === null) {
    return new Node(data);
  }
  if (root.data > data) {
    root.left = insert(root.left, data);
  } else if (root.data < data) {
    root.right = insert(root.right, data);
  }
  return root;
}

//find Minimum value

function FindMin(root) {
  let minValue = root.data;
  root = root.left;
  while (root != null) {
    minValue = root.data;
    root = root.left;
  }
  return minValue;
}

//to delete a given node
function deleteItem(root, value) {
  if (root === null) return root;
  else if (value < root.data) root.left = deleteItem(root.left, value);
  else if (value > root.data) root.right = deleteItem(root.right, value);
  else {
    //Wohoo! I find you. get ready to be deleted(That was funny)
    //case 1 : no child
    if (root.left === null && root.right === null) {
      root = null;
    }
    //case2 : one child
    else if (root.left === null) {
      root = root.right;
    } else if (root.right === null) {
      root = root.left;
    }
    //Case 3 : 2 children
    else {
      let nodeData = FindMin(root.right);
      root.data = nodeData;
      root.right = deleteItem(root.right, nodeData);
    }
  }
  return root;
}
//queue data structure
class Queue {
  constructor() {
    this.queue = [];
  }
  push(value) {
    this.queue.push(value);
  }
  pop() {
    this.queue.shift();
  }
  isEmpty() {
    if (this.queue.length === 0) {
      return true;
    }
    return false;
  }
  front() {
    return this.queue[0];
  }
}
//level order traversal;
function levelOrder(root) {
  const ans = [];
  if (root === null) return;
  const q = new Queue();
  q.push(root);
  while (!q.isEmpty()) {
    const node = q.front();
    q.pop();
    ans.push(node.data);
    if (node.left != null) {
      q.push(node.left);
    }
    if (node.right != null) {
      q.push(node.right);
    }
  }
  return ans;
}

//inorder travesal
function inorder(root, arr = []) {
  if (root === null) {
    return;
  }
  inorder(root.left, ans);
  arr.push(root.data);
  inorder(root.right, ans);
  return;
}
function postorder(root, arr = []) {
  if (root === null) {
    return;
  }
  inorder(root.left, ans);
  inorder(root.right, ans);
  arr.push(root.data);
  return;
}
function preorder(root, arr = []) {
  if (root === null) {
    return;
  }
  arr.push(root.data);
  inorder(root.left, ans);
  inorder(root.right, ans);
  return;
}

//to get height of the tree
function height(root) {
  if (root === null) {
    return -1;
  }
  let left = 1 + height(root.left);
  let right = 1 + height(root.right);
  return Math.max(left, right);
}
function depth(root, value, deep = 0) {
  if (root === null) {
    return -1;
  }
  if (root.data === value) {
    return deep;
  }
  let left_depth = depth(root.left, value, deep + 1);
  let right_depth = depth(root.right, value, deep + 1);

  if (left_depth != -1) {
    return left_depth;
  } else {
    return right_depth;
  }
}

//check if tree is balance
function isBalanced(root) {
  if (root === null) {
    return true;
  }
  let left = height(root.left);
  let right = height(root.right);
  console.log(left, right);
  if (
    Math.abs(left - right) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  ) {
    return true;
  }
  return false;
}

//rebalance tree
function rebalance(arr) {
  const sortedArray = arr.sort(function (a, b) {
    return a - b;
  });
  let newRoot = buildTree(sortedArray, 0, sortedArray.length - 1);
  return newRoot;
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
arr.sort(function (a, b) {
  return a - b;
});
arr = removeDuplicates(arr);
let root = buildTree(arr, 0, arr.length - 1);
insert(root, 6);
prettyPrint(root);
console.log(root);
console.log(levelOrder(root));
const ans = [];
inorder(root, ans);
console.log(ans);
console.log(depth(root, 324, 0));
console.log(isBalanced(root));
