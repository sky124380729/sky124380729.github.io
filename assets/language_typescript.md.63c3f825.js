import{_ as s,o as n,c as a,a as p}from"./app.cbf89ae2.js";const A=JSON.parse('{"title":"Typescript","description":"","frontmatter":{},"headers":[{"level":2,"title":"关于tsconfig.json部分字段说明","slug":"关于tsconfig-json部分字段说明","link":"#关于tsconfig-json部分字段说明","children":[]}],"relativePath":"language/typescript.md","lastUpdated":1677221329000}'),l={name:"language/typescript.md"},o=p(`<h1 id="typescript" tabindex="-1">Typescript <a class="header-anchor" href="#typescript" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#关于tsconfig-json部分字段说明">关于tsconfig.json部分字段说明</a></li></ul></nav><h2 id="关于tsconfig-json部分字段说明" tabindex="-1">关于tsconfig.json部分字段说明 <a class="header-anchor" href="#关于tsconfig-json部分字段说明" aria-hidden="true">#</a></h2><ul><li><p>paths字段</p><p><code>paths</code>用来配置<strong>路径映射</strong></p><p>例如一个项目的目录结构如下</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">└─packages</span></span>
<span class="line"><span style="color:#A6ACCD;">  ├─compiler-core</span></span>
<span class="line"><span style="color:#A6ACCD;">  │  └─src</span></span>
<span class="line"><span style="color:#A6ACCD;">  ├─compiler-dom</span></span>
<span class="line"><span style="color:#A6ACCD;">  │  └─src</span></span>
<span class="line"><span style="color:#A6ACCD;">  ├─reactivity</span></span>
<span class="line"><span style="color:#A6ACCD;">  │  └─src</span></span>
<span class="line"><span style="color:#A6ACCD;">  ├─runtime-core</span></span>
<span class="line"><span style="color:#A6ACCD;">  │  └─src</span></span>
<span class="line"><span style="color:#A6ACCD;">  ├─runtime-dom</span></span>
<span class="line"><span style="color:#A6ACCD;">  │  └─src</span></span>
<span class="line"><span style="color:#A6ACCD;">  ├─shared</span></span>
<span class="line"><span style="color:#A6ACCD;">  │  └─src</span></span>
<span class="line"><span style="color:#A6ACCD;">  └─vue</span></span>
<span class="line"><span style="color:#A6ACCD;">    └─src</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>其中有个包叫<code>vue</code>，<code>vue</code>包下某个文件想要引入<code>shared</code>包下的方法</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isArray</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../../shared/src</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(isArray)</span></span>
<span class="line"></span></code></pre></div><p>以上写法一个比较明显的问题就是，当<code>shared</code>包目录位置发生变化，路径要重写，并且这样写不方便也不美观</p><p>可以通过配置<code>tsconfig.json</code>的<code>paths</code></p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// 这里也需要配合指定</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">baseUrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">paths</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">@vue/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">packages/*/src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>这样，就可以使用以下写法</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isArray</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue/shared/src</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(isArray)</span></span>
<span class="line"></span></code></pre></div></li><li><p>types字段</p><p>如果使用<code>types</code>选项，又没有被包含的库，不影响正常使用，只是不会加入到项目全局中去，也不会出现在自动导入提示中</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">types</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li><li><p>lib字段</p><p>ts内置了一些库，比如<code>Math</code>,<code>document</code>之类的，但是假如你在<code>node</code>环境下使用，则不需要<code>document</code>，所以不需要<code>dom</code>选项</p><p>或者你的平台下面浏览器有兼容性需求，要指定某个<code>es</code>版本，会使用到此项</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lib</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dom</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esnext</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li></ul>`,4),e=[o];function t(c,r,D,y,i,F){return n(),a("div",null,e)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};
