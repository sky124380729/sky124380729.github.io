var u=Object.defineProperty;var c=(e,s,t)=>s in e?u(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var i=(e,s,t)=>(c(e,typeof s!="symbol"?s+"":s,t),t);const a="pending",l="fulfilled",n="rejected";class o{constructor(s){i(this,"status",a);i(this,"value");i(this,"reason");i(this,"successCallback");i(this,"failCallback");i(this,"resolve",s=>{this.status===a&&(this.status=l,this.value=s,this.successCallback&&this.successCallback(this.value))});i(this,"reject",s=>{this.status===a&&(this.status=n,this.reason=s,this.failCallback&&this.failCallback(this.reason))});s(this.resolve,this.reject)}then(s,t){this.status===l?s(this.value):this.status===n?t(this.reason):(this.successCallback=s,this.failCallback=t)}}function r(e){new e(t=>{setTimeout(()=>{t("成功")},2e3)}).then(t=>{console.log(t)})}export{o as default,r as testCase};