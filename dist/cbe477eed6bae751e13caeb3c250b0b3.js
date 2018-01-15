require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}();function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function o(e){var r=this;t(this,o),this.routes={},e.forEach(function(e){r.addRoute(e.path,e.controller)}),window.addEventListener("hashchange",this.go.bind(this)),window.addEventListener("load",this.go.bind(this))}return e(o,[{key:"go",value:function(e){e.route&&history.replaceState(void 0,void 0,e.route);var t=location.hash.slice(1)||"/",o=this.routes[t];o&&o.controller?o.controller():(this.routes["/"].controller(),history.replaceState(void 0,void 0,"#/"))}},{key:"addRoute",value:function(e,t){this.routes[e]={controller:t}}}]),o}();exports.default=o;
},{}],20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={events:{},on:function(e,t){(this.events[e]||(this.events[e]=[])).push(t)},off:function(e,t){this.events[e].splice(this.events[e].indexOf(t)>>>0,1)},emit:function(e,t,s){(this.events[e]||[]).map(function(e){e.call(s,t)})}};exports.default=e;
},{}],22:[function(require,module,exports) {
"use strict";function e(e,t,r){var n=!1;return function(){n||(e.apply(r,arguments),n=!0,setTimeout(function(){n=!1},t))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.throttle=e;var t=exports.compose=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduce(function(e,t){return t(e)},e)}},r=exports.uuid=function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)})};
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
},{}],34:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../../data.json"),t=a(e);function a(e){return e&&e.__esModule?e:{default:e}}var r={keyCommands:[{code:38,shortcut:null,action:"UP"},{code:40,shortcut:null,action:"DOWN"}],previousCommands:[{text:"type 'help' to view commands",type:"response",_id:1}],enteredCommands:{data:[],currentCommand:"",pointer:0},currentOutput:null,socialProfiles:[],commands:[{text:"",params:null},{text:"help",params:null},{text:"pwd",params:null,ignored:!0},{text:"ls",params:null,ignored:!0},{text:"email",params:["<subject>"]},{text:"open",params:["resume","pdf"]},{text:"show",params:["education","skills","xp","projects"]},{text:"social",params:["github","linkedin"]},{text:"rm",params:["-rf"],ignored:!0}],defaultMessage:{welcomeMessage:["welcome to my interactive resume!","to view my resume, type 'open resume' in the terminal to the left","type 'help' to view other commands"]},data:t.default.resumeData};exports.default=r;
},{"../../data.json":35}],31:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../utils/events"),t=o(e),n=require("../utils/helpers"),a=require("../data"),u=o(a);function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function e(t,a){d(this,e),this.text=t,this.type=a,this._id=(0,n.uuid)()},i={init:function(){u.default.currentOutput=u.default.defaultMessage,t.default.emit("resumeContentViewInit",null),t.default.emit("consoleViewInit",null),u.default.socialProfiles=Object.keys(u.default.data.contact.social)},getResumeData:function(){return u.default.data},getDefaultData:function(){return u.default.defaultMessage},getCurrentOutput:function(){return u.default.currentOutput},updateOutput:function(e){u.default.currentOutput=e},executeKeypress:function(e){if("UP"===e||"DOWN"===e){"UP"===e&&u.default.enteredCommands.pointer<u.default.enteredCommands.data.length&&(u.default.enteredCommands.pointer+=1),"DOWN"===e&&u.default.enteredCommands.pointer>0&&(u.default.enteredCommands.pointer-=1);var n=u.default.enteredCommands.data.length-u.default.enteredCommands.pointer;u.default.enteredCommands.currentCommand=u.default.enteredCommands.data[n]}"CLEAR"===e&&this.executeCommand("clear"),t.default.emit("consoleViewRender",null)},getKeyCommands:function(){return u.default.keyCommands},getEnteredCommands:function(){return u.default.enteredCommands.currentCommand?u.default.enteredCommands.currentCommand:{text:""}},getCommand:function(e){return u.default.commands.filter(function(t){return t.text===e})},getPreviousCommands:function(){return u.default.previousCommands},getFileName:function(){return Object.keys(u.default.currentOutput)[0]},enterCommand:function(e){var n=(e=e.trim()).split(" ");if(""!==n[0]){var a=new s(e,"command");u.default.previousCommands.push(a);var o=u.default.enteredCommands.data[u.default.enteredCommands.data.length-1];o?e!==o.text&&u.default.enteredCommands.data.push(a):u.default.enteredCommands.data.push(a),u.default.enteredCommands.pointer=0}u.default.commands.filter(function(e){return e.text===n[0]}).length?this.executeCommand(e):u.default.previousCommands.push(new s("command not found: "+n[0],"error"),new s("to view available commands type: help","response")),t.default.emit("consoleViewRender",null)},executeCommand:function(e){var n=this,a=e.split(" "),o={pwd:function(){if(1!==a.length)return u.default.previousCommands.push(new s("'pwd' does not need any arguments","error")),void t.default.emit("consoleViewRender",null);u.default.previousCommands.push(new s(window.location.host,"bold"))},ls:function(){if(1!==a.length)return u.default.previousCommands.push(new s("'ls' does not need any arguments","error")),void t.default.emit("consoleViewRender",null);u.default.previousCommands.push(new s("index.html","response"),new s("app.js","response"),new s("style.css","response"))},clear:function(){1===a.length?u.default.previousCommands=[]:u.default.previousCommands.push(new s("'clear' does not need any arguments","error"))},help:function(){var e=u.default.commands;u.default.previousCommands.push(new s("Available Commands:","bold")),e.forEach(function(e,t){if(!0!==e.ignored&&""!==e.text){var n=null!==e.params?"- "+e.text+" ["+e.params.toLocaleString()+"]":"- "+e.text;u.default.previousCommands.push(new s(n,"response"))}})},open:function(){if(1!==a.length)return{resume:function(){n.updateOutput({resume:u.default.data}),t.default.emit("resumeContentViewRender",null)},pdf:function(){window.open("http://johnsylvain.me/resume.pdf")}};u.default.previousCommands.push(new s("type 'open ["+i.getCommand("open")[0].params+"]'","warning"))},show:function(){var e=function(e){return function(){n.updateOutput(r({},e,u.default.data[e])),t.default.emit("resumeContentViewRender",null)}};if(1!==a.length)return{education:e("education"),skills:e("skills"),xp:e("experience"),projects:e("projects")};u.default.previousCommands.push(new s("type 'show ["+i.getCommand("show")[0].params+"]'","warning"))},email:function(){for(var e="",t=1;t<a.length;t++)e+=" "+a[t];window.open("mailto:hi@johnsylvain.me?subject="+e)},social:function(){var e=function(e){return function(){window.open(u.default.data.contact.social[e])}};if(1!==a.length)return{github:e("github"),linkedin:e("linkedin")};u.default.previousCommands.push(new s("type 'social ["+i.getCommand("social")[0].params+"]'","warning"))},rm:function(){if(1!==a.length)return{"-rf":function(){var e=[document.getElementById("wrapper"),document.getElementsByClassName("trash")];document.getElementById("command-input").disabled=!0,e.forEach(function(e,t){Array.from(e)[0]?Array.from(e).forEach(function(e){e.classList.add("crash")}):e.classList.add("crash")}),window.setTimeout(function(){document.getElementById("command-input").disabled=!1,e.forEach(function(e,t){Array.from(e)[0]?Array.from(e).forEach(function(e){e.classList.remove("crash")}):e.classList.remove("crash")}),document.getElementById("command-input").focus()},4e3)}};u.default.previousCommands.push(new s("error","error"))}};if(u.default.enteredCommands.pointer=0,u.default.enteredCommands.currentCommand="",t.default.emit("resumeContentViewRender",null),1===a.length)o[a[0]]();else if("email"===a[0])o[a[0]]();else if(a.length>1){var d=o[a[0]]();d[a[1]]?d[a[1]]():u.default.previousCommands.push(new s(a[1]+" is not a proper parameter of '"+a[0]+"'","error"))}}};exports.default=i;
},{"../utils/events":20,"../utils/helpers":22,"../data":34}],32:[function(require,module,exports) {
"use strict";function e(e){"string"!=typeof e&&(e=JSON.stringify(e,null,2));return(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"})}function t(e){return e.replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g,function(e){return'<a href="'+e.replace("</span>",String.empty)+'" target="_blank">'+e+"</a>"})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.textToJSON=e,exports.findUrls=t;
},{}],33:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(e,t){for(var r,n=arguments.length,o=Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return{nodeName:e,attributes:t||{},children:(r=[]).concat.apply(r,o)}}function r(e){if("string"==typeof e)return document.createTextNode(e);var t=document.createElement(e.nodeName);for(var n in e.attributes)/^on/.test(n)?t.addEventListener(n.slice(2).toLowerCase(),e.attributes[n]):"className"===n?t.setAttribute("class",e.attributes[n]):"__html"===n?t.innerHTML=e.attributes[n]:t.setAttribute(n,e.attributes[n]);for(var o=0;o<e.children.length;o++)t.appendChild(r(e.children[o]));return t}function n(t,r){return(void 0===t?"undefined":e(t))!==(void 0===r?"undefined":e(r))||"string"==typeof t&&t!==r||t.nodeName!==r.nodeName||t.attributes&&t.attributes.forceUpdate}function o(e,t,i){var d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(i)if(t){if(n(t,i))e.replaceChild(r(t),e.childNodes[d]);else if(t.nodeName)for(var l=t.children.length,a=i.children.length,s=0;s<l||s<a;s++)o(e.childNodes[d],t.children[s],i.children[s],s)}else e.removeChild(e.childNodes[d]);else e.appendChild(r(t));return t}exports.h=t,exports.render=o;
},{}],23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../controller"),r=o(e),t=require("../utils/events"),n=o(t),u=require("../utils/filters"),i=a(u),l=require("../utils/helpers"),s=require("../utils/dom");function a(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function o(e){return e&&e.__esModule?e:{default:e}}n.default.on("resumeContentViewInit",function(e){d.init()}),n.default.on("resumeContentViewRender",function(e){d.render()});var d={init:function(){this.vdom=null,this.render()},render:function(){var e=r.default.getCurrentOutput(),t=(0,l.compose)(function(e){return JSON.stringify(e,null,"   ")},i.textToJSON,i.findUrls)(e),n=(0,s.h)("div",null,(0,s.h)("div",{className:"menu-bar clearfix"},(0,s.h)("div",{className:"menu-bar__circle"}),(0,s.h)("div",{className:"menu-bar__circle"}),(0,s.h)("div",{className:"menu-bar__circle"}),(0,s.h)("span",{className:"menu-bar__title"},r.default.getFileName(),".json")),(0,s.h)("div",{id:"resume-content"},(0,s.h)("pre",{__html:t,forceUpdate:!0})));this.vdom=(0,s.render)(document.querySelector("#resume-wrapper"),n,this.vdom)}};exports.default=d;
},{"../controller":31,"../utils/events":20,"../utils/filters":32,"../utils/helpers":22,"../utils/dom":33}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../controller"),t=u(e),n=require("../utils/events"),o=u(n),m=require("../utils/dom");function u(e){return e&&e.__esModule?e:{default:e}}o.default.on("consoleViewInit",function(e){d.init()}),o.default.on("consoleViewRender",function(e){d.render()});var d={init:function(){this.vdom=null,this.render(),this.bindEvents()},bindEvents:function(){document.getElementById("console-selector").addEventListener("click",function(e){document.getElementById("command-input").focus()})},render:function(){var e=(0,m.h)("div",null,(0,m.h)("ul",{className:"console__command-list"},t.default.getPreviousCommands().map(function(e){return(0,m.h)("li",{key:e._id,className:"console__command-list-item console__command-list-item--"+e.type},"command"===e.type?"$ "+e.text:e.text)})),(0,m.h)("form",{onSubmit:function(e){e.preventDefault(),t.default.enterCommand(e.target.prompt.value),e.target.prompt.value=""}},(0,m.h)("span",null,"$ "),(0,m.h)("input",{type:"text",name:"prompt",id:"command-input",className:"console__prompt",autocomplete:"off",value:t.default.getEnteredCommands().text,forceUpdate:!0})));this.vdom=(0,m.render)(document.getElementById("commands"),e,this.vdom),document.getElementById("command-input").focus()}};exports.default=d;
},{"../controller":31,"../utils/events":20,"../utils/dom":33}],19:[function(require,module,exports) {

},{"./../img/code.svg":["6b2464138e6007a5b2cbb14c4297f053.svg",25],"./../img/close.svg":["a717742370bca4696c981b24803ddc0d.svg",26]}],18:[function(require,module,exports) {
"use strict";var e=require("./utils/router"),t=l(e),n=require("./utils/events"),i=l(n),r=require("./utils/helpers"),o=require("./controller"),s=l(o),c=require("./views/resumeContent"),d=l(c),a=require("./views/console"),u=l(a);function l(e){return e&&e.__esModule?e:{default:e}}require("../styles/style.scss");var h={pageWidth:window.innerWidth,breakpoint:768,interactiveMode:!1,init:function(){var e=this;s.default.init();var n=[{path:"/",controller:function(){i.default.emit("switchModes",{flag:!0})}},{path:"/resume",controller:function(){i.default.emit("switchModes",{flag:!1}),window.innerWidth<=e.breakpoint&&o.go({route:"#/"})}}],o=new t.default(n);window.addEventListener("keyup",this.handleKeypress.bind(this)),document.querySelectorAll(".toggle-btn").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),o.go({route:e.target.href})})}),window.addEventListener("resize",(0,r.throttle)(function(t){window.innerWidth<=e.breakpoint&&o.go({route:"#/"})},250,this)),i.default.on("switchModes",function(t){e.switchModes(t.flag)}),document.querySelector("#date-selector").textContent=(new Date).getFullYear().toString()},handleKeypress:function(e){var t=s.default.getKeyCommands().find(function(t){return t.shortcut?t.code===e.which&&e[t.shortcut]:t.code===e.which});t&&s.default.executeKeypress(t.action)},switchModes:function(e){var t=document.getElementById("toggle-interactive"),n=[document.getElementById("page-wrap"),document.getElementById("landing-wrapper"),document.getElementById("resume-wrapper"),document.getElementById("console-selector"),document.getElementById("container"),document.getElementById("toggle-interactive")];if(e)return n.forEach(function(e){e.classList.remove("interactiveMode"),e.classList.add("nonInteractiveMode")}),this.interactiveMode=!1,void t.setAttribute("href","#/resume");this.interactiveMode?(n.forEach(function(e){e.classList.remove("interactiveMode"),e.classList.add("nonInteractiveMode")}),t.setAttribute("href","#/resume")):(n.forEach(function(e){e.classList.add("interactiveMode"),e.classList.remove("nonInteractiveMode")}),t.setAttribute("href","#/")),this.interactiveMode=!this.interactiveMode}};h.init();
},{"./utils/router":21,"./utils/events":20,"./utils/helpers":22,"./controller":31,"./views/resumeContent":23,"./views/console":24,"../styles/style.scss":19}]},{},[18])