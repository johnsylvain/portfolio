import Utils from '../utils/helpers';
import { h } from '../utils/vdom';

export default function Resume({ output }) {
  const json = Utils.compose(
    d => JSON.stringify(d, null, '  '),
    Utils.textToJSON,
    Utils.findUrls
  )(output);

  return (
    <div>
      <pre dangerouslySetInnerHTML={{ __html: json }} />
    </div>
  );
}
