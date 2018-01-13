import controller from '../controller'
import events from '../utils/events'
import * as filters from '../utils/filters'
import { compose } from '../utils/helpers'

events.on('resumeContentViewInit', data => {
  resumeContentView.init()
})
events.on('resumeContentViewRender', data => {
  resumeContentView.render()
})

const resumeContentView = {
  init () {
    this.resumeContainerElem = document.getElementById('resume-code')
    this.fileNameElem = document.getElementById('file-name')
    this.render()
  },

  format (data) {
    return compose(
      (d) => JSON.stringify(d, null, '   '),
      filters.textToJSON,
      filters.findUrls
    )(data)
  },

  render () {
    const data = controller.getCurrentOutput()
    const json = this.format(data)

    this.resumeContainerElem.innerHTML = json
    this.fileNameElem.textContent = controller.getFileName()
  }
}

export default resumeContentView
