import Utils from '../lib/helpers';
import { h } from '../lib/vdom';

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
