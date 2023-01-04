# Binary Tree

二叉树的遍历分为`深度优先遍历`和`广度优先遍历`

## 二叉树的定义

<<< @/snippets/algorithm/binary-tree.js#definition

## 深度优先遍历

### 前序遍历(根->左->右)

- 递归法

<<< @/snippets/algorithm/binary-tree.js#preorder-recursive

- 非递归

<<< @/snippets/algorithm/binary-tree.js#preorder-non-recursive

### 中序遍历(左->根->右)

- 递归法

<<< @/snippets/algorithm/binary-tree.js#inorder-recursive

- 非递归

<<< @/snippets/algorithm/binary-tree.js#inorder-non-recursive

### 后续遍历(左->右->根)

- 递归法

<<< @/snippets/algorithm/binary-tree.js#postorder-recursive

- 非递归

<<< @/snippets/algorithm/binary-tree.js#postorder-non-recursive

## 广度优先遍历(层序遍历)

<<< @/snippets/algorithm/binary-tree.js#bfs
