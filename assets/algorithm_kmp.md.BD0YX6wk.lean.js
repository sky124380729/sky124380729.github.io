import{h,y as k,c as n,m as s,a9 as d,aq as c,J as o,w as g,af as b,ap as r,o as t,F as E,G as u,t as m}from"./chunks/framework.CY_dPQvz.js";import{getNext as y}from"./chunks/kmp.DfjY3LlE.js";const F="/assets/kmp.BeOstXZM.gif",_="/assets/kmp3.DSI-O1-i.png",x="/assets/kmp2.Bj5RJU9u.gif",D=r("",23),A=s("li",null,[s("p",null,"next数组有很多种表示方法:"),s("ol",null,[s("li",null,"直接使用前缀表作为next数组：字符串不匹配的时候，跳到next数组前一位所对应数值的下标"),s("li",null,"前缀表整体右移一位，第一位使用-1补齐：字符串不匹配的时候，直接使用该字符串对应数值的下标"),s("li",null,"前缀表整体减一：字符串不匹配的时候，跳到next数组前一位对应的数值+1的下标")])],-1),f=r("",6),C={class:"mb-2"},P=s("span",{class:"inline-flex w-12"},"输入:",-1),v=s("li",{key:"output",class:"inline-flex w-12 ml-0 list-none"},"输出：",-1),j=s("p",null,[s("img",{src:x,alt:"kmp"})],-1),q=JSON.parse('{"title":"KMP","description":"","frontmatter":{},"headers":[],"relativePath":"algorithm/kmp.md","filePath":"algorithm/kmp.md","lastUpdated":1708478671000}'),B={name:"algorithm/kmp.md"},S=Object.assign(B,{setup(M){const i=h(null),e=h(null);return k(i,l=>{e.value=y(l)}),(l,p)=>(t(),n("div",null,[D,s("ul",null,[A,s("li",null,[f,s("div",C,[P,d(s("input",{class:"px-3 border-2 border-solid rounded border-blue","onUpdate:modelValue":p[0]||(p[0]=a=>i.value=a)},null,512),[[c,i.value]])]),o(b,{name:"list",tag:"ul",class:"!pl-0"},{default:g(()=>[v,(t(!0),n(E,null,u(e.value,a=>(t(),n("li",{class:"inline-flex px-2 mr-2 list-none border-2 border-solid rounded border-purple",key:a},m(a),1))),128))]),_:1})])]),j]))}});export{q as __pageData,S as default};