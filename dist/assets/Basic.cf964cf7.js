import{r as f,f as p,a as _,b as u,F as v,c as d,o,d as a,e as b,n as k,g as c,h as r,i as M,j as B}from"./vendor.7cefa9a9.js";/* empty css                                              */import{_ as C}from"./plugin-vue_export-helper.21dcd24c.js";const O={setup(){const n=f(!1);return{isMobileOpen:n,setMobileOpen:t=>n.value=t}},data(){return{faChessQueen:p,faBars:_,faTimes:u}},components:{FontAwesomeIcon:v}},x=B('<a class="nav-link">Home</a><a class="nav-link">Comics</a><a class="nav-link">Music</a><a class="nav-link">Commissions</a><a class="nav-link">Bees?</a>',5),g=[x];function h(n,e,t,s,i,j){const l=d("font-awesome-icon");return o(),a(M,null,[b("div",{class:k(["nav",{"mobile-open":s.isMobileOpen}])},g,2),s.isMobileOpen?r("v-if",!0):(o(),a("button",{key:0,class:"thumb",onClick:e[0]||(e[0]=m=>s.setMobileOpen(!0))},[c(l,{icon:i.faBars},null,8,["icon"])])),s.isMobileOpen?(o(),a("button",{key:1,class:"thumb",onClick:e[1]||(e[1]=m=>s.setMobileOpen(!1))},[c(l,{icon:i.faTimes},null,8,["icon"])])):r("v-if",!0)],64)}var w=C(O,[["render",h]]);export{w as default};