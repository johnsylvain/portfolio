import controller from '../controller'
import events from '../utils/events'
import * as filters from '../utils/filters'
import { compose } from '../utils/helpers'
import { h, render } from '../utils/vdom'

export default {
  init () {
    this.bindEvents()
    this.render()
  },

  bindEvents () {
    events.on('resumeContentViewRender', data => {
      this.render()
    })
  },

  render () {
    const data = controller.getCurrentOutput()
    const json = compose(
      (d) => JSON.stringify(d, null, '  '),
      filters.textToJSON,
      filters.findUrls
    )(data)

    const Resume = () =>
      <div>
        <pre dangerouslySetInnerHTML={{ __html: json }}></pre>
      </div>

    render(
      <Resume />, 
      document.querySelector('#resume-selector')
    )
  }
}
