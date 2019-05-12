import { h, formatJSON } from '../lib';

export function Output({ output }) {
  return (
    <div className="resume">
      <pre dangerouslySetInnerHTML={{ __html: formatJSON(output) }} />
    </div>
  );
}
