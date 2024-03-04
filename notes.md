**DOM**

Document Object Model- in-memory object representation of an HTML document.  It provides a way to interact with a web page using JavaScript and provides the functionality needed to build modern interactive user experiences.

Application programming interface ([*API*](https://www.w3.org/TR/DOM-Level-2-Core/glossary.html#dt-API)) for valid [*HTML*](https://www.w3.org/TR/DOM-Level-2-Core/glossary.html#dt-HTML)and well-formed [*XML*](https://www.w3.org/TR/DOM-Level-2-Core/glossary.html#dt-XML) documents. The DOM is a programming [*API*](https://www.w3.org/TR/DOM-Level-2-Core/glossary.html#dt-API) for documents.

Anything found in an HTML or XML document can be accessed, changed, deleted, or added using the Document Object Model

https://www.w3.org/TR/DOM-Level-2-Core/introduction.html

As an object model, the DOM identifies:

- the interfaces and objects used to represent and manipulate a document
- the semantics of these interfaces and objects - including both behavior and attributes
- the relationships and collaborations among these interfaces and objects

The DOM is a hierarchal tree structure of nodes that will insert missing elements bc the fundamental tenent of the web is permissiveness.

*The browser may insert nodes that don't appear in the HTML due to invalid markup or the omission of optional tags. Text, including whitespace, also creates nodes that don't map to tags.*

So for this html

```html
<html>
  <h1>Hello, world!</h1>
  <p>This is a small <em>web page</em>.</p>
</html>
```

The DOM looks like this:

<img src="https://d3905n0khyu9wc.cloudfront.net/images/simple_node_types.png" alt="DOM diagram showing node type" style="zoom: 33%;" />

DOM nodes have different types; we see two here:

- Elements represent HTML tags
- Text nodes represent text that appears in the document.
  - Whitespace nodes contain nothing but whitespace and are called **empty nodes**
    - All text -- including whitespace -- in the original HTML appears in the DOM as a text node.
  - Empty nodes typically arise from whitespace before and after tags in the HTML; for example, the gap between `</h1>` and `<p>` forms an empty node that contains a newline and two space characters.
  - Empty nodes are not represented visually in the browser

Here are the **nodeValue** of each text node:

<img src="https://d3905n0khyu9wc.cloudfront.net/images/text_node_contents/text_node_contents.png@half.png" alt="DOM diagram showing text node contents" style="zoom: 25%;" />

It's important to know which features are available in modern browsers. For this, use the browser compatibility tables at the bottom of the MDN pages.

Complex Example: 

```html
<html>
  <head>
    <title>Newsletter Signup</title>
  </head>
  <body>
    <!-- A short comment -->
    <h1>Newsletter Signup</h1>
    <p class="intro" id="simple">
      To receive our weekly emails, enter your email address below.
      <a href="info.html">Get more info</a>.
    </p>
    <div class="form">
      <form>
        <label>
          Enter your email:
          <input name="email" placeholder="user.name@domain.test"/>
        </label>
        <p class="controls">
          <button id="cancelButton">Cancel</button>
          <button type="submit" id="submitButton">Subscribe</button>
        </p>
      </form>
    </div>
  </body>
</html>
```



<img src="https://d3905n0khyu9wc.cloudfront.net/images/newsletter_text_node_contents_v2.png" alt="DOM diagram showing all nodes" style="zoom:200%;" />

**Node**

single point in the node tree, such as the document itself, HTML elements, text, and comments 

**querySelector**

Get a reference to one of the DOM nodes. This method returns the first node in the DOM that matches the specified CSS selector.

The `document` node, which represents the entire HTML document, provides the solution to this problem. It's the top-most DOM node; that is, it's the parent of all nodes in the DOM. We can use `toString` to determine that `document` is an `HTMLDocument` element.

```
> document.toString()
"[object HTMLDocument]"
```

`HTMLDocument` inherits from `Node`. We can then call `.querySelector` on `HTMLDocument` and search the entire document for a selector.

```
> document.querySelector('p')
= <p class="intro" id="simple">...</p>
```

We can assign it to the local variable `p` and work with that DOM node

`> let p = document.querySelector("p");`

**DOM Node Properties**



*nodeName*

The `nodeName` property contains a String that represents the node type. For Elements (anything that represents an HTML tag), this is the name of the corresponding tag *in uppercase*.

`p.nodeName` => "P"

For text nodes -- even empty nodes -- the `nodeName` is `"#text"`. For comments, it's `"#comment"`.



*nodeType*

returns a number that matches a node type constant

```js
> p.nodeType
= 1
```

| Constant             | Value | Description                         |
| :------------------- | :---- | :---------------------------------- |
| `Node.ELEMENT_NODE`  | 1     | An Element representing an HTML tag |
| `Node.TEXT_NODE`     | 3     | A Text node                         |
| `Node.COMMENT_NODE`  | 8     | A Comment node                      |
| `Node.DOCUMENT_NODE` | 9     | A Document node                     |

```js
> p.nodeType === Node.ELEMENT_NODE
= true
> document.nodeType === Node.DOCUMENT_NODE
= true
```



*nodeValue*

The `nodeValue` property references the value of a node. Element nodes don't have values:

```js
> p.nodeValue
= null
```

Text nodes do, though. For a text node, the `nodeValue` is the textual content of the node. Let's look at our paragraph. To start, first extract the first text node from the DOM:

`let t = p.childNodes[0];`

The local variable, `t`, now references the first child within the paragraph. By checking `nodeName` and the return value of `toString`, we learn that `t` is a text node, that its `nodeName` is `"#text"`, and that its type is `Text`.

```js
> t.nodeName;
= "#text"
> t.toString();
= "[object Text]"
```

Since the `p` node represents the `<p>` tag, its child nodes represent its contents; here, we have some text and a link. The first child node of `p` (`t`) has a `nodeValue` property that contains the first sentence of text from the paragraph:

```js
> t.nodeValue
= "\n      To receive our weekly emails, enter your email address below.\n"
```



*textContent*

We've seen that `nodeValue` references the textual content of the Node, but Elements don't have any textual content, so the `nodeValue` for Elements is `null`. We can use a different property when we need the text within an Element:`textContent`.

`textContent` represents the textual content of all the nodes inside the Element. You can think of it as the `nodeValue` for all the Element's child nodes concatenated into a single String. For example, if we access the paragraph's `textContent` property, it contains the content of the Text nodes directly inside the tag as well as the text within the `a` Node that the `p` Node contains.



**Nodes and Elements**

DOM objects come in different types: Nodes, Elements, Text, and more. 

- **All** DOM objects are Nodes.
- **All** DOM objects have a type that inherits from Node, which means they all have properties and methods they inherit from Node.
- The most common DOM object types you will use are **Element** and **Text**.![Node type diagram](https://d3905n0khyu9wc.cloudfront.net/images/node_venn.png)

Keep in mind that *Elements* include more specific, specialized Element types. For example, the DOM node that represents a `<p>` HTML tag has type `HTMLParagraphElement`, while the Element that represents a `<div>`tag is `HTMLDivElement`.

A node's type determines what properties and methods it provides to a developer. Determining the element type is important so that you know what you can do with the node. It's easy to determine whether something is a Text node or an Element, but it's tricky to determine the exact Element type. Once you do know it, though, you can find the documentation on MDN. For instance, here's the[documentation for HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).

**Inheritance in the DOM**

- EventTarget

  - Node
    - Text
    - Comment
    - Document
    - Element
      - HTMLElement
        - HTMLAnchorElement
        - HTMLBodyElement
        - HTMLButtonElement
        - HTMLCanvasElement
        - HTMLDivElement
        - HTMLFormElement
        - HTMLHeadingElement
        - HTMLHtmlElement
        - HTMLImageElement
        - HTMLInputElement
        - HTMLLIElement
        - HTMLLabelElement
        - etc, etc.
      - SVGElement
        - SVGColorElement
        - SVGRectElement
        - etc, etc.

- Here is what you need to remember about the different types:

  - `EventTarget` provides the event-handling behavior that supports interactive web applications. 

  - `Node` provides common behavior to *all* nodes.

  - `Text`and `Element`are the chief subtypes of `Node`

    - `Text` nodes hold text.

    - `Element` nodes represent HTML tags.

**Determining the Node Type**

One of the easiest ways to determine the type of a node is to use the `Object.getPrototypeOf()` method which returns the prototype of the specified DOM element.

```js
> let p = document.querySelector("p");
> Object.getPrototypeOf(p);
= HTMLParagraphElement {Symbol(Symbol.toStringTag): 'HTMLParagraphElement', onmouseenter: undefined, onmouseleave: undefined, constructor: ƒ}
```

**From Code**

If you're writing a program, you should probably use the `instanceof` operator or `tagName` property.

 - With element nodes, `tagName` returns the same value as `nodeName`

 - ```js
   > let p = document.querySelector('p');
   > p instanceof HTMLParagraphElement;
   = true
   > p instanceof HTMLAnchorElement;
   = false
   > p instanceof Element;
   = true
   ```

 - The downside here is that you have to test against a particular Element type. If all you need to know, though, is whether a node is an Element, you can test it with `instanceof Element`:

 - ```js
   > p instanceof HTMLElement;
   = true
   > p instanceof Element;
   = true
   > p instanceof Node;
   = true
   > p instanceof SVGElement;
   = false
   ```

   Checking an Element's type in this way is common in code that must process two or more different Element types with different actions based on the Element type.

   If you don't need to know the type name, you can use the `tagName` property to check its HTML tag name instead. (Remember that this property has an uppercase value.)

   ```js
   > p.tagName;
   = "P"
   ```

**TraversingNodes**

DOM nodes connect via a set of properties gthat point from one node to another with defined relationships. 

`childNodes` property returns a collection of nodes directly beneath a given node. Each element in the returned collection has a `parentNode` property that points back to the original node. 

| Parent Node Properties | Value                                         |
| :--------------------- | :-------------------------------------------- |
| `childNodes`           | *Live collection* of all child nodes          |
| `firstChild`           | `childNodes[0]` or `null`                     |
| `lastChild`            | `childNodes[childNodes.length - 1]` or `null` |

| Child Node Properties | Value                                    |
| :-------------------- | :--------------------------------------- |
| `parentNode`          | Immediate parent of this node            |
| `nextSibling`         | `parentNode.childNodes[n + 1]` or `null` |
| `previousSibling`     | `parentNode.childNodes[n - 1]` or `null` |

The following diagram depicts how the parent/child properties map out the inter-nodal relationships:![Connections between nodes in the DOM](https://d3905n0khyu9wc.cloudfront.net/images/node_hierarchy.png)

**Walking the Tree**

Walking the tree is a term that describes the process of visiting every node that has a child, grandchild, etc. relationship with a given node, and doing something with each of them. We use a **recursive** function to do this.

```js
function walk(node) {
  console.log(node.nodeName);                                       // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index]);                                   // recursively call walk()
  }
}

walk(document.body);                                                // log nodeName of every node
```

The downside to this implementation is that `walk` both walks the tree and does something with each node, which makes it hard to reuse the node-walking functionality without duplicating code. A better solution separates `walk` into two functions: one walks the tree (we'll continue to call it `walk`) and another does something with a node. We'll pass the second function to `walk` as an argument:

```js
// walk() calls the function "callback" once for each node
function walk(node, callback) {
  callback(node);                                                   // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index], callback);                         // recursively call walk()
  }
}

walk(document.body, node => {                                // log nodeName of every node
  console.log(node.nodeName);
});
```

This separation of processing converts `walk` from a single-purpose function into a general-purpose, higher-level function we can use in any application. It's analogous to `Array.prototype.forEach` and other Array methods we've seen, but we use it with DOM nodes, not Arrays.

**Element Attributes**

```js
> let p = document.querySelector('p');
> p;
= <p class="intro" id="simple">...</p>
```

| Method                         | Description                                 | Returns                      |
| :----------------------------- | :------------------------------------------ | :--------------------------- |
| `getAttribute(name)`           | Retrieve value of attribute `name`          | Value of attribute as string |
| `setAttribute(name, newValue)` | Set value of attribute `name` to `newValue` | `undefined`                  |
| `hasAttribute(name)`           | Check whether element has attribute `name`  | `true` or `false`            |

```js
> p.hasAttribute('class');
= true
> p.getAttribute('class');
= "intro"
> p.getAttribute('id');
= "simple"
> p.setAttribute('id', 'complex');
> p
= <p class="intro" id="complex">...</p>
```

Using `setAttribute` to modify certain attributes, most notably `value` in XUL, works inconsistently, as the attribute specifies the default value. To access or modify the current values, you should use the properties. For example, use `Element.value` instead of `Element.setAttribute`.

**Attribute Properties**

You can access:

`id`, `name`, `title`, and `value` 

using standard property access and assignement operation.

```js
> p;
= <p class="intro" id="simple">...</p>
> p.id
= "simple"
> p.id = 'complex'
> p;
= <p class="intro" id="complex">...</p>
```

Not every Element type has these properties: the `name` and `value` attributes, in particular, are invalid on most elements.

Use `className` to access `class` attribute since `class` is a reserved word.

```js
> p.className;
= "intro"
> p.className = 'outro';
```

**What if our class has more than one name?**

`<button class="btn btn-lg btn-primary">Proceed</button>`

Since the value is a space-delimited set of names, interacting with `className` can be clumsy. Let's say we need to replace `btn-primary` with `btn-disabled`. To do this, we must get the string from `className`, use `replace` to change it, and then use the result to set a new value for `button.className`:

```js
> let newClass = button.className.replace('btn-primary', 'btn-disabled');
> button.className = newClass;
= "btn btn-lg btn-disabled"
> button;
= <button class="btn btn-lg btn-disabled">...</button>
```

Modern browsers provide a better way with the `classList` property. `classList` references a special array-like `DOMTokenList` object that has these properties and methods:

| Name             | Description                                                  |
| :--------------- | :----------------------------------------------------------- |
| `add(name)`      | Add class `name` to element                                  |
| `remove(name)`   | Remove class `name` from element                             |
| `toggle(name)`   | Add class `name` to element if it doesn't exist, remove if it does exist |
| `contains(name)` | Return `true` or `false` depending on whether element has class `name` |
| `length`         | The number of classes to which element belongs               |

ex/ 

```js
> let p = document.querySelector('p');
> p.classList.remove('btn')
```

**Style**

Style attribute references a `CSSStyleDeclaration` Object. 

```js
> let h1 = document.querySelector('h1');
> h1.style;
= CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", ...}
```

You can use the `style` attribute to alter any CSS property. For example, you can change the color of a heading to `red`:

`> h1.style.color = 'red';`

To remove a CSS property, set the property to `null` with the `style` property:

`> h1.style.color = null;`

When a CSS property's name contains dashes, you must use a camelCased version of the name to access that property. For example, to set a value for the `line-height` attribute, you assign a value to the `lineHeight` property:

`> h1.style.lineHeight = '3em';`

Most applications don't use the `style` property often; it's easier and more manageable to use classes in your stylesheet to alter the characteristics of your elements. You can add or remove CSS class names to or from any DOM Element.



**Developer Tools (DevTools)**

When it comes to front-end development and debugging errors in your JavaScript code, a key component of your tool-kit is the developer tools that come built in to most modern browsers. Developer tools allow you to inspect HTML, edit CSS, stop JavaScript execution within a private function and inspect local variables, and much more.

DOCUMENTATION

https://developer.chrome.com/docs/devtools/

VIDEO 

https://www.youtube.com/watch?v=VYyQv0CSZOE

- Accessing DevTools, including the various short-cuts and layout options.
- The different panels, in particular the Elements panel, the Console panel, and the Sources panel
- The sections covering: the DOM, the Console, debugging JavaScript

`Command+Shift+P` for command menu undoc for separate window 

`command+F` for search UI in DOM tree

In console:

`inspect`

Using inspect you can do something like this:

```js
inspect(document.querySelector('input'))
```

to highlight that element in tree

*Animations*

`Command+Shift+P` search animations

`Command+Option+J` to jump to console 

*JavaScript extras*

`console.table(some_arr)` prints out table 

`console.trace()` to see call stack

*Sources Panel*

`debugger` in code 



Examples

Starting with the `document` node, use the `lastChild` and `childNodes` properties to change the text color to red on the `On the River` heading and set its font size 48 pixels.

```js
let html = document.childNodes[1]; // skip doctype
let body = html.lastChild;         // skip head and text nodes
let heading = body.childNodes[1];  // skip text node
heading.style.color = 'red';
heading.style.fontSize = '48px';
```



Count the paragraphs on the page, and then log the result.

```js
let count = 0;
walk(document, node => {
  if (node.nodeName === 'P') {
    count++;
  }
});

console.log(count);                              // 5
```

Count the images on the page, then count the PNG images. Log both results.

```js
let images = [];
walk(document, node => {
  if (node.nodeName === 'IMG') {
    images.push(node);
  }
});

console.log(images.length);                      // 48 total images

let pngCount = images.filter(img => img.getAttribute('src').match(/png$/)).length;

console.log(pngCount);                           // 23 images in png format
```

Change the link color to red for every link on the page.

```js
walk(document, node => {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
});
```



**Finding Element by ID**

| Method                        | Returns                 |
| :---------------------------- | :---------------------- |
| `document.getElementById(id)` | element with given `id` |

**Finding More than One Element**



**Examples**

Write a JavaScript function that returns the `p` elements in the DOM represented by this HTML:

```js
function findAllParagraphs() {
  let matches = [];
  let nodes = document.body.childNodes;

  for (let index = 0; index < nodes.length; index += 1) {
    if (nodes[index] instanceof HTMLParagraphElement) {
      matches.push(nodes[index]);
    }
  }

  return matches;
}

console.log(findAllParagraphs());
findParagraphs()[1].textContent //'The waters flow'
```

Write a JavaScript function that adds the class `article-text` to every `<p>` tag in this HTML:

```js
function addClassToParagraphs(node) {
  if (node instanceof HTMLParagraphElement) {
    node.classList.add("article-text");
  }

  let nodes = node.childNodes;
  for (let index = 0; index < nodes.length; index += 1) {
    addClassToParagraphs(nodes[index]);
  }
}

addClassToParagraphs(document.body);
```

or 

```js
function getElementsByTagName(tagName) {
  let matches = [];

  walk(document.body, (node) => {
    if (node.nodeName.toLowerCase() === tagName) {
      matches.push(node);
    }
  });

  return matches;
}

getElementsByTagName("p").forEach((paragraph) =>
  paragraph.classList.add("article-text")
);
```

or 

```js
let paragraphs = document.getElementsByTagName("p"); //lowercase
for (let index = 0; index < paragraphs.length; index += 1) {
  paragraphs[index].classList.add("article-text");
}
```



**Built-In Functions**

`getElementsByTagName` is so useful that the DOM provides a similar method for all elements, and another method that does the same thing for class names:

| Method                                       | Returns                                             |
| :------------------------------------------- | :-------------------------------------------------- |
| `document.getElementsByTagName(tagName)`     | `HTMLCollection` or `NodeList` of matching elements |
| `document.getElementsByClassName(className)` | `HTMLCollection` or `NodeList` of matching elements |

One key way in which these methods differ from the one we wrote above is that they return array-like objects, not actual arrays.

Therefor they do not support `forEach`. You must loop through using a `for` loop or convert to an array.

```js
let paragraphs = document.getElementsByTagName("p");

paragraphs.length; // returns a Number
paragraphs[0]; // returns first element in collection

// The following will fail with "forEach" not available in some browsers
paragraphs.forEach((paragraph) => console.log(paragraph.textContent));

// Possible fix
let paragraphsArray = Array.prototype.slice.call(paragraphs);
paragraphsArray.forEach((paragraph) => console.log(paragraph.textContent));

// Alternative fix
for (let index = 0; index < paragraphs.length; index += 1) {
  let paragraph = paragraphs[index];
  console.log(paragraph.textContent);
}
```

Some DOM-querying methods return collections that are called **live collections**. Live collections have a special behavior in that they automatically update to reflect changes in the DOM, hence the term "live". Methods like `document.getElementsByClassName` and `document.getElementsByTagName`, when they return an `HTMLCollection`, return it in the form of a live collection. It is important to take note of this because it can lead to unexpected behavior, especially when you iterate over it or use the return value.

```js
let list = document.querySelector("#list");
let listItems = document.getElementsByClassName("list-item");
console.log(listItems.length); // logs 3

// We'll cover creating elements in a later assignment
let newItem = document.createElement("li"); // Creates a new element
newItem.className = "list-item"; // adds a class to the element
list.appendChild(newItem); // appends to "list" element

console.log(listItems.length); // logs 4
```

Notice how the `listItems`' length increases even though we didn't explicitly add any elements to it.



ARTICLE 

https://stackoverflow.com/questions/28163033/when-is-nodelist-live-and-when-is-it-static





**CSS Selectors**

The proliferation of JavaScript libraries and frameworks have popularized an alternate way to find elements. Instead of searching for a tag name, class name, or relationship, these tools use CSS selectors to find elements with minimal effort. Selector searches have become so common that web browsers now provide built-in support for selector searches with these two methods:

| Method                                 | Returns                          |
| :------------------------------------- | :------------------------------- |
| `document.querySelector(selectors)`    | First matching element or `null` |
| `document.querySelectorAll(selectors)` | `NodeList` of matching elements  |

Note that both take multiple css selectors as an argument. The argument is a string of one or more comma-separated css selectors. To better visualize this, let us use both in an example using the following markup:

```js
// previous approach
let intros = document.getElementsByClassName("intro");
for (let index = 0; index < intros.length; index += 1) {
  let paragraphs = intros[index].getElementsByTagName("p");

  for (let p = 0; p < paragraphs.length; p += 1) {
    paragraphs[p].classList.add("article-text");
  }
}

// using querySelectorAll
let paragraphs = document.querySelectorAll(".intro p");
for (let index = 0; index < paragraphs.length; index += 1) {
  paragraphs[index].classList.add("article-text");
}
```

As with `getElementsByClassName` and `getElementsByTagName`, `querySelectorAll` returns array-like objects, so you'll need to keep that in mind. You can use things like `forEach`, array destructuring, and `Array.from` on these objects, but be aware of which browser versions you are targeting. Older browsers may not support these features.

**Traversing Elements**

![Connections between DOM Nodes](https://d3905n0khyu9wc.cloudfront.net/images/node_hierarchy2.png)

These properties often don't give you what you want, though; you probably want a list of element nodes without the `Text` and other nodes mixed in. You can simplify your code if you can start with a list of element nodes alone, and don't have to ignore everything else. Another set of DOM properties provides the functionality you need; you can find them in the element nodes:![Connections between DOM Elements](https://d3905n0khyu9wc.cloudfront.net/images/node_hierarchy3.png)

| Parent Element Properties | Value                                     |
| :------------------------ | :---------------------------------------- |
| `children`                | *Live collection* of all child elements   |
| `firstElementChild`       | `children[0]` or `null`                   |
| `lastElementChild`        | `children[children.length - 1]` or `null` |
| `childElementCount`       | `children.length`                         |

| Child Element Properties | Value                                  |
| :----------------------- | :------------------------------------- |
| `nextElementSibling`     | `parentNode.children[n + 1]` or `null` |
| `previousElementSibling` | `parentNode.children[n - 1]` or `null` |

You can change content:

```js
> document.querySelector('a').textContent = 'step backward';
= "step backward"
```

Be careful when setting `textContent`; doing so removes all child nodes from the element and replaces them with a text node that contains the value:

