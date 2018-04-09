export function h (nodeName, attributes) {
  let rest = []
  let length = arguments.length
  let children = []

  while (length-- > 2)
    children.push(arguments[length])

  return typeof nodeName === 'function'
    ? nodeName(attributes || {}, children.reverse())
    : {
      nodeName,
      attributes: attributes || {},
      children: [].concat.apply([], children.reverse())
    }
}

export function render (vnodes, parent) {
  const el = createElement(vnodes)

  while (parent.firstChild)
    parent.removeChild(parent.firstChild)

  parent.appendChild(el)
}

function createElement (vnode) {
  let node = typeof vnode === "string" || typeof vnode === "number"
    ? document.createTextNode(vnode)
    : document.createElement(vnode.nodeName)

  if (vnode.attributes) {
    setAttributes(node, vnode.attributes)

    vnode.children
      .map(createElement)
      .forEach(node.appendChild.bind(node))
  }

  return node
}

function setAttributes (node, attributes) {
  for (let name in attributes) {
    if (/^on/.test(name)) {
      node.addEventListener(
        name.slice(2).toLowerCase(), attributes[name]
      )
    } else {
      switch (name) {
        case 'className':
          node.setAttribute('class', attributes[name])
          break
        case 'dangerouslySetInnerHTML':
          node.innerHTML = attributes[name].__html
          break
        default:
          node.setAttribute(name, attributes[name])
      }
    }
  }
}
