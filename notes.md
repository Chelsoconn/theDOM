**DOM**

Document Object Model- in-memory object representation of an HTML document.  It provides a way to interact with a web page using JavaScript and provides the functionality needed to build modern interactive user experiences.

 HTML you write isn't the DOM itself, but instead it is the input that a browser uses to create the DOM. In some instances, the browser, without any instruction, also modifies it. For example, even if you don't include a `head` element, a corresponding DOM `head` node will be present when the browser creates the DOM.

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

DOM nodes connect via a set of properties that point from one node to another with defined relationships. 

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

- [ ] ```js
  > document.querySelector('a').textContent = 'step backward';
  = "step backward"
  ```


Be careful when setting `textContent`; doing so removes all child nodes from the element and replaces them with a text node that contains the value:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>My Site</title>
  </head>
  <body>
    <div>
      Welcome to the site!<br>
      The time is 9:15 am.<br>
      You are logged in as <a href="/account">Kabu</a>.
    </div>
  </body>
</html>
```

Finding the text node you must update would be tricky; replacing the time would probably require a regular expression:

```js
var div = document.querySelector('div');
var node;
var newText;

for (let index = 0; index < div.childNodes.length; index += 1) {
  node = div.childNodes[index];
  if (node instanceof Text && node.nodeValue.indexOf('The time is') !== -1) {
    newText = node.nodeValue.replace(/\d{1,2}:\d{2} [ap]m/, '9:16 am');
    node.nodeValue = newText;
  }
}
```

Compare that with this simpler example that uses a `<span>` tag:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>My Site</title>
  </head>
  <body>
    <div>
      Welcome to the site!<br>
      The time is <span class="time">9:15 am</span>.<br>
      You are logged in as <a href="/account">Kabu</a>.
    </div>
  </body>
</html>
```

```js
document.querySelector('.time').textContent = '9:16 am';
```



Examples

The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," "Taxonomy and evolution," etc.

Use three different DOM methods to retrieve a reference to the `div` element that contains the table of contents.

```js
document.getElementById('toc');
document.querySelector('#toc');
document.querySelectorAll('.toc')[0];
```



**Creating and Moving DOM Nodes**

We can add a paragraph to this document with `createElement` and `appendChild`:

```js
let paragraph = document.createElement('p');
paragraph.textContent = 'This is a test.';
document.body.appendChild(paragraph);
```

You can also create a text node and append it to the paragraph element:

```js
let text = document.createTextNode('This is a test.');
let paragraph = document.createElement('p');
paragraph.appendChild(text);
document.body.appendChild(paragraph);
```

**Creating New Nodes**

You can create nodes in two ways: you can create new empty nodes with the `document.create*` methods, or you can clone an existing node hierarchy:

| Node Creation Method              | Returns                  |
| :-------------------------------- | :----------------------- |
| `document.createElement(tagName)` | A new Element node       |
| `document.createTextNode(text)`   | A new Text node          |
| `node.cloneNode(deepClone)`       | Returns a copy of `node` |

If `deepClone` is `true`, `cloneNode` makes copies of `node` and *all its descendant nodes*; otherwise, `cloneNode` merely copies `node`. Don't rely on a specific default value for `deepClone`; it has changed over time, so always specify `true` or `false` to get what you want. In most cases, you'll use `true` to get a copy of the node and its children.

```js
> paragraph;
= <p>This is a test.</p>
> let paragraph2 = paragraph.cloneNode(true);
> document.body.appendChild(paragraph2);
```

The page now has two copies of the paragraph. The DOM objects that represent them are independent of each other — changing one does not change the other.

**Adding Nodes to the DOM**

You can append, insert, and replace nodes with methods on the node's parent:

| Parent Node Method                      | Description                                                  |
| :-------------------------------------- | :----------------------------------------------------------- |
| `parent.appendChild(node)`              | Append `node` to the end of `parent.childNodes`              |
| `parent.insertBefore(node, targetNode)` | Insert `node` into `parent.childNodes` before `targetNode`   |
| `parent.replaceChild(node, targetNode)` | Remove `targetNode` from `parent.childNodes` and insert `node` in its place |

`document.appendChild` causes an error. Use `document.body.appendChild` instead.

You can append anything with append but you have to append a node to appendChild 

**No Node may appear twice in the DOM.** If you try to add a node that is already in the DOM, it gets removed from the original location. Thus, you can move an existing node by inserting it where you want it.

| Description                                           |                                                              |
| :---------------------------------------------------- | ------------------------------------------------------------ |
| `element.insertAdjacentElement(position, newElement)` | Inserts `newElement` at `position` relative to `element`     |
| `element.insertAdjacentText(position, text)`          | Inserts Text node that contains `text` at `position` relative to `element` |

`position` must be one of the following String values:

| Position        | Description                           |
| :-------------- | :------------------------------------ |
| `"beforebegin"` | Before the element                    |
| `"afterbegin"`  | Before the first child of the element |
| `"beforeend"`   | After the last child of the element   |
| `"afterend"`    | After the element                     |



**Removing Nodes**

When you remove a node from the DOM, it becomes eligible for garbage collection unless you keep a reference to the node in a variable. You cannot access an object that is eligible for garbage collection, so it's no longer available to your program.

| Element Method             | Description                            |
| :------------------------- | :------------------------------------- |
| `node.remove()`            | Remove `node` from the DOM             |
| `parent.removeChild(node)` | Remove `node` from `parent.childNodes` |

```js
> paragraph.remove();
> paragraph2.remove();
```



**Browser Object Model (BOM)**

You can access other components of the browser with JavaScript that go beyond the page contents. These components include:

- The windows used to display web pages
- The browser's history
- Sensors, including location



Examples

Toggling hidden

```js
document.getElementById('toggle').onclick = e => {
  e.preventDefault();
  let notice = document.getElementById('notice');
  if (notice.getAttribute('class') === 'hidden') {
    notice.setAttribute('class', 'visible');
  } else {
    notice.setAttribute('class', 'hidden');
  }
};
```


SUMMARY 

- The **Document Object Model**, or **DOM**, is an in-memory object representation of an HTML document. It provides a way to interact with a web page using JavaScript, which provides the functionality required to build modern interactive user experiences.
- The DOM is a hierarchy of **nodes**. Each node can contain any number of child nodes.
- There are different types of nodes. The types you should be familiar with are **elements** and **text nodes**.
- The whitespace in an HTML document may result in empty text nodes in the DOM.
- Useful properties of nodes include `nodeName`, `nodeType`, `nodeValue`, and `textContent`.
- Nodes have properties that traverse the DOM tree: `firstChild`, `lastChild`, `childNodes`, `nextSibling`, `previousSibling`, and `parentNode`.
- Element nodes have `getAttribute`, `setAttribute`, and `hasAttribute` methods to manipulate HTML attributes.
- Elements have properties that let you read and alter the `id`, `name`, `title`, and `value`.
- Elements let you read and change CSS classes and style properties via the `classList` and `style` properties.
- `document.getElementById(id)` finds a single Element with the specified `id`.
- `document.getElementsByTagName(name)` and `document.getElementsByClassName(name)` find any Elements with the specified `tagName` or `class`.
- `document.querySelector(selector)` returns the first Element that matches a CSS selector. `document.querySelectorAll(selector)` is similar but returns all matching elements.
- Elements have properties to traverse the DOM tree: `firstElementChild`, `lastElementChild`, `children`, `nextElementSibling`, and `previousElementSibling`.
- You can create new DOM nodes with `document.createElement(tagName)` or `document.createTextNode(text)`.
- You can create a copy of a node with `node.cloneNode(deepClone)`.
- `parent.appendChild(node)`, `parent.insertBefore(node, targetNode)`, `parent.replaceChild(node, targetNode)`, `element.insertAdjacentElement(position, newElement)`, and `element.insertAdjacentText(position, text)` add nodes to the DOM.
- `node.remove()` and `parent.removeChild(node)` remove nodes from the DOM.



**EXERCISES**

https://launchschool.com/exercise_sets/70756443

**Functions to get all child nodes (inirect and direct)**

```js
function countNodes(node) {
  let count = node.childNodes.length;
  Array.prototype.slice.call(node.childNodes).forEach((child) => {
    count += countNodes(child);
  });

  return count;
}

function childNodes(id) {
  let parent = document.getElementById(id);

  let direct = parent.childNodes.length;
  let indirect = countNodes(parent) - direct;

  return [ direct, indirect ];
}

//or using walk

function childNodes(id) {
  id = String(id);
  let parent = document.getElementById(id);
  let inner = parentNode.childNodes.length;
  let outer = 0;
  walk(parent, node => {
    if (node.parentNode !== parent && node !== parent) {
      outer++;
    }
  })
  return [inner, outer];
}
```

Numeric `id` values won't work as an argument for `querySelector`. Check out the SO post on [using numeric `id` attribute value as argument for `querySelector](https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers).

You cant use an id in query selector without element.querySelector(`[id="${endId}"]`)



using `contains` !ancestor.contains(descendant)





**RUNNING JS/CSS ALONGSIDE HTML**

in the js file enclose the js with `window.onload` event Handler function so that the js doesnt run before the page renders 

use `<script>` in html

```html
<head>
  <title>Tracing the DOM Tree</title>
  <script src="example.js"></script> // REFERENCES JS FILE
  <style></style> //REFERENCES CSS when written in html file
</head>
```

```js
window.onload = function() {
  function yourCode {
  }
}
```

**Running JS/CSS files FROM HTML**

```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My First Page</title>
    <script type="text/javascript"src="example.js"></script>
    <link rel="stylesheet" type="text/css" href="css.css">
  </head>
  <body>
    <h1 class="first"> My First Page</h1>
    <p> I will test from here.</p>
  </body>
</html>
```





Exercises NodeSwap

```js
window.onload = function() {
  function nodeSwap(ind1, ind2) {
    let child1 = document.getElementById(ind1);
    let child2 = document.getElementById(ind2); 

    if (!child1 || !child2) return undefined;
    if (child1.contains(child2) || child2.contains(child1)) return undefined;
    let parent1 = child1.parentNode;
    let parent2 = child2.parentNode;

    let replacer1 = document.createElement('replacer1');
    let replacer2 = document.createElement('replacer2');
    
    child1.insertAdjacentElement('beforebegin', replacer1);
    child2.insertAdjacentElement('beforebegin', replacer2);

    parent1.removeChild(child1);
    parent2.removeChild(child2);
   
    parent1.replaceChild(child2, replacer1);
    parent2.replaceChild(child1, replacer2);
  }
  nodeSwap(1, 2);
  nodeSwap(3, 1);
  nodeSwap(7, 9);
}
```







**Asynchronous Code**

It's possible to write code that runs partly now, then pauses and continues to run later after a delay of milliseconds, minutes, hours, or even days. We call such code **asynchronous code**; it doesn't run continuously or even when the runtime encounters it.

`setTimeout` is a global method that takes two arguments: a callback function and a time to wait specified in milliseconds (1/1000th of a second). It sets a timer that waits until the given time delay elapses, then invokes the callback function:

```js
setTimeout(() => {
 console.log('!');
}, 3000);

setTimeout(() => {
  console.log('World');
}, 1000);

console.log('Hello');
```

ensure that when we are running `setTImeout` we need to make a closure with the value bc as we increment the timer is still running 

*Examples*

```js
setTimeout(() => {           //1
  console.log('Once');       //5
}, 1000);

setTimeout(() => {           //2
  console.log('upon');       //7
}, 3000);

setTimeout(() => {           //3
  console.log('a');          //6
}, 2000);

setTimeout(() => {           //4
  console.log('time');       //8
}, 4000);
```

In what sequence does the JavaScript runtime run the functions `q`, `d`, `n`, `z`, `s`, `f`, and `g` in the following code?

```js
setTimeout(() => { (1)
  setTimeout(() => {
    q();
  }, 15);

  d();  

  setTimeout(() => { 
    n();
  }, 5);

  z();
}, 10);

setTimeout(() => { (2)
  s();
}, 20);

setTimeout(() => { (3)
  f();  (4)
});

g(); (5)
```

f, g, d, z, n, s, q. <-- my answer (wrong)

g,f,d,z,n,s,q

Notice that `g` still comes before `f` even though the timeout duration defaults to `0`. The reason for this behavior is that while the function can execute immediately already, it isn't until [the next event cycle that it will execute](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

​	The time, in milliseconds that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.

Another thing of note is that `setTimeout`'s behavior can be unpredictable when the differences in duration are tiny. Consequently, the [sequence you get may be different](https://launchschool.com/posts/f4ff4ada) than the solutions.

*Write a function named `afterNSeconds` that takes two arguments: a callback and a time duration in seconds. The function should wait for the indicated period, then invoke the callback function.*

```js
function afterNSeconds(callback, seconds) {
  setTimeout(callback, seconds * 1000);
}
```



Be careful here! It executes wonky

```js
     function logLater(num) {
        setTimeout(() => {
          console.log(num)
        }, num * 1000)
      }

      function delayLog() {
        let n = 0
        while (n <= 10) {
          logLater(n) 
          n += 1
        }
      }

      delayLog()
```

```js
//callback with setInterval

function startCounter(callback) {
  let counter = 0;
  const intervalId = setInterval(() => {
    counter++;
    if (callback(counter)) {
      clearInterval(intervalId);
    }
  }, 1000);
}
```





Make a closure to retain the value 

With **`var`** you have a function scope, and only one shared binding for all of your loop iterations - i.e. the `i` in every setTimeout callback means **the same** variable that **finally** is equal to 6 after the loop iteration ends.

With **`let`** you have a block scope and when used in the `for` loop you get a new binding for each iteration - i.e. the `i` in every setTimeout callback means **a different** variable, each of which has a different value: the first one is 0, the next one is 1 etc.

https://stackoverflow.com/questions/31285911/why-let-and-var-bindings-behave-differently-using-settimeout-function



**SetInterval**

*Like `setTimeout`, `setInterval` is also not part of the JavaScript specification and most environments also make it available.*

Another Function, `setInterval`, does something similar. Instead of invoking the callback once, though, it invokes it again and again at intervals until told to stop.

In this animation, `setInterval` returns an identifier that we can later pass to `clearInterval` to cancel the timer and stop the repeated execution of the callback. `setInterval` is useful when you must run some code at regular intervals. For instance, perhaps you need to auto-save a user's work in a large web form:

```js
function save() {
  // Send the form values to the server for safe keeping
}

// Call save() every 10 seconds
let id = setInterval(save, 10000);

// Later, perhaps after the user submits the form
clearInterval(id);
```

Write a function named `startCounting` that logs a number to the console every second, starting with `1`. Each number should be one greater than the previous number.

```js
function startCounting() {
  let count = 0;
  setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}

My Solution: 
     function startCounting() {
        let num = 1
        return () => {
          console.log(num)
          num += 1
        }
      }

      let counter = setInterval(startCounting(), 1000)
      
      function stopCounting() {
        clearInterval(counter)
      }

      stopCounting()
```



**User Interfaces and Events**

Running code after a timed delay is useful, but most user interfaces must respond to something other than the passage of time. For instance, the UI may need to take action when a button click occurs.

An **event** is an object that represents some occurrence; it contains information about what happened and where it happened. The browser can trigger events as the page loads, when the user interacts with the page, and when the browser performs some action required by the program.

User interfaces are inherently event-driven. An interface draws itself on the screen, and then it does nothing until a user interacts with it. That interaction could be a button-click, a finger-swipe, or even a shake of a motion-sensitive device. Such interfaces require the program to register some behavior that the event will trigger when it occurs.

Since a lot of web applications consist mainly of a user interface, the code within them has two main tasks:

1. Set up the user interface and display it.
2. Handle events resulting from user or browser actions.

Since we're working in the browser, we typically achieve #1 with HTML, which lets us focus on #2, handling events.

In the following diagram, lines that begin with *when* describe actions the program takes in response to the appropriate event. The code that the browser runs in response to the event is an **event listener**.![User interface events example](https://d3905n0khyu9wc.cloudfront.net/images/ui_events.png)

example

The **`DOMContentLoaded`** event fires when the HTML document has been completely parsed, and all deferred scripts ([``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer) and [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#module)) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.

**Element Handle**

Element Handle **represents a remote element in the DOM of the browser**. It implements useful methods for querying and interacting with DOM elements.

- Every listener in the list has three properties, **type**(of the event), **callback** (the function), and **capture** (a boolean)

```
addEventListener(type, listener)  //(event, eventHandler)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture)
```

```js
<!doctype html>
<html lang="en-US">
  <head>
    <title>title</title>
    <meta charset="UTF-8">
    <script>
      document.addEventListener('DOMContentLoaded', event => {
        let addButton = document.getElementById('add');
        let output = document.getElementById('output');
        let count = 0;

        addButton.addEventListener('click', event => {
          count += 1;
          output.textContent = String(count);
        });
      });
    </script>
  </head>

  <body>
    <p>
      <span id="output">0</span>
      <button id="add">Add One</button>
    </p>
  </body>
</html>
```

1. The browser loads the page and evaluates the JavaScript within the `script` tag. This code registers a callback to handle the `DOMContentLoaded` event when it **fires** (occurs) on `document`.
2. The browser waits for an event to fire.
3. The browser fully loads the HTML, builds the DOM, and then fires the`DOMContentLoaded` event on `document`.
4. The browser invokes the event handler for `DOMContentLoaded`, which uses `document.getElementById` to get references to two DOM elements and initializes the variable `count`. It also registers an event listener for `click` events on `addButton`:
5. The browser waits for an event to fire.
6. When the user clicks the button, the `click` event fires and the browser runs the handler. The callback increments the value of `count` and updates the `textContent` of the `#output` `span`.
7. The browser waits for an event to fire.



**Page LifeCycle Events**

In the previous assignment, we learned how to use an event listener to run JavaScript code when the `DOMContentLoaded` event on `document` fires:

```js
document.addEventListener('DOMContentLoaded', event => {
  // Do something with the DOM
});
```

![Complete page loading](https://d3905n0khyu9wc.cloudfront.net/images/complete_page_loading.png)It's common to call the moment when the DOM is ready for interaction the **DOM Ready Event**. This term is imprecise; it isn't clear what it refers to beyond the concept that the DOM is ready for use. The name became commonplace when jQuery introduced the `$.ready` method; it provides a `DOMContentLoaded` event-like functionality in older browsers that don't support that event natively or reliably.

We typically use the `DOMContentLoaded` event when we have JavaScript code that must access the DOM. The `load` event fires much later, after everything on the page loads, including images, videos, etc. This `load` event is not useful in most cases because it may not occur for a long time after the page first appears.

**User Events**

Building an interactive web application means responding to user actions. Depending on the input device, the application, and the user, your application may need to detect and react to more than a dozen different user-initiated events:

| Event Type | Example Events                                               |
| :--------- | :----------------------------------------------------------- |
| Keyboard   | `keydown`, `keyup`                                           |
| Mouse      | `mouseenter`, `mouseleave`, `mousedown`, `mouseup`, `click`, 'mousemove' |
| Touch      | `touchstart`, `touchend`, `touchmove`                        |
| Window     | `scroll`, `resize`                                           |
| Form       | `submit`                                                     |

Complete List of Event Types: 

https://developer.mozilla.org/en-US/docs/Web/Events

The rest of this lesson primarily focuses on JavaScript code that uses **event listeners**, also known as **event handlers**. Event listeners are functions that the JavaScript runtime calls when a particular event occurs. There are four steps needed to setup an event handler:

1. **Identify the event you need to handle.** User actions, the page lifecycle, and more can fire events.
2. **Identify the element that will receive the event.** Depending on the event, the object could be a button, an input field, or any other element on the page.
3. **Define a function to call when this event occurs.** The function is passed a single argument, an Event object. For now, we won't be using this argument. We'll learn more about Events later.
4. **Register the function as an event listener.** This step brings the first three together into a working system.

If all we need to know is that a click occurred, then it's easy to add some code to the handler to do what we need to do. What if we need more information about the event, though? The argument passed to the event handler provides this extra information; it's an `Event` object that provides contextual information about the event.

Some useful properties that appear in Event objects include:

| Property        | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| `type`          | The name of the event (e.g., 'click')                        |
| `currentTarget` | The current object that the event object is on. It always refers to the element that has the event listener attached to it |
| `target`        | The object on which the event occurred, e.g., the element clicked by the user |

The following example displays the `tagName` property of the event's `target` each time a click occurs. The `target` is the HTML element that the user clicked. The example also displays the `tagName` property of the event's `currentTarget`. The `currentTarget` is the HTML element (`body`) that the event listener was attached to. Click around on the rendered example and see how the message changes in response to these clicks.

```js
document.body.addEventListener('click', event => {
  let elementClicked = event.target;
  let elementAttached = event.currentTarget;
  let p = document.getElementById('message');
  p.textContent = elementClicked.tagName;
  let p2 = document.getElementById('message2');
  p2.textContent = elementAttached.tagName; 
});
```

**Mouse Events**

Most events have properties specific to their type. For example, here are some of the properties available for mouse events:

| Property  | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| `button`  | This is a read-only property that indicates which button was pressed |
| `clientX` | The horizontal position of the mouse when the event occurred |
| `clientY` | The vertical position of the mouse when the event occurred   |

Both `clientX` and `clientY` return values **relative to the visible area of the page**: the number of pixels from the upper-left corner of the browser's viewport.



**Keyboard Events**

Keyboard-related events also have special properties:

| Property   | Description                                                  |
| :--------- | :----------------------------------------------------------- |
| `key`      | The string value of the pressed key. **Older browsers do not support this property** |
| `shiftKey` | Boolean value that indicates whether the user pressed the shift key |
| `altKey`   | Boolean value that indicates whether the user pressed the alt (or option) |
| `ctrlKey`  | Boolean value that indicates whether the user pressed the control key |
| `metaKey`  | Boolean value that indicates whether the user pressed the meta (or command) key |

```js
document.addEventListener('click', event => {
  let x = document.querySelector('.x');
  x.style.left = String(event.clientX) + 'px';
  x.style.top = String(event.clientY) + 'px';
});
```

```js
document.addEventListener('mousemove', event => {
  let x = document.querySelector('.x');
  x.style.left = String(event.clientX) + 'px';
  x.style.top = String(event.clientY) + 'px';
});
  
document.addEventListener('keydown', event => {
  let el = document.querySelector('div')
 
  if (event.key === 'g') {
    el.children[0].style.background = 'green';
       el.children[1].style.background = 'green';
  } else if (event.key === 'b') {
        el.children[0].style.background = 'blue';
       el.children[1].style.background = 'blue';
  } else if (event.key === 'r') {
        el.children[0].style.background = 'red';
       el.children[1].style.background = 'red';
  }
})
  
```

Adding a text counter to a textarea

```js
document.addEventListener('DOMContentLoaded', () => {
  let composer = document.querySelector('.composer');
  let textarea = composer.querySelector('textarea');
  let counter = composer.querySelector('.counter');
  let button = composer.querySelector('button');
  
  function updateCounter() {
    let length = textarea.value.length;
    let remaining = 140 - length;
    let message = `${remaining.toString()} characters remaining`;
    let invalid = remaining < 0;
    
    textarea.classList.toggle('invalid', invalid);
    button.disabled = invalid;

    counter.textContent = message;    
  }
  
  textarea.addEventListener('keyup', updateCounter);
  
  updateCounter();
});

```

Things to note

we set attributes that define the attributes 

we use `disabled` for button 

we use keyup to detect a button press 

everytime a button is pressed we are calling that method and getting a new value on the text area 



**Capturing and Bubbling**

Thus far, we've been working with events by adding handlers to elements that may be the source of events. For example, we would add an event listener to a button element. This approach results in event listeners attached to each element of interest on the page. It works fine in small applications, but there are downsides:

- You can't add an event listener to an element until the DOM is ready, which means that you must wait until the `DOMContentLoaded` event fires.
- You must add event handlers manually when you add new elements to the page after `DOMContentLoaded`fires.
- Adding handlers to many elements can be slow, and can lead to complicated, difficult to maintain code. Imagine a page with a large spreadsheet-like grid with hundreds or thousands of cells; you must provide listeners for both keyboard and mouse events in every cell.

A technique called **event delegation** provides a solution for these problems, but before we can learn how to use it, we first need to talk about **capturing** and **bubbling**. We'll discuss event delegation later in this lesson.

if our event listener is on an element than everything nested is accessible 

The above, described behavior, surfaces the relationship of nested elements to events. Do you notice the pattern? The number of elements you can interact with is equal to the element (the `div#elem1` element) the event listener was added to plus the number of its **"nested"** inner elements (`div#elem2`, `div#elem3` and `div#elem4` elements). 

// take note that the function expression syntax is used to create the callback function
elem2.addEventListener('click', function(event) {
  alert(event.currentTarget.id);
});

`this` is the `currentTarget`

```js
// take note that the function expression syntax is used to create the callback function
elem2.addEventListener('click', function(event) {
  alert(event.currentTarget.id);
});

// is equivalent to
elem2.addEventListener('click', function(event) {
  alert(this.id);
});
```

What if we put an event handler on an outer element and then another on a nested element? One event is fired if you do something to the inner element, but that one event triggers the two handlers because of **capture and bubbling**

**Capturing** and **bubbling** are phases that an event goes through after it initially fires. The event first gets dispatched to the global `window` object, then to the `document` object, all the way down to the target element, which is the element on which the event was originally fired. At this point, this dispatch process reverses and from the `target` element the event works its way through containing elements until it reaches the `window` object. Using the HTML from our scenario of *"Adding the Event Listener to the Innermost and Outermost Element"*, this process looks like this:

![Event capturing and bubbling](https://d3905n0khyu9wc.cloudfront.net/images/event_phases_v4.png)

**Note1:** The diagram may suggest that there are many click events happening, but actually, there's just **one** `click` event. This one `click` event object moves through the capturing and bubbling phases and checks if there are any listeners for it on the DOM objects that it passes.

**Note2:** The event gets dispatched to each element twice, once during the capturing phase and once during the bubbling phase. The actual event listener, though, gets called/fired in only one phase. By default the listener is set to fire during the "bubbling" phase. To set it to listen on the "capturing phase" you can use the third optional, argument, for the `addEventListener` method, `useCapture`, and set it to `true`.

```js
elem1.addEventListener('click', callbackFunction, true);
// Notice the third argument. It's set to `true`. When it's set to true, the event listener will listen during the capturing phase. If not specified, `useCapture` defaults to `false` and the event listener listens during the bubbling phase.
```

What the capturing and bubbling mechanism implies is that events do not start and end on the target element or the element that an event was triggered on.

Let's take the case of scenario 2 where we were able to interact with the child elements even though an event listener was only attached to their parent. We could interact with the child elements because when we clicked on a child element, the `click` event bubbled up — from the `target` — and passed the parent object which had a listener for it.

Taking the case of scenario 3, the mechanism of capturing and bubbling also explains why there are two alert boxes when we click on the `div#elem4` element only once; the event that was triggered by clicking on the `div#elem4` element starts from the `window` object then reaches the target/`div#elem4` element — invoking/calling its event handler — and then moves back up to the `window` object — passing the parent `div#elem1` element and firing its event handler. This also shows that the click event listeners, by default, are listening on the bubbling phase because the alert box on the `div#elem1` element shows up last.

*WHAT?* In this example if we put true to both then we will get the 1 alert BEFORE the 4 alert bc we are going down 

```js
window.onload = function() {
  let elem1 = document.querySelector('#elem1');
  let elem4 = document.querySelector('#elem4');
  
  elem1.addEventListener('click', event => alert(event.currentTarget.id),true);
  elem4.addEventListener('click', event => alert(event.currentTarget.id),true);
}
```

*How to answer questions about when things fire in the event listener*

1. The `click` event listener listening on the bubbling phase that alerts the `tagName` of the `target`element listening on the `div` element (the first event handler).
2. The `click` event listener listening on the bubbling phase that alerts the `tagName` of the `currentTarget` element listening on the `div` element (the second event handler).

It is interesting to note that adding an event listener of the same type — "click" — to the same element doesn't overwrite the first one that was added.

1. The `click` event listener listening on the **capturing** phase on the `div#elem1` element (the second event handler).
2. The `click` event listener listening on the **bubbling** phase on the `div#elem1` element (the first event handler).

This problem demonstrates that the [click] `event` object passes through the capturing before the bubbling phase.

1. The `click` event listener listening on the bubbling phase on the `div#elem1` element that alerts the `tagName` of the target element (the second event handler).
2. The `keypress` event listener listening on the bubbling phase on `document` that alerts the `code` of the keyboard key that was pressed (the first event handler).
3. The `keypress` event listener listening on the bubbling phase on `document` that alerts the `code` of the keyboard key that was pressed (the first event handler).
4. The `click` event listener listening on the bubbling phase on the `div#elem1` element that alerts the `tagName` of the target element (the second event handler).

In a later assignment, we'll cover the concept that this practice problem surfaces — the event loop. For now, just note that events queue and it's the oldest one that gets processed first regardless of the type of event.

**Stopping Propogation**

`event.stopPropagation`stops the `event` object from continuing its path along the capturing and bubbling phases. Check out the examples below to see it in action.

```js
event.stopPropagation(); // Tells the browser to stop bubbling the event up to parents
```



**EXPLANATION OF CAPTURING AND BUBBLING**

SO for this draw two lines one going down and the other going up

mark your click location 

Then mark all listeners upwards of that (parents)

go down the arrow and then up the other arrow 



**Preventing Default Behavior**

Another useful method on Event objects is `preventDefault`. This method tells the browser that it shouldn't perform any actions that it might otherwise perform in response to a user's action. For instance, clicking a link typically loads a new page in the browser. `preventDefault` tells the browser not to do that. Consider the following code:

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('a').addEventListener('click', event => {
    event.preventDefault();
    alert('Following the link was prevented.');
  });
});
```

As described, the loading of the new page is prevented. Interestingly, though, an alert is still displayed. The takeaway here is that it is the "default behavior" — following through the new page in the `href` attribute — that is prevented and not the added event listener which contains the code for the alert.


The default behavior isn't for the element that the event listener is attached to, but rather for the `event` object; the anchor element's "click" event listener didn't have a `preventDefault` but a new page wasn't loaded.

The browser waits for the event object to go through the propagation phases (capturing and bubbling) before it performs the default action of the event. If there's an event handler with a `preventDefault` call somewhere in the propagation path, the default behavior is skipped.

SKIP OVER A preventDefault using stop probation

**Event Delegation/ Event Propogation**

Looping through buttons to add event handlers

```js
function clickHandler(event) {
  let message = document.getElementById('message');
  message.textContent = `${event.target.textContent} was clicked!`;
}

document.addEventListener('DOMContentLoaded', () => {
  let buttons = document.querySelectorAll('button');

  for (let index = 0; index < buttons.length; index += 1) {
    buttons[index].addEventListener('click', clickHandler);
  }
});
```

Drawbacks to adding event handlers this way:

- We must wait for the DOM to finish loading before adding event handlers. It isn't hard to do this, but it might introduce timing problems if we have other code that also must wait before it runs.
- Modern web pages often add new elements after the page finishes loading. Here, we're binding the event listeners to elements that already exist when the page finishes loading. Any elements added later, though, won't have those event handlers. Instead, the developer must explicitly add listeners to new Elements as the application adds them.
- Attaching many listeners to a document has a cost in performance and memory. For our eight buttons, this overhead is negligible, but imagine a spreadsheet application with thousands of cells, each of which needs several event handlers. We now have to register thousands of listeners, which can cause the page to "freeze" while JavaScript creates them.

**Event delegation** takes advantage of event propagation to address these problems. Instead of adding listeners to every element you're watching, you can add a single handler to any common ancestor (a parent, grandparent, or something further up the DOM tree) of the elements you want to watch. The listener, in turn, performs the required actions for each element

Our simple example lets us attach the single event handler directly to `document`, which means we don't have to wait until the DOM is ready. Within the handler, we can determine which DOM element triggered the event using `event.target`:

```js
document.addEventListener('click', event => {  
  if (event.target.tagName === 'BUTTON') {
    let message = document.getElementById('message');
    message.textContent = `${event.target.textContent}  was clicked!`;
  }
```

**SO** by making the eventlistener upstream it will listen to all things downstream and we can use `target` to know which one was clicked and it still listens bc it was heard upstream

The trade-off of delegation is that the listener may become complicated if it must handle multiple situations. Consider the following variation of the button clicker example that uses both buttons and links. We must treat them differently, depending on which was clicked:

```js
document.addEventListener('click', event => {
  let tag = event.target.tagName;
  
  if (tag === 'BUTTON') {
    let message = document.getElementById('message');
    message.textContent = `${event.target.textContent} was clicked!`;
  } else if (tag === 'A') {
    event.preventDefault();
    event.target.classList.toggle('highlight');
  }
});
```

this event was listening to clicks on buttons and clicks on tags a

Things to note:

event listeners can specify what they want to do by the target thats clicked

the default behavior of an `a` is to lead to the href but we didnt want this here so we prevented the default 

it looks like the default behavior for a button is not to do that 

using event.target is great for delegation!  



*Downfalls of delegation*

Even with merely two cases, our code is noticeably more complex, yet we only have to check the tag name and perform a simple action. In a large document, there may be many different situations; imagine the complexity that may result from even a dozen cases.

*When to use it?*

The best approach is to start by binding event handlers directly to elements when a project is new and small. As the code grows in size and complexity, delegation may make sense to reduce the number of event handlers required.

Keep in mind that you don't need to use `document` as the delegator: you can delegate events to any common ancestor element of the elements you want to monitor. You can even have more than one element handling delegated events if it makes sense.

jQuery, which we'll look at in an upcoming lesson, includes functionality that makes delegation comparatively easy while avoiding the complexity drawback.



**Event loop**

In all of the asynchronous code we've written so far, we've taken advantage of something called the **event loop**.

Article: 

https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff

Video: 

https://www.youtube.com/watch?v=8zKuNo4ay8E&embeds_referring_euri=https%3A%2F%2Flaunchschool.com%2F&source_ve_path=MA&feature=emb_rel_pause





MAYBE DO A STUDY GROUP ON THIS???



**Guessing Game**

Things to note: 

1. If you capture the whole form and use it as an event listener currentTarget then you can use the `submit` event 
2. If you capture just the `submit` button you can use the `click` event 
3. If you have an `input`element then you can use `value` to get the users input from that element in real time 
4. You can use `preventDefault` in `addEventListener` to keep your program from going to the server immediately 

DO BONUS NUMBER 11 later 

https://launchschool.com/lessons/519eda67/assignments/afda9661





**Callbacks**

Callbacks are the fundamental building blocks of asynchronous programming in JavaScript. They help handle tasks that take time to complete without blocking the code execution. 

- **Callbacks**: We start with the fundamental concept of callbacks, the building blocks of async JS, discussing their function and how to navigate the issues they can introduce.
- **Promise Basics**: Next, we'll delve into promises, a cleaner and more efficient way to manage asynchronous operations, detailing their usage and the methods they offer.
- **Error Handling**: We'll then advance to robust error handling strategies within promises to ensure our applications can gracefully deal with unexpected failures.
- **Promise API**: After mastering single promises, we will look at how the Promise API facilitates handling multiple promises together, enabling more complex asynchronous patterns.
- **Async / Await**: Lastly, we will cover the elegant `async` and `await` syntax, which will allow us to write asynchronous code that's as easy to read and debug as synchronous code.

**Single-Thread**

JavaScript is single-threaded, meaning it can only do one task at a time

Callbacks help JavaScript manage asynchronous tasks like server requests, file operations, or timers by executing a task in the background and calling the function back when it's done. This way, the main program flow doesn't have to wait and can keep running.

**Callback Hell/ Pyramid of doom**

A lot of callbacks nested inside eachother makes it hard to read, maintain, and log

```js
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      console.log("Got the data!");
    });
  });
});
```

Solution: 

1. **Modularize**: Break your functions into smaller, reusable pieces.
2. **Use named functions**: Instead of inline anonymous functions, name your functions and reference them.

```js
function getFinalData(c) {
  console.log("Got the data!");
}

function processMoreData(b, callback) {
  getMoreData(b, callback);
}

function processData(callback) {
  getData(function (a) {
    processMoreData(a, callback);
  });
}

processData(getFinalData);
```

**Callback limitations**

- **Readability**: Deeply nested callbacks are hard to read.
- **Error handling**: It's easy to miss errors that are not properly managed at every level of the callback chain.
- **Control flow**: Managing the order of execution can become very challenging.



**Promises**

Evolution of callbacks- 

 they provide a cleaner, more manageable system for handling the asynchronous nature of JavaScript.

Rather than passing a callback into a function, you receive a promise object that you can attach callbacks to, without nesting them.

 In JavaScript, a Promise is an object that represents an asynchronous operation that will complete at some point and produce a value.

A JavaScript Promise has three states:

1. **Pending**: The initial state — the operation has not completed yet.
2. **Fulfilled**: The operation has completed successfully, and the promise has a resulting value.
3. **Rejected**: The operation has failed, and the promise has an error.