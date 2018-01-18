export function h (nodeName, attributes, ...children) {
  children = [].concat.apply([], children)

  return typeof nodeName === "function"
    ? nodeName(attributes || {}, children)
    : {
        nodeName,
        attributes: attributes || {},
        children
      }
}

function createElement (vnode) {
  let node = typeof vnode === "string" || typeof vnode === "number"
    ? document.createTextNode(vnode)
    : document.createElement(vnode.nodeName)

  if (vnode.attributes) {
    for (let name in vnode.attributes) {
      if (/^on/.test(name)) {//  test if event
        node.addEventListener(
          name.slice(2).toLowerCase(), vnode.attributes[name]
        )
      } else {
        if (name === 'className')
          node.setAttribute('class', vnode.attributes[name])
        else if (name === '__html')
          node.innerHTML = vnode.attributes[name]
        else
          node.setAttribute(name, vnode.attributes[name])
      }
    }
  
    for (let i = 0; i < vnode.children.length; i++) 
      node.appendChild(createElement(vnode.children[i]))
  }
  
  return node
}

function changed (node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.nodeName !== node2.nodeName ||
         node1.attributes && node1.attributes.forceUpdate
}

export function render (parent, newNode, oldNode, index = 0) {
  if (!oldNode) 
    parent.appendChild(createElement(newNode))
  else if (!newNode) 
    parent.removeChild(parent.childNodes[index])
  else if (changed(newNode, oldNode)) {
    parent.replaceChild(
      createElement(newNode), parent.childNodes[index]
    )
  } else if (newNode.nodeName) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      render(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }

  // return new virtual dom
  return newNode
}
