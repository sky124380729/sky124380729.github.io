# Sort

<script setup>
function testCase(fn) {
  const arr = [2, 6, 5, 4, 3, 2, 1, 7]
  console.log(fn(arr))
}
</script>

## 冒泡排序

<<< @/snippets/algorithm/sort.js#bubbleSort

<playground module="algorithm/sort#bubbleSort" :code="testCase"></playground>

## 选择排序

<<< @/snippets/algorithm/sort.js#selectionSort

<playground module="algorithm/sort#selectionSort" :code="testCase"></playground>

## 插入排序

<<< @/snippets/algorithm/sort.js#insertSort

<playground module="algorithm/sort#insertSort" :code="testCase"></playground>

## 归并排序

<<< @/snippets/algorithm/sort.js#mergeSort

<playground module="algorithm/sort#mergeSort" :code="testCase"></playground>

## 快速排序

<<< @/snippets/algorithm/sort.js#quickSort

<playground module="algorithm/sort#quickSort" :code="testCase"></playground>
