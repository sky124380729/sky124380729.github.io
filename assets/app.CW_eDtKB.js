import{j as r,as as p,at as u,au as l,av as _,aw as c,ax as f,ay as d,az as m,aA as b,aB as g,ao as y,d as v,u as P,l as h,z as j,aC as A,aD as O,aE as S,ab as T}from"./chunks/framework.CY_dPQvz.js";import{R as w}from"./chunks/theme.DKjVP36E.js";function i(e){if(e.extends){const t=i(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const o=i(w),C=v({name:"VitePressApp",setup(){const{site:e,lang:t,dir:a}=P();return h(()=>{j(()=>{document.documentElement.lang=t.value,document.documentElement.dir=a.value})}),e.value.router.prefetchLinks&&A(),O(),S(),o.setup&&o.setup(),()=>T(o.Layout)}});async function R(){const e=E(),t=z();t.provide(u,e);const a=l(e.route);return t.provide(_,a),t.component("Content",c),t.component("ClientOnly",f),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:t,router:e,siteData:d}),{app:t,router:e,data:a}}function z(){return m(C)}function E(){let e=r,t;return b(a=>{let n=g(a),s=null;return n&&(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),s=y(()=>import(n),__vite__mapDeps([]))),r&&(e=!1),s},o.NotFound)}r&&R().then(({app:e,router:t,data:a})=>{t.go().then(()=>{p(t.route,a.site),e.mount("#app")})});const x=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),L=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),F=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),V=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),$=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{x as _,L as a,F as b,R as createApp,$ as i,V as v};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}