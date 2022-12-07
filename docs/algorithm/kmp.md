# KMP

[[toc]]

## KMP是什么

Knuth-Morris-Pratt 字符串查找算法，简称为 KMP算法，这个算法由 Donald Knuth、Vaughan Pratt、James H. Morris 三人于 1977 年联合发表，故取这 3 人的姓氏命名此算法。

## KMP解决什么样的问题

常用于在一个文本串 S 内查找一个模式串 P 的出现位置

KMP的主要思想是**当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了**

所以如何记录已经匹配的文本内容，是KMP的重点，也是next数组肩负的重任

## 时间复杂度

在一个文本串 S 内查找一个模式串 P 的出现位置的暴力解法时间复杂度为O(m * n)，KMP算法时间复杂度为O(m + n)

## 前缀表（prefix table）

前缀表是用来回退的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配

前缀：包含首字母，不包含尾字母的连续子串

后缀：包含尾字母，不包含首字母的连续子串

最长公共前后缀：指的是模式串的子串中前后缀相同的最大数值

```js
// 文本串
const s = 'aabaabaaf'
// 模式串
const p = 'aabaaf'
```

![kmp](/assets/kmp.gif)

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

![kmp](/assets/kmp3.png)

可以看出模式串与前缀表对应位置的数字表示的就是：**下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀**

## next数组

- next数组有很多种表示方法:

  1. 直接使用前缀表作为next数组：字符串不匹配的时候，跳到next数组前一位所对应数值的下标
  2. 前缀表整体右移一位，第一位使用-1补齐：字符串不匹配的时候，直接使用该字符串对应数值的下标
  3. 前缀表整体减一：字符串不匹配的时候，跳到next数组前一位对应的数值+1的下标

- 如何获得next数组（这里我们使用上述的`方法1`来实现next数组）

  设`j`为前缀末尾位置，设`i`为后缀末尾位置

  这里的`j`其实也代表下标`i`之前包括`i`子串的最长公共前后缀的长度

  :::details
  关于指针回溯求next的理解：

  每次求next【i】，可看作前缀与后缀的一次匹配，在该过程中就可以用上之前所求的next，若匹配失败，则像模式串与父串匹配一样，将指针移到next【j-1】上。

  求next过程实际上是dp（动态规划），只与前一个状态有关：

  若不匹配，一直往前退到0或匹配为止

  若匹配，则将之前的结果传递：

  因为之前的结果不为0时，前后缀有相等的部分，所以j所指的实际是与当前值相等的前缀，可视为将前缀从前面拖了过来，就不必将指针从前缀开始匹配了，所以之前的结果是可以传递的。
  :::

  <<< @/snippets/algorithm/kmp.js#getNext

  <script setup>
  import { ref, watch } from 'vue'
  import { getNext } from '../snippets/algorithm/kmp.js'
  const input = ref(null)
  const output = ref(null)
  watch(input, (val) => {
    output.value = getNext(val)
  })
  </script>
  <style>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>
  Let's have a try!
  <div class="mb-2"><span class="inline-flex w-12">输入:</span><input class="px-3 border-2 border-solid rounded border-blue" v-model="input"/></div>
  <!-- <div class="mb-2">输出: <input class="px-3 border-2 border-solid rounded border-blue" readonly v-model="output"/></div> -->
  <TransitionGroup name="list" tag="ul" class="!pl-0">
    <li key="output" class="inline-flex w-12 ml-0 list-none">输出：</li>
    <li class="inline-flex px-2 mr-2 list-none border-2 border-solid rounded border-purple" v-for="item in output" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>

![kmp](/assets/kmp2.gif)
