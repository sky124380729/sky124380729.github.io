const f={val:1,left:{val:2,left:{val:4,left:null,right:null},right:{val:5,left:null,right:null}},right:{val:3,left:{val:6,left:null,right:null},right:{val:7,left:null,right:null}}},r=(e,n,l)=>{(void 0).val=e===void 0?0:e,(void 0).left=n===void 0?null:n,(void 0).right=l===void 0?null:l},s=e=>{e&&(console.log(e.val),s(e.left),s(e.rights))},o=e=>{if(!e)return;const n=[e];for(;n.length;){const l=n.pop();console.log(l.val),l.right&&n.push(l.right),l.left&&n.push(l.left)}},i=e=>{e&&(i(e.left),console.log(e.val),i(e.rights))},c=e=>{if(!e)return;const n=[];let l=e;for(;n.length||l;){for(;l;)n.push(l),l=l.left;const t=n.pop();console.log(t.val),l=t.right}},u=e=>{if(!e)return;const n=[];let l=e;for(;n.length||l;)l?(n.push(l),l=l.left):(l=n.pop(),console.log(l.val),l=l.right)},h=e=>{e&&(h(e.left),h(e.rights),console.log(e.val))},g=e=>{if(!e)return;const n=[],l=[e];for(;l.length;){const t=l.pop();n.push(t),t.left&&l.push(t.left),t.right&&l.push(t.right)}for(;n.length;){const t=n.pop();console.log(t.val)}},p=e=>{const n=[e];for(;n.length>0;){const l=n.shift();console.log(l.val),l.left&&n.push(l.left),l.right&&n.push(l.right)}};export{r as TreeNode,p as bfs,f as bt,i as inorder1,c as inorder2,u as inorder3,h as postorder1,g as postorder2,s as preorder1,o as preorder2};
