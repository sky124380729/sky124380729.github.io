import{_ as s,o as a,c as l,a as n}from"./app.cbf89ae2.js";const C=JSON.parse('{"title":"前端性能优化","description":"","frontmatter":{},"headers":[{"level":2,"title":"请求和相应优化","slug":"请求和相应优化","link":"#请求和相应优化","children":[{"level":3,"title":"dns预解析(deprecated)","slug":"dns预解析-deprecated","link":"#dns预解析-deprecated","children":[]},{"level":3,"title":"http长连接","slug":"http长连接","link":"#http长连接","children":[]},{"level":3,"title":"请求体压缩","slug":"请求体压缩","link":"#请求体压缩","children":[]},{"level":3,"title":"http缓存","slug":"http缓存","link":"#http缓存","children":[]},{"level":3,"title":"CDN缓存","slug":"cdn缓存","link":"#cdn缓存","children":[]}]},{"level":2,"title":"渲染优化","slug":"渲染优化","link":"#渲染优化","children":[{"level":3,"title":"关键渲染路径优化","slug":"关键渲染路径优化","link":"#关键渲染路径优化","children":[]},{"level":3,"title":"优化CSSOM","slug":"优化cssom","link":"#优化cssom","children":[]},{"level":3,"title":"优化Javascript","slug":"优化javascript","link":"#优化javascript","children":[]},{"level":3,"title":"尽量使用CSS动画，而不是JS","slug":"尽量使用css动画-而不是js","link":"#尽量使用css动画-而不是js","children":[]},{"level":3,"title":"恰当使用Web Worker","slug":"恰当使用web-worker","link":"#恰当使用web-worker","children":[]}]}],"relativePath":"interview/optimization.md","lastUpdated":1677221329000}'),o={name:"interview/optimization.md"},p=n(`<h1 id="前端性能优化" tabindex="-1">前端性能优化 <a class="header-anchor" href="#前端性能优化" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#请求和相应优化">请求和相应优化</a><ul><li><a href="#dns预解析-deprecated">dns预解析(deprecated)</a></li><li><a href="#http长连接">http长连接</a></li><li><a href="#请求体压缩">请求体压缩</a></li><li><a href="#http缓存">http缓存</a></li><li><a href="#cdn缓存">CDN缓存</a></li></ul></li><li><a href="#渲染优化">渲染优化</a><ul><li><a href="#关键渲染路径优化">关键渲染路径优化</a></li><li><a href="#优化cssom">优化CSSOM</a></li><li><a href="#优化javascript">优化Javascript</a></li><li><a href="#尽量使用css动画-而不是js">尽量使用CSS动画，而不是JS</a></li><li><a href="#恰当使用web-worker">恰当使用Web Worker</a></li></ul></li></ul></nav><h2 id="请求和相应优化" tabindex="-1">请求和相应优化 <a class="header-anchor" href="#请求和相应优化" aria-hidden="true">#</a></h2><ul><li>减少DNS查找</li><li>重用TCP链接</li><li>减少HTTP重定向</li><li>压缩传输的资源</li><li>使用缓存</li><li>使用CDN</li><li>删除没有必要的请求资源</li><li>在客户端缓存资源</li><li>内容在传输前先压缩</li><li>消除没有必要的请求开销</li><li>并行处理请求和响应</li><li>针对协议版本采取优化措施:升级到HTTP2.0</li><li>根据需要采用服务端渲染方式:结算SPA应用首屏渲染慢的问题</li><li>采用预渲染的方式快速加载静态页面:页面渲染的极致性能，比较适合静态页面</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>使用不同域名可以提供浏览器请求资源并发的效率，但是多个域名又会造成DNS查找时间上的累加，因此一般将资源划分到至少两个但不超过四个域名</p></div><h3 id="dns预解析-deprecated" tabindex="-1">dns预解析(deprecated) <a class="header-anchor" href="#dns预解析-deprecated" aria-hidden="true">#</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dns-prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://g.alicdn.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dns-prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://img.alicdn.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ol><li>dns预解析仅对<code>跨域</code>域上的DNS查找有效，因此要避免指向当前站点或者域</li><li>dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数</li><li>默认情况下高版本浏览器已经支持隐式的DNS预解析，不需要使用dns-prefetch，如果为了兼容低版本浏览器，或者想对页面没有出现的域进行预获取，就要使用dns prefetch</li><li>虽然dns prefetch能够加快解析速度，但是不能滥用，禁用DNS预解析能够节约每月100亿的DNS查询</li></ol><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">x-dns-prefetch-control</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="http长连接" tabindex="-1">http长连接 <a class="header-anchor" href="#http长连接" aria-hidden="true">#</a></h3><p>对于同一个域名，大多数浏览器允许同时建立<code>6</code>个持久连接</p><h3 id="请求体压缩" tabindex="-1">请求体压缩 <a class="header-anchor" href="#请求体压缩" aria-hidden="true">#</a></h3><p>http1x也支持请求体压缩，需要客户端和服务端商量好压缩和解压算法</p><p>常见三种压缩格式,一般只压缩文本，因为压缩本身也是很耗时的操作，不适合图片和视频等</p><ol><li>DEFLATE</li><li>ZLIB:对应HTTP中的Content-Encoding:deflate</li><li>GZIP:对应HTTP中的Content-Encoding:gzip</li></ol><h3 id="http缓存" tabindex="-1">http缓存 <a class="header-anchor" href="#http缓存" aria-hidden="true">#</a></h3><ul><li><div class="text-blue">强制缓存</div><blockquote><p>客户端请求服务器，服务器告诉客户端可以强制缓存，客户端下次再请求该资源的时候，如果没有过期，直接使用该缓存，不需要再询问服务器</p></blockquote><ul><li><code>Expires</code>(不常用，可以直接用Cache-Control，一般只会在需要向下兼容时候使用)</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">Expires: new Date(&#39;2022-02-12 23:10&#39;).toUTCString() //这里是绝对时间</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这样做有个局限性，如果客户端和服务器的时间不一致，就会产生很大的问题</p><p>为了解决expires的局限性，HTTP1.1新增<code>cache-control</code>字段对<code>expires</code>的功能进行扩展和完善</p><ul><li><code>Cache-Control</code></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">Cache-Control: max-age=5  //这里的单位是s,这里也就是5秒之内强制缓存</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><details class="details custom-block"><summary>详细配置</summary><ul><li><code>no-store</code>表示禁止使用任何缓存策略</li><li><code>no-cache</code>表示强制进行协商缓存</li><li><code>no-store</code>和<code>no-cache</code> 是互斥属性，不能同时设置</li><li><code>private</code>不可被代理服务器缓存(例如nginx)，可以被浏览器缓存，是默认值</li><li><code>public</code>既可以被代理服务器缓存(例如nginx)，又可以被浏览器缓存</li><li><code>private</code>和<code>public</code> 为互斥属性，不能同时设置</li><li><code>s-maxage</code>在<code>public</code>下有效，设置代理缓存的时长</li></ul><p>一般对于不怎么会改变的文件，比如图片，CSS，js文件，设置public</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">Cache-Control:public,max-age:31536000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></details></li><li><div class="text-blue">协商缓存</div><blockquote><p>客户端每次发起请求都不会去判断强制缓存是否过期，而是直接与服务器协商来验证缓存的有效性，若缓存未过期，则使用本地缓存。</p></blockquote><ul><li><code>last-modified</code></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">Cache-Control: no-cache</span></span>
<span class="line"><span style="color:#A6ACCD;">last-modified: new Date(&#39;2022-02-12 23:10&#39;).toUTCString() //  绝对时间，一般取文件的修改时间</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>服务端(Node.js)示例</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> mtime </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">statSync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./img/03.jpg</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ifModifiedSince </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> req</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">headers[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if-modified-since</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (ifModifiedSince </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> mtime</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#A6ACCD;">()) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 缓存生效</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">statusCode</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">304</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./img/03.jpg</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">last-modified</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> mtime</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUTCString</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no-cache</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#A6ACCD;">(data)</span></span>
<span class="line"></span></code></pre></div><p>last-modified这种做法有两个问题:</p><ol><li>是根据资源最后修改时间戳判断的，虽然对请求的资源做了编辑，但内容没有变化，时间戳也会更新，会导致验证失效</li><li>判断的时间戳单位为秒，如果文件修改速度非常快，也无法识别有效性</li></ol><ul><li><code>ETag</code>(相当于计算文件的指纹)</li></ul><p>服务端(Node.js)示例</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./img/04.jpg</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> etagContent </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">etag</span><span style="color:#A6ACCD;">(data)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ifNoneMatch </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> req</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">headers[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">if-none-match</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (ifNoneMatch </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> etagContent) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">statusCode</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">304</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">etag</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> etagContent)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setHeader</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Cache-Control</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no-cache</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#A6ACCD;">(data)</span></span>
<span class="line"></span></code></pre></div><p>ETag也有不足，它是last-modified的补充方案，不是替代方案：</p><ol><li>计算ETag需要额外的计算开销，文件越大开销越大</li><li>ETag分为强验证和弱验证，强验证就是根据资源内容来验证，保证每个字节都相同，若验证根据资源部分属性生成，生成速度快但是无法确保每个字节都相同，并且在服务器集群场景下，因为不够准确而降低协商缓存的有效性。</li></ol></li><li><div class="text-blue">缓存决策</div><ul><li>一般index.html设置协商缓存，Etag或者last-modified都可以</li><li>不经常变动的，例如图片这种设置为强制缓存，时间不宜过长一般max-age=86400</li><li>style.css 这种打包出来会变成类似style.51ad833f5.css，这种文件变化一定会重新请求，所以可以直接设置强制缓存，同时考虑网络浏览器和中间代理的缓存，可以适当延长到一年，即cache-control: max-age=31536000</li><li>js类似于css，如果涉及安全问题，不想把用户私人信息缓存到代理中，可以设置cache-control:private</li></ul></li></ul><h3 id="cdn缓存" tabindex="-1">CDN缓存 <a class="header-anchor" href="#cdn缓存" aria-hidden="true">#</a></h3><p>主站域名为<code>www.taobao.com</code>,静态资源的CDN服务器域名有<code>g.alicdn.com</code>和<code>img.alicdn</code>等，他们是有意被设置成和主站域名不同的，主要有两点原因</p><ol><li>由于同域名下每次请求都会携带Cookie信息，这样做可以避免对静态资源的请求携带不必要的Cookie信息</li><li>考虑浏览器对同一域名下的并发请求限制(Chrome为6个)</li></ol><h2 id="渲染优化" tabindex="-1">渲染优化 <a class="header-anchor" href="#渲染优化" aria-hidden="true">#</a></h2><h3 id="关键渲染路径优化" tabindex="-1">关键渲染路径优化 <a class="header-anchor" href="#关键渲染路径优化" aria-hidden="true">#</a></h3><ul><li>缩小文件的尺寸(Minify)</li><li>使用gzip压缩(Compress)</li><li>使用缓存(Http Cache)</li></ul><h3 id="优化cssom" tabindex="-1">优化CSSOM <a class="header-anchor" href="#优化cssom" aria-hidden="true">#</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 阻塞渲染 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">style.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 非阻塞的加载CSS --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">print.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">media</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">print</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 拆分媒体查询相关CSS资源:可变阻塞加载 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">other.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">media</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">(min-width: 40em)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- 设备横屏加载的资源 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">portrait.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">media</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">orientation:protrait</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">&lt;!-- loading样式直接内联 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>避免在css中使用<code>@import</code>，会增加关键渲染路径长度，原本是并行的，使用@import会变成串行加载资源</p><h3 id="优化javascript" tabindex="-1">优化Javascript <a class="header-anchor" href="#优化javascript" aria-hidden="true">#</a></h3><ul><li>异步加载js</li><li>避免同步请求</li><li>延迟解析js</li><li>避免运行时间长的js</li></ul><h4 id="使用defer或者async延迟加载js" tabindex="-1">使用<code>defer</code>或者<code>async</code>延迟加载js <a class="header-anchor" href="#使用defer或者async延迟加载js" aria-hidden="true">#</a></h4><p>把<code>script</code>放到<code>&lt;/body&gt;</code>前面会有个问题，就是如果html和css内容非常大的时候，只有当这些内容加载完了才会下载js，会造成延迟</p><p>使用<code>defer</code>属性，可以让浏览器尽早去请求js脚本，脚本会在DOM解析完毕之后，<code>DOMContentLoaded</code>之前执行，不会阻塞页面</p><ul><li><p>对于多个<code>defer</code>脚本，后面的<code>defer</code>脚本会等到前一个<code>defer</code>下载完毕之后才会执行</p></li><li><p>对于多个<code>async</code>脚本，谁先加载完谁先执行，适用于脚本之间没有互相依赖关系</p></li></ul><h4 id="使用preload-利用空闲时间预加载指定的资源" tabindex="-1">使用<code>preload</code>，利用空闲时间预加载指定的资源 <a class="header-anchor" href="#使用preload-利用空闲时间预加载指定的资源" aria-hidden="true">#</a></h4><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UTF-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">X-UA-Compatible</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">IE=edge</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">viewport</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">width=device-width, initial-scale=1.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Document</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">&lt;!-- 利用空闲时间预加载指定的资源，不会阻塞页面的渲染 --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preload</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preload</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index2.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index2.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h4 id="使用prefetch-预加载将来可能用到的资源-慎重使用" tabindex="-1">使用<code>prefetch</code>，预加载将来可能用到的资源(慎重使用) <a class="header-anchor" href="#使用prefetch-预加载将来可能用到的资源-慎重使用" aria-hidden="true">#</a></h4><p>例如当前路由是/home，可能会去加载/user下的资源，也就是预加载非当前页面的资源，如果<code>prefetch</code>设置的是当前页面的资源，可能会造成重复加载，因此使用的时候一定要注意</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UTF-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">http-equiv</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">X-UA-Compatible</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">IE=edge</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">viewport</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">width=device-width, initial-scale=1.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Document</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prefetch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index2.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">  &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">index2.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="尽量使用css动画-而不是js" tabindex="-1">尽量使用CSS动画，而不是JS <a class="header-anchor" href="#尽量使用css动画-而不是js" aria-hidden="true">#</a></h3><p>JS写动画尽量使用<code>requestAnimationFrame</code>而不是<code>setInterval</code></p><h3 id="恰当使用web-worker" tabindex="-1">恰当使用Web Worker <a class="header-anchor" href="#恰当使用web-worker" aria-hidden="true">#</a></h3><p>子线程一旦被创建，不会被主线程打断，因此子线程创建完要及时释放，有两种方式关闭</p><ul><li>主线程调用worker.terminate()</li><li>子线程调用自身的全局对象self.close()</li></ul>`,42),e=[p];function t(c,r,D,F,y,i){return a(),l("div",null,e)}const h=s(o,[["render",t]]);export{C as __pageData,h as default};
