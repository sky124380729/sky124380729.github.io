// #region bubbleSort
export function bubbleSort(arr) {
  // 比较的轮次，需要执行n-1轮次
  for (let i = 0; i < arr.length - 1; i++) {
		// 每轮比较的次数，次数 = 长度-1-此时的轮数
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j + 1] < arr[j]) {
				;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
			}
		}
	}
  return arr
}
// #endregion bubbleSort

// #region selectionSort
export function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
		let indexMin = i
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[indexMin]) {
				indexMin = j
			}
		}
		;[arr[indexMin], arr[i]] = [arr[i], arr[indexMin]]
	}
  return arr
}
// #endregion selectionSort

// #region insertSort
export function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
		const temp = arr[i]
		let j = i
		while (j--) {
			if (arr[j - 1] > temp) {
				arr[j] = arr[j - 1]
			} else {
				break
			}
		}
		arr[j] = temp
	}
  return arr
}
// #endregion insertSort


// #region mergeSort
export function mergeSort(arr) {
  const rec = (arr) => {
		if (arr.length === 1) return arr
		// 分：把数组劈成两半，再递归对子数组进行“分”操作，直到分成一个个单独的数
		const mid = arr.length >> 1
		const _left = arr.slice(0, mid)
		const _right = arr.slice(mid, arr.length)
		const orderLeft = rec(_left)
		const orderRight = rec(_right)
		// 合: 把两个数合并为有序数组，再对有序数组进行合并，直到全部子数组合并成一个完整数组
		const res = []
		while (orderLeft.length || orderRight.length) {
			if (orderLeft.length && orderRight.length) {
				res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
			} else if (orderLeft.length) {
				res.push(orderLeft.shift())
			} else if (orderRight.length) {
				res.push(orderRight.shift())
			}
		}
		return res
	}
  return rec(arr)
}
// #endregion mergeSort


// #region quickSort
export function quickSort(arr) {
  const rec = (arr) => {
		if (arr.length <= 1) return arr
		const left = []
		const right = []
		// 设定一个基准，随意取哪一项
		const mid = arr[0]
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] < mid) {
				left.push(arr[i])
			} else {
				right.push(arr[i])
			}
		}
		return [...rec(left), mid, ...rec(right)]
	}
  return rec(arr)
}
// #endregion quickSort
