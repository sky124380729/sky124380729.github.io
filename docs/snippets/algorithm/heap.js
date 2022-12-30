export default class MinHeap {
  constructor() {
    this.heap = []
  }
  // 交换位置
  swap(i1, i2) {
    const temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }
  // 获取父节点的位置
  getParentIndex(i) {
    // return Math.floor((i - 1) / 2)
    return (i - 1) >>> 1
  }
  // 获取左子节点的位置
  getLeftIndex(i) {
    return i * 2 + 1
  }
  // 获取右子节点的位置
  getRightIndex(i) {
    return i * 2 + 2
  }
  // 上移操作
  shiftUp(index) {
    // 如果到堆顶，就停止上移
    if (index === 0) return
    const parentIndex = this.getParentIndex(index)
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  // 下移操作
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index)
      this.shiftDown(leftIndex)
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index)
      this.shiftDown(rightIndex)
    }
  }
  // 插入堆
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  // 删除堆顶
  pop() {
    // 用数组尾部元素替换堆顶（直接删除堆顶会破坏堆结构）
    this.heap[0] = this.heap.pop()
    // 然后下移，将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶
    this.shiftDown(0)
  }
  // 查看堆顶
  peek() {
    return this.heap[0]
  }
  // 获取堆的大小
  size() {
    return this.heap.length
  }
}
