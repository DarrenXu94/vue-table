import{V as y}from"./chunks/VueTable.34e22e83.js";import{f as C,a as A,U as i,b as d}from"./chunks/data.252d70fb.js";import{d as u,g as c,o as p,b as m,w as n,c as D,t as o,e as f,k as a,J as E,a as _,S as g}from"./chunks/framework.f15d8f8c.js";const h=["href"],v=["href"],q=["href"],S=["src"],V=u({__name:"AdvancedRoving",props:{advanced:Boolean},setup(t){const{advanced:l}=t,e=c(()=>l?C:A),r=c(()=>l?i:d);return(N,k)=>(p(),m(y,{fields:e.value,items:r.value},{"cell(email)":n(({data:s,row:F})=>[F%2!==1?(p(),D("a",{key:0,href:`mailto:${s}`},o(s),9,h)):f("",!0)]),"cell(url)":n(({data:s})=>[a("a",{href:`${s}`},o(s),9,v)]),"cell(exampleEmail)":n(({data:s})=>[a("a",{href:`mailto:${s}`},o(s),9,q)]),"cell(avatar)":n(({data:s})=>[a("img",{src:s,width:"100"},null,8,S)]),_:1},8,["fields","items"]))}}),b=a("h1",{id:"advanced-example",tabindex:"-1"},[_("Advanced example "),a("a",{class:"header-anchor",href:"#advanced-example","aria-label":'Permalink to "Advanced example"'},"​")],-1),x=g("",1),w=JSON.parse('{"title":"Advanced example","description":"","frontmatter":{},"headers":[],"relativePath":"advanced.md","filePath":"advanced.md"}'),T={name:"advanced.md"},B=Object.assign(T,{setup(t){return(l,e)=>(p(),D("div",null,[b,E(V,{advanced:""}),x]))}});export{w as __pageData,B as default};
