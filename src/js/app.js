import Router from './utils/router.js'
import events from './utils/events'
import { throttle } from './utils/helpers'
import { render } from './utils/vdom'

import actions from './actions'
import resumeView from './views/resume'
import consoleView from './views/console'

import '../styles/style.scss'

const app = {
  breakpoint: 768,
  interactiveMode: false,

  init () {
    this.bindEvents()

    events.emit('consoleViewRender')
    events.emit('resumeContentViewRender')

    document.querySelectorAll('.item').forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('fade-up')
      }, i * 80)

      item.addEventListener('animationend', () => {
        item.style.opacity = 1
        item.classList.remove('fade-up')
      })
    })

    this.router = new Router({
      '/': function () {
        events.emit('switchModes', { flag: true })
        setActiveNavButton('/')
      },
      '/resume': () => {
        events.emit('switchModes', { flag: false })
        setActiveNavButton('/resume')
        if(window.innerWidth <= this.breakpoint)
          this.router.go({ route: '#/' })
      }
    })

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
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault()
        this.router.go({ route: event.target.href })
      })
    })

    document.getElementById('console-selector').addEventListener('click', (e) => {
      document.getElementById('command-input').focus()
    })

    window.addEventListener('resize', throttle((event) => {
      if (window.innerWidth <= this.breakpoint) {
        this.router.go({ route: '#/' })
      }
    }, 250, this))

    window.addEventListener('keyup', (e) => {
      const keyPress = actions.getKeyCommands()
        .find(key => (key.shortcut)
          ? key.code === e.which && e[key.shortcut]
          : key.code === e.which
        )

      if (keyPress && document.activeElement.id === 'command-input')
        actions.executeKeypress(keyPress.action)
    })

    events.on('switchModes', data => {
      this.switchModes(data.flag)
    })

    events.on('consoleViewRender', () => {
      render(
        consoleView.render(),
        document.querySelector('#console-selector')
      )

      document.querySelector('#command-input').focus()
    })

    events.on('resumeContentViewRender',
      render(
        resumeView.render(),
        document.querySelector('#resume-selector')
      )
    )
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
