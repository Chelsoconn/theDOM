function addClassToParagraphs(node, newClass) {
  if (node instanceof HTMLParagraphElement) {
    node.classList.add(newClass);
  }

  let nodes = node.childNodes;
  for (let index = 0; index < nodes.length; index += 1) {
    addClassToParagraphs(nodes[index]);
  }
}

addClassToParagraphs(document.body, 'article-text');