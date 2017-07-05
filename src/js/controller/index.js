import events from '../utils/events';
import model from '../data';

var controller = {
  init(){
    model.currentOutput = model.defaultMessage;

    events.emit('resumeContentViewInit', null);
    events.emit('consoleViewInit', null);
    events.emit('viewInit', null);

    this.loadResumeData().then(res => {
      model.data = res;
      model.socialProfiles = Object.keys(model.data.contact.social)

      var socialCommand = model.commands.filter(function(command) {
        return command.text === 'social'
      })[0];

      socialCommand.params = model.socialProfiles

    })
    .catch(function(err) {
      console.error(err);
    })

  },

  fetchData(method, url) {
    var xhr;

    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
      }
      catch (e) {
        try {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        catch (e) {}
      }
    }

    return new Promise(function(resolve, reject) {

      xhr.onload = function() {
        if (this.readyState === 4 && this.status === 200) {
          resolve({
            data: JSON.parse(xhr.responseText),
            status: this.status
          });
        } else {
          reject(new Error('Could not retrieve data from: ' + url))
        }
      }

      xhr.onerror = function(e) {
        reject({ error: e })
      };

      xhr.open(method, url, true);
      xhr.send();
    });
  },

  loadResumeData() {
    return new Promise((resolve, reject) => {
      this.fetchData('GET', './data.json')
      .then(res => {
        resolve(res.data.resumeData)
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getDate() {
    return model.date;
  },

  getResumeData() {
    return model.data;
  },

  getDefaultData() {
    return model.defaultMessage;
  },

  getCurrentOutput() {
    return model.currentOutput;
  },

  updateOutput(newOutput) {
    return new Promise((resolve, reject) => {
      model.currentOutput = newOutput;
      resolve();
    })
  },

  executeKeypress(key) {
    if (key === 'UP' || key === 'DOWN') {
      if(key === 'UP' &&
      model.enteredCommands.pointer < model.enteredCommands.data.length) {
        model.enteredCommands.pointer += 1;
      }
      if(key === 'DOWN' && model.enteredCommands.pointer > 0) {
        model.enteredCommands.pointer -= 1;
      }

      let pos = model.enteredCommands.data.length - model.enteredCommands.pointer;
      model.enteredCommands.currentCommand = model.enteredCommands.data[pos];

    }

    if(key === 'CLEAR') {
      this.executeCommand('clear');
    }


    // consoleView.render();
    events.emit('consoleViewRender', null);

  },

  getKeyCommands() {
    return model.keyCommands;
  },

  getEnteredCommands() {
    return model.enteredCommands.currentCommand;
  },

  getCommand(text) {
    return model.commands.filter(c => {
      return c.text === text;
    })
  },

  enterCommand(command) {
    command = command.trim();

    let flag = false;
    let args = command.split(' ');
    if (args[0] !== '') {
      model.previousCommands.push({
        text: command,
        type: 'command'
      });

      let lastCommand = model.enteredCommands.data[model.enteredCommands.data.length - 1];
      if (lastCommand) {
        if(command !== lastCommand.text){
          model.enteredCommands.data.push({
            text: command,
            type: 'command'
          });
        }

      } else {
        model.enteredCommands.data.push({
          text: command,
          type: 'command'
        });
      }
      model.enteredCommands.pointer = 0;


    }

    flag = model.commands.filter(o => {
      return o.text === args[0]
    })

    if (!flag.length) {
      model.previousCommands.push({
        text: 'command not found: ' + args[0],
        type: 'error'
      },
      {
        text: 'to view available commands type: help',
        type: 'response'
      });
    } else {
      this.executeCommand(command);
    }
    // consoleView.render();
    events.emit('consoleViewRender', null);
  },

  executeCommand(command) {
    let _this = this;
    let comArgs = command.split(' ');

    let commands = {
      pwd() {
        if(comArgs.length !== 1) {
          model.previousCommands.push({
            text: "'pwd' does not need any arguments",
            type: 'error'
          });
          // consoleView.render();
          events.emit('consoleViewRender', null);

          return;
        }

        model.previousCommands.push({
          text: window.location.host,
          type: 'response-bold'
        })
      },
      ls() {
        if(comArgs.length !== 1) {
          model.previousCommands.push({
            text: "'ls' does not need any arguments",
            type: 'error'
          });
          // consoleView.render();
          events.emit('consoleViewRender', null);


          return;
        }

        model.previousCommands.push(
          { text: "index.html", type: 'response' },
          { text: "main.js", type: 'response' },
          { text: "style.css", type: 'response' }
        )

      },
      clear(){
        if (comArgs.length !== 1){
          model.previousCommands.push({
            text: "'clear' does not need any arguments",
            type: 'error'
          });
          return;
        }

        model.previousCommands = [];
      },
      help(){
        var commands = model.commands;
        model.previousCommands.push(
          { text: 'Available Commands:', type: 'response-bold'}
        );
        commands.forEach(function(avalCommand, i) {
          if (avalCommand.ignored !== true) {
            var response = '';
            if (avalCommand.params !== null) {
              response = avalCommand.text + ' [' + avalCommand.params.toLocaleString() + ']';
            } else {
              response = avalCommand.text;
            }
            model.previousCommands.push({
              text: response,
              type: 'response'
            });
          }
        })
      },
      open(){

        let openResume = () => {
          _this.updateOutput({resume: model.data}).then(function(res){
            // resumeContentView.render();
            events.emit('resumeContentViewRender', null);

          });
        };

        let pdf = () => {
          window.open("http://johnsylvain.me/resume.pdf");
        }
        if (comArgs.length === 1) {
          model.previousCommands.push({
            text: "type 'open [" + controller.getCommand('open')[0].params + "]'",
            type: 'warning'
          })
        } else {
          return {
            resume: openResume,
            pdf: pdf
          }
        }
      },
      show(){
        let showSection = (section) => {
          return function() {
            var obj = {};
            obj[section] = model.data[section];
            _this.updateOutput(obj).then(function() {
              // resumeContentView.render();
              events.emit('resumeContentViewRender', null);

            })
          }
        }

        if (comArgs.length === 1) {
          model.previousCommands.push({
            text: "type 'show [" + controller.getCommand('show')[0].params + "]'",
            type: 'warning'
          })
        } else {
          return {
            education: showSection('education'),
            skills: showSection('skills'),
            xp: showSection('experience'),
            projects: showSection('projects')
          }
        }
      },
      email(){
        let subject = '';
        for (var i = 1; i < comArgs.length; i++) {
          subject += (' ' + comArgs[i])
        };
        var link = 'mailto:hi@johnsylvain.me?subject=' + subject;
        window.open(link);
      },
      social(){

        let openLink = function(site){
          return function(){
            window.open(model.data.contact.social[site])
          }
        }

        if (comArgs.length === 1) {
          model.previousCommands.push({
            text: "type 'social [" + controller.getCommand('social')[0].params + "]'",
            type: 'warning'
          })
        } else {
          return{
            github: openLink('github'),
            linkedin: openLink('linkedin')
          }
        }
      },
      rm() {
        let rf = () => {
          var targets = [
            document.getElementById('wrapper'),
            document.getElementsByClassName('trash'),
          ];

          document.getElementById('command-input').disabled = true;
          targets.forEach(function(el, i) {
            if(Array.from(el)[0]){
              Array.from(el).forEach(function(e) {
                e.classList.add('crash');
              })
            } else {
              el.classList.add('crash');

            }
          })
          window.setTimeout(function(){
            document.getElementById('command-input').disabled = false;

            targets.forEach(function(el, i) {
              if(Array.from(el)[0]){
                Array.from(el).forEach(function(e) {
                  e.classList.remove('crash');
                })
              } else {
                el.classList.remove('crash');
              }
            })

            document.getElementById('command-input').focus();

          }, 4000)
        }

        if (comArgs.length === 1) {
          model.previousCommands.push({
            text: "error",
            type: 'error'
          });
        } else {
          return {
            '-rf': rf
          }

        }
      },

      weather() {

        if (comArgs.length !== 1) {
          model.previousCommands.push({
            text: 'error: \'weather\' does not take any parameters',
            type: 'error'
          })
          return;
        }

        function getUserLocationPromise() {
          return new Promise((resolve, reject) => {

            _this.fetchData('GET', 'http://ip-api.com/json').then(res => {
              var crd = {
                lat: res.data.lat,
                lon: res.data.lon,
                name: res.data.city,
                country: res.data.countryCode
              }
              resolve(crd);
            })
            .catch(err => {
              reject(err);
            })
          })
        }

        function getUserWeatherPromise(lat, lon) {
          return new Promise((resolve, reject) => {
            var key = '2f4d666f6f04dbad2164175736a5a2dc';
            var url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' +
            lat + '&lon=' + lon + '&APPID=' + key;

            _this.fetchData('GET', url)
            .then(function(res) {
              resolve(res.data);
            })
            .catch(err => {
              reject(err);
            });
          })
        }

        let prompt = document.getElementById('command-prompt');
        let input = document.getElementById('command-input');

        model.previousCommands.push(
          { text: 'Getting IP Address...',	type: 'response-bold'}
        )
        prompt.style.display = 'none'

        getUserLocationPromise().then(crd => {

          model.previousCommands.push({
            text: 'Latitude: ' + crd.lat,
            type: 'response'
          },{
            text: 'Longitude: ' + crd.lon,
            type: 'response'
          });
          // consoleView.render();
          events.emit('consoleViewRender', null);


          getUserWeatherPromise(crd.lat, crd.lon).then(res => {
            model.previousCommands.push(
              {text: '------', type: 'response'},
              {text: 'Getting weather data...', type: 'response-bold'},
              {text: 'Weather for: ' + crd.name + ', ' + crd.country, type: 'response'},
              {text: 'Temperature: ' + res.main.temp, type: 'response'},
              {text: 'Conditions: ' + res.weather[0].description, type: 'response'}
            );

            prompt.style.display = 'block';
            input.focus();

            // consoleView.render();
            events.emit('consoleViewRender', null);

          })
          .catch(function(err) {
            // console.error(err);
          })
        })
        .catch(err => {
          console.log("Error: " + err)
          model.previousCommands.push(
            { text: "Error: Could not retrieve IP", type: 'error'},
            { text: "Try disabling your ad blocker", type: 'response'}
          );
          // consoleView.render();
          events.emit('resumeContentViewRender', null);

          prompt.style.display = 'block';
          input.focus();
        })


      }
    }

    model.enteredCommands.pointer = 0;
    model.enteredCommands.currentCommand = '';
    // consoleView.render();
    events.emit('resumeContentViewRender', null);


    if (comArgs.length === 1) {
      commands[comArgs[0]]();
    } else if(comArgs[0] === 'email'){
      commands[comArgs[0]]();
    } else if(comArgs[0] === 'weather'){
      commands[comArgs[0]]();
    } else if (comArgs.length > 1){
      var subCommand = commands[comArgs[0]]();
      if(subCommand[comArgs[1]]) {
        subCommand[comArgs[1]]()
      } else {
        model.previousCommands.push({
          text: comArgs[1] + ' is not a proper parameter of \'' + comArgs[0] + '\'',
          type: 'error'
        })
      }
    }

  },

  getPreviousCommands(){
    return model.previousCommands;
  },

  getFileName(){
    let current = model.currentOutput;
    let fileName = Object.keys(current)[0];
    return fileName;
  }

}

export default controller;