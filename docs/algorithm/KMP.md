# KMP

## KMP是什么

Knuth-Morris-Pratt 字符串查找算法，简称为 KMP算法，这个算法由 Donald Knuth、Vaughan Pratt、James H. Morris 三人于 1977 年联合发表，故取这 3 人的姓氏命名此算法。

## KMP解决什么样的问题

常用于在一个文本串 S 内查找一个模式串 P 的出现位置

## 时间复杂度

暴力解法时间复杂度为O(m * n)，KMP算法时间复杂度为O(m + n)

## 前缀表

前缀：包含首字母，不包含尾字母的连续子串

后缀：包含尾字母，不包含首字母的连续子串

最长公共前后缀：指的是模式串的子串中前后缀相同的最大数值

```js
// 文本串
const s = 'aabaabaaf'
// 模式串
const p = 'aabaaf'
```

模式串的前缀表

| 子串   | 前缀表               | 后缀表                | 最长公共前后缀 |
|--------|---------------------|---------------------|:--------------:|
| a      | -                   | -                   | 0              |
| aa     | `a`                 | `a`                 | 1              |
| aab    | a aa                | b ab                | 0              |
| aaba   | `a` aa aab          | `a` ba aba          | 1              |
| aabaa  | a `aa` aab aaba     | a `aa` baa abaa     | 2              |
| aabaaf | a aa aab aaba aabaa | f af aaf baaf abaaf | 0              |

这个之上而下的0 -> 1 -> 0 -> 1 -> 2 -> 0就是 `aabaaf` 的 `前缀表`

