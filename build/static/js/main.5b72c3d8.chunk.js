(this.webpackJsonpsabha=this.webpackJsonpsabha||[]).push([[0],{16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},19:function(e,t,n){e.exports=n(31)},24:function(e,t,n){},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(15),i=n.n(r),c=(n(24),n(16)),l=n.n(c),s=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:l.a,className:"App-logo",alt:"logo"}),o.a.createElement("p",null,"Edit ",o.a.createElement("code",null,"src/App.js")," and save to reload."),o.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))},d=n(12),u={width:"40%",lineHeight:2.5,borderRadius:"4px",border:"1px solid green",padding:"5px",backgroundColor:"#dcf4d1"},m={marginLeft:"10px",backgroundColor:"deepskyblue",lineHeight:2.5,fontSize:"medium",borderRadius:"4px"};function p(e){var t=Object(a.useState)(!1),n=Object(d.a)(t,2),r=n[0],i=n[1],c=Object(a.useState)(""),l=Object(d.a)(c,2),s=l[0],p=l[1],f={roomName:s,height:"35em",parentNode:""};return Object(a.useEffect)((function(){if(r&&s){console.log("************************\n"+document.getElementById(e.divId));var t=window.JitsiMeetExternalAPI;i(!0),f.parentNode=document.getElementById(e.divId),console.log(window.JitsiMeetExternalAPI),new t("meet.jit.si",f)}}),[r,f,e.divId,s]),o.a.createElement("div",{style:{height:"35em"}},!r&&o.a.createElement("div",{style:{padding:"20%"}},o.a.createElement("input",{style:u,onChange:function(e){p(e.target.value)}}),o.a.createElement("button",{style:m,onClick:function(){i(!0)}},"Set Room Name")))}var f=n(8),g=n(5);n(25);var h=function(){return o.a.createElement(f.a,null,o.a.createElement("div",null,o.a.createElement("nav",null,o.a.createElement("div",{className:"navbar"},o.a.createElement("h3",null,"SABHA"),o.a.createElement(f.b,{to:"/"},"Home"),o.a.createElement(f.b,{to:"/about"},"About"),o.a.createElement(f.b,{to:"/meet"},"Meet"))),o.a.createElement(g.c,null,o.a.createElement(g.a,{path:"/about"},o.a.createElement(s,null)),o.a.createElement(g.a,{path:"/meet"},o.a.createElement("div",{id:"meet2"}),o.a.createElement(p,{divId:"meet2"})),o.a.createElement(g.a,{path:"/"},o.a.createElement("div",{id:"meet"}),o.a.createElement(p,{divId:"meet"})))))},v=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function E(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(h,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");v?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):E(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):E(t,e)}))}}()}},[[19,1,2]]]);
//# sourceMappingURL=main.5b72c3d8.chunk.js.map