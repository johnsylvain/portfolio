import { compose, textToJSON, findUrls } from '../lib/utils';
import { h } from '../lib/vdom';

export default function Resume({ output }) {
  const json = compose(
    d => JSON.stringify(d, null, '  '),
    textToJSON,
    findUrls
  )(output);

  return (
    <div>
      <pre dangerouslySetInnerHTML={{ __html: json }} />
    </div>
  );
}
