import controller from '../controller'
import events from '../utils/events'
import * as filters from '../utils/filters'
import { compose } from '../utils/helpers'
import { h, render } from '../utils/dom'

events.on('resumeContentViewInit', data => {
  resumeContentView.init()
})
events.on('resumeContentViewRender', data => {
  resumeContentView.render()
})

const resumeContentView = {
  init () {
    this.vdom = null
    this.render()
  },

  render () {
    const data = controller.getCurrentOutput()
    const json = compose(
      (d) => JSON.stringify(d, null, '   '),
      filters.textToJSON,
      filters.findUrls
    )(data)

    const vnodes = (
      <div>
        <div class="menu-bar clearfix">
          <div class="menu-bar__circle"></div>
          <div class="menu-bar__circle"></div>
          <div class="menu-bar__circle"></div>
          <span class="menu-bar__title">
            {controller.getFileName()}.json
          </span>
        </div>
        <div id="resume-content">
          <pre __html={json} forceUpdate={true}></pre>
        </div>
      </div>
    )

    this.vdom = render(
      document.querySelector('#resume-wrapper'), 
      vnodes, 
      this.vdom
    )
  }
}

export default resumeContentView
