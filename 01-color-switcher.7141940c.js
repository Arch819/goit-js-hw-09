!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){changeStyleId=setInterval((function(){t.disabled=!0,e.disabled=!1,document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){clearInterval(changeStyleId),e.disabled=!0,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.7141940c.js.map
