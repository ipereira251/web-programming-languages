/**
 * Convert a virtual DOM node (vNode) into a real DOM node.
 *
 * @param {Object|string} vNode - A virtual DOM node. Either:
 *   - string → represents a text node
 *   - object → { type: string, props: Object, children: Array }
 * @returns {Node} A real DOM Node (Element or Text)
 */
function createTree(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  const el = document.createElement(vnode.type);

  // set attributes
  for (const [key, value] of Object.entries(vnode.props || {})) {
    el.setAttribute(key, value);
  }

  // recursively create children
  (vnode.children || []).forEach(child => {
    el.appendChild(createTree(child));
  });

  return el;
}

/**
 * Diff two virtual DOM nodes and update the real DOM node accordingly.
 * @param {Object|string|null} oldVNode - Previous vDOM node.
 * @param {Object|string|null} newVNode - New vDOM node.
 * @param {Node|null} domNode - Real DOM node corresponding to oldVNode.
 */
function diff(oldVNode, newVNode, domNode) {
  oldRealNode = createTree(oldVNode);
  newRealNode = createTree(newVNode);
  
  // You may have to use some of these: appendChild(), removeChild(), 
  // replaceChild(), removeAttribute(), getAttribute(), textContent, childNodes[]

  // Case 1: both are text (string), but may be different
  if(oldVNode.children.length == 1 && newVNode.children.length == 1){
    domNode.parentElement.replaceChild(newRealNode, domNode);
  }

  // Case 2: oldVnode is nullish -> append new to parent
  if(!oldVNode) {
    domNode.parentElement.appendChild(newRealNode);
  }
  
  // Case 3: newVnode is nullish -> remove, check
  if(!newVNode){
    domNode.parentElement.removeChild(domNode);
  }
 
  // Case 4: Node type changed -> replace
  if(oldRealNode.type !== newRealNode.type){
    domNode.parentElement.replaceChild(newVNode, domNode);
  }
 
  // Case 5: Update attributes
  if(oldVNode.props !== newVNode.props){
    
    for (let i = 0; i < Math.max(oldVNode.props.length, newVNode.props.length); i++){
      
      if(indexOf(oldVNode.props[i], newVNode.props) < 0){
        // remove old attributes not in new
        domNode.removeAttribute(i);
      } 
      if(indexOf(newVNode.props[i], oldVNode.props) < 0){
        // add/update new attributes
        domNode.addAttribute(i);
      }
    }

  }

  // Recursively diff children
  for (let i = 0; i < Math.max(oldVNode.children.length, newVNode.children.length); i++){
    //diff child
    if(!oldVNode.children[i] && newVNode.children[i]) {
      domNode.appendChild(createTree(newVNode.children[i]));
    } else if (!newVNode.children[i]){
      domNode.removeChild(domNode.children[i]);
    } else if (domNode.children[i]){
      diff(oldVNode.children[i], newVNode.children[i], domNode.children[i]);
    }
  }
}
