import{_ as B,d as V,m as y,s as F,h as E,r as D,a as r,c as U,e as n,b as e,w as t,p as q,f as I,o as S,v as A,g as f,E as b,A as N}from"./index.c1473bac.js";const T=d=>(q("data-v-bd35c3ba"),d=d(),I(),d),z={class:"register-wrap"},K={class:"vt-register"},L=T(()=>n("div",{class:"vt-title"},"TDP Cloud",-1)),$={class:"register-btn"},j=f("\u6CE8\u518C"),M={class:"register-btn"},P=f("\u767B\u5F55"),R=V({__name:"register",setup(d){const v=y(),w=F(),o=E({username:"",password:"",password2:""}),h={username:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}],password2:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}]},_=D(null),c=()=>{_.value.validate(m=>{if(!m)return b.error("\u6CE8\u518C\u5931\u8D25"),!1;N.user.register(o).then(()=>{b.success("\u6CE8\u518C\u6210\u529F"),w.push("/user/login")})})};return v.clearTabs(),(m,s)=>{const x=r("User"),l=r("el-icon"),u=r("el-button"),p=r("el-input"),i=r("el-form-item"),g=r("Lock"),C=r("router-link"),k=r("el-form");return S(),U("div",z,[n("div",K,[L,e(k,{ref_key:"register",ref:_,model:o,rules:h,"label-width":"0px",class:"vt-content"},{default:t(()=>[e(i,{prop:"username"},{default:t(()=>[e(p,{modelValue:o.username,"onUpdate:modelValue":s[0]||(s[0]=a=>o.username=a),placeholder:"\u7528\u6237\u540D"},{prepend:t(()=>[e(u,null,{default:t(()=>[e(l,null,{default:t(()=>[e(x)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(i,{prop:"password"},{default:t(()=>[e(p,{modelValue:o.password,"onUpdate:modelValue":s[1]||(s[1]=a=>o.password=a),type:"password",placeholder:"\u5BC6\u7801"},{prepend:t(()=>[e(u,null,{default:t(()=>[e(l,null,{default:t(()=>[e(g)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(i,{prop:"password2"},{default:t(()=>[e(p,{modelValue:o.password2,"onUpdate:modelValue":s[2]||(s[2]=a=>o.password2=a),type:"password",placeholder:"\u786E\u8BA4\u5BC6\u7801",onKeyup:s[3]||(s[3]=A(a=>c(),["enter"]))},{prepend:t(()=>[e(u,null,{default:t(()=>[e(l,null,{default:t(()=>[e(g)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),n("div",$,[e(u,{type:"primary",onClick:s[4]||(s[4]=a=>c())},{default:t(()=>[j]),_:1})]),n("div",M,[e(C,{to:"/user/login"},{default:t(()=>[e(u,null,{default:t(()=>[P]),_:1})]),_:1})])]),_:1},8,["model"])])])}}});var G=B(R,[["__scopeId","data-v-bd35c3ba"],["__file","D:/Workspace/qcloud-tdp/tdp-cloud-ui/src/apps/user/register.vue"]]);export{G as default};