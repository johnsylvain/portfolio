export function h (nodeName, attributes, ...children) {
  return { 
    nodeName, 
    attributes, 
    children: [].concat.apply([], children) // flatten children array
  }
}

function createElement (vnode) {
  if (typeof vnode === 'string')
    return document.createTextNode(vnode)
    
  let node = document.createElement(vnode.nodeName)
  
  for (let name in Object(vnode.attributes))
    node.setAttribute(name === 'className' 
        ? 'class' 
        : name, 
      vnode.attributes[name]
    )
    
  for (let i = 0; i < vnode.children.length; i++) 
    node.appendChild(createElement(vnode.children[i]))
    
  return node
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.nodeName !== node2.nodeName
}

export function render (parent, newNode, oldNode, index = 0) {
  if (!oldNode) 
    parent.appendChild(createElement(newNode))
  else if (!newNode) 
    parent.removeChild(parent.childNodes[index])
  else if (changed(newNode, oldNode)) {
    parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    );
  } else if (newNode.nodeName) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      render(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }

  // return new virtual dom
  return newNode
}