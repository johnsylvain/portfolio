require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}();function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function o(e){var r=this;t(this,o),this.routes={},e.forEach(function(e){r.addRoute(e.path,e.controller)}),window.addEventListener("hashchange",this.go.bind(this)),window.addEventListener("load",this.go.bind(this))}return e(o,[{key:"go",value:function(e){e.route&&history.replaceState(void 0,void 0,e.route);var t=location.hash.slice(1)||"/",o=this.routes[t];o&&o.controller?o.controller():(this.routes["/"].controller(),history.replaceState(void 0,void 0,"#/"))}},{key:"addRoute",value:function(e,t){this.routes[e]={controller:t}}}]),o}();exports.default=o;
},{}],21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={events:{},on:function(e,t){(this.events[e]||(this.events[e]=[])).push(t)},off:function(e,t){this.events[e].splice(this.events[e].indexOf(t)>>>0,1)},emit:function(e,t,s){(this.events[e]||[]).map(function(e){e.call(s,t)})}};exports.default=e;
},{}],22:[function(require,module,exports) {
"use strict";function t(t,e,r){var n=!1;return function(){n||(t.apply(r,arguments),n=!0,setTimeout(function(){n=!1},e))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.throttle=t;var e=exports.compose=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}};
},{}],35:[function(require,module,exports) {
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
},{}],28:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./data.json"),t=a(e);function a(e){return e&&e.__esModule?e:{default:e}}var r={keyCommands:[{code:38,shortcut:null,action:"UP"},{code:40,shortcut:null,action:"DOWN"}],previousCommands:[{text:"type 'help' to view commands",type:"response",_id:1}],enteredCommands:{data:[],currentCommand:"",pointer:0},currentOutput:null,socialProfiles:[],commands:[{text:"",params:null},{text:"help",params:null},{text:"pwd",params:null,ignored:!0},{text:"ls",params:null,ignored:!0},{text:"email",params:["<subject>"]},{text:"open",params:["resume","pdf"]},{text:"show",params:["education","skills","xp","projects"]},{text:"social",params:["github","linkedin"]},{text:"rm",params:["-rf"],ignored:!0}],defaultMessage:{welcomeMessage:["welcome to my interactive resume!","to view my resume, type 'open resume' in the terminal to the left","type 'help' to view other commands"]},data:t.default.resumeData};exports.default=r;
},{"./data.json":35}],27:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../utils/events"),t=u(e),n=require("../data"),a=u(n);function u(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var d=function e(t,n){r(this,e),this.text=t,this.type=n},s={init:function(){a.default.currentOutput=a.default.defaultMessage,a.default.socialProfiles=Object.keys(a.default.data.contact.social)},getResumeData:function(){return a.default.data},getDefaultData:function(){return a.default.defaultMessage},getCurrentOutput:function(){return a.default.currentOutput},updateOutput:function(e){a.default.currentOutput=e},executeKeypress:function(e){if("UP"===e||"DOWN"===e){"UP"===e&&a.default.enteredCommands.pointer<a.default.enteredCommands.data.length&&(a.default.enteredCommands.pointer+=1),"DOWN"===e&&a.default.enteredCommands.pointer>0&&(a.default.enteredCommands.pointer-=1);var n=a.default.enteredCommands.data.length-a.default.enteredCommands.pointer;a.default.enteredCommands.currentCommand=a.default.enteredCommands.data[n]}"CLEAR"===e&&this.executeCommand("clear"),t.default.emit("consoleViewRender",null)},getKeyCommands:function(){return a.default.keyCommands},getEnteredCommands:function(){return a.default.enteredCommands.currentCommand?a.default.enteredCommands.currentCommand:{text:""}},getCommand:function(e){return a.default.commands.filter(function(t){return t.text===e})},getPreviousCommands:function(){return a.default.previousCommands},getFileName:function(){return Object.keys(a.default.currentOutput)[0]},enterCommand:function(e){var n=(e=e.trim()).split(" ");if(""!==n[0]){var u=new d(e,"command");a.default.previousCommands.push(u);var o=a.default.enteredCommands.data[a.default.enteredCommands.data.length-1];o?e!==o.text&&a.default.enteredCommands.data.push(u):a.default.enteredCommands.data.push(u),a.default.enteredCommands.pointer=0}a.default.commands.filter(function(e){return e.text===n[0]}).length?this.executeCommand(e):a.default.previousCommands.push(new d("command not found: "+n[0],"error"),new d("to view available commands type: help","response")),t.default.emit("consoleViewRender",null)},executeCommand:function(e){var n=this,u=e.split(" "),r={pwd:function(){if(1!==u.length)return a.default.previousCommands.push(new d("'pwd' does not need any arguments","error")),void t.default.emit("consoleViewRender",null);a.default.previousCommands.push(new d(window.location.host,"bold"))},ls:function(){if(1!==u.length)return a.default.previousCommands.push(new d("'ls' does not need any arguments","error")),void t.default.emit("consoleViewRender",null);a.default.previousCommands.push(new d("index.html","response"),new d("app.js","response"),new d("style.css","response"))},clear:function(){1===u.length?a.default.previousCommands=[]:a.default.previousCommands.push(new d("'clear' does not need any arguments","error"))},help:function(){var e=a.default.commands;a.default.previousCommands.push(new d("Available Commands:","bold")),e.forEach(function(e,t){if(!0!==e.ignored&&""!==e.text){var n=null!==e.params?"- "+e.text+" ["+e.params.toLocaleString()+"]":"- "+e.text;a.default.previousCommands.push(new d(n,"response"))}})},open:function(){if(1!==u.length)return{resume:function(){n.updateOutput({resume:a.default.data}),t.default.emit("resumeContentViewRender",null)},pdf:function(){window.open("http://johnsylvain.me/resume.pdf")}};a.default.previousCommands.push(new d("type 'open ["+s.getCommand("open")[0].params+"]'","warning"))},show:function(){var e=function(e){return function(){n.updateOutput(o({},e,a.default.data[e])),t.default.emit("resumeContentViewRender",null)}};if(1!==u.length)return{education:e("education"),skills:e("skills"),xp:e("experience"),projects:e("projects")};a.default.previousCommands.push(new d("type 'show ["+s.getCommand("show")[0].params+"]'","warning"))},email:function(){for(var e="",t=1;t<u.length;t++)e+=" "+u[t];window.open("mailto:hi@johnsylvain.me?subject="+e)},social:function(){var e=function(e){return function(){window.open(a.default.data.contact.social[e])}};if(1!==u.length)return{github:e("github"),linkedin:e("linkedin")};a.default.previousCommands.push(new d("type 'social ["+s.getCommand("social")[0].params+"]'","warning"))},rm:function(){if(1!==u.length)return{"-rf":function(){var e=[document.getElementById("wrapper"),document.getElementsByClassName("trash")];document.getElementById("command-input").disabled=!0,e.forEach(function(e,t){Array.from(e)[0]?Array.from(e).forEach(function(e){e.classList.add("crash")}):e.classList.add("crash")}),window.setTimeout(function(){document.getElementById("command-input").disabled=!1,e.forEach(function(e,t){Array.from(e)[0]?Array.from(e).forEach(function(e){e.classList.remove("crash")}):e.classList.remove("crash")}),document.getElementById("command-input").focus()},4e3)}};a.default.previousCommands.push(new d("error","error"))}};if(a.default.enteredCommands.pointer=0,a.default.enteredCommands.currentCommand="",t.default.emit("resumeContentViewRender",null),1===u.length)r[u[0]]();else if("email"===u[0])r[u[0]]();else if(u.length>1){var m=r[u[0]]();m[u[1]]?m[u[1]]():a.default.previousCommands.push(new d(u[1]+" is not a proper parameter of '"+u[0]+"'","error"))}}};exports.default=s;
},{"../utils/events":21,"../data":28}],25:[function(require,module,exports) {
"use strict";function e(e){"string"!=typeof e&&(e=JSON.stringify(e,null,2));return(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"})}function t(e){return e.replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g,function(e){return'<a href="'+e.replace("</span>",String.empty)+'" target="_blank">'+e+"</a>"})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.textToJSON=e,exports.findUrls=t;
},{}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(e,t){for(var r,n=arguments.length,o=Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return{nodeName:e,attributes:t||{},children:(r=[]).concat.apply(r,o)}}function r(e){if("string"==typeof e)return document.createTextNode(e);var t=document.createElement(e.nodeName);for(var n in e.attributes)/^on/.test(n)?t.addEventListener(n.slice(2).toLowerCase(),e.attributes[n]):"className"===n?t.setAttribute("class",e.attributes[n]):"__html"===n?t.innerHTML=e.attributes[n]:t.setAttribute(n,e.attributes[n]);for(var o=0;o<e.children.length;o++)t.appendChild(r(e.children[o]));return t}function n(t,r){return(void 0===t?"undefined":e(t))!==(void 0===r?"undefined":e(r))||"string"==typeof t&&t!==r||t.nodeName!==r.nodeName||t.attributes&&t.attributes.forceUpdate}function o(e,t,i){var d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(i)if(t){if(n(t,i))e.replaceChild(r(t),e.childNodes[d]);else if(t.nodeName)for(var l=t.children.length,a=i.children.length,s=0;s<l||s<a;s++)o(e.childNodes[d],t.children[s],i.children[s],s)}else e.removeChild(e.childNodes[d]);else e.appendChild(r(t));return t}exports.h=t,exports.render=o;
},{}],23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),r=require("../controller"),t=c(r),n=require("../utils/events"),u=c(n),i=require("../utils/filters"),l=s(i),a=require("../utils/helpers"),o=require("../utils/dom");function s(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function c(e){return e&&e.__esModule?e:{default:e}}function f(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var d=function(){function r(){f(this,r),this.vdom=null,this.render(),this.bindEvents()}return e(r,[{key:"bindEvents",value:function(){var e=this;u.default.on("resumeContentViewRender",function(r){e.render()})}},{key:"render",value:function(){var e=t.default.getCurrentOutput(),r=(0,a.compose)(function(e){return JSON.stringify(e,null,"   ")},l.textToJSON,l.findUrls)(e),n=(0,o.h)("div",null,(0,o.h)("div",{className:"menu-bar clearfix"},(0,o.h)("div",{className:"menu-bar__circle"}),(0,o.h)("div",{className:"menu-bar__circle"}),(0,o.h)("div",{className:"menu-bar__circle"}),(0,o.h)("span",{className:"menu-bar__title"},t.default.getFileName(),".json")),(0,o.h)("div",{id:"resume-content"},(0,o.h)("pre",{__html:r,forceUpdate:!0})));this.vdom=(0,o.render)(document.querySelector("#resume-wrapper"),n,this.vdom)}}]),r}();exports.default=d;
},{"../controller":27,"../utils/events":21,"../utils/filters":25,"../utils/helpers":22,"../utils/dom":26}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),t=require("../controller"),n=a(t),o=require("../utils/events"),r=a(o),u=require("../utils/dom");function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(){l(this,t),this.vdom=null,this.render(),this.bindEvents()}return e(t,[{key:"bindEvents",value:function(){var e=this;document.getElementById("console-selector").addEventListener("click",function(e){document.getElementById("command-input").focus()}),r.default.on("consoleViewRender",function(t){e.render()})}},{key:"render",value:function(){var e=(0,u.h)("div",null,(0,u.h)("ul",{className:"console__command-list"},n.default.getPreviousCommands().map(function(e){return(0,u.h)("li",{key:e._id,className:"console__command-list-item console__command-list-item--"+e.type},"command"===e.type?"$ "+e.text:e.text)})),(0,u.h)("form",{onSubmit:function(e){e.preventDefault(),n.default.enterCommand(e.target.prompt.value),e.target.prompt.value=""}},(0,u.h)("span",null,"$ "),(0,u.h)("input",{type:"text",name:"prompt",id:"command-input",className:"console__prompt",autocomplete:"off",value:n.default.getEnteredCommands().text,forceUpdate:!0})));this.vdom=(0,u.render)(document.getElementById("commands"),e,this.vdom),document.getElementById("command-input").focus()}}]),t}();exports.default=i;
},{"../controller":27,"../utils/events":21,"../utils/dom":26}],19:[function(require,module,exports) {

},{"./../img/code.svg":["6b2464138e6007a5b2cbb14c4297f053.svg",29],"./../img/close.svg":["a717742370bca4696c981b24803ddc0d.svg",30]}],18:[function(require,module,exports) {
"use strict";var e=require("./utils/router"),t=l(e),n=require("./utils/events"),i=l(n),r=require("./utils/helpers"),o=require("./controller"),s=l(o),c=require("./views/resume"),d=l(c),u=require("./views/console"),a=l(u);function l(e){return e&&e.__esModule?e:{default:e}}require("../styles/style.scss");var f={breakpoint:768,interactiveMode:!1,init:function(){var e=this;s.default.init(),new d.default,new a.default,this.bindEvents(),this.router=new t.default([{path:"/",controller:function(){i.default.emit("switchModes",{flag:!0})}},{path:"/resume",controller:function(){i.default.emit("switchModes",{flag:!1}),window.innerWidth<=e.breakpoint&&e.router.go({route:"#/"})}}]),document.querySelector("#date-selector").textContent=(new Date).getFullYear().toString()},bindEvents:function(){var e=this;window.addEventListener("keyup",this.handleKeypress.bind(this)),document.querySelectorAll(".toggle-btn").forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),e.router.go({route:t.target.href})})}),window.addEventListener("resize",(0,r.throttle)(function(t){window.innerWidth<=e.breakpoint&&e.router.go({route:"#/"})},250,this)),i.default.on("switchModes",function(t){e.switchModes(t.flag)})},handleKeypress:function(e){var t=s.default.getKeyCommands().find(function(t){return t.shortcut?t.code===e.which&&e[t.shortcut]:t.code===e.which});t&&s.default.executeKeypress(t.action)},switchModes:function(e){var t=document.getElementById("toggle-interactive"),n=[document.getElementById("page-wrap"),document.getElementById("landing-wrapper"),document.getElementById("resume-wrapper"),document.getElementById("console-selector"),document.getElementById("container"),document.getElementById("toggle-interactive")];if(e)return n.forEach(function(e){e.classList.remove("interactiveMode"),e.classList.add("nonInteractiveMode")}),this.interactiveMode=!1,void t.setAttribute("href","#/resume");this.interactiveMode?(n.forEach(function(e){e.classList.remove("interactiveMode"),e.classList.add("nonInteractiveMode")}),t.setAttribute("href","#/resume")):(n.forEach(function(e){e.classList.add("interactiveMode"),e.classList.remove("nonInteractiveMode")}),t.setAttribute("href","#/")),this.interactiveMode=!this.interactiveMode}};f.init();
},{"./utils/router":20,"./utils/events":21,"./utils/helpers":22,"./controller":27,"./views/resume":23,"./views/console":24,"../styles/style.scss":19}]},{},[18])