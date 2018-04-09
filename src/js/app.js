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

    document.querySelectorAll('.item').forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('fade-up')
      }, i * 80)

      item.addEventListener('animationend', () => {
        item.style.opacity = 1
        item.classList.remove('fade-up')
      })
    })

    this.bindEvents()
    this.router = new Router([
      {
        path: '/',
        controller: function() {
          events.emit('switchModes', { flag: true })
          setActiveNavButton('/')
        }
      },
      {
        path: '/resume',
        controller: () => {
          events.emit('switchModes', { flag: false })
          setActiveNavButton('/resume')
          if (window.innerWidth <= this.breakpoint)
            this.router.go({ route: '#/' })
        }
      }
    ])

    function setActiveNavButton (path) {
      const children = Array.from(document.querySelector('.nav').children)
      
      children
        .forEach(a => a.classList.remove('active'))

      children
        .find(a => a.getAttribute('href') === `#${path}`)
        .classList.add('active')
    }

    document.querySelector('#date-selector').textContent = new Date().getFullYear().toString()
  },

  bindEvents () {
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
    const targets = [
      document.querySelector('.wrap'),
      document.getElementById('resume-selector'),
      document.getElementById('console-selector'),
      // document.getElementById('container-selector'),
    ]

    if (flag) {
      targets.forEach(t => {
        t.classList.remove('interactive-mode')
      })
      this.interactiveMode = false
      return
    }

    if (!this.interactiveMode) {
      targets.forEach(t => {
        t.classList.add('interactive-mode')
      })
    } else {
      targets.forEach(t => {
        t.classList.remove('interactive-mode')
      })
    }
    this.interactiveMode = !this.interactiveMode
  }
}

app.init()
