import actions from '../actions'
import { compose, textToJSON, findUrls } from '../utils/helpers'
import { h } from '../utils/vdom'

export default {
  render () {
    const data = actions.getCurrentOutput()
    const json = compose(
      (d) => JSON.stringify(d, null, '  '),
      textToJSON,
      findUrls
    )(data)

    return (
      <div>
        <pre dangerouslySetInnerHTML={{ __html: json }}></pre>
      </div>
    )
  }
}
