export function h (nodeName, attributes, ...children) {
  return { nodeName, attributes, children }
}

export function render (vnode) {
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
    node.appendChild(render(vnode.children[i]))
    
  return node
}