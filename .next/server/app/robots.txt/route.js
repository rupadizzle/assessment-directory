"use strict";(()=>{var e={};e.id=3703,e.ids=[3703],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4141:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>m,requestAsyncStorage:()=>u,routeModule:()=>l,serverHooks:()=>c,staticGenerationAsyncStorage:()=>d});var o={};r.r(o),r.d(o,{GET:()=>p,dynamic:()=>i});var s=r(9303),a=r(8716),n=r(3131);let i="force-static";async function p(){return new Response(`User-agent: *
Allow: /
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://assessmentdirectory.co.uk/sitemap.xml
`,{headers:{"Content-Type":"text/plain"}})}let l=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/robots.txt/route",pathname:"/robots.txt",filename:"route",bundlePath:"app/robots.txt/route"},resolvedPagePath:"/Users/rupertwallace/Desktop/assessment-directory/src/app/robots.txt/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:u,staticGenerationAsyncStorage:d,serverHooks:c}=l,x="/robots.txt/route";function m(){return(0,n.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:d})}},9303:(e,t,r)=>{e.exports=r(517)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948],()=>r(4141));module.exports=o})();