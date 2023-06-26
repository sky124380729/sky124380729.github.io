import{_ as l,o as e,c as i,O as a}from"./chunks/framework.ff3dc444.js";const f=JSON.parse('{"title":"Micro Frontend","description":"","frontmatter":{},"headers":[],"relativePath":"framework/micro-frontend/knowledge.md","filePath":"framework/micro-frontend/knowledge.md","lastUpdated":1687751075000}'),o={name:"framework/micro-frontend/knowledge.md"},r=a('<h1 id="micro-frontend" tabindex="-1">Micro Frontend <a class="header-anchor" href="#micro-frontend" aria-label="Permalink to &quot;Micro Frontend&quot;">​</a></h1><h2 id="实现方式对比" tabindex="-1">实现方式对比 <a class="header-anchor" href="#实现方式对比" aria-label="Permalink to &quot;实现方式对比&quot;">​</a></h2><h3 id="iframe" tabindex="-1">iframe <a class="header-anchor" href="#iframe" aria-label="Permalink to &quot;iframe&quot;">​</a></h3><p>优势：</p><ul><li>技术成熟</li><li>支持页面嵌入</li><li>天然支持运行沙箱隔离、独立运行</li></ul><p>劣势：</p><ul><li>页面之间可以是不同的域名（比如鉴权，跨域处理就很麻烦）</li><li>需要对应的设计一套应用通讯机制，如何监听、传参格式等内容</li><li>应用加载、渲染、缓存等体系的实现相对麻烦</li></ul><h3 id="web-component" tabindex="-1">web component <a class="header-anchor" href="#web-component" aria-label="Permalink to &quot;web component&quot;">​</a></h3><p>优势：</p><ul><li>支持自定义元素</li><li>支持<code>shadow dom</code>，并可通过关联进行控制</li><li>支持<code>template</code>和<code>slot</code>，引入自定义组件内容</li></ul><p>劣势：</p><ul><li>接入微前端需要重写当前项目</li><li>生态系统不完善，技术过新容易出现兼容性问题</li><li>整体架构设计复杂，组件与组件之间拆分过细时，容易造成通讯和控制繁琐</li></ul><h3 id="自研框架" tabindex="-1">自研框架 <a class="header-anchor" href="#自研框架" aria-label="Permalink to &quot;自研框架&quot;">​</a></h3><ul><li>路由分发式</li><li>主应用控制路由匹配和子应用加载，共享依赖加载</li><li>子应用做功能，并接入主应用实现主子控制和联动</li></ul><p>优势</p><ul><li>高度定制化，满足需要做兼容的一切场景</li><li>独立的通信机制和沙箱运行环境，可解决应用之间相互影响的问题</li><li>支持不同技术栈子应用，可无缝实现页面无渲染刷新</li></ul><p>劣势</p><ul><li>技术实现难度较高</li><li>需要设计一套定制的通信机制</li><li>首次加载会出现资源过大的情况</li></ul><h2 id="实现形式" tabindex="-1">实现形式 <a class="header-anchor" href="#实现形式" aria-label="Permalink to &quot;实现形式&quot;">​</a></h2><ul><li>单实例：即同一时刻，只有一个子应用被展示，子应用具备一个完整的应用生命周期</li><li>多实例：通常基于<code>url</code>的变化来做子应用的切换</li></ul><h2 id="微前端架构优势" tabindex="-1">微前端架构优势 <a class="header-anchor" href="#微前端架构优势" aria-label="Permalink to &quot;微前端架构优势&quot;">​</a></h2><ul><li>与技术栈无关</li><li>主框架不限制接入应用的技术栈，微应用具备完全自主权</li><li>独立开发、独立部署</li><li>增量升级</li><li>微前端是一种非常好的实施<code>渐进式重构</code>的手段和策略</li><li>微应用仓库独立，前后端可独立开发，主框架自动完成同步更新</li><li>独立运行时</li><li>每个为应用之间状态隔离，运行时状态不共享</li></ul><h2 id="微前端劣势" tabindex="-1">微前端劣势 <a class="header-anchor" href="#微前端劣势" aria-label="Permalink to &quot;微前端劣势&quot;">​</a></h2><ul><li>接入难度较高</li><li>应用场景-移动端少、管理端多</li></ul>',24),t=[r];function n(d,c,h,u,s,m){return e(),i("div",null,t)}const _=l(o,[["render",n]]);export{f as __pageData,_ as default};
