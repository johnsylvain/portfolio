import { compose, textToJSON, findUrls } from '../lib/utils';
import { h } from '../lib/vdom';

const formatJson = compose(
  d => JSON.stringify(d, null, '  '),
  textToJSON,
  findUrls
);

export default function Resume({ output }) {
  return (
    <div>
      <pre dangerouslySetInnerHTML={{ __html: formatJson(output) }} />
    </div>
  );
}
