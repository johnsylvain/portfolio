const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const UPDATE = 'UPDATE';
const SET_ATTRIBUTE = 'SET_ATTRIBUTE';
const REMOVE_ATTRIBUTE = 'REMOVE_ATTRIBUTE';
let tree = null;

export function h(nodeName, attributes, ...children) {
  children = [].concat.apply([], children);
  attributes = attributes || {};

  return typeof nodeName === 'function'
    ? nodeName(attributes, children)
    : { nodeName, attributes, children };
}

export function render(newNode, parent) {
  const patches = diff(newNode, tree);
  patch(parent, patches);
  tree = newNode;
}

function createElement(vnode) {
  let node =
    typeof vnode === 'string' || typeof vnode === 'number'
      ? document.createTextNode(vnode)
      : document.createElement(vnode.nodeName);

  if (vnode.attributes) {
    setAttributes(node, vnode.attributes);

    vnode.children.map(createElement).forEach(node.appendChild.bind(node));
  }

  return node;
}

function setAttribute(node, name, value) {
  if (name === 'className') {
    node.setAttribute('class', value);
  } else if (name === 'dangerouslySetInnerHTML') {
    node.innerHTML = value.__html;
  } else {
    node.setAttribute(name, value);
  }
}

function removeAttribute(node, name) {
  if (name === 'className') {
    node.remove('class');
  } else if (name === 'dangerouslySetInnerHTML') {
    node.innerHTML = '';
  } else {
    node.removeAttribute(name);
  }
}

function setAttributes(node, attributes) {
  for (let name in attributes) {
    if (/^on/.test(name)) {
      setEventListener(node, name, attributes[name]);
    } else {
      setAttribute(node, name, attributes[name]);
    }
  }
}

function setEventListener(node, name, value) {
  node.addEventListener(name.slice(2).toLowerCase(), value);
}

function diffChildren(newNode, oldNode) {
  const patches = [];
  const patchesLength = Math.max(
    newNode.children.length,
    oldNode.children.length
  );
  for (let i = 0; i < patchesLength; i++) {
    patches[i] = diff(newNode.children[i], oldNode.children[i]);
  }
  return patches;
}

function diffAttributes(newNode, oldNode) {
  const patches = [];

  const attributes = Object.assign({}, newNode.attributes, oldNode.attributes);
  Object.keys(attributes).forEach(name => {
    const newVal = newNode.attributes[name];
    const oldVal = oldNode.attributes[name];

    if (!newVal) {
      patches.push({ type: REMOVE_ATTRIBUTE, name, value: oldVal });
    } else if (!oldVal || oldVal !== newVal) {
      patches.push({ type: SET_ATTRIBUTE, name, value: newVal });
    }
  });

  return patches;
}

function diff(newNode, oldNode) {
  if (!oldNode) {
    return { type: CREATE, newNode };
  }

  if (!newNode) {
    return { type: REMOVE };
  }

  if (changed(newNode, oldNode)) {
    return { type: REPLACE, newNode };
  }

  if (newNode.nodeName) {
    return {
      type: UPDATE,
      children: diffChildren(newNode, oldNode),
      attributes: diffAttributes(newNode, oldNode)
    };
  }
}

function patchAttributes(parent, patches) {
  for (let i = 0; i < patches.length; i++) {
    const attribute = patches[i];
    const { type, name, value } = attribute;

    if (type === SET_ATTRIBUTE) {
      setAttribute(parent, name, value);
    } else if (type === REMOVE_ATTRIBUTE) {
      removeAttribute(parent, name, value);
    }
  }
}

function patch(parent, patches, index = 0) {
  if (!patches) return;

  const el = parent.childNodes[index];

  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches;
      const newElement = createElement(newNode);
      return parent.appendChild(newElement);
    }
    case REMOVE:
      return parent.removeChild(el);
    case REPLACE: {
      const { newNode } = patches;
      const newElement = createElement(newNode);
      return parent.replaceChild(newElement, el);
    }
    case UPDATE: {
      const { children, attributes } = patches;

      patchAttributes(el, attributes);

      for (let i = 0; i < children.length; i++) {
        patch(el, children[i], i);
      }
    }
  }
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.nodeName !== node2.nodeName ||
    (node1.attributes && node1.attributes.forceUpdate)
  );
}
