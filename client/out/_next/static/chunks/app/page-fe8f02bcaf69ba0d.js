(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{99685:function(e,t,a){Promise.resolve().then(a.bind(a,45129))},45129:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return V}});var s=a(57437),l=a(2265),i=a(72354),n=a(40884),r=a(55448),c=a(85097),d=a(81313),o=a(11183),u=a(62187),x=a(80665),m=a(79512),f=a(87138);function h(){let{theme:e,setTheme:t}=(0,m.F)(),{visibility:a}=(0,o.Z)(),{tokenUsuario:h}=(0,d.Z)(),[j,g]=(0,l.useState)([]),p=async()=>{h&&g((await x.h.get("/meusinvestimentos",{params:{id:null==h?void 0:h.id}})).data)};(0,l.useEffect)(()=>{p()},[]);let b=j&&j.reduce((e,t)=>e+t.valorInvestido,0);return(0,s.jsx)(i.w,{fullWidth:!0,className:"bg-BgCardPadrao p-4 text-textCards",children:(0,s.jsxs)(f.default,{href:"/pages/investimentos/listainvestimento",children:[(0,s.jsx)(n.u,{className:"font-semibold",children:"Total investidos"}),(0,s.jsx)(r.G,{children:(0,s.jsxs)("p",{className:"font-semibold text-2xl flex justify-between",children:[a?(0,u.Z)(b):"****"," ",(0,s.jsx)(c.WnF,{size:40,className:"text-green-500"})]})})]})})}var j=a(16356);function g(){let{visibility:e}=(0,o.Z)(),{tokenUsuario:t}=(0,d.Z)(),[a,c]=(0,l.useState)([]),m=async()=>{t&&c((await x.h.get("/buscacontamesatual",{params:{id:null==t?void 0:t.id}})).data)};(0,l.useEffect)(()=>{m()},[]);let h=a&&a.reduce((e,t)=>e+t.valor,0);return(0,s.jsx)(f.default,{href:"/pages/contas/listaconta",children:(0,s.jsxs)(i.w,{fullWidth:!0,className:"bg-BgCardPadrao p-4 text-textCards",children:[(0,s.jsx)(n.u,{className:"font-semibold",children:"Contas no m\xeas"}),(0,s.jsx)(r.G,{children:(0,s.jsxs)("p",{className:"font-semibold text-2xl flex justify-between",children:[e?(0,u.Z)(h):"****"," ",(0,s.jsx)(j.TKM,{size:40,className:"text-red-500 "})]})})]})})}var p=a(75027);function b(){let{visibility:e}=(0,o.Z)(),{tokenUsuario:t}=(0,d.Z)(),[a,c]=(0,l.useState)([]),m=async()=>{t&&c((await x.h.get("/buscadespesamesatual",{params:{email:null==t?void 0:t.id}})).data)};(0,l.useEffect)(()=>{m()},[]);let h=a&&a.reduce((e,t)=>e+t.valorGasto,0);return(0,s.jsx)(i.w,{fullWidth:!0,className:"bg-BgCardPadrao p-4 text-textCards w-full",children:(0,s.jsxs)(f.default,{href:"/pages/despesas/listadespesas",children:[(0,s.jsx)(n.u,{className:"font-semibold",children:"Despesas m\xeas atual"}),(0,s.jsx)(r.G,{children:(0,s.jsxs)("p",{className:"font-semibold text-2xl flex justify-between",children:[e?(0,u.Z)(h):"****"," ",(0,s.jsx)(p.CtB,{size:40,className:"text-orange-500"})]})})]})})}var v=a(80590);function N(){let{visibility:e}=(0,o.Z)(),{tokenUsuario:t}=(0,d.Z)(),[a,n]=(0,l.useState)([]),c=async()=>{n((await x.h.get("/buscacontaproximavencer",{params:{id:null==t?void 0:t.id}})).data)};return(0,l.useEffect)(()=>{c()},[t]),(0,s.jsx)(f.default,{href:"/pages/contas/listaconta",children:(0,s.jsxs)(i.w,{fullWidth:!0,className:"bg-BgCardPadrao w-full h-full p-4 text-textCards flex items-center",children:[(0,s.jsx)("h2",{className:"font-semibold text-center",children:"Contas a vencer"}),(0,s.jsx)(r.G,{children:a.length>0?(0,s.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",children:a.map((t,a)=>(0,s.jsx)(i.w,{className:"w-full",children:(0,s.jsxs)(r.G,{className:"space-y-2",children:[(0,s.jsx)("h3",{className:"text-lg font-bold",children:t.estabelecimento}),(0,s.jsx)("p",{className:"text-base text-green-400",children:e&&t.valor?(0,u.Z)(t.valor):"****"}),(0,s.jsx)("p",{className:"text-sm text-gray-300",children:(0,v.Z)(t.dataVencimento)})]})},a))}):(0,s.jsx)("p",{className:"text-gray-400 text-center font-semibold",children:"Nenhuma conta a vencer dentro de 10 dias"})})]})})}var y=a(93641),w=a(35231),Z=a(25974),C=a(54142),k=a(2842),E=a(9542),P=a(85475),S=a(45745),B=a(7476),F=a(16463);function R(){let e=(0,F.useRouter)(),{visibility:t}=(0,o.Z)(),{tokenUsuario:a}=(0,d.Z)(),[n,r]=(0,l.useState)([]),c=async()=>{r((await x.h.get("/detalhespatrimoniohome",{params:{id:null==a?void 0:a.id}})).data)};(0,l.useEffect)(()=>{(null==a?void 0:a.id)&&c()},[a]);let m=()=>{e.push("/pages/patrimonio/cadastropatrimonio")};return(0,s.jsxs)(i.w,{className:"bg-BgCardPadrao shadow-lg rounded-lg p-6 h-[400px] flex flex-col justify-between transition-all duration-300 md:col-span-2",children:[(0,s.jsx)("h2",{className:"font-bold text-center text-lg  mb-4",children:"Meus Patrim\xf4nios"}),(0,s.jsx)("div",{className:"w-full h-full flex items-center justify-center",children:n.length>0?(0,s.jsx)(w.h,{width:"100%",height:"100%",children:(0,s.jsxs)(Z.v,{data:n,margin:{top:20,right:30,left:0,bottom:5},children:[(0,s.jsx)(C.q,{strokeDasharray:"3 3",stroke:"#ddd"}),(0,s.jsx)(k.K,{dataKey:"nomePatrimonio",tick:{fill:"#6b7280"}}),(0,s.jsx)(E.B,{tickFormatter:e=>(0,u.Z)(e),width:100,tick:{fill:"#6b7280"}}),(0,s.jsx)(P.u,{contentStyle:{backgroundColor:"#1f2937",borderRadius:"8px",border:"none",color:"#fff"},formatter:e=>(0,u.Z)(e),cursor:{fill:"rgba(0, 0, 0, 0.1)"}}),(0,s.jsx)(S.$,{barSize:40,dataKey:"valorPatrimonio",fill:"#0e43fb",animationBegin:0,animationDuration:1500})]})}):(0,s.jsxs)("div",{className:"text-center flex flex-col items-center justify-center space-y-4",children:[(0,s.jsx)(B.zFh,{className:"text-6xl text-gray-400"}),(0,s.jsx)("p",{className:"text-gray-500 text-lg font-medium",children:"Nenhum patrim\xf4nio inserido"}),(0,s.jsx)(y.A,{color:"primary",onClick:()=>m(),children:"Adicionar Patrim\xf4nio"})]})})]})}var U=a(23909),D=a(85369),W=a(68295),G=a(20153);function q(){let{visibility:e}=(0,o.Z)(),{tokenUsuario:t}=(0,d.Z)(),[a,n]=(0,l.useState)([]),r=e=>e.filter(e=>"fii"===e.tipo),c=async()=>{if(t)try{let e=await x.h.get("/meusinvestimentos",{params:{id:null==t?void 0:t.id}}),a=r(e.data);n(a)}catch(e){console.error("Erro ao buscar investimentos:",e)}};(0,l.useEffect)(()=>{c()},[t]);let u=Object.values(a.reduce((e,t)=>{let{nome:a,quantidade:s}=t;return e[a]?e[a].quantidade+=s:e[a]={nome:a,quantidade:s,tipo:t.tipo},e},{})).map(e=>({name:e.nome.length>0?e.nome:"Nenhum Fundo Cadastrado",quantidade:e.quantidade>0?e.quantidade:0})),m=u.length>0?u:[{name:"Sem dados",quantidade:1}],h=["#cb3cff","#0e43fb","#00c2ff","#FF8042"];return(0,s.jsx)(f.default,{href:"/pages/investimentos/listainvestimento",children:(0,s.jsxs)(i.w,{fullWidth:!0,className:"bg-BgCardPadrao p-4 text-textCards cursor-pointer",children:[(0,s.jsx)("h2",{className:"font-semibold text-center ",children:"Meus Fundos Imobili\xe1rios"}),(0,s.jsx)("div",{className:"w-full h-full flex flex-col items-center justify-center",children:(0,s.jsxs)(U.u,{width:400,height:400,children:[(0,s.jsx)(D.b,{data:m,cx:"50%",cy:"50%",innerRadius:60,outerRadius:80,fill:"#8884d8",paddingAngle:5,dataKey:"quantidade",children:m.map((e,t)=>(0,s.jsx)(W.b,{fill:h[t%h.length]},"cell-".concat(t)))}),(0,s.jsx)(P.u,{}),(0,s.jsx)(G.D,{layout:"vertical",align:"right",verticalAlign:"middle"})]})})]})})}var A=a(77148),K=a(29629),_=a(9139),z=a(964),M=a(93908),O=a(71272);function T(){let e=(0,F.useRouter)(),{visibility:t}=(0,o.Z)(),{tokenUsuario:a}=(0,d.Z)(),[n,r]=(0,l.useState)([]),c=async()=>{a&&r((await x.h.get("/buscadespesamesatual",{params:{email:null==a?void 0:a.id}})).data)};(0,l.useEffect)(()=>{c()},[]);let m=()=>{e.push("/pages/despesas/novadespesa")},h=n.sort((e,t)=>t.id-e.id);return(0,s.jsx)(f.default,{href:"/pages/despesas/listadespesa",children:(0,s.jsx)(i.w,{fullWidth:!0,className:"w-full h-full bg-BgCardPadrao rounded-lg shadow-md p-6 duration-75 ",children:0===n.length?(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center h-full text-center space-y-4",children:[(0,s.jsx)(B.NOg,{className:"text-6xl text-gray-400"}),(0,s.jsx)("p",{className:" text-lg font-medium",children:"Nenhuma despesa foi inserida ainda."}),(0,s.jsx)(y.A,{color:"primary",onClick:()=>m(),children:"Adicionar Despesa"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h2",{className:"font-semibold text-center text-lg mb-4",children:"\xdaltimas Despesas Inseridas"}),(0,s.jsxs)(A.b,{"aria-label":"Tabela de \xfaltimas despesas",fullWidth:!0,children:[(0,s.jsxs)(K.J,{children:[(0,s.jsx)(_.j,{children:"Categoria"}),(0,s.jsx)(_.j,{children:"Valor Gasto"})]}),(0,s.jsx)(z.y,{children:h&&h.slice(0,5).map((e,a)=>{var l;return(0,s.jsxs)(M.g,{children:[(0,s.jsx)(O.X,{children:null===(l=e.categoria.nomeCategoria)||void 0===l?void 0:l.toUpperCase()}),(0,s.jsx)(O.X,{children:t?(0,u.Z)(e.valorGasto):"****"})]},a)})})]})]})})})}var I=a(30276);function L(){let e=new Date,t=e.getMonth()+1,a=e.getFullYear(),n="".concat(a,"-").concat(t<10?"0".concat(t):t),{visibility:r}=(0,o.Z)(),{tokenUsuario:c}=(0,d.Z)(),[x,m]=(0,l.useState)({total:0,porcentagem:0,orcamentoUsuario:0}),[f,h]=(0,l.useState)(n);(0,l.useEffect)(()=>{(async()=>{try{let e=await (0,I.Z)(f,null==c?void 0:c.id);m(e)}catch(e){console.error("Erro ao buscar o or\xe7amento mensal:",e)}})()},[f,c]);let j=[{name:"Usado",value:x.total},{name:"Restante",value:x.orcamentoUsuario-x.total}],g=["#ff00007a","#0e43fb","#00c2ff","#FF8042"];return(0,s.jsxs)(i.w,{fullWidth:!0,className:"bg-BgCardPadrao p-4 text-textCards",children:[(0,s.jsx)("h2",{className:"font-semibold text-center",children:"Porcentagem gastos no m\xeas"}),(0,s.jsxs)("div",{className:"w-full h-full flex flex-col items-center justify-center",children:[(0,s.jsxs)(U.u,{width:200,height:200,children:[(0,s.jsx)(D.b,{data:j,cx:100,cy:100,innerRadius:60,outerRadius:80,fill:"#8884d8",paddingAngle:5,dataKey:"value",children:j.map((e,t)=>(0,s.jsx)(W.b,{fill:g[t%g.length]},"cell-".concat(t)))}),(0,s.jsx)(P.u,{formatter:e=>(0,u.Z)(e)})]}),(0,s.jsxs)("div",{className:"text-center mt-4",children:[(0,s.jsx)("p",{className:"text-lg font-semibold",children:r?"".concat((0,u.Z)(x.total)," / ").concat((0,u.Z)(x.orcamentoUsuario)):"****"}),(0,s.jsxs)("p",{className:"text-sm",children:[x.porcentagem,"% alcan\xe7ado"]})]})]})]})}function V(){return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"w-[95%] mx-auto",children:(0,s.jsxs)("div",{className:"grid  grid-cols-1 md:grid-cols-3 pt-4 gap-5 text-white",children:[(0,s.jsx)(h,{}),(0,s.jsx)(g,{}),(0,s.jsx)(b,{}),(0,s.jsx)(q,{}),(0,s.jsx)(L,{}),(0,s.jsx)(N,{}),(0,s.jsx)(T,{}),(0,s.jsx)(R,{})]})})})}},62187:function(e,t){"use strict";t.Z=e=>e?e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}):"RS 0.00"},80590:function(e,t,a){"use strict";function s(e){let[t,a,s]=e.split("/");return"".concat(s,"/").concat(a,"/").concat(t)}a.d(t,{Z:function(){return s}}),a(2265)},30276:function(e,t,a){"use strict";var s=a(80665);async function l(e,t){return console.log("\uD83D\uDE80 ~ ControleMensal ~ data",e),(await s.h.post("/controleorcamento",{data:e,id:t})).data}t.Z=l},81313:function(e,t,a){"use strict";let s=(0,a(39099).Ue)(e=>({tokenUsuario:null,setTokenUsuario:t=>e({tokenUsuario:t})}));t.Z=s},11183:function(e,t,a){"use strict";let s=(0,a(39099).Ue)(e=>({visibility:!1,toggleVisibility:()=>e(e=>({visibility:!e.visibility}))}));t.Z=s},80665:function(e,t,a){"use strict";a.d(t,{h:function(){return s}});let s=a(38472).Z.create({baseURL:"https://app.fluxodocapital.com.br/api"})}},function(e){e.O(0,[6051,5505,9956,5706,4175,6310,7570,3641,5604,5988,8230,1734,6773,7138,9626,2971,7023,1744],function(){return e(e.s=99685)}),_N_E=e.O()}]);