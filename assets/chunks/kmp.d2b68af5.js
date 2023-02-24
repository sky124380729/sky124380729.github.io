function l(n){const i=[0];let e=0;for(let t=1;t<n.length;t++){for(;e>0&&n[t]!==n[e];)e=i[e-1];n[t]===n[e]&&e++,i[t]=e}return i}export{l as getNext};
