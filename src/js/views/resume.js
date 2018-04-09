import actions from '../actions'
import events from '../utils/events'
import * as filters from '../utils/filters'
import { compose } from '../utils/helpers'
import { h } from '../utils/vdom'

export default {
  render () {
    const data = actions.getCurrentOutput()
    const json = compose(
      (d) => JSON.stringify(d, null, '  '),
      filters.textToJSON,
      filters.findUrls
    )(data)

    return (
      <div>
        <pre dangerouslySetInnerHTML={{ __html: json }}></pre>
      </div>
    )
  }
}
