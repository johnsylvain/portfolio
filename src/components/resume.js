import { h, formatJSON } from '../lib';

export function Resume({ output }) {
  return (
    <div>
      <pre dangerouslySetInnerHTML={{ __html: formatJSON(output) }} />
    </div>
  );
}
