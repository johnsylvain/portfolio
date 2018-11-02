export function throttle(func, threshhold) {
  let wait = false;

  return function() {
    if (!wait) {
      func.apply(undefined, arguments);
      wait = true;
      setTimeout(function() {
        wait = false;
      }, threshhold);
    }
  };
}

export const compose = (...fns) => initialValue =>
  fns.reduce((val, fn) => fn(val), initialValue);

export function textToJSON(json) {
  if (typeof json !== 'string') json = JSON.stringify(json, null, 2);

  json = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const reg = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

  return json.replace(reg, match => {
    let cls = 'number';
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'key' : 'string';
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

export function findUrls(text) {
  const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)(?:[\.\!\/\\\w]*))?)/g;

  return text.replace(reg, match => {
    const url = match.replace('</span>', String.empty);
    return `<a href="${url}" target="_blank">${match}</a>`;
  });
}
