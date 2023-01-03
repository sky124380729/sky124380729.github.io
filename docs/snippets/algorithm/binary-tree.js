export const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null
    },
    right: {
      val: 5,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    }
  }
}

// 二叉树的定义

// #region definition
export const TreeNode = (val, left, right) => {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
// #endregion definition

/* ============== 前序遍历 ============== */

// #region preorder-recursive
export const preorder1 = (root) => {
  if (!root) return
  console.log(root.val)
  preorder1(root.left)
  preorder1(root.rights)
}
// #endregion preorder-recursive

// #region preorder-non-recursive
export const preorder2 = (root) => {
  if (!root) return
  const stack = [root]
  while (stack.length) {
    const n = stack.pop()
    console.log(n.val)
    // 栈是后进先出，所以需要先把right推进去
    if (n.right) stack.push(n.right)
    if (n.left) stack.push(n.left)
  }
}
// #endregion preorder-non-recursive

/* ============== 中序遍历 ============== */

// #region inorder-recursive
export const inorder1 = (root) => {
  if (!root) return
  inorder1(root.left)
  console.log(root.val)
  inorder1(root.rights)
}
// #endregion inorder-recursive

// #region inorder-non-recursive
export const inorder2 = (root) => {
  if (!root) return
  const stack = []
  let p = root
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    const n = stack.pop()
    console.log(n.val)
    p = n.right
  }
}

export const inorder3 = (root) => {
  if (!root) return
  const stack = []
  let p = root
  while (stack.length || p) {
    if (p) {
      stack.push(p)
      // 左
      p = p.left
    } else {
      // 弹出右
      p = stack.pop()
      console.log(p.val)
      // 右
      p = p.right
    }
  }
}
// #endregion inorder-non-recursive

/* ============== 后序遍历 ============== */

// #region postorder-recursive
export const postorder1 = (root) => {
  if (!root) return
  postorder1(root.left)
  postorder1(root.rights)
  console.log(root.val)
}
// #endregion postorder-recursive

// #region postorder-non-recursive
export const postorder2 = (root) => {
  if (!root) return
  const outputStack = []
  const stack = [root]
  while (stack.length) {
    const n = stack.pop()
    outputStack.push(n)
    if (n.left) stack.push(n.left)
    if (n.right) stack.push(n.right)
  }
  while (outputStack.length) {
    const n = outputStack.pop()
    console.log(n.val)
  }
}
// #endregion postorder-non-recursive

/* ============== 广度优先遍历 ============== */

// #region bfs
export const bfs = (root) => {
  const q = [root]
  while (q.length > 0) {
    const n = q.shift()
    console.log(n.val)
    if (n.left) q.push(n.left)
    if (n.right) q.push(n.right)
  }
}
// #endregion bfs
