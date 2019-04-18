import { h, formatJSON } from '../lib';

export function Resume({ output }) {
  return (
    <div className="resume">
      <pre dangerouslySetInnerHTML={{ __html: formatJSON(output) }} />
    </div>
  );
}
