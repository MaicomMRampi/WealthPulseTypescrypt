(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9981],{2845:function(e,t,s){Promise.resolve().then(s.bind(s,9546))},9546:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return N}});var a=s(57437),n=s(2265),r=s(77148),i=s(29629),l=s(9139),c=s(964),o=s(93908),d=s(71272),x=s(26249),u=s(80665),h=s(81313),j=s(18554),m=s(84465),p=s(19675),f=s(99990);function N(){let{tokenUsuario:e}=(0,h.Z)(),[t,s]=(0,n.useState)([]),[N,g]=(0,n.useState)([]),[k,v]=(0,n.useState)(!1),[b,C]=(0,n.useState)(),[y,L]=(0,n.useState)(),w=async()=>{if(e)try{let t=await u.h.get("/buscanomeacao",{params:{id:null==e?void 0:e.id}});s(t.data)}catch(e){}},E=async()=>{if(e)try{let t=await u.h.get("/buscanomefundonovo",{params:{id:null==e?void 0:e.id}});g(t.data)}catch(e){}};(0,n.useEffect)(()=>{w(),E()},[]);let A=(e,t)=>{C(t),L(e),v(!0)},D=async t=>{if(e)try{if(1==b){let s=await u.h.delete("/deletanomefundonovo",{data:{id:null==e?void 0:e.id,idBanco:t}});200==s.status&&setTimeout(()=>{C(0),v(!1),L(" ")})}else if(2==b){let s=await u.h.delete("/deletanomeacao",{data:{id:null==e?void 0:e.id,idBanco:t}});200==s.status&&setTimeout(()=>{C(0),v(!1),L(" ")})}w(),E()}catch(e){}};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"w-[95%] mx-auto",children:(0,a.jsxs)("div",{className:"w-full  grid grid-cols-1  md:grid-cols-2 gap-3 pt-3",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xl font-semibold text-center",children:"Nome fundos imobili\xe1rios"}),(0,a.jsxs)(r.b,{"aria-label":"Example static collection table",children:[(0,a.jsxs)(i.J,{children:[(0,a.jsx)(l.j,{children:"ID"}),(0,a.jsx)(l.j,{children:"Nome"}),(0,a.jsx)(l.j,{children:"Ações"})]}),(0,a.jsx)(c.y,{children:N.map(e=>(0,a.jsxs)(o.g,{children:[(0,a.jsx)(d.X,{children:e.id}),(0,a.jsx)(d.X,{children:e.nomeFundo}),(0,a.jsx)(d.X,{children:(0,a.jsxs)("div",{className:"flex flex-row gap-3",children:[(0,a.jsx)(x.e,{className:"",content:"Mais detalhes",children:(0,a.jsx)("span",{className:"text-lg text-default-400 cursor-pointer active:opacity-50",children:(0,a.jsx)(p.Uf_,{className:"text-buttonAzulClaro"})})}),(0,a.jsx)(x.e,{className:"",content:"Inativar",children:(0,a.jsx)("span",{className:"text-lg text-default-400 cursor-pointer active:opacity-50",children:(0,a.jsx)(j.pyx,{className:"text-iconeDeBloquiar"})})}),(0,a.jsx)(x.e,{className:"",color:"danger",content:"Deletar",children:(0,a.jsx)("span",{className:"text-lg text-danger cursor-pointer active:opacity-50",children:(0,a.jsx)(m.p,{onClick:()=>A(e.id,1),className:"text-red-500"})})})]})})]},e.id))})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xl font-semibold text-center",children:"Nome A\xe7\xf5es"}),(0,a.jsxs)(r.b,{"aria-label":"Example static collection table",children:[(0,a.jsxs)(i.J,{children:[(0,a.jsx)(l.j,{children:"ID"}),(0,a.jsx)(l.j,{children:"Nome"}),(0,a.jsx)(l.j,{children:"Ações"})]}),(0,a.jsx)(c.y,{children:t.map(e=>(0,a.jsxs)(o.g,{children:[(0,a.jsx)(d.X,{children:e.id}),(0,a.jsx)(d.X,{children:e.nomeAcao}),(0,a.jsx)(d.X,{children:(0,a.jsxs)("div",{className:"flex flex-row gap-3",children:[(0,a.jsx)(x.e,{className:"",content:"Mais detalhes",children:(0,a.jsx)("span",{className:"text-lg text-default-400 cursor-pointer active:opacity-50",children:(0,a.jsx)(p.Uf_,{className:"text-buttonAzulClaro"})})}),(0,a.jsx)(x.e,{className:"",content:"Inativar",children:(0,a.jsx)("span",{className:"text-lg text-default-400 cursor-pointer active:opacity-50",children:(0,a.jsx)(j.pyx,{className:"text-iconeDeBloquiar"})})}),(0,a.jsx)(x.e,{className:"",color:"danger",content:"Deletar",children:(0,a.jsx)("span",{className:"text-lg text-danger cursor-pointer active:opacity-50",children:(0,a.jsx)(m.p,{onClick:()=>A(e.id,2),className:"text-red-500"})})})]})})]},e.id))})]})]})]})}),(0,a.jsx)(f.Z,{isOpen:k,onClose:()=>v(!1),id:y,confirmaEsclusao:()=>D(y)})]})}},99990:function(e,t,s){"use strict";s.d(t,{Z:function(){return d}});var a=s(57437);s(2265);var n=s(84603),r=s(2429),i=s(95256),l=s(81887),c=s(47971),o=s(93641);function d(e){let{isOpen:t,onClose:s,confirmaEsclusao:d,message:x,id:u}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.R,{className:"bg-black rounded-lg",backdrop:"opaque",isOpen:t,onClose:s,hideCloseButton:!0,children:(0,a.jsx)(r.A,{children:()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.k,{className:"flex flex-col w-full font-extrabold bg-[#C20E4D]",children:"Deseja fazer a exclus\xe3o"}),(0,a.jsx)(l.I,{}),(0,a.jsxs)(c.R,{className:"gap-6",children:[(0,a.jsx)(o.A,{variant:"light",className:"text-green-500",onPress:s,children:"Cancelar"}),(0,a.jsx)(o.A,{variant:"ghost",color:"danger",onClick:d,className:"text-red-500",children:"Excluir"})]}),(0,a.jsx)("p",{className:"text-green-700",children:x||""})]})})})})}},81313:function(e,t,s){"use strict";let a=(0,s(39099).Ue)(e=>({tokenUsuario:null,setTokenUsuario:t=>e({tokenUsuario:t})}));t.Z=a},84465:function(e,t,s){"use strict";s.d(t,{p:function(){return n}});var a=s(57437);s(2265);let n=e=>(0,a.jsxs)("svg",{"aria-hidden":"true",fill:"none",focusable:"false",height:"1em",role:"presentation",viewBox:"0 0 20 20",width:"1em",...e,children:[(0,a.jsx)("path",{d:"M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5}),(0,a.jsx)("path",{d:"M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5}),(0,a.jsx)("path",{d:"M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5}),(0,a.jsx)("path",{d:"M8.60834 13.75H11.3833",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5}),(0,a.jsx)("path",{d:"M7.91669 10.4167H12.0834",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5})]})},80665:function(e,t,s){"use strict";s.d(t,{h:function(){return a}});let a=s(38472).Z.create({baseURL:"https://fluxodocapital.com.br/api"})},95256:function(e,t,s){"use strict";s.d(t,{k:function(){return d}});var a=s(8621),n=s(2265),r=s(55971),i=s(26242),l=s(65263),c=s(57437),o=(0,r.Gp)((e,t)=>{let{as:s,children:r,className:o,...d}=e,{slots:x,classNames:u,headerId:h,setHeaderMounted:j}=(0,a.v)(),m=(0,i.gy)(t);return(0,n.useEffect)(()=>(j(!0),()=>j(!1)),[j]),(0,c.jsx)(s||"header",{ref:m,className:x.header({class:(0,l.W)(null==u?void 0:u.header,o)}),id:h,...d,children:r})});o.displayName="NextUI.ModalHeader";var d=o}},function(e){e.O(0,[5280,7675,4175,6310,7570,3641,5604,5988,4351,8230,3516,6501,1734,6773,6249,2971,7023,1744],function(){return e(e.s=2845)}),_N_E=e.O()}]);