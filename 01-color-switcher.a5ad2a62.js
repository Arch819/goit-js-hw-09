const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");e.addEventListener("click",(function(){changeStyleId=setInterval((()=>{e.disabled=!0,t.disabled=!1,document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.addEventListener("click",(function(){clearInterval(changeStyleId),t.disabled=!0,e.disabled=!1}));
//# sourceMappingURL=01-color-switcher.a5ad2a62.js.map
