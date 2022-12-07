// #region getNext
function getNext(str) {
  // 初始化
  const next = [0]
  let j = 0
  for (let i = 1; i < str.length; i++) {
    // 处理字符串不相同的情况
    while (j > 0 && str[i] !== str[j]) {
      j = next[j - 1]
    }
    // 处理字符串相同的情况
    if (str[i] === str[j]) {
      // 因为j代表了i之前包含i子串的最长公共前缀的长度
      // 所以当字符串相同的时候，需要对j + 1
      j++
    }
    // 更新next数组
    next[i] = j
  }
  return next
}
// #endregion getNext

export { getNext }
