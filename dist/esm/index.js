import e,{useRef as r,useEffect as t,useState as n}from"react";import{Transition as o}from"react-transition-group";function i(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)r.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(t[n[o]]=e[n[o]])}return t}function c(e,r,t,n){return new(t||(t=Promise))((function(o,i){function c(e){try{l(n.next(e))}catch(e){i(e)}}function d(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(c,d)}l((n=n.apply(e,r||[])).next())}))}const d=({height:r,isSmooth:t,isExpanded:n,children:i})=>{const c=t?300:0,d={maxHeight:0,overflow:"hidden"},l={entering:{maxHeight:r,overflow:"hidden",transition:`max-height ${c}ms ease-out`},entered:{maxHeight:r,overflow:"visible"},exiting:{maxHeight:0,overflow:"hidden",transition:`max-height ${c}ms ease-out`},exited:{maxHeight:0,overflow:"hidden"}};return e.createElement(o,{in:n,timeout:c,unmountOnExit:!0},(r=>e.createElement("div",{style:Object.assign(Object.assign({},d),l[r])},i)))},l=n=>{var{flatTree:o,item:c,id:d,pid:l,index:u,order:s,level:a,itemHeight:p,itemOffset:f,onCollapse:m,onExpand:h,isExpanded:g,droppableRef:v,rect:x,items:E,source:y,target:b,currentOrderState:w,setCurrentOrderState:O,dropOrderState:I,isDragInProgress:D,isDragInProgressState:H,setDragInProgressState:P,handleMove:T,handleEnd:S,disableItemDrop:L}=n,Y=i(n,["flatTree","item","id","pid","index","order","level","itemHeight","itemOffset","onCollapse","onExpand","isExpanded","droppableRef","rect","items","source","target","currentOrderState","setCurrentOrderState","dropOrderState","isDragInProgress","isDragInProgressState","setDragInProgressState","handleMove","handleEnd","disableItemDrop"]);const j=r(null),F=!(!H||!y.current||y.current.order!==s),X=I===s,C={transform:function(){const e=w.indexOf(s);if(!y.current)return;return y.current.order===s?null:e>s?"translateY(100%)":e<s?"translateY(-100%)":null}(),transition:y.current?y.current.order===s?null:"transform 0.2s ease-in-out":null,pointerEvents:H&&!F?"none":"auto",paddingLeft:a*f+"px",position:F?"sticky":X?"relative":null,zIndex:F?999999:X?1:null,outline:"none"},$={style:{cursor:F?"grabbing":"grab",touchAction:"none"},onMouseDown:M,onTouchStart:M},N={onClick:function(e){"click"===e.type&&e.preventDefault();c.isExpanded?m(d):h(d)},isExpanded:g},k={isDragging:F,isDropping:X};function M(e){if("mousedown"===e.type&&e.preventDefault(),L)return;if("mousedown"===e.type&&0!==e.button)return;const r=v.current.getBoundingClientRect();x.current=Object.assign(Object.assign({},r),{top:r.top+window.scrollY,left:r.left+window.scrollX});const t=void 0!==e.clientX?e.clientX:e.touches[0].clientX,n=void 0!==e.clientY?e.clientY:e.touches[0].clientY,o={x:t+window.scrollX,y:n+window.scrollY};y.current={order:s,mouse:o},b.current={order:s},D.current=!0,P(!0),m(d,!1),"mousedown"===e.type&&(document.addEventListener("mousemove",T),document.addEventListener("mouseup",S)),"touchstart"===e.type&&(document.addEventListener("touchmove",T),document.addEventListener("touchend",S))}return t((()=>{const e=E.current,r={top:j.current.offsetTop,right:j.current.offsetLeft+j.current.offsetWidth,bottom:j.current.offsetTop+j.current.offsetHeight,left:j.current.offsetLeft,width:j.current.offsetWidth,height:j.current.offsetHeight};return e[s]={ref:j,id:d,pid:l,index:u,order:s,level:a,children:c.children,isExpanded:c.isExpanded,rect:r},()=>{e.splice(s)}}),[o]),e.createElement("div",Object.assign({ref:j,style:C},Y),Y.children({provided:{dragHandleProps:$,collapseProps:N},snapshot:k}))};function u(e,r){const t=Object.assign({},e);return t.items[r].isExpanded=!1,t}function s(e,r){const t=Object.assign({},e);return t.items[r].isExpanded=!0,t}function a(e,r){return r.flatMap((r=>e.items[r].children&&e.items[r].isExpanded?[r,...a(e,e.items[r].children)]:r))}function p(e,r,t=0){const n=e.items[r];return n.children&&n.children.length>0&&!0===n.isExpanded&&(t+=n.children.length,n.children.forEach((r=>{t+=p(e,r)}))),t}function f(e,r,t){if(!0===t.replace&&r.length>1)return e;const n=JSON.parse(JSON.stringify(e)),o=t.pid?n.items[t.pid].children:n.children;return r.forEach((e=>n.items[e.id]=e)),r.reverse().forEach((e=>t.replace?o.splice(t.index,1,e.id):o.splice(t.index,0,e.id))),n}function m(e,r,t){const n=JSON.parse(JSON.stringify(e)),o=r.pid?n.items[r.pid].children:n.children;return(t.pid?n.items[t.pid].children:n.children).splice(t.index,0,o.splice(r.index,1)[0]),n}const h=t=>{var o,{tree:c,flatTree:u,id:s,pid:a,index:f,level:m,itemHeight:g,itemOffset:v,renderItem:x,onCollapse:E,onExpand:y,draggableProps:b}=t,w=i(t,["tree","flatTree","id","pid","index","level","itemHeight","itemOffset","renderItem","onCollapse","onExpand","draggableProps"]);const O=c.items[s],I=u.indexOf(s),D=r(null),[H,P]=n(O.isExpanded);return-1===I?null:e.createElement("div",Object.assign({},w),e.createElement(l,Object.assign({flatTree:u,item:O,id:s,pid:a,index:f,order:I,level:m,itemHeight:g,itemOffset:v,onCollapse:function(e,r=!0){D.current=r,P(!1),setTimeout((()=>E(e)),r?300:0)},onExpand:function(e,r=!0){D.current=r,P(!0),y(e),setTimeout((()=>y(e)),r?300:0)},isExpanded:H,tabIndex:I+1},b),(({provided:e,snapshot:r})=>x({item:O,level:m,order:I,provided:e,snapshot:r}))),(null===(o=O.children)||void 0===o?void 0:o.length)>0&&e.createElement(d,{height:p(c,O.id)*g,isSmooth:D.current,isExpanded:H},O.children.map(((r,t)=>e.createElement(h,{tree:c,flatTree:u,id:r,pid:s,index:t,level:m+1,itemHeight:g,itemOffset:v,renderItem:x,onCollapse:E,onExpand:y,draggableProps:b,key:r})))))},g=o=>{var{tree:d,flatTree:l,itemHeight:u,itemOffset:s,nestFiles:a,replaceFiles:p,disableItemDrop:f,disableFileDrop:m,onItemDrop:h,onFileDrop:g,onNestError:v}=o,x=i(o,["tree","flatTree","itemHeight","itemOffset","nestFiles","replaceFiles","disableItemDrop","disableFileDrop","onItemDrop","onFileDrop","onNestError"]);const E=r(null),y=r(null),b=r([]),w=r(null),O=r(null),I=r([]),D=r([]),H=r(null),P=r(null),T=r(!1),S=r(0),L=r(null),Y=r(0),[j,F]=n([]),[X,C]=n(null),[$,N]=n(!1),k=200,M={droppableRef:E,rect:y,items:b,source:w,target:O,currentOrderState:j,setCurrentOrderState:F,dropOrderState:X,isDragInProgress:T,isDragInProgressState:$,setDragInProgressState:N,handleMove:B,handleEnd:z,disableItemDrop:f},R={placeholder:P};function J(e,r=!0){if("mousemove"!==e.type&&"dragover"!==e.type||e.preventDefault(),!w.current||!T.current)return;if(r&&L.current)return;const t=b.current[w.current.order];if(t){const r=void 0!==e.clientX?e.clientX:e.touches[0].clientX,n=void 0!==e.clientY?e.clientY:e.touches[0].clientY,o=r+window.scrollX-w.current.mouse.x,i=n+window.scrollY-w.current.mouse.y;t.ref.current.style.transform=`translate(${o}px, ${i}px)`}const{order:n,hover:o}=function(e,r,t){const n=t.current[r.current.order],o=void 0!==e.clientX?e.clientX:e.touches[0].clientX,i=void 0!==e.clientY?e.clientY:e.touches[0].clientY;let c=window.scrollX-y.current.left+o,d=window.scrollY-y.current.top+i;n&&(c+=y.current.left+n.rect.left+n.rect.width/2-r.current.mouse.x,d+=y.current.top+n.rect.top+n.rect.height/2-r.current.mouse.y);let l=null,u=null;const s=t.current.filter((e=>e.rect.top<=d&&e.rect.bottom>=d&&e.rect.left<=c&&e.rect.right>=c))[0];s&&(l=s.order,u=d<s.rect.top+s.rect.height/2?"top":"bottom");"dragover"===e.type&&P.current.rect.top<=d&&P.current.rect.bottom>=d&&P.current.rect.left<=c&&P.current.rect.right>=c&&(l=P.current.order,u=d<P.current.rect.top+P.current.rect.height/2?"top":"bottom");return{order:l,hover:u}}(e,w,b);n===O.current.order&&o===O.current.hover||(O.current={order:n,hover:o},void 0!==O.current&&(D.current=function(e){var r,t,n,o;const i=b.current[D.current[O.current.order]];if(i&&i.order!==w.current.order&&w.current.order<=O.current.order&&O.current.order>=D.current[O.current.order]&&"top"===O.current.hover&&(i.children&&!i.isExpanded||0===(null===(r=i.children)||void 0===r?void 0:r.length)||p&&"dragover"===e.type&&!0!==i.isExpanded))return H.current=i.order,C(H.current),D.current;if(i&&i.order!==w.current.order&&w.current.order<=O.current.order&&O.current.order<D.current[O.current.order]&&"bottom"===O.current.hover&&(i.children&&!i.isExpanded||0===(null===(t=i.children)||void 0===t?void 0:t.length)||p&&"dragover"===e.type&&!0!==i.isExpanded))return H.current=i.order,C(H.current),D.current;if(i&&i.order!==w.current.order&&w.current.order>=O.current.order&&O.current.order<=D.current[O.current.order]&&"bottom"===O.current.hover&&(i.children&&!i.isExpanded||0===(null===(n=i.children)||void 0===n?void 0:n.length)||p&&"dragover"===e.type&&!0!==i.isExpanded))return H.current=i.order,C(H.current),D.current;if(i&&i.order!==w.current.order&&w.current.order>=O.current.order&&O.current.order>D.current[O.current.order]&&"top"===O.current.hover&&(i.children&&!i.isExpanded||0===(null===(o=i.children)||void 0===o?void 0:o.length)||p&&"dragover"===e.type&&!0!==i.isExpanded))return H.current=i.order,C(H.current),D.current;H.current=null,C(H.current);const c=[...I.current],d=c.indexOf(w.current.order),l=null===O.current.order?c.length:c.indexOf(O.current.order);return c.splice(l,0,c.splice(d,1)[0]),c}(e),F(D.current)))}function W(e){if(e.preventDefault(),m)return;if(w.current)return;const r=E.current.getBoundingClientRect();y.current=Object.assign(Object.assign({},r),{top:r.top+window.scrollY,left:r.left+window.scrollX}),w.current={order:P.current.order},O.current={order:P.current.order},T.current=!0,N(!0),document.addEventListener("dragenter",A),document.addEventListener("dragleave",q),document.addEventListener("dragover",B),document.addEventListener("drop",z)}function B(e){y.current&&(!function(e){if("mousemove"!==e.type&&"dragover"!==e.type||e.preventDefault(),!w.current||!T.current)return;const r=void 0!==e.clientY?e.clientY:e.touches[0].clientY;if(S.current===r)return;const t=S.current-r>0?"top":"bottom";if("top"===t&&window.scrollY<=0)return void Q();if("bottom"===t&&window.scrollY+window.innerHeight>=document.body.offsetHeight)return void Q();const n=Math.max(.1*window.innerHeight,u),o=r<n,i=window.innerHeight-r<n;L.current&&Q(),"top"===t&&o&&(L.current=setInterval((()=>K(e,1,t)),4)),"bottom"===t&&i&&(L.current=setInterval((()=>K(e,1,t)),4)),S.current=r}(e),J(e))}function z(e){return c(this,void 0,void 0,(function*(){if("mouseup"!==e.type&&"drop"!==e.type&&"dragleave"!==e.type||e.preventDefault(),!y.current)return;if(!w.current||!O.current)return;if(L.current&&(clearInterval(L.current),L.current=null),T.current=!1,null===O.current.order)return void U(e);const r=void 0!==e.clientX?e.clientX:e.changedTouches[0].clientX,t="drop"===e.type?P.current:b.current[w.current.order],n="drop"===e.type&&O.current.order===P.current.order&&null===H.current?P.current:null!==H.current?b.current[H.current]:b.current[O.current.order],o=n.pid?b.current.filter((e=>e.id===n.pid))[0]:null,i=b.current[D.current.indexOf(w.current.order)-1],c=o?y.current.left+o.rect.left+o.level*s:null,l=i?y.current.left+i.rect.left+i.level*s:null,f="drop"===e.type?r:r-(w.current.mouse.x-y.current.left-t.rect.left-t.level*s),m=t.pid,x=t.index;let E=n.pid,I=n.index;if(null===H.current||!n.children||n.isExpanded&&0!==n.children.length||(E=n.id,I=0),t.order<n.order&&t.pid!==n.pid&&null===H.current&&(I=n.index+1),t.order<n.order&&n.children&&n.isExpanded&&(E=n.id,I=0),o&&t.order<=n.order&&n.index===o.children.length-1&&t.pid!==o.pid&&c>f&&(E=o.pid,I=o.index+1),o&&t.order<=n.order&&n.index===o.children.length-1&&t.pid===o.pid&&c>f&&(E=o.pid,I=o.index),i&&i.id!==n.pid&&t.order>=n.order&&i.level!==n.level&&f>l&&(E=i.pid,I=i.index+1),a&&E===d.rootId&&!t.children)return v(),void U(e);if("drop"!==e.type){const e=t.level,r=((b.current.filter((e=>e.id===E))[0]?b.current.filter((e=>e.id===E))[0].level+1:0)-e)*s,n=b.current[O.current.order].rect.top-t.rect.top,o=null!==H.current||(r+n)/2>(u+s)/2?k:100;t.ref.current.style.transition=`transform ${o}ms ease-out, opacity ${o}ms ease-out`,null===H.current&&(t.ref.current.style.transform=`translate(${r}px, ${n}px)`),null!==H.current&&(t.ref.current.style.transform=`translate(${r}px, ${n}px) scale(0.5)`,t.ref.current.style.opacity="0"),yield new Promise((e=>setTimeout(e,o))),t.ref.current.style.transition=null,t.ref.current.style.transform=null}"drop"!==e.type&&h({pid:m,index:x},{pid:E,index:I}),"drop"===e.type&&g(e.dataTransfer,{pid:E,index:I,replace:p&&n.order===H.current}),G(),V(e)}))}function A(){Y.current+=1}function q(e){Y.current-=1,Y.current<0&&(O.current.order=null,z(e))}function G(){w.current=null,O.current=null,y.current=null,H.current=null,C(H.current),T.current=!1,N(!1),Y.current=0}function K(e,r,t){"top"===t&&window.scrollY<=0||"bottom"===t&&window.scrollY+window.innerHeight>=document.body.offsetHeight?Q():(window.scrollBy(0,r*("top"===t?-1:1)),J(e,!1))}function Q(){L.current&&(clearInterval(L.current),L.current=null)}function U(e){return c(this,void 0,void 0,(function*(){const r=b.current[w.current.order];r&&(r.ref.current.style.transition="transform 200ms ease-out",r.ref.current.style.transform="translate(0, 0)"),D.current=I.current,F(D.current),yield new Promise((e=>setTimeout(e,k))),r&&(r.ref.current.style.transition=null,r.ref.current.style.transform=null),G(),V(e)}))}function V(e){"mouseup"===e.type&&(document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",z)),"touchend"===e.type&&(document.removeEventListener("touchmove",B),document.removeEventListener("touchend",z)),"drop"!==e.type&&"dragleave"!==e.type||(document.removeEventListener("dragenter",A),document.removeEventListener("dragleave",q),document.removeEventListener("dragover",B),document.removeEventListener("drop",z))}return t((()=>{I.current=Object.keys(l).map((e=>parseInt(e))),I.current.push(I.current.length),D.current=I.current,F(I.current)}),[l]),t((()=>(document.addEventListener("dragenter",W),()=>{document.removeEventListener("dragenter",W)})),[l]),e.createElement("div",{ref:E,style:{position:"relative"}},x.children({provided:{draggableProps:M,placeholderProps:R}}))},v=({tree:n,flatTree:o,itemHeight:i,placeholder:c})=>{const d=r(null),l={height:i};return t((()=>{const e={top:d.current.offsetTop,right:d.current.offsetLeft+d.current.offsetWidth,bottom:d.current.offsetTop+d.current.offsetHeight,left:d.current.offsetLeft,width:d.current.offsetWidth,height:d.current.offsetHeight};return c.current={ref:d,pid:n.rootId,index:n.items[n.rootId].children.length,order:o.length,level:0,rect:e},()=>c.current=null}),[o]),e.createElement("div",{ref:d,style:l})},x=({tree:r,itemHeight:t,itemOffset:n=16,renderItem:o,nestFiles:i=!1,replaceFiles:c=!1,disableItemDrop:d=!1,disableFileDrop:l=!1,onItemDrop:u,onFileDrop:s=(()=>{}),onCollapse:p=(()=>{}),onExpand:f=(()=>{}),onNestError:m=(()=>{})})=>{const x=r.items[r.rootId],E=a(r,x.children);return e.createElement(g,{tree:r,flatTree:E,itemHeight:t,itemOffset:n,nestFiles:i,replaceFiles:c,disableItemDrop:d,disableFileDrop:l,onItemDrop:u,onFileDrop:s,onNestError:m},(({provided:i})=>e.createElement(e.Fragment,null,x.children.map(((c,d)=>e.createElement(h,{tree:r,flatTree:E,id:c,pid:r.rootId,index:d,level:0,itemHeight:t,itemOffset:n,renderItem:o,onCollapse:p,onExpand:f,draggableProps:i.draggableProps,key:c}))),e.createElement(v,Object.assign({tree:r,flatTree:E,itemHeight:t},i.placeholderProps)))))};export{x as Tree,h as TreeBlock,l as TreeDraggable,g as TreeDroppable,v as TreePlaceholder,u as collapseTreeItem,s as expandTreeItem,a as flattenTree,p as getChildrenCount,f as updateTreeFiles,m as updateTreeItems};
//# sourceMappingURL=index.js.map
