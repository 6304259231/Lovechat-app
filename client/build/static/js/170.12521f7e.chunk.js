"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[170],{856:(e,a,s)=>{s.r(a),s.d(a,{default:()=>c});var t=s(791),l=s(294),i=s(689),n=s(85),d=(s(462),s(184));const c=function(e){let{setLogin:a}=e,[s,c]=(0,t.useState)({}),[o,r]=(0,t.useState)({username:"",bio:"",email:"",location:""});const m=e=>{r({...o,[e.target.name]:e.target.value})},h=(0,i.s0)(),x=()=>{l.Z.get("http://localhost:5600/myprofile",{headers:{Authorization:localStorage.getItem("jwt")}}).then((e=>{c(e.data)})).catch((e=>{console.log(e,"getting error")}))};return(0,t.useEffect)((()=>{x()}),[]),(0,d.jsxs)("center",{children:[(0,d.jsxs)("div",{className:"card mb-4 mt-4 setting-section",style:{width:"50%",borderRadius:"12px"},children:[(0,d.jsxs)("div",{className:"profile-image",children:[(0,d.jsx)("img",{src:s.avatar||"https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg",className:"card-img-top",alt:"...",style:{borderRadius:"50%",border:"4px inset tomato"}}),(0,d.jsxs)("p",{children:[" ",(0,d.jsx)("span",{style:{fontFamily:"monospace",fontSize:"20px"},children:" ID : "})," ",s._id]}),(0,d.jsx)("button",{type:"button",className:"btn btn-danger pl-30 mb-3 mt-2 ml-20 ","data-bs-toggle":"modal","data-bs-target":"#exampleModal2",children:(0,d.jsx)("small",{className:"",children:" Edit "})})]}),(0,d.jsxs)("div",{className:"card",children:[(0,d.jsx)("div",{className:"card-header",children:(0,d.jsxs)("ul",{className:"nav nav-tabs card-header-tabs",children:[(0,d.jsx)("li",{className:"nav-item",children:(0,d.jsx)("a",{href:"/",className:"nav-link active","aria-current":"true",children:"Active"})}),(0,d.jsx)("li",{className:"nav-item",children:(0,d.jsx)("a",{href:"/",className:"nav-link disabled",tabIndex:-1,"aria-disabled":"true",children:" Blocked "})})]})}),(0,d.jsxs)("div",{className:"card-body text-center",style:{textAlign:"left"},children:[(0,d.jsxs)("h5",{className:"card-title",children:["  ",(0,d.jsxs)("p",{className:"card-text",children:[(0,d.jsxs)("p",{children:[" ",(0,d.jsxs)("span",{style:{fontFamily:"monospace",fontSize:"24px"},children:[" ",s.username," "]})," "]}),(0,d.jsxs)("span",{style:{fontFamily:"monospace",fontSize:"20px"},children:[" ",s.bio," "]})]})]}),(0,d.jsxs)("p",{className:"card-text mt-3",children:[(0,d.jsxs)("span",{children:[" ",(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",fill:"currentColor",className:"bi bi-envelope",viewBox:"0 0 16 16",children:(0,d.jsx)("path",{d:"M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"})})]})," ",(0,d.jsx)("span",{style:{marginLeft:"15px"},children:s.email})]}),(0,d.jsxs)("p",{className:"card-text mt-3",children:[(0,d.jsxs)("span",{children:[" ",(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",fill:"currentColor",class:"bi bi-geo-alt-fill",viewBox:"0 0 16 16",children:(0,d.jsx)("path",{d:"M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"})})]})," ",s.location]}),(0,d.jsx)("button",{type:"button",class:"btn btn-outline-primary m-5",onClick:()=>{a(!1),h("/")},children:"Log out"}),(0,d.jsx)("button",{type:"button",class:"btn btn-outline-danger","data-bs-toggle":"modal","data-bs-target":"#exampleModal",children:"Delete Account"})]})]})]}),(0,d.jsx)("div",{className:"modal fade",id:"exampleModal",tabIndex:-1,"aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:(0,d.jsx)("div",{className:"modal-dialog",children:(0,d.jsxs)("div",{className:"modal-content",children:[(0,d.jsxs)("div",{className:"modal-header",children:[(0,d.jsx)("h5",{className:"modal-title",id:"exampleModalLabel",style:{fontFamily:"monospace"},children:"Delete"}),(0,d.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),(0,d.jsx)("div",{className:"modal-body",style:{color:"red",fontSize:"20px"},children:" Your Account will be deleted permanently "}),(0,d.jsxs)("div",{className:"modal-footer",children:[(0,d.jsx)("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close"}),(0,d.jsx)("button",{type:"button",className:"btn btn-primary","data-bs-dismiss":"modal",onClick:e=>{(e=>{e.preventDefault(),l.Z.delete("https://lovechat-api.onrender.com/delete-account",{headers:{Authorization:localStorage.getItem("jwt")}}).then((e=>{n.Am.success(e.data.deleteAccount)})).catch((e=>{console.error("Error updating user details:",e)}))})(e),h("/")},children:"Delete"})]})]})})}),(0,d.jsx)("div",{className:"modal fade",id:"exampleModal2",tabIndex:-2,"aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:(0,d.jsx)("div",{className:"modal-dialog",style:{position:"sticky",top:"250px"},children:(0,d.jsxs)("div",{className:"modal-content",children:[(0,d.jsxs)("div",{className:"modal-header",children:[(0,d.jsx)("h5",{className:"modal-title",id:"exampleModalLabel",children:"Update"}),(0,d.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),(0,d.jsx)("center",{className:"modal-body",children:(0,d.jsxs)("form",{className:"post-form",onSubmit:e=>{e.preventDefault(),l.Z.put("http://localhost:5600/update-profile",o,{headers:{Authorization:localStorage.getItem("jwt")}}).then((e=>{n.Am.success("Your account updated"),x()})).catch((e=>{console.error("Error updating user details:",e)}))},children:[(0,d.jsx)("input",{type:"text",name:"username",placeholder:"User name",className:"m-2",onChange:m,style:{width:"70%"}}),(0,d.jsx)("input",{type:"text",name:"bio",placeholder:"bio",className:"m-2",onChange:m,style:{width:"70%",height:"50px"}}),(0,d.jsx)("input",{type:"text",name:"email",placeholder:"email",className:"m-2",onChange:m,style:{width:"70%"}}),(0,d.jsx)("input",{type:"text",name:"location",placeholder:"Location",className:"m-2",onChange:m,style:{width:"70%"}}),(0,d.jsx)("div",{className:"modal-footer",children:(0,d.jsx)("button",{type:"submit",className:"btn btn-primary","data-bs-dismiss":"modal",children:"Set"})})]})})]})})}),(0,d.jsx)(n.Ix,{})]})}}}]);
//# sourceMappingURL=170.12521f7e.chunk.js.map