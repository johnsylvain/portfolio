require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}();function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function o(e){var r=this;t(this,o),this.routes={},e.forEach(function(e){r.addRoute(e.path,e.controller)}),window.addEventListener("hashchange",this.go.bind(this)),window.addEventListener("load",this.go.bind(this))}return e(o,[{key:"go",value:function(e){e.route&&history.replaceState(void 0,void 0,e.route);var t=location.hash.slice(1)||"/",o=this.routes[t];o&&o.controller?o.controller():(this.routes["/"].controller(),history.replaceState(void 0,void 0,"#/"))}},{key:"addRoute",value:function(e,t){this.routes[e]={controller:t}}}]),o}();exports.default=o;
},{}],21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={events:{},on:function(e,t){(this.events[e]||(this.events[e]=[])).push(t)},off:function(e,t){this.events[e].splice(this.events[e].indexOf(t)>>>0,1)},emit:function(e,t,s){(this.events[e]||[]).map(function(e){e.call(s,t)})}};exports.default=e;
},{}],22:[function(require,module,exports) {
"use strict";function t(t,e,r){var n=!1;return function(){n||(t.apply(r,arguments),n=!0,setTimeout(function(){n=!1},e))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.throttle=t;var e=exports.compose=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}};
},{}],28:[function(require,module,exports) {
module.exports = {
  "resumeData": {
    "name": "John Sylvain",
    "title": "Software Engineer",
    "contact": {
      "email": "hi@johnsylvain.me",
      "social": {
        "github": "http://github.com/johnsylvain",
        "linkedin": "http://linkedin.com/in/johnsylvain"
      }
    },
    "education": {
      "school": "Purdue University",
      "gradutionDate": "May 2017",
      "study": {
        "major": "Computer Graphics Technology",
        "minor": "Computer Information Technology"
      }
    },
    "experience": [
      {
        "company": "Rocketmiles",
        "position": "Software Engineer",
        "date": "October 2017 - present"
      },
      {
        "company": "USAA",
        "position": "Software Development Intern",
        "date": "Summer 2016",
        "description": [
          "Worked on a small, agile team primarily focused on enterprise applications.",
          "Developed an AngularJS application to manage business rules.",
          "Analyzed data and created visualizations for the Enterprise Systems Division."
        ]
      },
      {
        "company": "Blast Radius",
        "position": "Web Development Intern",
        "date": "Summer 2015",
        "description": [
          "Developed websites and dynamic emails for a number of blue chip clients.",
          "Aided in the relaunch of the global Blast Radius website"
        ]
      }
    ],
    "projects": [
      {
        "title": "PlaceMorty",
        "description": "Placeholder Image Generator",
        "links": {
          "demo": "http://www.placemorty.us",
          "github": "http://github.com/johnsylvain/placemorty"
        }
      },
      {
        "title": "Pagine",
        "description": "Serverless Markdown website generator",
        "links": {
          "demo": "https://johnsylvain.github.io/pagine",
          "github": "https://github.com/johnsylvain/pagine"
        }
      },
      {
        "title": "URL Shortener",
        "description": "Personal URL shortener",
        "links": {
          "github": "http://github.com/johnsylvain/url-shortener-node"
        }
      },
      {
        "title": "Reddit Showerthoughts Newtab" ,
        "description": "Chrome Extension",
        "links": {
          "download": "http://johnsylva.in/showerthoughts",
          "github": "http://github.com/johnsylvain/reddit-showerthoughts-newtab"
        }
      }
    ],
    "skills": {
      "languages": [
        "JavaScript (ES Next)", "HTML/CSS", "PHP", "C", "C#"
      ],
      "frameworks-and-libraries": [
        "React", "Redux", "Express", "Angular", "Node"
      ],
      "web-tooling": [
        "git", "webpack", "gulp", "ssh", "CSS preprocessors"
      ],
      "database": [
        "SQL", "MongoDB", "Mongoose"
      ]
    }
  }
}
;
},{}],27:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./data.json"),t=a(e);function a(e){return e&&e.__esModule?e:{default:e}}var r={keyCommands:[{code:38,shortcut:null,action:"UP"},{code:40,shortcut:null,action:"DOWN"},{code:75,shortcut:"ctrlKey",action:"CLEAR"}],commandList:[{text:"type 'help' to view commands",type:"response"}],enteredCommands:{data:[],currentCommand:"",pointer:0},currentOutput:null,commands:[{text:"",params:null},{text:"help",params:null},{text:"clear",params:null},{text:"pwd",params:null,ignored:!0},{text:"ls",params:null,ignored:!0},{text:"email",params:["<subject>"]},{text:"open",params:["resume","pdf"]},{text:"show",params:["education","skills","xp","projects"]},{text:"social",params:["github","linkedin"]},{text:"rm",params:["-rf"],ignored:!0}],defaultMessage:{welcomeMessage:["welcome to my interactive resume!","to view my resume, type 'open resume' in the terminal to the left","type 'help' to view other commands"]},data:t.default.resumeData};exports.default=r;
},{"./data.json":28}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../utils/events"),t=o(e),n=require("../data"),a=o(n);function o(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r={init:function(){a.default.currentOutput=a.default.defaultMessage},getCurrentOutput:function(){return a.default.currentOutput},updateOutput:function(e){a.default.currentOutput=e},executeKeypress:function(e){if("UP"===e||"DOWN"===e){"UP"===e&&a.default.enteredCommands.pointer<a.default.enteredCommands.data.length&&a.default.enteredCommands.pointer++,"DOWN"===e&&a.default.enteredCommands.pointer>0&&a.default.enteredCommands.pointer--;var n=a.default.enteredCommands.data.length-a.default.enteredCommands.pointer;a.default.enteredCommands.currentCommand=a.default.enteredCommands.data[n]}"CLEAR"===e&&this.executeCommand("clear"),t.default.emit("consoleViewRender")},getKeyCommands:function(){return a.default.keyCommands},getEnteredCommands:function(){return a.default.enteredCommands.currentCommand?a.default.enteredCommands.currentCommand:{text:""}},getCommand:function(e){return a.default.commands.find(function(t){return t.text===e})},getCommandList:function(){return a.default.commandList},getFileName:function(){return Object.keys(a.default.currentOutput)[0]},enterCommand:function(e){var n=(e=e.trim()).split(" "),o={text:e,type:"command"},u=a.default.enteredCommands.data[a.default.enteredCommands.data.length-1],r=a.default.commands.find(function(e){return e.text===n[0]});a.default.commandList.push(o),""===n[0]||u&&e===u.text||a.default.enteredCommands.data.push(o),a.default.enteredCommands.pointer=0,r?this.executeCommand(e):(a.default.commandList.push({text:"command not found: "+n[0],type:"error"},{text:"to view available commands type: help",type:"response"}),t.default.emit("consoleViewRender"))},executeCommand:function(e){var n=this,o=e.split(" "),d=function(e,t){o.length-1===e||a.default.commandList.push({text:"'"+t+"' does not need any arguments",type:"error"})},m={pwd:function(){d(r.getCommand("pwd").params||0,"pwd"),a.default.commandList.push({text:window.location.host,type:"bold"})},ls:function(){d(r.getCommand("ls").params||0,"ls"),a.default.commandList.push({text:"index.html",type:"response"},{text:"app.js",type:"response"},{text:"style.css",type:"response"})},clear:function(){d(r.getCommand("clear").params||0,"clear"),a.default.commandList=[]},help:function(){d(r.getCommand("help").params||0,"help");var e=a.default.commands;a.default.commandList.push({text:"Available Commands:",type:"bold"}),e.forEach(function(e,t){if(!0!==e.ignored&&""!==e.text){var n=null!==e.params?"- "+e.text+" ["+e.params.toLocaleString()+"]":"- "+e.text;a.default.commandList.push({text:n,type:"response"})}})},open:function(){if(1!==o.length)return{resume:function(){n.updateOutput({resume:a.default.data})},pdf:function(){window.open("http://johnsylvain.me/resume.pdf")}};a.default.commandList.push({text:"type 'open ["+r.getCommand("open").params+"]'",type:"warning"})},show:function(){var e=function(e){return function(){n.updateOutput(u({},e,a.default.data[e]))}};if(1!==o.length)return{education:e("education"),skills:e("skills"),xp:e("experience"),projects:e("projects")};a.default.commandList.push({text:"type 'show ["+r.getCommand("show").params+"]'",type:"warning"})},email:function(){var e=o.slice(1).reduce(function(e,t){return e+" "+t});window.open("mailto:hi@johnsylvain.me?subject="+e)},social:function(){var e=function(e){return function(){window.open(a.default.data.contact.social[e])}};if(1!==o.length)return{github:e("github"),linkedin:e("linkedin")};a.default.commandList.push({text:"type 'social ["+r.getCommand("social").params+"]'",type:"warning"})},rm:function(){if(1!==o.length)return{"-rf":function(){var e=[document.querySelector("#wrapper"),document.querySelectorAll(".trash")];document.querySelector("#command-input").disabled=!0,e.forEach(function(e){Array.from(e)[0]?e.forEach(function(e){e.classList.add("crash")}):e.classList.add("crash")}),window.setTimeout(function(){document.querySelector("#command-input").disabled=!1,e.forEach(function(e){Array.from(e)[0]?e.forEach(function(e){e.classList.remove("crash")}):e.classList.remove("crash")}),document.querySelector("#command-input").focus()},4e3)}};a.default.commandList.push({text:"please specify a path",type:"warning"})}};if(a.default.enteredCommands.pointer=0,a.default.enteredCommands.currentCommand="",""!==o[0]&&1===o.length||"email"===o[0])m[o[0]]();else if(o.length>1){var s=m[o[0]]();s[o[1]]?s[o[1]]():a.default.commandList.push({text:o[1]+" is not a proper parameter of '"+o[0]+"'",type:"error"})}t.default.emit("resumeContentViewRender"),t.default.emit("consoleViewRender")}};exports.default=r;
},{"../utils/events":21,"../data":27}],29:[function(require,module,exports) {
"use strict";function e(e){"string"!=typeof e&&(e=JSON.stringify(e,null,2));return(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"})}function t(e){return e.replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g,function(e){return'<a href="'+e.replace("</span>",String.empty)+'" target="_blank">'+e+"</a>"})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.textToJSON=e,exports.findUrls=t;
},{}],25:[function(require,module,exports) {
"use strict";function e(e,t){for(var r=arguments.length,n=Array(r>2?r-2:0),a=2;a<r;a++)n[a-2]=arguments[a];return n=[].concat.apply([],n),t=t||{},"function"==typeof e?e(t,n):{nodeName:e,attributes:t,children:n}}function t(e,t){for(var n=r(e);t.firstChild;)t.removeChild(t.firstChild);t.appendChild(n)}function r(e){var t="string"==typeof e||"number"==typeof e?document.createTextNode(e):document.createElement(e.nodeName);return e.attributes&&(n(t,e.attributes),e.children.map(r).forEach(t.appendChild.bind(t))),t}function n(e,t){for(var r in t)if(/^on/.test(r))e.addEventListener(r.slice(2).toLowerCase(),t[r]);else switch(r){case"className":e.setAttribute("class",t[r]);break;case"dangerouslySetInnerHTML":e.innerHTML=t[r].__html;break;default:e.setAttribute(r,t[r])}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=e,exports.render=t;
},{}],23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),r=require("../controller"),n=c(r),t=require("../utils/events"),u=c(t),i=require("../utils/filters"),l=s(i),a=require("../utils/helpers"),o=require("../utils/vdom");function s(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r.default=e,r}function c(e){return e&&e.__esModule?e:{default:e}}function f(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var d=function(){function r(){f(this,r),this.render(),this.bindEvents()}return e(r,[{key:"bindEvents",value:function(){var e=this;u.default.on("resumeContentViewRender",function(r){e.render()})}},{key:"render",value:function(){var e=n.default.getCurrentOutput(),r=(0,a.compose)(function(e){return JSON.stringify(e,null,"  ")},l.textToJSON,l.findUrls)(e);(0,o.render)((0,o.h)(function(){return(0,o.h)("div",null,(0,o.h)("div",{className:"menu-bar"},(0,o.h)("div",{className:"menu-bar__circle"}),(0,o.h)("div",{className:"menu-bar__circle"}),(0,o.h)("div",{className:"menu-bar__circle"}),(0,o.h)("span",{className:"menu-bar__title"},n.default.getFileName(),".json")),(0,o.h)("div",{id:"resume-content"},(0,o.h)("pre",{dangerouslySetInnerHTML:{__html:r}})))},null),document.querySelector("#resume-selector"))}}]),r}();exports.default=d;
},{"../controller":26,"../utils/events":21,"../utils/filters":29,"../utils/helpers":22,"../utils/vdom":25}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),t=require("../controller"),n=c(t),o=require("../utils/events"),r=c(o),u=require("../utils/vdom");function c(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(){a(this,t),this.render(),this.bindEvents()}return e(t,[{key:"bindEvents",value:function(){var e=this;document.getElementById("console-selector").addEventListener("click",function(e){document.getElementById("command-input").focus()}),r.default.on("consoleViewRender",function(t){e.render()}),window.addEventListener("keyup",function(e){var t=n.default.getKeyCommands().find(function(t){return t.shortcut?t.code===e.which&&e[t.shortcut]:t.code===e.which});t&&"command-input"===document.activeElement.id&&n.default.executeKeypress(t.action)})}},{key:"render",value:function(){var e=function(e){e.preventDefault(),n.default.enterCommand(e.target.prompt.value),e.target.prompt.value=""},t=n.default.getCommandList();(0,u.render)((0,u.h)(function(){return(0,u.h)("div",{className:"console",id:"commands"},(0,u.h)("ul",{className:"console__command-list"},t.map(function(e){return(0,u.h)("li",{className:"console__command-list-item console__command-list-item--"+e.type},"command"===e.type?"$ "+e.text:e.text)})),(0,u.h)("form",{onSubmit:e},(0,u.h)("span",null,"$ "),(0,u.h)("input",{type:"text",name:"prompt",id:"command-input",className:"console__prompt",autocomplete:"off",value:n.default.getEnteredCommands().text})))},null),document.querySelector("#console-selector")),document.querySelector("#command-input").focus()}}]),t}();exports.default=i;
},{"../controller":26,"../utils/events":21,"../utils/vdom":25}],19:[function(require,module,exports) {

},{"./../assets/code.svg":["19ed30da515e33214aeaa95001ea1c50.svg",31],"./../assets/close.svg":["121e3f06e0d43ad36ad24c13b72675a9.svg",30]}],18:[function(require,module,exports) {
"use strict";var e=require("./utils/router.js"),t=a(e),r=require("./utils/events"),i=a(r),n=require("./utils/helpers"),o=require("./controller"),s=a(o),u=require("./views/resume"),c=a(u),d=require("./views/console"),l=a(d);function a(e){return e&&e.__esModule?e:{default:e}}require("../styles/style.scss");var f={breakpoint:768,interactiveMode:!1,init:function(){var e=this;s.default.init(),new c.default,new l.default,this.bindEvents(),this.router=new t.default([{path:"/",controller:function(){i.default.emit("switchModes",{flag:!0})}},{path:"/resume",controller:function(){i.default.emit("switchModes",{flag:!1}),window.innerWidth<=e.breakpoint&&e.router.go({route:"#/"})}}]),document.querySelector("#date-selector").textContent=(new Date).getFullYear().toString()},bindEvents:function(){var e=this;document.querySelectorAll(".toggle-btn").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),e.router.go({route:t.target.href})})}),window.addEventListener("resize",(0,n.throttle)(function(t){window.innerWidth<=e.breakpoint&&e.router.go({route:"#/"})},250,this)),i.default.on("switchModes",function(t){e.switchModes(t.flag)})},switchModes:function(e){var t=document.getElementById("toggle-interactive"),r=[document.getElementById("page-wrap"),document.getElementById("landing-wrapper"),document.getElementById("resume-selector"),document.getElementById("console-selector"),document.getElementById("container-selector"),document.getElementById("toggle-interactive")];if(e)return r.forEach(function(e){e.classList.remove("interactive-mode")}),this.interactiveMode=!1,void t.setAttribute("href","#/resume");this.interactiveMode?(r.forEach(function(e){e.classList.remove("interactive-mode")}),t.setAttribute("href","#/resume")):(r.forEach(function(e){e.classList.add("interactive-mode")}),t.setAttribute("href","#/")),this.interactiveMode=!this.interactiveMode}};f.init();
},{"./utils/router.js":20,"./utils/events":21,"./utils/helpers":22,"./controller":26,"./views/resume":23,"./views/console":24,"../styles/style.scss":19}]},{},[18])