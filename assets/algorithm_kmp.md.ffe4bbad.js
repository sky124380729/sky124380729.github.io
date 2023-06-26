import{h as r,w as i,o as l,c as t,z as s,a2 as y,a3 as d,G as F,B as D,a4 as C,O as c,F as A,L as h,t as u}from"./chunks/framework.ff3dc444.js";import{getNext as m}from"./chunks/kmp.d2b68af5.js";const _="/assets/kmp.9fe95af8.gif",b="/assets/kmp3.5093184e.png",f="/assets/kmp2.8c59b066.gif";const x=c(`<h1 id="kmp" tabindex="-1">KMP <a class="header-anchor" href="#kmp" aria-label="Permalink to &quot;KMP&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#kmp是什么">KMP是什么</a></li><li><a href="#kmp解决什么样的问题">KMP解决什么样的问题</a></li><li><a href="#时间复杂度">时间复杂度</a></li><li><a href="#前缀表-prefix-table">前缀表（prefix table）</a></li><li><a href="#next数组">next数组</a></li></ul></nav><h2 id="kmp是什么" tabindex="-1">KMP是什么 <a class="header-anchor" href="#kmp是什么" aria-label="Permalink to &quot;KMP是什么&quot;">​</a></h2><p>Knuth-Morris-Pratt 字符串查找算法，简称为 KMP算法，这个算法由 Donald Knuth、Vaughan Pratt、James H. Morris 三人于 1977 年联合发表，故取这 3 人的姓氏命名此算法。</p><h2 id="kmp解决什么样的问题" tabindex="-1">KMP解决什么样的问题 <a class="header-anchor" href="#kmp解决什么样的问题" aria-label="Permalink to &quot;KMP解决什么样的问题&quot;">​</a></h2><p>常用于在一个文本串 S 内查找一个模式串 P 的出现位置</p><p>KMP的主要思想是<strong>当出现字符串不匹配时，可以知道一部分之前已经匹配的文本内容，可以利用这些信息避免从头再去做匹配了</strong></p><p>所以如何记录已经匹配的文本内容，是KMP的重点，也是next数组肩负的重任</p><h2 id="时间复杂度" tabindex="-1">时间复杂度 <a class="header-anchor" href="#时间复杂度" aria-label="Permalink to &quot;时间复杂度&quot;">​</a></h2><p>在一个文本串 S 内查找一个模式串 P 的出现位置的暴力解法时间复杂度为O(m * n)，KMP算法时间复杂度为O(m + n)</p><h2 id="前缀表-prefix-table" tabindex="-1">前缀表（prefix table） <a class="header-anchor" href="#前缀表-prefix-table" aria-label="Permalink to &quot;前缀表（prefix table）&quot;">​</a></h2><p>前缀表是用来回退的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配</p><p>前缀：包含首字母，不包含尾字母的连续子串</p><p>后缀：包含尾字母，不包含首字母的连续子串</p><p>最长公共前后缀：指的是模式串的子串中前后缀相同的最大数值</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 文本串</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">aabaabaaf</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 模式串</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> p </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">aabaaf</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p><img src="`+_+'" alt="kmp"></p><p>模式串的前缀表</p><table><thead><tr><th>子串</th><th>前缀表</th><th>后缀表</th><th style="text-align:center;">最长公共前后缀</th></tr></thead><tbody><tr><td>a</td><td>-</td><td>-</td><td style="text-align:center;">0</td></tr><tr><td>aa</td><td><code>a</code></td><td><code>a</code></td><td style="text-align:center;">1</td></tr><tr><td>aab</td><td>a aa</td><td>b ab</td><td style="text-align:center;">0</td></tr><tr><td>aaba</td><td><code>a</code> aa aab</td><td><code>a</code> ba aba</td><td style="text-align:center;">1</td></tr><tr><td>aabaa</td><td>a <code>aa</code> aab aaba</td><td>a <code>aa</code> baa abaa</td><td style="text-align:center;">2</td></tr><tr><td>aabaaf</td><td>a aa aab aaba aabaa</td><td>f af aaf baaf abaaf</td><td style="text-align:center;">0</td></tr></tbody></table><p>这个之上而下的0 -&gt; 1 -&gt; 0 -&gt; 1 -&gt; 2 -&gt; 0就是 <code>aabaaf</code> 的 <code>前缀表</code></p><p><img src="'+b+'" alt="kmp"></p><p>可以看出模式串与前缀表对应位置的数字表示的就是：<strong>下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀</strong></p><h2 id="next数组" tabindex="-1">next数组 <a class="header-anchor" href="#next数组" aria-label="Permalink to &quot;next数组&quot;">​</a></h2>',23),g=s("li",null,[s("p",null,"next数组有很多种表示方法:"),s("ol",null,[s("li",null,"直接使用前缀表作为next数组：字符串不匹配的时候，跳到next数组前一位所对应数值的下标"),s("li",null,"前缀表整体右移一位，第一位使用-1补齐：字符串不匹配的时候，直接使用该字符串对应数值的下标"),s("li",null,"前缀表整体减一：字符串不匹配的时候，跳到next数组前一位对应的数值+1的下标")])],-1),k=c(`<p>如何获得next数组（这里我们使用上述的<code>方法1</code>来实现next数组）</p><p>设<code>j</code>为前缀末尾位置，设<code>i</code>为后缀末尾位置</p><p>这里的<code>j</code>其实也代表下标<code>i</code>之前包括<code>i</code>子串的最长公共前后缀的长度</p><details class="details custom-block"><summary>Details</summary><p>关于指针回溯求next的理解：</p><p>每次求next【i】，可看作前缀与后缀的一次匹配，在该过程中就可以用上之前所求的next，若匹配失败，则像模式串与父串匹配一样，将指针移到next【j-1】上。</p><p>求next过程实际上是dp（动态规划），只与前一个状态有关：</p><p>若不匹配，一直往前退到0或匹配为止</p><p>若匹配，则将之前的结果传递：</p><p>因为之前的结果不为0时，前后缀有相等的部分，所以j所指的实际是与当前值相等的前缀，可视为将前缀从前面拖了过来，就不必将指针从前缀开始匹配了，所以之前的结果是可以传递的。</p></details><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getNext</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">str</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 初始化</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 处理字符串不相同的情况</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 处理字符串相同的情况</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">str</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 因为j代表了i之前包含i子串的最长公共前缀的长度</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 所以当字符串相同的时候，需要对j + 1</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 更新next数组</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Let&#39;s have a try!</p>`,6),P={class:"mb-2"},j=s("span",{class:"inline-flex w-12"},"输入:",-1),E=s("li",{key:"output",class:"inline-flex w-12 ml-0 list-none"},"输出：",-1),v=s("p",null,[s("img",{src:f,alt:"kmp"})],-1),S=JSON.parse('{"title":"KMP","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/kmp.md","filePath":"algorithm/kmp.md","lastUpdated":1687751075000}'),M={name:"algorithm/kmp.md"},V=Object.assign(M,{setup(K){const n=r(null),p=r(null);return i(n,o=>{p.value=m(o)}),(o,e)=>(l(),t("div",null,[x,s("ul",null,[g,s("li",null,[k,s("div",P,[j,y(s("input",{class:"px-3 border-2 border-solid rounded border-blue","onUpdate:modelValue":e[0]||(e[0]=a=>n.value=a)},null,512),[[d,n.value]])]),F(C,{name:"list",tag:"ul",class:"!pl-0"},{default:D(()=>[E,(l(!0),t(A,null,h(p.value,a=>(l(),t("li",{class:"inline-flex px-2 mr-2 list-none border-2 border-solid rounded border-purple",key:a},u(a),1))),128))]),_:1})])]),v]))}});export{S as __pageData,V as default};
