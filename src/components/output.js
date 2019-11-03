import { h, formatJSON } from '../lib';

export function Output({ output }) {
  return (
    <div className="resume">
      {output ? (
        <pre dangerouslySetInnerHTML={{ __html: formatJSON(output) }} />
      ) : (
        <div className="resume__splash">
          <div>
            <h2>👋 Welcome to my CLI Resume.</h2>
            <p>
              Enter <code>open resume</code> in the terminal to the left to view
              my resume. The output will be displayed here in JSON format.
            </p>
            <p>
              Enter <code>help</code> to see all the commands.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
