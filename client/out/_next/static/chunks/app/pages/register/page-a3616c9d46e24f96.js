(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6430,7655],{45535:function(e,a,i){Promise.resolve().then(i.bind(i,25749))},16463:function(e,a,i){"use strict";var t=i(71169);i.o(t,"usePathname")&&i.d(a,{usePathname:function(){return t.usePathname}}),i.o(t,"useRouter")&&i.d(a,{useRouter:function(){return t.useRouter}})},25749:function(e,a,i){"use strict";i.r(a),i.d(a,{default:function(){return p}});var t=i(57437),r=i(2265),n=i(17821),l=i(16463),s=i(81227),o=i(42552),d=i(89470),u=i(93641),c=i(14245);let m={nome:"",cpf:"",email:"",senha:"",confirmaSenha:""},f=c.Ry().shape({nome:c.Z_().required("O Nome \xe9 Obrigat\xf3rio"),cpf:c.Z_().required("O CPF \xe9 obrigat\xf3rio"),senha:c.Z_().min(4,"Digite uma Senha Maior").required("Campo Obrigat\xf3rio"),email:c.Z_().email("Digite um E-mail V\xe1lido").required("Campo E-mail Obrigat\xf3rio"),confirmaSenha:c.Z_().oneOf([c.iH("senha"),void 0],"As senhas n\xe3o coincidem").required("Campo Obrigat\xf3rio")});var v=i(80665),h=i(87138),g=i(30050);function p(){let[e,a]=(0,r.useState)(""),[i,c]=(0,r.useState)(""),p=(0,l.useRouter)(),b=async e=>{try{let i=await v.h.post("/postusers",e);a(i.data.message),200===i.status?(c("success"),setTimeout(()=>{a(""),p.push("/pages/login")},4e3)):a("Erro ao Criar Usu\xe1rio")}catch(e){c("error"),a("Erro ao Criar Usu\xe1rio"),setTimeout(()=>{a(""),c("error")},4e3)}};return(0,t.jsx)("div",{className:"w-full min-h-screen bg-cover bg-[url('/imagens/rm378-09.jpg')] md:bg-[url('/imagens/register2.png')] flex  xs:justify-center items-center  md:justify-end md:items-center md:pr-32",children:(0,t.jsx)("div",{className:"p-8 rounded-lg shadow-lg w-full max-w-md",children:(0,t.jsx)(n.J9,{initialValues:m,validationSchema:f,onSubmit:b,children:a=>{let{values:r,errors:n,handleChange:l,handleSubmit:c,setFieldValue:m,touched:f}=a;return(0,t.jsxs)("form",{onSubmit:c,children:[(0,t.jsx)("div",{className:"flex justify-center items-center mb-4",children:(0,t.jsx)(o.h,{src:"/login.jpg",className:"w-20 h-20 text-large"})}),(0,t.jsx)("h1",{className:"text-center text-2xl font-bold mb-4",children:"Registre-se Aqui!"}),(0,t.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,t.jsx)(d.Y,{autoComplete:"off",errorMessage:f.nome&&n.nome,isInvalid:!!(f.nome&&n.nome),fullWidth:!0,onChange:l,name:"nome",variant:"bordered",placeholder:"Digite seu Nome",value:r.nome}),(0,t.jsx)(d.Y,{autoComplete:"off",errorMessage:f.cpf&&n.cpf,fullWidth:!0,isInvalid:!!(f.cpf&&n.cpf),onChange:e=>{let{name:a,value:i}=e.target;m(a,(0,s.VL)(i))},name:"cpf",variant:"bordered",placeholder:"Digite seu CPF",value:r.cpf,maxLength:14}),(0,t.jsx)(d.Y,{autoComplete:"off",isInvalid:!!(f.email&&n.email),errorMessage:f.email&&n.email,fullWidth:!0,onChange:l,name:"email",variant:"bordered",placeholder:"Digite seu e-mail",value:r.email}),(0,t.jsx)(d.Y,{autoComplete:"off",name:"senha",errorMessage:f.senha&&n.senha,fullWidth:!0,isInvalid:!!(f.senha&&n.senha),onChange:l,variant:"bordered",placeholder:"Digite uma Senha",type:"password",value:r.senha}),(0,t.jsx)(d.Y,{autoComplete:"off",errorMessage:f.confirmaSenha&&n.confirmaSenha,fullWidth:!0,isInvalid:!!(f.confirmaSenha&&n.confirmaSenha),onChange:l,name:"confirmaSenha",variant:"bordered",placeholder:"Confirme sua Senha",type:"password",value:r.confirmaSenha}),(0,t.jsx)(u.A,{fullWidth:!0,type:"submit",variant:"solid",color:"success",children:"Cadastrar"}),(0,t.jsx)("div",{children:e?(0,t.jsx)(g.Z,{severity:i,children:e}):null}),(0,t.jsx)("div",{className:"grid grid-cols-1 gap-2",children:(0,t.jsx)("div",{className:"text-left",children:(0,t.jsx)(h.default,{href:"/pages/login",children:"J\xe1 \xe9 usu\xe1rio? Acesse sua conta aqui"})})})]})]})}})})})}},81227:function(e,a,i){"use strict";function t(e){return e&&(e=(e=(e=(e=e.replace(/\D/g,"")).replace(/(\d{3})(\d)/,"$1.$2")).replace(/(\d{3})(\d)/,"$1.$2")).replace(/(\d{3})(\d{1,2})$/,"$1-$2")),e}function r(e){return e&&(e=(e=(e=(parseInt(e=e.replace(/\D/g,""))/100).toFixed(2)).replace(".",",")).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1.")),e}function n(e){return(e=e.replace(/\D/g,"")).split("").reverse().join("").match(/.{1,3}/g).join(".").split("").reverse().join("")}i.d(a,{VL:function(){return t},e:function(){return r},mE:function(){return n}})},80665:function(e,a,i){"use strict";i.d(a,{h:function(){return t}});let t=i(38472).Z.create({baseURL:"https://fluxodocapital.com.br/api"})},42552:function(e,a,i){"use strict";i.d(a,{h:function(){return w}});var t=i(57437),r=()=>(0,t.jsxs)("svg",{"aria-hidden":"true",fill:"none",height:"80%",role:"presentation",viewBox:"0 0 24 24",width:"80%",children:[(0,t.jsx)("path",{d:"M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z",fill:"currentColor"}),(0,t.jsx)("path",{d:"M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z",fill:"currentColor"})]}),[n,l]=(0,i(37561).k)({name:"AvatarGroupContext",strict:!1}),s=i(33222),o=i(76767),d=i(21616),u=(0,o.tv)({slots:{base:["flex","relative","justify-center","items-center","box-border","overflow-hidden","align-middle","text-white","z-0",...d.Dh],img:["flex","object-cover","w-full","h-full","transition-opacity","!duration-500","opacity-0","data-[loaded=true]:opacity-100"],fallback:[...d.z6,"flex","items-center","justify-center"],name:[...d.z6,"font-normal","text-center","text-inherit"],icon:[...d.z6,"flex","items-center","justify-center","text-inherit","w-full","h-full"]},variants:{size:{sm:{base:"w-8 h-8 text-tiny"},md:{base:"w-10 h-10 text-tiny"},lg:{base:"w-14 h-14 text-small"}},color:{default:{base:s.J.solid.default},primary:{base:s.J.solid.primary},secondary:{base:s.J.solid.secondary},success:{base:s.J.solid.success},warning:{base:s.J.solid.warning},danger:{base:s.J.solid.danger}},radius:{none:{base:"rounded-none"},sm:{base:"rounded-small"},md:{base:"rounded-medium"},lg:{base:"rounded-large"},full:{base:"rounded-full"}},isBordered:{true:{base:"ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark"}},isDisabled:{true:{base:"opacity-disabled"}},isInGroup:{true:{base:["-ms-2 data-[hover=true]:-translate-x-3 rtl:data-[hover=true]:translate-x-3 transition-transform","data-[focus-visible=true]:-translate-x-3 rtl:data-[focus-visible=true]:translate-x-3"]}},isInGridGroup:{true:{base:"m-0 data-[hover=true]:translate-x-0"}},disableAnimation:{true:{base:"transition-none",img:"transition-none"},false:{}}},defaultVariants:{size:"md",color:"default",radius:"full"},compoundVariants:[{color:"default",isBordered:!0,class:{base:"ring-default"}},{color:"primary",isBordered:!0,class:{base:"ring-primary"}},{color:"secondary",isBordered:!0,class:{base:"ring-secondary"}},{color:"success",isBordered:!0,class:{base:"ring-success"}},{color:"warning",isBordered:!0,class:{base:"ring-warning"}},{color:"danger",isBordered:!0,class:{base:"ring-danger"}}]});(0,o.tv)({slots:{base:"flex items-center justify-center h-auto w-max",count:"hover:-translate-x-0"},variants:{isGrid:{true:"inline-grid grid-cols-4 gap-3"}}});var c=i(12094),m=i(277),f=i(26242),v=i(75300),h=i(31887),g=i(65263),p=i(53640),b=i(13389),x=i(2265),y=i(46896),j=i(83892),C=(0,i(55971).Gp)((e,a)=>{let{Component:i,ImgComponent:n,src:s,icon:o=(0,t.jsx)(r,{}),alt:d,classNames:C,slots:w,name:V,showFallback:E,fallback:M,getInitials:S,getAvatarProps:I,getImageProps:D}=function(){var e,a,i,t,r,n,s;let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},d=(0,c.w)(),C=l(),w=!!C,{as:V,ref:E,src:M,name:S,icon:I,classNames:D,fallback:N,alt:k=S||"avatar",imgRef:B,color:A=null!=(e=null==C?void 0:C.color)?e:"default",radius:L=null!=(a=null==C?void 0:C.radius)?a:"full",size:O=null!=(i=null==C?void 0:C.size)?i:"md",isBordered:_=null!=(t=null==C?void 0:C.isBordered)&&t,isDisabled:P=null!=(r=null==C?void 0:C.isDisabled)&&r,isFocusable:G=!1,getInitials:R=h.e,ignoreFallback:z=!1,showFallback:Z=!1,ImgComponent:J="img",imgProps:W,className:$,onError:q,...U}=o,F=V||"span",Y=(0,f.gy)(E),Q=(0,f.gy)(B),{isFocusVisible:T,isFocused:H,focusProps:X}=(0,b.F)(),{isHovered:K,hoverProps:ee}=(0,j.X)({isDisabled:P}),ea=null!=(s=null!=(n=o.disableAnimation)?n:null==d?void 0:d.disableAnimation)&&s,ei="loaded"===function(e={}){let{loading:a,src:i,srcSet:t,onLoad:r,onError:n,crossOrigin:l,sizes:s,ignoreFallback:o}=e,[d,u]=(0,x.useState)("pending");(0,x.useEffect)(()=>{u(i?"loading":"pending")},[i]);let c=(0,x.useRef)(),m=(0,x.useCallback)(()=>{if(!i)return;f();let e=new Image;e.src=i,l&&(e.crossOrigin=l),t&&(e.srcset=t),s&&(e.sizes=s),a&&(e.loading=a),e.onload=e=>{f(),u("loaded"),null==r||r(e)},e.onerror=e=>{f(),u("failed"),null==n||n(e)},c.current=e},[i,l,t,s,r,n,a]),f=()=>{c.current&&(c.current.onload=null,c.current.onerror=null,c.current=null)};return(0,y.G)(()=>{if(!o)return"loading"===d&&m(),()=>{f()}},[d,m,o]),o?"loaded":d}({src:M,onError:q,ignoreFallback:z}),et="string"==typeof J,er=(!M||!ei)&&Z,en=(0,x.useMemo)(()=>{var e;return u({color:A,radius:L,size:O,isBordered:_,isDisabled:P,isInGroup:w,disableAnimation:ea,isInGridGroup:null!=(e=null==C?void 0:C.isGrid)&&e})},[A,L,O,_,P,ea,w,null==C?void 0:C.isGrid]),el=(0,g.W)(null==D?void 0:D.base,$),es=(0,x.useMemo)(()=>G||"button"===V,[G,V]),eo=(0,x.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{ref:Y,tabIndex:es?0:-1,"data-hover":(0,p.PB)(K),"data-focus":(0,p.PB)(H),"data-focus-visible":(0,p.PB)(T),className:en.base({class:(0,g.W)(el,null==e?void 0:e.className)}),...(0,m.d)(U,ee,es?X:{})}},[es,en,el,X,U]),ed=(0,x.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{ref:Q,src:M,disableAnimation:ea,"data-loaded":(0,p.PB)(ei),className:en.img({class:null==D?void 0:D.img}),...(0,m.d)(W,e,(0,v.z)({disableAnimation:ea},{enabled:et}))}},[en,ei,W,ea,M,Q,et]);return{Component:F,ImgComponent:J,src:M,alt:k,icon:I,name:S,imgRef:Q,slots:en,classNames:D,fallback:N,isImgLoaded:ei,showFallback:er,ignoreFallback:z,getInitials:R,getAvatarProps:eo,getImageProps:ed}}({...e,ref:a}),N=(0,x.useMemo)(()=>!E&&s?null:M?(0,t.jsx)("div",{"aria-label":d,className:w.fallback({class:null==C?void 0:C.fallback}),role:"img",children:M}):V?(0,t.jsx)("span",{"aria-label":d,className:w.name({class:null==C?void 0:C.name}),role:"img",children:S(V)}):(0,t.jsx)("span",{"aria-label":d,className:w.icon({class:null==C?void 0:C.icon}),role:"img",children:o}),[E,s,M,V,C]);return(0,t.jsxs)(i,{...I(),children:[s&&(0,t.jsx)(n,{...D(),alt:d}),N]})});C.displayName="NextUI.Avatar";var w=C},38756:function(e,a,i){"use strict";i.d(a,{Q:function(){return s}});var t=i(2265),r=i(95729),n=i(79248),l=i(7353);function s(e,a,i){let{validationBehavior:s,focus:o}=e;(0,n.b)(()=>{if("native"===s&&(null==i?void 0:i.current)){var e;let t,r=a.realtimeValidation.isInvalid?a.realtimeValidation.validationErrors.join(" ")||"Invalid value.":"";i.current.setCustomValidity(r),i.current.hasAttribute("title")||(i.current.title=""),a.realtimeValidation.isInvalid||a.updateValidation({isInvalid:!(e=i.current).validity.valid,validationDetails:{badInput:(t=e.validity).badInput,customError:t.customError,patternMismatch:t.patternMismatch,rangeOverflow:t.rangeOverflow,rangeUnderflow:t.rangeUnderflow,stepMismatch:t.stepMismatch,tooLong:t.tooLong,tooShort:t.tooShort,typeMismatch:t.typeMismatch,valueMissing:t.valueMissing,valid:t.valid},validationErrors:e.validationMessage?[e.validationMessage]:[]})}});let d=(0,l.i)(()=>{a.resetValidation()}),u=(0,l.i)(e=>{var t,n;a.displayValidation.isInvalid||a.commitValidation();let l=null==i?void 0:null===(t=i.current)||void 0===t?void 0:t.form;!e.defaultPrevented&&i&&l&&function(e){for(let a=0;a<e.elements.length;a++){let i=e.elements[a];if(!i.validity.valid)return i}return null}(l)===i.current&&(o?o():null===(n=i.current)||void 0===n||n.focus(),(0,r._w)("keyboard")),e.preventDefault()}),c=(0,l.i)(()=>{a.commitValidation()});(0,t.useEffect)(()=>{let e=null==i?void 0:i.current;if(!e)return;let a=e.form;return e.addEventListener("invalid",u),e.addEventListener("change",c),null==a||a.addEventListener("reset",d),()=>{e.removeEventListener("invalid",u),e.removeEventListener("change",c),null==a||a.removeEventListener("reset",d)}},[i,u,c,d,s])}},37408:function(e,a,i){"use strict";i.d(a,{b:function(){return r}});var t=i(80612);function r(e,a){let{id:i,"aria-label":r,"aria-labelledby":n}=e;return i=(0,t.Me)(i),n&&r?n=[...new Set([i,...n.trim().split(/\s+/)])].join(" "):n&&(n=n.trim().split(/\s+/).join(" ")),r||n||!a||(r=a),{id:i,"aria-label":r,"aria-labelledby":n}}},56804:function(e,a,i){"use strict";i.d(a,{PS:function(){return l},Q3:function(){return d},tL:function(){return o}});var t=i(2265);let r={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},n={...r,customError:!0,valid:!1},l={isInvalid:!1,validationDetails:r,validationErrors:[]},s=(0,t.createContext)({}),o="__formValidationState"+Date.now();function d(e){if(e[o]){let{realtimeValidation:a,displayValidation:i,updateValidation:t,resetValidation:r,commitValidation:n}=e[o];return{realtimeValidation:a,displayValidation:i,updateValidation:t,resetValidation:r,commitValidation:n}}return function(e){let{isInvalid:a,validationState:i,name:r,value:o,builtinValidation:d,validate:f,validationBehavior:v="aria"}=e;i&&(a||(a="invalid"===i));let h=void 0!==a?{isInvalid:a,validationErrors:[],validationDetails:n}:null,g=(0,t.useMemo)(()=>c(function(e,a){if("function"==typeof e){let i=e(a);if(i&&"boolean"!=typeof i)return u(i)}return[]}(f,o)),[f,o]);(null==d?void 0:d.validationDetails.valid)&&(d=null);let p=(0,t.useContext)(s),b=(0,t.useMemo)(()=>r?Array.isArray(r)?r.flatMap(e=>u(p[e])):u(p[r]):[],[p,r]),[x,y]=(0,t.useState)(p),[j,C]=(0,t.useState)(!1);p!==x&&(y(p),C(!1));let w=(0,t.useMemo)(()=>c(j?[]:b),[j,b]),V=(0,t.useRef)(l),[E,M]=(0,t.useState)(l),S=(0,t.useRef)(l),[I,D]=(0,t.useState)(!1);return(0,t.useEffect)(()=>{if(!I)return;D(!1);let e=g||d||V.current;m(e,S.current)||(S.current=e,M(e))}),{realtimeValidation:h||w||g||d||l,displayValidation:"native"===v?h||w||E:h||w||g||d||E,updateValidation(e){"aria"!==v||m(E,e)?V.current=e:M(e)},resetValidation(){m(l,S.current)||(S.current=l,M(l)),"native"===v&&D(!1),C(!0)},commitValidation(){"native"===v&&D(!0),C(!0)}}}(e)}function u(e){return e?Array.isArray(e)?e:[e]:[]}function c(e){return e.length?{isInvalid:!0,validationErrors:e,validationDetails:n}:null}function m(e,a){return e===a||e&&a&&e.isInvalid===a.isInvalid&&e.validationErrors.length===a.validationErrors.length&&e.validationErrors.every((e,i)=>e===a.validationErrors[i])&&Object.entries(e.validationDetails).every(([e,i])=>a.validationDetails[e]===i)}}},function(e){e.O(0,[4175,6310,7570,3641,7822,1298,50,7138,6843,2971,7023,1744],function(){return e(e.s=45535)}),_N_E=e.O()}]);