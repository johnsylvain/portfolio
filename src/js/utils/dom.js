export function element(type, attrs, child) {
  let e = document.createElement(type)

  for (let attr in attrs) 
    e.setAttribute(attr === 'className' ? 'class' : attr, attrs[attr])

  if (typeof child === 'string') e.textContent = child
  else e.appendChild(child)

  return e
}