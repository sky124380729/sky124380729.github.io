var a=Object.defineProperty;var l=(e,s,t)=>s in e?a(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var i=(e,s,t)=>(l(e,typeof s!="symbol"?s+"":s,t),t);const n="pending",o="fulfilled",r="rejected";class c{constructor(s){i(this,"status",n);i(this,"value");i(this,"reason");i(this,"resolve",s=>{this.status===n&&(this.status=o,this.value=s)});i(this,"reject",s=>{this.status===n&&(this.status=r,this.reason=s)});s(this.resolve,this.reject)}then(s,t){this.status===o?s(this.value):this.status===r&&t(this.reason)}}function f(e){new e((t,u)=>{t("成功"),u("失败")}).then(t=>{console.log(t)},t=>{console.log(t)})}export{c as default,f as testCase};
