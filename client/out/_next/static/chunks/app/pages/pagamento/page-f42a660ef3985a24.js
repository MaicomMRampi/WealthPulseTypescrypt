(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6435],{40942:function(e,t,n){Promise.resolve().then(n.bind(n,17666))},60291:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return a}});let a=n(99920)._(n(2265)).default.createContext(null)},34492:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=n(2265),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},r=a.useState,l=a.useEffect,o=a.useLayoutEffect,s=a.useDebugValue;function u(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!i(e,n)}catch(e){return!0}}var c="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),a=r({inst:{value:n,getSnapshot:t}}),i=a[0].inst,c=a[1];return o(function(){i.value=n,i.getSnapshot=t,u(i)&&c({inst:i})},[e,n,t]),l(function(){return u(i)&&c({inst:i}),e(function(){u(i)&&c({inst:i})})},[e]),s(n),n};t.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:c},85107:function(e,t,n){"use strict";/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=n(2265),i=n(10554),r="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},l=i.useSyncExternalStore,o=a.useRef,s=a.useEffect,u=a.useMemo,c=a.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,a,i){var d=o(null);if(null===d.current){var v={hasValue:!1,value:null};d.current=v}else v=d.current;var f=l(e,(d=u(function(){function e(e){if(!s){if(s=!0,l=e,e=a(e),void 0!==i&&v.hasValue){var t=v.value;if(i(t,e))return o=t}return o=e}if(t=o,r(l,e))return t;var n=a(e);return void 0!==i&&i(t,n)?t:(l=e,o=n)}var l,o,s=!1,u=void 0===n?null:n;return[function(){return e(t())},null===u?void 0:function(){return e(u())}]},[t,n,a,i]))[0],d[1]);return s(function(){v.hasValue=!0,v.value=f},[f]),c(f),f}},10554:function(e,t,n){"use strict";e.exports=n(34492)},35006:function(e,t,n){"use strict";e.exports=n(85107)},17666:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var a=n(57437),i=n(2265),r=n(81313),l=n(80665),o=n(89470),s=n(16356),u=n(66648),c=n(16463);function d(){var e,t,n,d;let{tokenUsuario:v}=(0,r.Z)(),f=new Date().getHours(),[m,p]=(0,i.useState)(null),[h,g]=(0,i.useState)(null),b=(0,c.useRouter)(),[x,y]=(0,i.useState)(),[E,j]=(0,i.useState)(!1);(0,i.useEffect)(()=>{v||setTimeout(()=>b.push("/pages/login"),2e3)},[v]);let S=async()=>{try{let e=await l.h.get("/buscaultimapagamento",{params:{id:null==v?void 0:v.id}});g(e.data)}catch(e){console.error("Erro ao buscar pagamento:",e)}},w=async()=>{try{let e=await l.h.post("/geracobranca",{accessToken:"APP_USR-5296356745455931-082810-90e947ec664ab8fb2771fb01c3c81439-151183491",paymentData:{total:.01,name:null==v?void 0:v.nome,email:null==v?void 0:v.email,id:null==h?void 0:h.id.toString()}});p(e.data)}catch(e){console.error("Erro ao gerar cobran\xe7a PIX:",e)}},V=async()=>{if(null==m?void 0:m.id)try{let e=await l.h.get("/verificapagamento",{params:{accessToken:"APP_USR-5296356745455931-082810-90e947ec664ab8fb2771fb01c3c81439-151183491",idPagamento:m.id}});y(e.data)}catch(e){console.error("Erro ao verificar pagamento:",e)}},_=async()=>{try{let e=await l.h.post("/postpagamento",{idPagamento:h});200===e.status&&(y(""),setTimeout(()=>{localStorage.removeItem("token"),b.replace("/pages/login")},3e3))}catch(e){console.error("Erro ao alterar dados de pagamento:",e)}};return(0,i.useEffect)(()=>{S()},[]),(0,i.useEffect)(()=>{h&&w()},[h]),(0,i.useEffect)(()=>{let e=setInterval(()=>{V()},1e4);return()=>clearInterval(e)},[null==m?void 0:m.id]),(0,i.useEffect)(()=>{(null==x?void 0:x.status)==="approved"&&_()},[x]),(0,a.jsxs)("div",{className:"w-full flex items-center justify-center flex-col",children:[(0,a.jsxs)("p",{className:"text-xl py-6 font-semibold text-center",children:[f>12?"Boa tarde":"Bom dia"," ",null==v?void 0:v.nome,"! Seu cadastro est\xe1 vencido, favor realizar pagamento para libera\xe7\xe3o."]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[(null==m?void 0:null===(t=m.point_of_interaction)||void 0===t?void 0:null===(e=t.transaction_data)||void 0===e?void 0:e.qr_code_base64)&&(0,a.jsx)(u.default,{alt:"Pagamento",src:"data:image/png;base64,".concat(m.point_of_interaction.transaction_data.qr_code_base64),width:300,height:300}),(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsx)("p",{className:"text-center pb-4",children:"Confira os dados de pagamento"}),(0,a.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,a.jsx)(o.Y,{fullWidth:!0,label:"Nome",defaultValue:null==v?void 0:v.nome}),(0,a.jsx)(o.Y,{fullWidth:!0,label:"Institui\xe7\xe3o",defaultValue:"Mercado pago"}),m&&(0,a.jsx)(o.Y,{fullWidth:!0,endContent:(0,a.jsx)("div",{children:(0,a.jsx)(s.Fqs,{onClick:()=>{var e,t;let n=null==m?void 0:null===(t=m.point_of_interaction)||void 0===t?void 0:null===(e=t.transaction_data)||void 0===e?void 0:e.qr_code;n&&navigator.clipboard.writeText(n).then(()=>{j(!0),setTimeout(()=>j(!1),2e3)})},className:"cursor-pointer text-blue-600",size:20})}),label:"Pix copia e cola",value:null==m?void 0:null===(d=m.point_of_interaction)||void 0===d?void 0:null===(n=d.transaction_data)||void 0===n?void 0:n.qr_code}),E&&(0,a.jsx)("p",{className:"text-default-500",children:"Chave copiada com sucesso!"})]})]})]}),(0,a.jsx)("p",{className:"pt-6",children:x?"pending"===x.status?(0,a.jsxs)("p",{className:"flex gap-2 text-xl text-yellow-500 font-semibold",children:["Pagamento pendente ",(0,a.jsx)(u.default,{src:"/icons/98739.svg",alt:"Alerta",width:20,height:20})]}):(0,a.jsxs)("p",{className:"flex gap-2 text-xl text-[#10b981] font-semibold",children:["Pagamento conclu\xeddo ",(0,a.jsx)(u.default,{src:"/icons/positive.svg",alt:"Alerta",width:20,height:20})]}):null})]})}},81313:function(e,t,n){"use strict";let a=(0,n(39099).Ue)(e=>({tokenUsuario:null,setTokenUsuario:t=>e({tokenUsuario:t})}));t.Z=a},80665:function(e,t,n){"use strict";n.d(t,{h:function(){return a}});let a=n(38472).Z.create({baseURL:"https://fluxodocapital.com.br/hostmidea"})},89470:function(e,t,n){"use strict";n.d(t,{Y:function(){return u}});var a=n(31298),i=n(71949),r=n(2265),l=n(55971),o=n(57437),s=(0,l.Gp)((e,t)=>{let{Component:n,label:l,description:s,isClearable:u,startContent:c,endContent:d,labelPlacement:v,hasHelper:f,isOutsideLeft:m,shouldLabelBeOutside:p,errorMessage:h,isInvalid:g,getBaseProps:b,getLabelProps:x,getInputProps:y,getInnerWrapperProps:E,getInputWrapperProps:j,getMainWrapperProps:S,getHelperWrapperProps:w,getDescriptionProps:V,getErrorMessageProps:_,getClearButtonProps:M}=(0,a.G)({...e,ref:t}),I=l?(0,o.jsx)("label",{...x(),children:l}):null,P=(0,r.useMemo)(()=>u?(0,o.jsx)("span",{...M(),children:d||(0,o.jsx)(i.f,{})}):d,[u,M]),D=(0,r.useMemo)(()=>f?(0,o.jsx)("div",{...w(),children:g&&h?(0,o.jsx)("div",{..._(),children:h}):s?(0,o.jsx)("div",{...V(),children:s}):null}):null,[f,g,h,s,w,_,V]),N=(0,r.useMemo)(()=>(0,o.jsxs)("div",{...E(),children:[c,(0,o.jsx)("input",{...y()}),P]}),[c,P,y,E]),C=(0,r.useMemo)(()=>p?(0,o.jsxs)("div",{...S(),children:[(0,o.jsxs)("div",{...j(),children:[m?null:I,N]}),D]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{...j(),children:[I,N]}),D]}),[v,D,p,I,N,h,s,S,j,_,V]);return(0,o.jsxs)(n,{...b(),children:[m?I:null,C]})});s.displayName="NextUI.Input";var u=s},71949:function(e,t,n){"use strict";n.d(t,{f:function(){return i}});var a=n(57437),i=e=>(0,a.jsx)("svg",{"aria-hidden":"true",focusable:"false",height:"1em",role:"presentation",viewBox:"0 0 24 24",width:"1em",...e,children:(0,a.jsx)("path",{d:"M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z",fill:"currentColor"})})},38756:function(e,t,n){"use strict";n.d(t,{Q:function(){return o}});var a=n(2265),i=n(95729),r=n(79248),l=n(7353);function o(e,t,n){let{validationBehavior:o,focus:s}=e;(0,r.b)(()=>{if("native"===o&&(null==n?void 0:n.current)){var e;let a,i=t.realtimeValidation.isInvalid?t.realtimeValidation.validationErrors.join(" ")||"Invalid value.":"";n.current.setCustomValidity(i),n.current.hasAttribute("title")||(n.current.title=""),t.realtimeValidation.isInvalid||t.updateValidation({isInvalid:!(e=n.current).validity.valid,validationDetails:{badInput:(a=e.validity).badInput,customError:a.customError,patternMismatch:a.patternMismatch,rangeOverflow:a.rangeOverflow,rangeUnderflow:a.rangeUnderflow,stepMismatch:a.stepMismatch,tooLong:a.tooLong,tooShort:a.tooShort,typeMismatch:a.typeMismatch,valueMissing:a.valueMissing,valid:a.valid},validationErrors:e.validationMessage?[e.validationMessage]:[]})}});let u=(0,l.i)(()=>{t.resetValidation()}),c=(0,l.i)(e=>{var a,r;t.displayValidation.isInvalid||t.commitValidation();let l=null==n?void 0:null===(a=n.current)||void 0===a?void 0:a.form;!e.defaultPrevented&&n&&l&&function(e){for(let t=0;t<e.elements.length;t++){let n=e.elements[t];if(!n.validity.valid)return n}return null}(l)===n.current&&(s?s():null===(r=n.current)||void 0===r||r.focus(),(0,i._w)("keyboard")),e.preventDefault()}),d=(0,l.i)(()=>{t.commitValidation()});(0,a.useEffect)(()=>{let e=null==n?void 0:n.current;if(!e)return;let t=e.form;return e.addEventListener("invalid",c),e.addEventListener("change",d),null==t||t.addEventListener("reset",u),()=>{e.removeEventListener("invalid",c),e.removeEventListener("change",d),null==t||t.removeEventListener("reset",u)}},[n,c,d,u,o])}},37408:function(e,t,n){"use strict";n.d(t,{b:function(){return i}});var a=n(80612);function i(e,t){let{id:n,"aria-label":i,"aria-labelledby":r}=e;return n=(0,a.Me)(n),r&&i?r=[...new Set([n,...r.trim().split(/\s+/)])].join(" "):r&&(r=r.trim().split(/\s+/).join(" ")),i||r||!t||(i=t),{id:n,"aria-label":i,"aria-labelledby":r}}},56804:function(e,t,n){"use strict";n.d(t,{PS:function(){return l},Q3:function(){return u},tL:function(){return s}});var a=n(2265);let i={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},r={...i,customError:!0,valid:!1},l={isInvalid:!1,validationDetails:i,validationErrors:[]},o=(0,a.createContext)({}),s="__formValidationState"+Date.now();function u(e){if(e[s]){let{realtimeValidation:t,displayValidation:n,updateValidation:a,resetValidation:i,commitValidation:r}=e[s];return{realtimeValidation:t,displayValidation:n,updateValidation:a,resetValidation:i,commitValidation:r}}return function(e){let{isInvalid:t,validationState:n,name:i,value:s,builtinValidation:u,validate:f,validationBehavior:m="aria"}=e;n&&(t||(t="invalid"===n));let p=void 0!==t?{isInvalid:t,validationErrors:[],validationDetails:r}:null,h=(0,a.useMemo)(()=>d(function(e,t){if("function"==typeof e){let n=e(t);if(n&&"boolean"!=typeof n)return c(n)}return[]}(f,s)),[f,s]);(null==u?void 0:u.validationDetails.valid)&&(u=null);let g=(0,a.useContext)(o),b=(0,a.useMemo)(()=>i?Array.isArray(i)?i.flatMap(e=>c(g[e])):c(g[i]):[],[g,i]),[x,y]=(0,a.useState)(g),[E,j]=(0,a.useState)(!1);g!==x&&(y(g),j(!1));let S=(0,a.useMemo)(()=>d(E?[]:b),[E,b]),w=(0,a.useRef)(l),[V,_]=(0,a.useState)(l),M=(0,a.useRef)(l),[I,P]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(!I)return;P(!1);let e=h||u||w.current;v(e,M.current)||(M.current=e,_(e))}),{realtimeValidation:p||S||h||u||l,displayValidation:"native"===m?p||S||V:p||S||h||u||V,updateValidation(e){"aria"!==m||v(V,e)?w.current=e:_(e)},resetValidation(){v(l,M.current)||(M.current=l,_(l)),"native"===m&&P(!1),j(!0)},commitValidation(){"native"===m&&P(!0),j(!0)}}}(e)}function c(e){return e?Array.isArray(e)?e:[e]:[]}function d(e){return e.length?{isInvalid:!0,validationErrors:e,validationDetails:r}:null}function v(e,t){return e===t||e&&t&&e.isInvalid===t.isInvalid&&e.validationErrors.length===t.validationErrors.length&&e.validationErrors.every((e,n)=>e===t.validationErrors[n])&&Object.entries(e.validationDetails).every(([e,n])=>t.validationDetails[e]===n)}},39099:function(e,t,n){"use strict";n.d(t,{Ue:function(){return v}});let a=e=>{let t;let n=new Set,a=(e,a)=>{let i="function"==typeof e?e(t):e;if(!Object.is(i,t)){let e=t;t=(null!=a?a:"object"!=typeof i||null===i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,r={setState:a,getState:i,getInitialState:()=>l,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},l=t=e(a,i,r);return r},i=e=>e?a(e):a;var r=n(2265),l=n(35006);let{useDebugValue:o}=r,{useSyncExternalStoreWithSelector:s}=l,u=!1,c=e=>e,d=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");let t="function"==typeof e?i(e):e,n=(e,n)=>(function(e,t=c,n){n&&!u&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),u=!0);let a=s(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return o(a),a})(t,e,n);return Object.assign(n,t),n},v=e=>e?d(e):d}},function(e){e.O(0,[6051,4175,7570,1298,6795,2971,7023,1744],function(){return e(e.s=40942)}),_N_E=e.O()}]);