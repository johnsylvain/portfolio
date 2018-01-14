require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}();function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function o(e){var r=this;t(this,o),this.routes={},e.forEach(function(e){r.addRoute(e.path,e.controller)}),window.addEventListener("hashchange",this.go.bind(this)),window.addEventListener("load",this.go.bind(this))}return e(o,[{key:"go",value:function(e){e.route&&history.replaceState(void 0,void 0,e.route);var t=location.hash.slice(1)||"/",o=this.routes[t];o&&o.controller?o.controller():(this.routes["/"].controller(),history.replaceState(void 0,void 0,"#/"))}},{key:"addRoute",value:function(e,t){this.routes[e]={controller:t}}}]),o}();exports.default=o;
},{}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={events:{},on:function(e,t){(this.events[e]||(this.events[e]=[])).push(t)},off:function(e,t){this.events[e].splice(this.events[e].indexOf(t)>>>0,1)},emit:function(e,t,s){(this.events[e]||[]).map(function(e){e.call(s,t)})}};exports.default=e;
},{}],25:[function(require,module,exports) {
"use strict";function t(t,e,r){var n=!1;return function(){n||(t.apply(r,arguments),n=!0,setTimeout(function(){n=!1},e))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.throttle=t;var e=exports.compose=function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}};
},{}],38:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={keyCommands:[{code:38,shortcut:null,action:"UP"},{code:40,shortcut:null,action:"DOWN"},{code:75,shortcut:"ctrlKey",action:"CLEAR"}],previousCommands:[{text:"type 'help' to view commands",type:"response"}],enteredCommands:{data:[],currentCommand:"",pointer:0},currentOutput:null,socialProfiles:[],commands:[{text:"",params:null},{text:"help",params:null},{text:"clear",params:null},{text:"pwd",params:null,ignored:!0},{text:"ls",params:null,ignored:!0},{text:"email",params:["<subject>"]},{text:"open",params:["resume","pdf"]},{text:"show",params:["education","skills","xp","projects"]},{text:"social",params:["github","linkedin"]},{text:"rm",params:["-rf"],ignored:!0}],defaultMessage:{welcomeMessage:["welcome to my interactive resume!","to view my resume, type 'open resume' in the terminal to the left","type 'help' to view other commands"]},data:{}};exports.default=e;
},{}],37:[function(require,module,exports) {
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
},{}],36:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../utils/events"),t=r(e),n=require("../data"),a=r(n),u=require("../../data.json"),o=r(u);function r(e){return e&&e.__esModule?e:{default:e}}var d={init:function(){a.default.currentOutput=a.default.defaultMessage,t.default.emit("resumeContentViewInit",null),t.default.emit("consoleViewInit",null),a.default.data=o.default.resumeData,a.default.socialProfiles=Object.keys(a.default.data.contact.social)},getResumeData:function(){return a.default.data},getDefaultData:function(){return a.default.defaultMessage},getCurrentOutput:function(){return a.default.currentOutput},updateOutput:function(e){return new Promise(function(t,n){a.default.currentOutput=e,t()})},executeKeypress:function(e){if("UP"===e||"DOWN"===e){"UP"===e&&a.default.enteredCommands.pointer<a.default.enteredCommands.data.length&&(a.default.enteredCommands.pointer+=1),"DOWN"===e&&a.default.enteredCommands.pointer>0&&(a.default.enteredCommands.pointer-=1);var n=a.default.enteredCommands.data.length-a.default.enteredCommands.pointer;a.default.enteredCommands.currentCommand=a.default.enteredCommands.data[n]}"CLEAR"===e&&this.executeCommand("clear"),t.default.emit("consoleViewRender",null)},getKeyCommands:function(){return a.default.keyCommands},getEnteredCommands:function(){return a.default.enteredCommands.currentCommand},getCommand:function(e){return a.default.commands.filter(function(t){return t.text===e})},enterCommand:function(e){var n=(e=e.trim()).split(" ");if(""!==n[0]){a.default.previousCommands.push({text:e,type:"command"});var u=a.default.enteredCommands.data[a.default.enteredCommands.data.length-1];u?e!==u.text&&a.default.enteredCommands.data.push({text:e,type:"command"}):a.default.enteredCommands.data.push({text:e,type:"command"}),a.default.enteredCommands.pointer=0}a.default.commands.filter(function(e){return e.text===n[0]}).length?this.executeCommand(e):a.default.previousCommands.push({text:"command not found: "+n[0],type:"error"},{text:"to view available commands type: help",type:"response"}),t.default.emit("consoleViewRender",null)},executeCommand:function(e){var n=this,u=e.split(" "),o={pwd:function(){if(1!==u.length)return a.default.previousCommands.push({text:"'pwd' does not need any arguments",type:"error"}),void t.default.emit("consoleViewRender",null);a.default.previousCommands.push({text:window.location.host,type:"bold"})},ls:function(){if(1!==u.length)return a.default.previousCommands.push({text:"'ls' does not need any arguments",type:"error"}),void t.default.emit("consoleViewRender",null);a.default.previousCommands.push({text:"index.html",type:"response"},{text:"main.js",type:"response"},{text:"style.css",type:"response"})},clear:function(){1===u.length?a.default.previousCommands=[]:a.default.previousCommands.push({text:"'clear' does not need any arguments",type:"error"})},help:function(){var e=a.default.commands;a.default.previousCommands.push({text:"Available Commands:",type:"bold"}),e.forEach(function(e,t){if(!0!==e.ignored&&""!==e.text){var n=null!==e.params?"- "+e.text+" ["+e.params.toLocaleString()+"]":"- "+e.text;a.default.previousCommands.push({text:n,type:"response"})}})},open:function(){if(1!==u.length)return{resume:function(){n.updateOutput({resume:a.default.data}).then(function(e){t.default.emit("resumeContentViewRender",null)})},pdf:function(){window.open("http://johnsylvain.me/resume.pdf")}};a.default.previousCommands.push({text:"type 'open ["+d.getCommand("open")[0].params+"]'",type:"warning"})},show:function(){var e=function(e){return function(){var u={};u[e]=a.default.data[e],n.updateOutput(u).then(function(){t.default.emit("resumeContentViewRender",null)})}};if(1!==u.length)return{education:e("education"),skills:e("skills"),xp:e("experience"),projects:e("projects")};a.default.previousCommands.push({text:"type 'show ["+d.getCommand("show")[0].params+"]'",type:"warning"})},email:function(){for(var e="",t=1;t<u.length;t++)e+=" "+u[t];window.open("mailto:hi@johnsylvain.me?subject="+e)},social:function(){var e=function(e){return function(){window.open(a.default.data.contact.social[e])}};if(1!==u.length)return{github:e("github"),linkedin:e("linkedin")};a.default.previousCommands.push({text:"type 'social ["+d.getCommand("social")[0].params+"]'",type:"warning"})},rm:function(){if(1!==u.length)return{"-rf":function(){var e=[document.getElementById("wrapper"),document.getElementsByClassName("trash")];document.getElementById("command-input").disabled=!0,e.forEach(function(e,t){Array.from(e)[0]?Array.from(e).forEach(function(e){e.classList.add("crash")}):e.classList.add("crash")}),window.setTimeout(function(){document.getElementById("command-input").disabled=!1,e.forEach(function(e,t){Array.from(e)[0]?Array.from(e).forEach(function(e){e.classList.remove("crash")}):e.classList.remove("crash")}),document.getElementById("command-input").focus()},4e3)}};a.default.previousCommands.push({text:"error",type:"error"})}};if(a.default.enteredCommands.pointer=0,a.default.enteredCommands.currentCommand="",t.default.emit("resumeContentViewRender",null),1===u.length)o[u[0]]();else if("email"===u[0])o[u[0]]();else if(u.length>1){var r=o[u[0]]();r[u[1]]?r[u[1]]():a.default.previousCommands.push({text:u[1]+" is not a proper parameter of '"+u[0]+"'",type:"error"})}},getPreviousCommands:function(){return a.default.previousCommands},getFileName:function(){return Object.keys(a.default.currentOutput)[0]}};exports.default=d;
},{"../utils/events":24,"../data":38,"../../data.json":37}],34:[function(require,module,exports) {
"use strict";function e(e){"string"!=typeof e&&(e=JSON.stringify(e,null,2));return(e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(e){var t="number";return/^"/.test(e)?t=/:$/.test(e)?"key":"string":/true|false/.test(e)?t="boolean":/null/.test(e)&&(t="null"),'<span class="'+t+'">'+e+"</span>"})}function t(e){return e.replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g,function(e){return'<a href="'+e.replace("</span>",String.empty)+'" target="_blank">'+e+"</a>"})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.textToJSON=e,exports.findUrls=t;
},{}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../controller"),t=s(e),n=require("../utils/events"),r=s(n),i=require("../utils/filters"),u=o(i),l=require("../utils/helpers");function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function s(e){return e&&e.__esModule?e:{default:e}}r.default.on("resumeContentViewInit",function(e){f.init()}),r.default.on("resumeContentViewRender",function(e){f.render()});var f={init:function(){this.resumeContainerElem=document.getElementById("resume-code"),this.fileNameElem=document.getElementById("file-name"),this.render()},format:function(e){return(0,l.compose)(function(e){return JSON.stringify(e,null,"   ")},u.textToJSON,u.findUrls)(e)},render:function(){var e=t.default.getCurrentOutput(),n=this.format(e);this.resumeContainerElem.innerHTML=n,this.fileNameElem.textContent=t.default.getFileName()}};exports.default=f;
},{"../controller":36,"../utils/events":24,"../utils/filters":34,"../utils/helpers":25}],35:[function(require,module,exports) {
"use strict";function e(e,t){for(var r=arguments.length,n=Array(r>2?r-2:0),a=2;a<r;a++)n[a-2]=arguments[a];return{nodeName:e,attributes:t,children:n}}function t(e){if("string"==typeof e)return document.createTextNode(e);var r=document.createElement(e.nodeName);for(var n in Object(e.attributes))r.setAttribute("className"===n?"class":n,e.attributes[n]);for(var a=0;a<e.children.length;a++)r.appendChild(t(e.children[a]));return r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=e,exports.render=t;
},{}],27:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../controller"),t=i(e),n=require("../utils/events"),o=i(n),r=require("../utils/dom");function i(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}o.default.on("consoleViewInit",function(e){s.init()}),o.default.on("consoleViewRender",function(e){s.render()});var s={init:function(){var e=this;this.promptContainer=document.getElementById("command-prompt-container"),this.listItemsContainer=document.getElementById("commands"),this.consoleElement=document.getElementById("console-selector"),this.promptInputElement=document.getElementById("command-input"),this.consoleElement.addEventListener("click",function(){e.promptInputElement.focus()}),this.promptContainer.addEventListener("submit",function(e){e.preventDefault(),t.default.enterCommand(e.target.prompt.value),e.target.prompt.value=""}),this.render()},render:function(){this.listItemsContainer.innerHTML="";var e=t.default.getPreviousCommands();this.consoleElement.scrollTop=this.consoleElement.scrollHeight,t.default.getEnteredCommands()?this.promptInputElement.value=t.default.getEnteredCommands().text:this.promptInputElement.value="";var n=r.h.apply(void 0,["ul",{className:"console__command-list"}].concat(l(e.map(function(e){return(0,r.h)("li",{className:"console__command-list-item console__command-list-item--"+e.type},"command"===e.type?"$ "+e.text:e.text)}))));this.listItemsContainer.appendChild((0,r.render)(n))}};exports.default=s;
},{"../controller":36,"../utils/events":24,"../utils/dom":35}],22:[function(require,module,exports) {

},{"./../img/code.svg":["6b2464138e6007a5b2cbb14c4297f053.svg",28],"./../img/close.svg":["a717742370bca4696c981b24803ddc0d.svg",29]}],21:[function(require,module,exports) {
"use strict";var e=require("./utils/router"),t=l(e),n=require("./utils/events"),i=l(n),r=require("./utils/helpers"),o=require("./controller"),s=l(o),d=require("./views/resumeContent"),c=l(d),a=require("./views/console"),u=l(a);function l(e){return e&&e.__esModule?e:{default:e}}require("../styles/style.scss");var f={pageWidth:window.innerWidth,breakpoint:768,interactiveMode:!1,init:function(){var e=this;s.default.init();var n=[{path:"/",controller:function(){i.default.emit("switchModes",{flag:!0})}},{path:"/resume",controller:function(){i.default.emit("switchModes",{flag:!1}),window.innerWidth<=e.breakpoint&&o.go({route:"#/"})}}],o=new t.default(n);window.addEventListener("keyup",this.handleKeypress.bind(this)),Array.from(document.getElementsByClassName("toggle-btn")).forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),o.go({route:e.target.href})})}),window.addEventListener("resize",(0,r.throttle)(function(t){window.innerWidth<=e.breakpoint&&o.go({route:"#/"})},250,this)),i.default.on("switchModes",function(t){e.switchModes(t.flag)})},handleKeypress:function(e){var t=s.default.getKeyCommands().find(function(t){return t.shortcut?t.code===e.which&&e[t.shortcut]:t.code===e.which});t&&s.default.executeKeypress(t.action)},switchModes:function(e){var t=document.getElementById("toggle-interactive"),n=[document.getElementById("page-wrap"),document.getElementById("landing-wrapper"),document.getElementById("resume-wrapper"),document.getElementById("console-selector"),document.getElementById("container"),document.getElementById("toggle-interactive")];if(e)return n.forEach(function(e){e.classList.remove("interactiveMode"),e.classList.add("nonInteractiveMode")}),this.interactiveMode=!1,void t.setAttribute("href","#/resume");this.interactiveMode?(n.forEach(function(e){e.classList.remove("interactiveMode"),e.classList.add("nonInteractiveMode")}),t.setAttribute("href","#/resume")):(n.forEach(function(e){e.classList.add("interactiveMode"),e.classList.remove("nonInteractiveMode")}),t.setAttribute("href","#/")),this.interactiveMode=!this.interactiveMode}};f.init();
},{"./utils/router":23,"./utils/events":24,"./utils/helpers":25,"./controller":36,"./views/resumeContent":26,"./views/console":27,"../styles/style.scss":22}]},{},[21])