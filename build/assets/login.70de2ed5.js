import{_ as B,d as C,m as F,s as V,h as I,r as S,a as s,c as D,e as u,b as e,w as o,p as E,f as U,o as q,v as N,g as v,E as f,A as T}from"./index.c1473bac.js";const z=l=>(E("data-v-61f85819"),l=l(),U(),l),A={class:"login-wrap"},K={class:"vt-login"},L=z(()=>u("div",{class:"vt-title"},"TDP Cloud",-1)),$={class:"login-btn"},j=v("\u767B\u5F55"),M={class:"login-btn"},P=v("\u6CE8\u518C"),R=C({__name:"login",setup(l){const b=F(),d=V(),n=I({username:"admin",password:"12345"}),h={username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}]},i=S(null),p=()=>{i.value.validate(_=>{if(!_)return f.error("\u767B\u5F55\u5931\u8D25"),!1;T.user.login(n).then(t=>{f.success("\u767B\u5F55\u6210\u529F"),localStorage.setItem("vt_username",n.username),localStorage.setItem("vt_token",t.token),t.keyid>0?(localStorage.setItem("vt_keyid",t.keyid),d.push("/")):d.push("/user/secret")})})};return b.clearTabs(),(_,t)=>{const x=s("User"),c=s("el-icon"),r=s("el-button"),m=s("el-input"),g=s("el-form-item"),k=s("Lock"),w=s("router-link"),y=s("el-form");return q(),D("div",A,[u("div",K,[L,e(y,{ref_key:"login",ref:i,model:n,rules:h,"label-width":"0px",class:"vt-content"},{default:o(()=>[e(g,{prop:"username"},{default:o(()=>[e(m,{modelValue:n.username,"onUpdate:modelValue":t[0]||(t[0]=a=>n.username=a),placeholder:"\u7528\u6237\u540D"},{prepend:o(()=>[e(r,null,{default:o(()=>[e(c,null,{default:o(()=>[e(x)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(g,{prop:"password"},{default:o(()=>[e(m,{modelValue:n.password,"onUpdate:modelValue":t[1]||(t[1]=a=>n.password=a),type:"password",placeholder:"\u5BC6\u7801",onKeyup:t[2]||(t[2]=N(a=>p(),["enter"]))},{prepend:o(()=>[e(r,null,{default:o(()=>[e(c,null,{default:o(()=>[e(k)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),u("div",$,[e(r,{type:"primary",onClick:t[3]||(t[3]=a=>p())},{default:o(()=>[j]),_:1})]),u("div",M,[e(w,{to:"/user/register"},{default:o(()=>[e(r,null,{default:o(()=>[P]),_:1})]),_:1})])]),_:1},8,["model"])])])}}});var G=B(R,[["__scopeId","data-v-61f85819"],["__file","D:/Workspace/qcloud-tdp/tdp-cloud-ui/src/apps/user/login.vue"]]);export{G as default};