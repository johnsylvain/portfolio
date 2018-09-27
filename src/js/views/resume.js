import actions from '../actions';
import { compose, textToJSON, findUrls } from '../utils/helpers';
import { h } from '../utils/vdom';

export default {
  render() {
    const json = compose(
      d => JSON.stringify(d, null, '  '),
      textToJSON,
      findUrls
    )(actions.getCurrentOutput());

    return (
      <div>
        <pre dangerouslySetInnerHTML={{ __html: json }} />
      </div>
    );
  }
};
