import Router from './utils/router.js'
import events from './utils/events'
import { throttle } from './utils/helpers'

import controller from './controller'
import resumeView from './views/resume'
import consoleView from './views/console'

import '../styles/style.scss'

const app = {
  breakpoint: 768,
  interactiveMode: false,

  init () {
    controller.init()
    resumeView.init()
    consoleView.init()

    this.bindEvents()
    this.router = new Router([
      {
        path: '/',
        controller: function() {
          events.emit('switchModes', { flag: true })
        }
      },
      {
        path: '/resume',
        controller: () => {
          events.emit('switchModes', { flag: false })
          if(window.innerWidth <= this.breakpoint)
            this.router.go({ route: '#/' })
        }
      }
    ])

    document.querySelector('#date-selector').textContent = new Date().getFullYear().toString()
  },

  bindEvents () {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault()
        this.router.go({ route: event.target.href })
      })
    })

    window.addEventListener('resize', throttle((event) => {
      if (window.innerWidth <= this.breakpoint) {
        this.router.go({ route: '#/' })
      }
    }, 250, this))

    events.on('switchModes', data => {
      this.switchModes(data.flag)
    })
  },

  switchModes (flag) {
    const btn = document.getElementById('toggle-interactive')
    const targets = [
      document.getElementById('page-wrap'),
      document.getElementById('landing-wrapper'),
      document.getElementById('resume-selector'),
      document.getElementById('console-selector'),
      document.getElementById('container-selector'),
      document.getElementById('toggle-interactive')
    ]

    if (flag) {
      targets.forEach(t => {
        t.classList.remove('interactive-mode')
      })
      this.interactiveMode = false
      btn.setAttribute('href', '#/resume')
      return
    }

    if (!this.interactiveMode) {
      targets.forEach(t => {
        t.classList.add('interactive-mode')
      })
      btn.setAttribute('href', '#/')
    } else {
      targets.forEach(t => {
        t.classList.remove('interactive-mode')
      })
      btn.setAttribute('href', '#/resume')
    }
    this.interactiveMode = !this.interactiveMode
  }
}

app.init()
