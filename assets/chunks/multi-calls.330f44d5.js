var n=Object.defineProperty;var u=(e,s,t)=>s in e?n(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var l=(e,s,t)=>(u(e,typeof s!="symbol"?s+"":s,t),t);const i="pending",a="fulfilled",h="rejected";class o{constructor(s){l(this,"status",i);l(this,"value");l(this,"reason");l(this,"successCallback",[]);l(this,"failCallback",[]);l(this,"resolve",s=>{if(this.status===i)for(this.status=a,this.value=s;this.successCallback.length;)this.successCallback.shift()(this.value)});l(this,"reject",s=>{if(this.status===i)for(this.status=h,this.reason=s;this.failCallback.length;)this.failCallback.shift()(this.value)});s(this.resolve,this.reject)}then(s,t){this.status===a?s(this.value):this.status===h?t(this.reason):(this.successCallback.push(s),this.failCallback.push(t))}}function r(e){let s=new e(t=>{setTimeout(()=>{t("成功")},2e3)});s.then(t=>{console.log(t,1)}),s.then(t=>{console.log(t,2)}),s.then(t=>{console.log(t,3)})}export{o as default,r as testCase};