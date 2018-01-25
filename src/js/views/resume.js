import controller from '../controller'
import events from '../utils/events'
import * as filters from '../utils/filters'
import { compose } from '../utils/helpers'
import { h, render } from '../utils/vdom'

export default class ResumeView {
  constructor () {
    this.vdom = null
    this.render()
    this.bindEvents()
  }
  
  bindEvents () {
    events.on('resumeContentViewRender', data => {
      this.render()
    })
  }

  render () {
    const data = controller.getCurrentOutput()
    const json = compose(
      (d) => JSON.stringify(d, null, '   '),
      filters.textToJSON,
      filters.findUrls
    )(data)

    const vnodes = (
      <div>
        <div className="menu-bar clearfix">
          <div className="menu-bar__circle"></div>
          <div className="menu-bar__circle"></div>
          <div className="menu-bar__circle"></div>
          <span className="menu-bar__title">
            {controller.getFileName()}.json
          </span>
        </div>
        <div id="resume-content">
          <pre __html={json}></pre>
        </div>
      </div>
    )

    render(
      document.querySelector('#resume-wrapper'), 
      vnodes, 
      this.vdom
    )
    this.vdom = vnodes
  }
}
