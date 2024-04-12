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
>p.removeAttribute('id')
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

Chrome DevTools is a set of web developer tools built directly into the Google Chrome browser. DevTools lets you edit pages on-the-fly and diagnose problems quickly, which helps you build better websites, faster.

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

Information about each method details if it is live or not, but there does not seem to be a standard convention for determining it.

`document.getElementsByClassName()` is an `HTMLCollection`, and is live.

`document.getElementsByTagName()` is an `HTMLCollection`, and is live.

`document.getElementsByName()` is a `NodeList` and is live.

`document.querySelectorAll()` is a `NodeList` and is **not** live.

`HTMLCollection`s appear to always be live

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
function nodeSwap(node1Id, node2Id) {
  const node1 = document.getElementById(node1Id);
  const node2 = document.getElementById(node2Id);

  if (!isInvalidSwap(node1, node2)) {
    const node1Clone = node1.cloneNode(true);
    const node2Clone = node2.cloneNode(true);
    const node1Parent = node1.parentNode;
    const node2Parent = node2.parentNode;

    node1Parent.replaceChild(node2Clone, node1);
    node2Parent.replaceChild(node1Clone, node2);
    return true;
  }
}

function isInvalidSwap(node1, node2) {
  return ((!node1 || !node2) ||
         node1.contains(node2) || node2.contains(node1));
}
```





**Recursive Node Tree**

```js
function nodesToArr(node = document.body) {
  let children = Array.prototype.slice.call(node.children)
  let dom = [node.tagName, []];

  // Base Case
  if (children.length === 0) {
    return dom;
  } 

  // Recursive Step
  children.forEach(childElement => {
    dom[1].push(nodesToArr(childElement))
  });

  return dom;
}
```





**Asynchronous Code**

It's possible to write code that runs partly now, then pauses and continues to run later after a delay of milliseconds, minutes, hours, or even days. We call such code **asynchronous code**; it doesn't run continuously or even when the runtime encounters it.

`setTimeout` is a global method that takes two arguments: a callback function and a time to wait specified in milliseconds (1/1000th of a second). It sets a timer that waits until the given time delay elapses, then invokes the callback function:

`setTimeout()` is an asynchronous function, meaning that the timer function will not pause execution of other functions in the functions stack. In other words, you cannot use `setTimeout()` to create a "pause" before the next function in the function stack fires.

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
setTimeout(() => { 
  setTimeout(() => {
    q();
  }, 15);

  d();  

  setTimeout(() => { 
    n();
  }, 5);

  z();
}, 10);

setTimeout(() => {
  s();
}, 20);

setTimeout(() => { 
  f();  
});

g();
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

we use `disabled` for button 

we use keyup to detect a button press 

everytime a button is pressed we are calling that method and getting a new value on the text area 

The second argument passed to `toggle` is the force argument. If it is `false` then the token will only be removed and if its set to 'true' then it will only be added

**Capturing and Bubbling**

Thus far, we've been working with events by adding handlers to elements that may be the source of events. For example, we would add an event listener to a button element. This approach results in event listeners attached to each element of interest on the page. It works fine in small applications, but there are downsides:

- You can't add an event listener to an element until the DOM is ready, which means that you must wait until the `DOMContentLoaded` event fires.
- You must add event handlers manually when you add new elements to the page after `DOMContentLoaded`fires.
- Adding handlers to many elements can be slow, and can lead to complicated, difficult to maintain code. Imagine a page with a large spreadsheet-like grid with hundreds or thousands of cells; you must provide listeners for both keyboard and mouse events in every cell.

A technique called **event delegation** provides a solution for these problems, but before we can learn how to use it, we first need to talk about **capturing** and **bubbling**. We'll discuss event delegation later in this lesson.

if our event listener is on an element than everything nested is accessible 

The above, described behavior, surfaces the relationship of nested elements to events. Do you notice the pattern? The number of elements you can interact with is equal to the element (the `div#elem1` element) the event listener was added to plus the number of its **"nested"** inner elements (`div#elem2`, `div#elem3` and `div#elem4` elements). 

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

The **event loop**, the **web APIs** and the **message queue**/**task queue** are not part of the JavaScript engine, it’s a part of browser’s JavaScript runtime environment or Nodejs JavaScript runtime environment (in case of Nodejs). In Nodejs, the web APIs are replaced by the C/C++ APIs.



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

Effective error handling in promises is essential for maintaining application stability and improving user experience. Using `.catch()` allows us to deal with errors gracefully, provide fallback behaviours, and ensure that our applications handle unexpected situations without crashing.

Evolution of callbacks- 

 they provide a cleaner, more manageable system for handling the asynchronous nature of JavaScript.

Rather than passing a callback into a function, you receive a promise object that you can attach callbacks to, without nesting them.

 In JavaScript, a Promise is an object that represents an asynchronous operation that will complete at some point and produce a value.

A JavaScript Promise has three states:

1. **Pending**: The initial state — the operation has not completed yet.
2. **Fulfilled**: The operation has completed successfully, and the promise has a resulting value.
3. **Rejected**: The operation has failed, and the promise has an error.

**Creating a Promise**

To create a new promise, you use the `Promise` constructor which takes a function called the "executor." This function runs automatically when the promise is created and includes the operations we want to perform. It has two function arguments, typically called `resolve` and `reject`.

```js
let myFirstPromise = new Promise((resolve, reject) => {
  // We do something asynchronous here, and then call resolve or reject

  // This is just an example condition
  let condition = true;
  if (condition) {
    // This value will be passed to the .then()
    resolve("Success!");
  } else {
    // This error will be passed to the .catch()
    reject("Failure!");
  }
});
```

After creating a promise, you can specify what to do when it is resolved or rejected using the `.then()`, `.catch()`, and `.finally()` methods.

`.then()`

The `.then()` method is called when a promise is successfully fulfilled. You can pass a function that will receive the result.

If the promise is rejected, the `.catch()` method catches the error. It's similar to writing a `try/catch` block in synchronous code.

The `.finally()` method is a new addition that runs after the promise is settled, whether it's fulfilled or rejected. It is usually used for cleanup actions, like stopping a loading indicator regardless of the promise result.

```js
myFirstPromise.then((successMessage) => {
  console.log("Yay! " + successMessage);
});

myFirstPromise.catch((errorMessage) => {
  console.error("Uh oh! " + errorMessage);
});

myFirstPromise
  .then((successMessage) => {
    console.log("Yay! " + successMessage);
  })
  .catch((errorMessage) => {
    console.error("Uh oh! " + errorMessage);
  })
  .finally(() => {
    console.log("This runs no matter what.");
  });
```

So the promise takes a function. The function takes two arguments (resolve and reject)

**Chaining Promises**

Promise outline

```js
let somePromise = new Promise((resolve, reject) => {
  someCondition 

  if (someCondition) {
    resolve('message')
  } else {
    reject('message')
  }
})

somePromise
  .then((message) => {

  })
  .catch((message) => {

  })
```

```js
Promise.resolve(7)     //returns a promise object
  .then((number) => number * 2)
  .then((number) => number + 5)
  .then((result) => console.log(result));
// Logs: 19




let flakyService = new Promise((resolve, reject) => {
  let arr = [true]
  let someCondition = arr[Math.floor(Math.random() * 2)] 

  if (someCondition) {
    resolve('Operation successful')
  } else {
    reject('Operation failed')
  }
}).then((message) => {
    console.log(message)
  }).catch((message) => {
    console.log(message)
  }).finally(() => {
    console.log('you did it')
  })
```

The return value of a promise is a Promise object{{<fulfulled>: 'Operation Successful'}}. It looks like the Promise constructor function takes a function as an argument (executor) that takes two arguements that are callback functions. Those functions return Promise objects that have the then and catch and finally methods defined. 

But if its unsuccessful and doesnt have a catch statement it will return an error 

Uncaught (inpromise) Operation failed. Then then/catch/finally methods also return a Promise object so it can be chained. 



One of the powers of promises is their ability to be chained. When you attach a `.then()`method to a promise, it also returns a new promise, which can be handled with another `.then()` or `.catch()`. This allows for cleaner asynchronous flow control.

To conclude, promises are an elegant way to manage asynchronous operations in JavaScript. They make it possible to write more predictable code compared to traditional callback approaches. With the understanding of promise states and how to use `.then()`, `.catch()`, and `.finally()`, you have the foundation to control more complex asynchronous operations in your code.

- `Promise.resolve()` is a static method used to create a resolved promise with a specified value.
- `resolve()` is not a method directly available on an instance of a promise. It's typically used as a function provided to the executor function when creating a promise, to fulfill the promise with a value.



*Promise Based Function *

```js
function downloadFilePromise() {
  return new Promise((resolve, reject) => {
    let bool = true
    
    setTimeout(() => {
      if (bool) {
        resolve('Download Complete!')
      } else {
        reject('Did not download!')
      }
    }, 2000)

  })
}

downloadFilePromise()
  .then((message) => {
  console.log(message)
  })
  .catch((message) => {
    console.log(message)
  })
```

What if we don't need any reject?

```js
function processDataPromise(numbers) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const processed = numbers.map((number) => number * 2);
      resolve(processed);
    }, 1000);
  });
}
```



MY OWN RESEARCH:

```js
class PromiseDemo {
  constructor(cb) {
    cb(this.resolve.bind(this), this.reject.bind(this));
  }
  
  resolve(d) {
    console.log('resolve', d);
  }
  
  reject(d) {
    console.log('reject', d);
  }
}

new PromiseDemo((resolve, reject) => {
  Math.random() > 0.5 ? resolve('1') : reject('1');
});
```



The promise is an object created from a contructor. The constructor function takes one argument:

function ('executor')

  This function takes two arguments: 

​    resolve, reject <= These two arguments are functions themselves (callbacks) provided by JS. SO we can name the parameters whatever we want and internally the first one will be this.resolve.bind(this) and the second will be 

this.reject.bind(this))

   

So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls `resolve` if it was successful or `reject`if there was an error.

The `promise` object returned by the `new Promise` constructor has these internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` is called or `error` when `reject(error)` is called.![Promise](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAACbCAMAAAAtKxK6AAABAlBMVEX////78uz+8fD/+PTNKjHS39ff6OPWpHb9+fnqt7j27OP/+Pc4gloUd0jYp3vZbnH65OPw3tDZq4H05NjetJDo7+v46erAYzT/+fb19fX07ufz49z87uvs6eHjvaynpqXa3dLQ18q6ybm+XSns08fNzMzfsp2dnJvDwsK5uLjr6+va2dns2Mbz5dnbvaLEklyCrJGrwq+Zt6HBzr5zooW6TgDXnoToyLnSk3Wvra3lzrnapYyVtp6/YTHoybrJe1fNhmaRj47FcEW9hkbHmGLYuJrhxa3TlXnRqIbGlmpmnHt5oodonHxTkm68VhfIeFJ8e3mycyvFkVW7gT2+iVivbRIpMPXdAAAOnUlEQVR4nO2di3+ayrbHB9l3l4N353Q094oZRIwjiYrgqz7AGhoFYbdNTq3n//9Xzhp8pnk0sZ6o6fyaBlgz+NGva2atGRiCEBcXFxcXF9eDyv7PHpTd96fesf78639fXX/9374/9Y7151+K+Np6gxBF4bXFIXKI98Uh7kAc4g7EIe5AHOIO9CyIUOXs7s7dQg7xLoTzOaSCvjY1GvXc5waz5+riebtZaLUahSXBpl5vNDjENURdF3N/w//CmTA4B5BnwlluDrHVZnu5XFuot3K5c4AItQBhTh9wiHcgNkGFr63z+vmXXLuptxufdb3J/C+Xa/5d+Hx21s61c1+ajRaD2Ko36mfw66sOxRziBkQ9J4DL5fQvekM/HxQag2WZXhfnEJWBPodYbxU+F+o5pa4/Quo3hZhrNetn7bPGoNUGiLA5by2L7kNsn5839M9n4oBDvOuJLaDypVAv6F/1BvhartHKtVYQ663W19wX8Lw5xEYjBxUaUJVDvOOJwERotXKN8wIEj7NCoyWw6BEXFQRmPiuIhZwe/xPAESGWNwov7RDfOMRXE4fIId4Xh7gDcYg7EIe4Az0FEYYiP8Ze/d78A4f4JESxBSn3D6XbDFB+K4iFRhOGKwVRbzZ0yLL1AmTU7dw5YNMhTWxB2TlAbOWEVu6s0fwFmm8ZYnOQY+MQHYbF54WBWGhCuj0QdDZ981k4Pz9v5dr6QG/qYl1vnud+wSffNMSC0q43YXjXbuqFZgwRNqwERsj1XK7R/DKHONC/DJrtAoe41B2IMEAWCjqM7sDllNYcYhxJCoOBUC9AYx7koFZb/wzjwy3Ge78HRL3dbOea9XrzrD1oN1rN3Fc9nqbJfS0IzXrzS6GuF74M/tYLnwd1DnGlH6MzQ3PGvO9+LrO0nImLer8HROkBm9ZxDa1LiSzGhzzZ/pm04X0bLTLd3HzoxIcc4k9laPdMkvcxAypO5occ4tMiCkIeuWc2iozhlTI/4hCfktQxehSRyV2rQG8z18DwVlgYOMQHRVg46arUUCYdaLzKRpFo3BYN4hY/ZujSxCE+KJcKGFGX3rpCV0Cd5KqATj5cdWFLPt6sGHKID4tMhB6SeoJHiQc94AKiOLy67pG5W3rGujaHeF/EddGEdChyNcEwoOPrxrkiMYpFbRVj5I0TOMQNxYFCJT2l08Uu8UhnndyI1Mt49KHEGx0axGo+n6/+aKyUNg5KP5auqy13pMfrPC2BMUt2CNE6PfFKoYa6eknt9kPnfqKz1F5XD2TZgpbs8ochKkvZiyo7kmJDllXJVubFrHb1Mt6yQ2lx+mJRTDW/er3Le9/D86Qa4pUgTZDRRRlK18xI58Otpjxx4p9/7UFziNmL/kUF9fv5bB9V8ugSWJWAUblUyver+X4Zlfv5MlSplCr9ch8o9UuoXEGX/X6l0kf9Chgu4cT+ZeUSVUuXnyolcOMsO6G/JcQOYm0YuYbRXaaASIrbsfj0mX/uQWgBEVXL1X62VL6sAgLwJFT61M9fZC8vEaNbzVeyn8D3KpdQqYI+VSoX2QsJflUvUDkPdarZi2y+gkrVMqtVrlzAS1Y+wctcbLFkS+toggde5/UkpbvyQmJ8hKTw5a/2amIOWC7ly+XLSr9fKpURa86sRUJzBAyXpX4lm4/xIPDNyqdymXGqsi2q/Auolst9MEBLjiH2mQNexN/FSyAKLFiIkFaLk64xRAi7qyKF9DJX3eTj5x6A4PNWy/DJqyX0CRixcMCacwwRwku+Ap4I0MBNq8wAzlkGPMzfLqHjvIAKYGAVoTuELyIPlStzh754JIo+JIOlzl3NcDsaFTxhXSB1rz70HovHB6PsJQu84GRZaJGozLynGoeEagW8NF9Cl1lWpVqpZlnrrfQBGPCFrrAC3EvVuE42tuYvq1K/WskDdvgaKuUXvAvFw55INXKrKB4ivSVF4t5cG8KTZx6tnsWnXPl5nYUIRR1CJ9RAbq8H4zh1PpajvY+3wzeKEPSM7EV6foajuYZHegiGyOCSS6OsZW5cvNW7++0ksD6QTTVMZDRczV5LZHJ9rb1dJ9ythAntIk9BQ4Ou5/+loffBGz6VVx+Y5D1oiUfrDFXP6GjdCe2tZxIgKbx2DzkpvK/UyavrXdzTybirqR4llHgqXU/L4Ekxo8mPv9+DVKr22mN25ZRBNDzc0ToGJa7mrrJAtZu5mdAn3u2BKpV+7dkjMYZIO6jbE2QYJ5MlQ9K5zhz04O5R7QuidKWgSW+yZka9D1fdn8wwHKr2BRFpGkLJpROqWiYzOUonjLU3iMK67yOd4s1xtuOF9gZxKWF4feM9cI/IMWnPEFX3utghhz5J8zM9CHHzgo/40NUfcbOK+GCV50CkvQ9vYnC3CVF0cLyVg7UtHUbmj4zEdIj9lVH0g0jeCuL141fujksriDVTECKgZ2LFiWTRxKLAimrR2JTTcCDitCjINYbZxCcylmWzBgZTlv3A3g6idszBZFNLiKbtT2vTENv+zPFHZhiGvnDC2GAsfwsjXwnDlF8bpSJftk/t0Ew5o3Bqpm1/5NcY/20gvhmtIM4cLIamjDGwCmsj0xnVlh97JsszPHOcUXom4rETIjMFEFPICvxACvwXXjJ/wxBlJxzVQhMcMuWnw/TIsnx5SSeCH2cKFhwpANFX0gziqRJYvqOYHOIKohPWIhwGflhLhTUb29hMydaiq/vuBO+EsWlGNVvEdtpOh0uI5tgcc4jrwGKFgYj9mu87juCbad+vCcsgPfPBK8GSlh0RfswwMGtm2hShu3Qsn0NcQ4xTP3GeForz9HDdnGPjGtZyTzQjZ/yiqPLGIT4h/HiR6TxRyCH+18QhcogPaVuI299P+VtBxMJDg7lFFyg75t3S9LNHfm8ZoijOp2MWYVkUprXU3OEWUTveVWbswpYghqFliqv6YH9+kL4LUXGP8MLUj1pCrFlhzUlZguyfOoIli5ZsO98DHACiQBaCWmClHAGH1kzGp6e19Cg0sRmw+swun/rbQjQmLma3w0rHPCO2hIi/wZAP+34Q4lRtKosz2TanOM3QRGlxjCMfj2q2E4DdcSJ5HPiONcZj0/LTEU5Z5mg7iElPQZ4G3kiMx9/jwWsFMRStaeodjOwiR7ZlBWDVxvOiGOJYVsbYFpQIf0ul7No7bDmWpfhOdJIaB9OacrIdRE1D2pVGeuioLxBsQAxCGTsY10bmVBYYRFuIY0uElSmOGESw27VZrWYJK4gnjuzASHvbPpEKqINJxyUdiRzv7OJqKiwSBDu0A3Majmup6GQqT2u274QQRIJZ+B3bNSDpR+9GchhFoTg2fcf3AaJph9O0Mw6/b9knsmsEVBM6xDUeWIx7JLqT4tTA8eT0YkcQljmOLG9WEOSasKn0fdMzIRbnq2+JQciE3hqkJwlU3bhF8Wi0zxFL9/amN09wXKoNiesRT5vISmd/NLbUfod9tPfhtqugyQQRaNTShCKseR4SXPWJt3x42vfYmUwy0JCV+JZZxJYNiD26vvH9SLRviAjJbjGzWCEAsaU7NNiDCpSjCtX7hwiRxLgtzu+NhTjtCYAR94zOEd0hdggQoS13MzeL9aM96srI88RuVzgabzwMiCi+P/GWxtnNBCFPdq9ox+sdyV06BwMRSaT38WoI1FwJ3JFQwRMVzzuKBPxwIKJ4FVpGYzcuKppLDIroRMTaEdy5eFAQoXM0rjPzJFFyoX8kaKKpvTjEHDLKA4PI8sVMsTNfg6H24icKGZTNlbkHPBo8OIggtqBqMd9NOkjxyNVQQ5MDTnkOESJ7WEFxgdFwPY3dI4887okvg4iYC97MH5shC2y1BqLuT0/Zn1L41Zf2PfNqn+BezxeMS+wSjHfIS9VS715fz71kymKMMYfnHkW+eKDqXsXDwfgREVzbSqG3xQk9runFQxSZ3CxG1Vy/INLJ3B74k3GOQaq2mrnl2l6KdpXp8L7xV6UMr2+eePIf1zNFJ6tRNdf2IpOPjy7slfagV/3wu5NqFK+11ZTORurz/o896P/3gWAXUozb68VDUo2NeYn3f7x/dR0vRITE7vWNC6Nq6XrjOdvv/0gmXlvHDBGxq4PFHtGKHzOreM0hbiHiZa4/rv9+A4e4nbT4r2D0Fkcc4lZa/D2Wxe3eHOI2mv9loGLxZp44cojbyJh0XNdgt5LFh7uB+LLXOH6IP+hHiFSNN2myNg2D0+WuM9youdxRfRIOAw5xLkKS6gj+40QyBFppNaEypL5vqypAJWrMNs24pRNkBMUkPssms8B/gTO+ZYhBKrKcbwGNUhEZnRC2wSGUUuxQO8JwrAaByjYkOjmBmmAKk0EUfVcDjLknxoosQhO2SgkZYZ8GIfHDxLxxJ4cRsuD41Apgc+qHQXJIbCly0rY5S6gjlfeJy89GwugUIAZROAWI/vg0XLXRoS9BYRhYQbwJMbRkOzELw1RgS+pYfRHDNw0xJIkRmRLoFb9hfxiEkhOoeAkxGR9bAWwCx/eTJ3SajMxkCB0i+cYhriDiKHKSvk+j0MI4JFYUqtifF1GIM3CcsKykD5tEGAUJC4JyZCVJFPoc4gP9WXL1644xqZ4Ed8rubjjEZ4n4L8TFIT6g3QwRf3OIuxGHyCHeF4e4Az0BMdmFPOe/gfgtQ8Q0SFCLJNTAUQlOEDw8tcaqGU8ygEmlMEIOCAloAnbJE5B+Z4ihDeOR4ZicWL7vpJI0jCFaDFdk+SH57gfffWcWRAH5t5/mENfahOhIdmiNA38ckDlEn4ZxKR5Z/gxHEpki35LUWTr6BYRvHCKV7IA6mGA/oimJQXRO41I6g6YOEPFY4hAf0B2IyWE0tPE73zohdmBDc8ZTcsrmICLfj9JREk+TUADNmUO8o82pMBUa7hACCx2qCTIkRCUJSpgVTJRNbsfz20M6n9HmEFfieeIOxCHuQBziDsQh7kAc4g7EIe5AHOIOxCHuQBziDsQh7kDv/0DJ19YbhPjPV9ebg5j4xx7EFxBzHY7+Az62omLcf2qBAAAAAElFTkSuQmCC)

A promise that is either resolved or rejected is called “settled”, as opposed to an initially “pending” promise.

**Catching Errors with `.catch()`**

The `.catch()` method is your primary tool for handling errors in promises. It is best practice to place a `.catch()` method at the end of your promise chain to ensure all possible errors are caught.

```js
doSomethingAsync()
  .then((result) => doSomethingElseAsync(result))
  .then((newResult) => doThirdThingAsync(newResult))
  .catch((error) => console.error("An error occurred:", error));
```

In this chain, any errors thrown in `doSomethingAsync`, `doSomethingElseAsync`, or `doThirdThingAsync` are caught by the `.catch()` at the end.

The `.catch()` method does more than just log errors. It can also be used to recover from errors and return a new value or promise. This can be helpful in a situation where you want to provide a fallback value if something goes wrong.

The `.finally()` method is useful for performing cleanup actions and is always called whether the promise was fulfilled or rejected. However, `.finally()` is not designed to handle errors. It is typically used for code that should execute no matter the outcome of the promise.

**`then()` additional argument**

it can take a second (error) argument for rejected scenarios, but if we chain it it wont be caught by all the promises error

```js
doSomethingAsync().then(
  (result) => doSomethingElseAsync(result),
  (error) => console.error("An error occurred:", error)
);
```

Exercises https://launchschool.com/lessons/519eda67/assignments/5e87f026

Question 3

Implement a function `retryOperation` that attempts to perform an operation by calling a provided function `operationFunc`. If `operationFunc` throws an error, `retryOperation`should retry the operation up to two additional times before giving up and logging `"Operation failed"`.

```js
// Example usage:
retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.33
        ? resolve("Success!")
        : reject(new Error("Fail!"))
    )
);
```



Their answer:

```js
function retryOperation(operationFunc) {
  let attempts = 0;

  function attempt() {
    return operationFunc().catch((err) => {
      if (attempts < 2) {
        attempts++;
        console.log(`Retry attempt #${attempts}`);
        return attempt();
      } else {
        throw err;
      }
    });
  }

  return attempt().catch(() => console.error("Operation failed"));
}
```



My answer:

```js
function retryOperation(operationFunc) {
  let attempts = 0
  while (attempts < 3) {
    if (operationFunc().catch(()=>{}).state === 'rejected') {
      operationFunc()
      attempts += 1
    } else {
      return operationFunc().then((message)=> console.log(message))
    }
  }
  throw err
}
```

question 5

Implement a `loadData` function that fetches data but sometimes fails. It should return a promise that either resolves with `"Data loaded"` or rejects with `"Network error"`. Use a `.catch()` block to return a recovery promise that resolves with `"Using cached data"` in case of failure.

```js
function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data loaded");
      } else {
        reject("Network error");
      }
    }, 1000);
  }).catch(() => {
    console.error("An error occurred. Attempting to recover...");
    // Return a recovery promise
    return Promise.resolve("Using cached data");
  });
}

loadData().then(console.log);
// Logs "Data loaded" or "Using cached data"
```



**Promise.all()**

When you have a set of asynchronous operations that you want to run in parallel and wait for all of them to complete, `Promise.all()` is the tool you need. It takes an iterable (e.g., an array) of promises and returns a single promise.

The returned promise resolves when all of the input promises have resolved, or rejects as soon as one of the input promises rejects. If the returned promise resolves, it resolves with an array containing the resolve values of each promise, in the same order as the promises provided.

```js
let promise1 = Promise.resolve(3);
let promise2 = 42;
let promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
  // expected output: Array [3, 42, "foo"]
});
```

or 

- If all promises in the iterable resolve successfully, `Promise.all` resolves with an array of their respective resolved values.
- If any promise in the iterable rejects, `Promise.all` immediately rejects with the reason of the first promise that rejects.

```js
let promise1 = Promise.resolve(3);
let promise2 = 42;
let promise3 = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, "foo");
});

Promise.all([promise1, promise2, promise3])
.then((values) => {
  console.log(values);
})
.catch(console.log)

//'foo'
```



**Promise.race()**

`Promise.race()` is similar to `Promise.all()` in that it takes an iterable of promises. However, the promise returned by `Promise.race()` settles as soon as one of the input promises settles — that means it's either fulfilled or rejected. This can be useful when you want to "race" multiple promises against each other and only care about the first one to complete.

```js
let promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // expected output: "two"
});
```



things to note: the way that `setTimeout(resolve, 100, "two");` is set up. "two" is passed to `resolve`

```js
const firstResource = new Promise((resolve,reject) =>
  setTimeout(() => reject("First resource failed"), 5000)
);
const secondResource = new Promise((resolve, reject) =>
  setTimeout(() => reject("Second resource failed"), 1000)
);

Promise.race([firstResource, secondResource])
  .then(console.log)
  .catch(console.log)
//Second resource failed
```



**Promise.allSettled()**

`Promise.allSettled()` returns a promise that resolves after all of the given promises have either resolved or rejected, with an array of objects that each describes the outcome of each promise.

This is particularly helpful when you want to know the results of all promises, regardless of whether they succeeded or not.

Here, `Promise.allSettled()` lets you know that one promise was "fulfilled" and the other was "rejected".

```js
let promise1 = Promise.resolve(3);
let promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, "foo"));
let promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);
```

will get answer like this 

```js
[
  { "status": "fulfilled", "value": 1 },
  { "status": "rejected", "reason": "Error" },
  { "status": "fulfilled", "value": 3 }
]

```



**Promise.any()**

`Promise.any()` takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, it returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an `AggregateError`, a new error type that groups together individual errors.

```js
let promise1 = Promise.reject(0);
let promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
let promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));
let promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));
```



These promise methods offer powerful ways to coordinate multiple tasks in an asynchronous environment. By leveraging `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, and `Promise.any()`, you can control the flow of diverse asynchronous actions with ease, making your code more efficient and responsive.

Question 5

Implement a helper function `loadMultipleResources` that takes an array of URLs and fetches them using the `fetch` API. Use `Promise.allSettled()` to return an array of fetched responses, regardless of whether some URLs may lead to failure.

```js
loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch
```

answer:

```js
function loadMultipleResources(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch(() => "Failed to fetch")
  );
  return Promise.allSettled(fetchPromises);
}
```



**Async/ Await**

 `async` and `await` - a layer of abstraction over promises that makes asynchronous code look and behave more like synchronous code.

**async Functions**

The `async` keyword is added to functions to tell them to return a promise. Whether you explicitly return a promise or a value, the `async` function wraps the returned value in a promise.

```js
async function fetchData() {
  return "data from server";
}

fetchData().then((data) => console.log(data));
// outputs: data from server
```

Even though `fetchData()` just returns a string, because it's an `async` function, `.then()` can be used just like with a promise.



**await Keyword**

The `await` keyword is used inside `async` functions to pause the code on that line until the promise fulfills, then return the resulting value. With `await`, you can write asynchronous code that reads somewhat like traditional synchronous code, without blocking the main thread.

```js
async function fetchData() {
  // The function waits here until the operation completes
  let data = await someAsynchronousOperation();
  console.log(data);
  // Then logs the data
}
```

Note that `await` is traditionally used within `async` functions to pause execution until a promise is settled. It can also be used at the top level of a module. This is an advanced topic we won't get into right now, so let's stay on track and focus on using `await` within `async` functions to manage our asynchronous code effectively.



**Error Handling**

```js
async function fetchData() {
  try {
    let data = await someAsynchronousOperation();
    console.log(data);
  } catch (error) {
    console.error("Oops, an error occurred:", error);
  }
}
```

The `catch` block will handle any errors that occur either in the `await` statement or in the function called.

**Combining async/await with Promise Methods**

The `async/await` syntax doesn't replace promise methods like `Promise.all()`. Instead, they can work together in useful ways.

**Best Practices**

1. Always use `await` within `async` functions.
2. Use `try`/`catch` blocks for error management.
3. Consider performance implications when `await`ing in a loop, as each iteration will wait for the async operation. Sometimes using `Promise.all()` is more appropriate.
4. Be careful not to use `await` unnecessarily, as it can lead to unnecessary waiting and performance issues.

The `async` and `await` keywords in JavaScript significantly simplify the process of working with promises. They bring a level of clarity and simplicity that can make your asynchronous code not just more readable but also easier to write.

Armed with the knowledge of callbacks, promises, the promise API methods, and now `async/await`, you have a full toolkit to tackle any asynchronous task in JavaScript. The asynchronous patterns and best practices discussed in these assignments can help you build resilient and efficient web application

**Exercises**

```js
async function asyncDownloadFile() {
  console.log("Downloading file...");
  const message = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Download complete!");
    }, 1500);
  });
  console.log(message);
}

asyncDownloadFile();
// Logs "Downloading file..." then "Download complete!"
```

```js
async function asyncLoadData() {
  try {
    const message = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded");
        } else {
          reject("Network error");
        }
      }, 1000);
    });
    console.log(message);
  } catch (error) {
    console.error(error);
  }
}

asyncLoadData();
// Logs "Data loaded" or "Network error"
```

```js
async function fetchUserProfile(userId) {
  try {
    const userProfile = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    ).then((res) => res.json());
    console.log("User Profile", userProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  try {
    const userPosts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    ).then((res) => res.json());
    console.log("User Posts", userPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  try {
    const userComments = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/comments`
    ).then((res) => res.json());
    console.log("User Comments", userComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
```

# Summary

1. `setTimeout(callback, delay)` invokes a function after the specified number of milliseconds.
2. `setInterval(callback, delay)` invokes a function repeatedly in intervals of some specified number of milliseconds. `clearInterval` clears the interval and prevents future invocations of the Function.
3. An **event** is an object that represents some occurrence and contains a variety of information about what happened and where it happened. The browser triggers some events as it loads a page and when it accomplishes some actions directed by an application. The user also triggers events when he interacts with the page.
4. Code that must access the DOM should be invoked after the `DOMContentLoaded` event fires on `document`.
5. User events drive most user interfaces and can result from a user interacting with the keyboard, mouse, touchscreen, window or other devices. Examples of these user events are `click`, `mouseover`, `keydown`, and `scroll`.
6. **Event listeners** are callbacks that the browser will invoke when a matching event occurs.
7. `element.addEventListener` registers an event listener.
8. The Event object provides the useful properties `type`, `target`, and `currentTarget`.
9. Keyboard events have properties like `key` (and others) that describe the keys the user pressed. Mouse events similarly provide `button`, `clientX`, and `clientY`.
10. Events propagate in three phases: capturing, target, and bubbling.
11. `event.preventDefault` prevents default browser behavior in response to an event. `event.stopPropagation` stops the current capturing or bubbling phase, which prevents the event from firing on containing or contained elements.
12. **Event delegation** is a technique used to handle events triggered by multiple elements using a single event handler.

SECTION 2 EXERCISES 

https://launchschool.com/exercise_sets/59b16ce9

Video

https://www.youtube.com/watch?v=Y2Y0U-2qJMs&t=1s





**HTTPie**

| Option | What it does                                                 |
| :----- | :----------------------------------------------------------- |
| -p     | What to output: H and B for request headers and body, h and b for response headers and body |
| -a     | Authenticate with this username:password combination         |
| --help | View command options and documentation                       |

**What is an API**

Provides a way for computer systems to interact with eachother Providing functionality for use by another program.

**Web API**

APIs that are built with web technologies 

**Provider and Consumer**

- An API **provider** is the system that provides an API for other parties to use. GitHub is the *provider* of the GitHub API, and Dropbox is the *provider* of the Dropbox API.
- An API **consumer** is the system that uses the API to accomplish some work. When you check the weather on your phone, it is running a program that is *consuming* a weather API to retrieve forecast data.
- *Web APIs* allow one system to interact with another over HTTP (just like the web).
- The system offering the API for use by others is the *provider*.
- The system interacting with the API to accomplish a goal is the *consumer*.
- It is best to prefer the terms *provider* and *consumer* over *client* and *server*.

**Leverage Existing Services**

**APIs enable application developers to build their applications on top of a variety of other specialized systems, allowing them to focus on their actual objectives and not worry about all the complexities of every part of the system.**

- APIs break down the walls between systems, allowing them to share data.
- APIs provide an "escape hatch" enabling service users to customize the software's behavior or integrate it into other systems if required.
- Many modern web applications provide an API that allows developers to integrate their own code with these applications, taking advantage of the services' functionality in their own apps.

**Public API**

Intended for consumption outside the organization that provides them. Twitter, Facebook, Instagram, and many other social media sites provide public APIs that enable third-party programs to interact with their services. This is the type of web API this book deals with.

**Private API**

Intended only for internal use. These APIs are subject to change at any time. The Google search page uses a private API to get a list of search suggestions to display while a user is entering search terms. Sometimes it is possible to call private APIs, but in general, doing so is a bad idea for a variety of technical, ethical, and even potentially legal reasons.

Providers of public APIs can and will dictate the conditions of using their API. Just because an API is *public* doesn't mean that access will be granted to anyone, or that there aren't any rules around how the API can be used. Many APIs require consumers to have accounts with the provider's service and verify this by requiring requests to include authentication data or parameters.

- **What restrictions does the API place on your use of its data?** For example, data from the Amazon Product Advertising API [is only available to Amazon Associates](https://webservices.amazon.com/paapi5/documentation/).
- **Is the API exposing any data that could be linked back to a person?** Many social applications allow access to a user's personal information, and by accessing it, you are taking on the responsibility of keeping this information safe and secure.
- **Does the API have rate limits, and if so, what are they?** Many APIs limit how many requests can be sent from a single user or application within a given time frame. Such restrictions can have an impact on the design of programs that interact with their APIs.

Web APIs are based on the same technologies that allow websites, web browsers, and web servers to work: **HTTP**.

**HTTP RESPONSE**

1. Status Code 
2. Headers
   1. Includes Content-Type: application/json
   2. Other common headers: https://launchschool.com/books/working_with_apis/read/http_response_headers
3. Body



- Web APIs are built on top of HTTP, the technology that makes the web work.
- HTTP Responses have 3 main parts: status code, headers, and body.
- The *Content-Type* header describes the format of the response body.



**URI- Uniform Resource Identifier**

A name used to identify a resource **The resources represented by URIs can be anywhere.**

**URL**, or **uniform resource locator**, is a reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it.

URIs are like social security numbers: every US citizen has a unique number, and as a result, these numbers could be used to reference specific individuals in a computer system (and in fact, they often are used for exactly this purpose in the medical and health insurance industry). But if you needed to have a face to face conversation with a person, just knowing their social security number would do little to tell you where to find them.

URLs, on the other hand, are like street addresses. Given the street address of a person, it is possible to actually find and interact with that person. These identifiers also uniquely identify a resource, which means that a URL is a kind of URI.

URLs also include *how* to access the resource. All the URLs we will be working with in this book (and that you'll work with on most projects) begin with *http://* or *https://*, which signify the resource can be accessed using the HTTP protocol. When the scheme is *https://*, it is an HTTP connection over a secure connection. **if you are working with resources on the internet, just use URL.**

- A **scheme**, such as *http*

- *://*, a colon and two slashes

- A **hostname**, usually a domain name such as *blogs.com*

- An optional colon and **port**, such as *:81*

- The **path** to the resource, such as */api/v1/pages/1*

- An optional **query string**, such as *?query=term*

  *Summary*

- Working with web APIs involves working with *URLs*.
- URLs represent *where* a resource is and *how* it can be accessed.
- URLs typically contain a *scheme*, *hostname*, *path*, and sometimes a *query string*.
- Paths (and URLs) can include *placeholders* when they are written generically.



**Media Types**

HTML is one of many different **media types** (also called **content types** or sometimes **MIME types**) supported by modern web browsers. It is represented in an HTTP response as the `Content-Type` header as `text/html`:

`Content-Type: text/html; charset=UTF-8`

The `charset` (or character set) tells the browser which set of characters the response is using. The charset for most requests will be `UTF-8` or `ISO-8859-1`.

Other media types include `text/plain` for plain text responses, `text/css` for CSS stylesheets, `application/javascript` for JavaScript files, and many, many more. There are media types for PDF documents, sound files, videos, ZIP archives, and [many, many, more](https://en.wikipedia.org/wiki/Internet_media_type#List_of_common_media_types).



**Data Serialization**

A **data serialization format** describes a way for programs to convert data into a form which is more easily or efficiently stored or transferred



**XML**

**XML** (or **extensible markup language**) shares common heritage with HTML: they are both based on an earlier and similar type of markup, SGML

More strict than HTML and used in older apps 



**JSON**

**JSON** (or **JavaScript Object Notation**) is perhaps the most popular data serialization format used by web APIs today.  JSON (JavaScript Object Notation) is a popular data serialization format used by APIs. It's used by programs written in different languages to  exchange arrays, objects, strings, numbers, and boolean values over the  network.



ex/ 

```JSON
{
  "object": {
  	"city": "Boston"
  },
  "array": [1, 1, 2, 3, 5],
  "string": "Hello, World!",
  "number": 8675.309
}
```

- *Media types* describe the format of a response's body.
- Media types are represented in an HTTP response's `Content-Type` header, and as a result, are sometimes referred to as *content types*.
- *Data serialization* provides a common way for systems to pass data to each other, with a guarantee that each system will be able to understand the data.
- JSON is the most popular media type for web APIs and the one this book will focus on.

**REST**

The term *REST* is often used to describe a set of conventions for how to build APIs. **REST** stands for **representational state transfer**, and it was originally defined by Roy Fielding in his [doctoral dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) in 2000. Let's take this term apart:

- *representational* refers to how a representation of a resource is being transferred, and not the resource itself.
- *state transfer* refers to how HTTP is a *stateless* protocol. This means that servers don't know anything at all about the clients, and that everything the server needs to process the request (the state) is included in the request itself.

Loading web pages, submitting forms, and using links to find related content all factor into what REST is and how it applies to the web and API design. If you think about the web page as being a *resource* this makes a little more sense.

- HTML forms must be loaded before they can be submitted. APIs don't have forms, so this initial GET request is unnecessary.
- HTML forms only support two of the many HTTP methods, *GET* and *POST*. APIs are able to take advantage of all HTTP methods, which helps clarify the purpose of API requests.

A good way to think about REST is as a way to define everything you might want to do with two values, *what* and *how*:

- *What*: Which resource is being acted upon?
- *How*: How are we changing / interacting with the resource?

**CRUD**

**CRUD** is an acronym that is used to describe the four actions that can be taken upon resources:

- **C**reate
- **R**ead
- **U**pdate
- **D**elete

RESTful APIs will model most functionality by matching one of these operations to the appropriate resource. As an example, the following table contains the same actions as the previous one, only this time, the HTML-form driven actions have been converted into operations that could be performed with an API. Each action has been mapped to the appropriate element of CRUD.

While web forms are limited by what HTTP methods are supported by the HTML spec and web browser implementations, APIs have far fewer limitations. As a result, web APIs tend to more fully embrace the concepts of HTTP. The development of APIs also moves much faster than the world of HTML rendering since compatibility is ensured by using HTTP, leading to much faster adoption of new ideas and specifications.

The ability of APIs to more fully adopt HTTP manifests itself in API as the use of HTTP methods beyond GET and POST. Instead of using POST with a parameter `_method=delete` to remove a profile, the DELETE HTTP method is used. Updating a resource is done via PUT instead of POST. There are a few other HTTP methods used by some APIs, but GET, POST, PUT, and DELETE provide a method for each CRUD action.

| Objective                           | How         | What     |                     |               |
| :---------------------------------- | :---------- | :------- | :------------------ | ------------- |
| Operation                           | HTTP Method | Resource | Path                |               |
| Get the information about a profile | Read        | GET      | Profile             | /profiles/:id |
| Add a profile to the system         | Create      | POST     | Profiles Collection | /profiles     |
| Make a change to a profile          | Update      | PUT      | Profile             | /profiles/:id |
| Remove a profile from the system    | Delete      | DELETE   | Profile             | /profiles/:id |

**A RESTful API Template**

Here is one more table, only this time it is a template for **any resource**. That's right- any resource at all! Profiles, products, ingredients, automobiles, flights, money transfers, payments... anything.

We'll use *$RESOURCE* to represent the specific resource in this table.

| Objective                             | How         | What     |                       |                 |
| :------------------------------------ | :---------- | :------- | :-------------------- | --------------- |
| Operation                             | HTTP Method | Resource | Path                  |                 |
| Get the information about a $RESOURCE | Read        | GET      | $RESOURCE             | /$RESOURCEs/:id |
| Add a $RESOURCE to the system         | Create      | POST     | $RESOURCEs Collection | /$RESOURCEs     |
| Make a change to a $RESOURCE          | Update      | PUT      | $RESOURCE             | /$RESOURCEs/:id |
| Remove a $RESOURCE from the system    | Delete      | DELETE   | $RESOURCE             | /$RESOURCEs/:id |

By following REST conventions, most of the decisions a designer has to make turn into: *What resources will be exposed*? API consumers mostly need to ask: *what resource will allow me to achieve my goal*?

A RESTful design is one in which any action a user needs to make can be accomplished using CRUD operations on one or many resources.

Since the only actions that can be taken on a resource are create, read, update, and delete, the creative side of RESTful design lies in what resources are exposed to allow users to accomplish their goals. The limitation of only choosing the resources and their relationship can feel sort of similar to designing a database schema, in that the same basic CRUD actions apply to rows in a database table.

**Resource Oriented Thinking**

| bjective                                     | How         | What     | Attributes |                  |                                           |
| :------------------------------------------- | :---------- | :------- | :--------- | ---------------- | ----------------------------------------- |
| Operation                                    | HTTP Method | Resource | Path       |                  |                                           |
| Rate a book                                  | Create      | POST     | Rating     | /ratings         | book_id, rating                           |
| Transfer money                               | Create      | POST     | Transfer   | /transfers       | from_acct_id, to_acct_id, amount          |
| Update a mailing address                     | Update      | PUT      | Address    | /addresses/:id   | street, city, state, postal_code, country |
| Unfriend someone on a social site            | Delete      | DELETE   | Friendship | /friendships/:id | -                                         |
| Fetch a list of movie showtimes              | Read        | GET      | Showings   | /showings        | -                                         |
| Change the quantity of a product in an order | Update      | PUT      | LineItem   | /line_items/:id  | item_id, quantity                         |

This is what is called a **singular resource** or **singleton resource**. Paths and URLs for singular resources identify a single resource. 

It is important to remember that REST is a set of conventions and patterns for building APIs. It is more of a proven way to handle common situations than a workable solution for all possible problems



- *REST* is a set of conventions about how to build APIs.
- RESTful APIs consist of CRUD actions on a resource
- By limiting actions to CRUD, REST requires thinking in a *resource-oriented way*.
- It is worth being as RESTful as possible, but there are times when it is not the best solution.

**What is a resource?**

A representation of some grouping of data

A resource can be anything an API user needs to interact with.

Every resource in a web API must have a unique URL that can be used to identify and access it.

**Fetching a collection**

```js
[
    {
        "id": 1,
        "name": "Red Pen",
        "price": 100,
        "sku": "redp100"
    },
    {
        "id": 2,
        "name": "Blue Pen",
        "price": 100,
        "sku": "blup100"
    },
    {
        "id": 3,
        "name": "Black Pen",
        "price": 100,
        "sku": "blap100"
    }
]

```

This response is very similar to the previous one for a single resource:

- The *media type* is *application/json*.
- The *status* is *200 OK*.
- The *body* is in *JSON* format.

A closer look at the content of the response, however, shows that  data for three products has been returned. The JSON body of this  response is a representation of a **collection** resource. When deserialized in a programming environment, the body of the response will be an array containing 3 objects.

**Elements and Collections**

There are two types of resources involved in the use of RESTful APIs: elements and collections.

**Elements** are the representation of a single resource,  such as the first request above. Operations that involve a single  resource are done in the context of that resource, and will use that  resource's path. deserialized in programming environment as an object

**Collections** represent a grouping of elements of the  same type. It is common for collection and element resources to have a  parent-child relationship, where the collection is the "parent" and an  element is a "child", although this is not always the case. Here is what could be the path to a collection of blog posts:



You can identify what kind of resource- element or collection- by the path or the API docs.

Signs a URL is for a collection:

1. The path ends in a plural word, such as *example.com/products*
2. The response body contains multiple elements

Signs a URL is for a single element:

1. The path ends in a plural word, a slash, and then what could be an identifier (which could be numeric or alphabetic)
2. The response body contains a single element

## 

- APIs provide access to single resources (**elements**) or groups of resources (**collections**).
- The path for an element is usually the path for its collection, plus an identifier for that resource.

**Example of a request**

```js
chelseaoconnor@Chelseas-Air ~ % http --print H GET https://codeexample-1832df66d33e.herokuapp.com/v1/products/1
GET /v1/products/1 HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: codeexample-1832df66d33e.herokuapp.com
User-Agent: HTTPie/3.2.2
```

- *GET* is the HTTP method for the request. The client wants the server to return a representation of the resource.
- */v1/products/1* is the path to a specific resource.
- *HTTP/1.1* is the protocol version being used. Nearly all modern servers and clients support at least this version of HTTP.
- The **Accept Header** specifies what media types the client will accept in response to this request. **/** means that the client will accept any media type in a response. The web store server returns JSON by default, so requests like the previous one would probably be OK to use. However, it is better to be in the habit  of crafting more explicit requests. Accept: */*

What we want to do is tell the server to return JSON to us. We can do  that by specifying a media type in the request's accept header. We want to get a response in JSON format, and recall that the media type for  JSON is *application/json*: Accept:application/json

- HTTP requests include a path, method, headers, and body.
- The **Accept** header tells the provider what media types can be used to respond to the request.

**HTTP Request Side Effects**

As a result, even though making GET requests is generally considered  "safe" in that no data is being explicitly altered on the remote end, it is always worth considering what effects the requests you make could be having on the remote system. (There **can**, however, be other side effects. One example of this is a simple hit counter that increments each time a page is loaded. )



**Creating a Resource**

Making changes to the resources presented by the server is often the purpose of a program. 

 This can be thought of as whether the API usage is "read only", which  can be accomplished with GET requests, or "read and write", which will  require the use of other request types such as POST, PUT, or DELETE. 

Let's say we want to add a new product to the web store system using its API. This can be done with a single POST request.

```js
$ http -a admin:password POST book-example.herokuapp.com/v1/products name="Purple Pen" sku="purp100" price=100
HTTP/1.1 201 Created
Connection: close
Content-Length: 56
Content-Type: application/json
Date: Tue, 23 Sep 2014 18:15:23 GMT
Status: 201 Created

{
    "id": 4,
    "name": "Purple Pen",
    "price": 100,
    "sku": "purp100"
}
```

- The **media type** is *application/json*.
- The **status** is *201 Created*, which we haven't seen before. Since the code is in the *2xx* format, we know this is a successful response. *201 Created* means the request was successful and that it resulted in the creation of a new resource.
- The **body** is in *JSON* format. The data looks similar to the data we saw previously, but the values reflect the  parameters we sent to the server as a part of the most recent request.

**Handling Errors**

HTTP requests don't always complete successfully. A failure can be due  to a request being incomplete or containing an invalid value, a problem  on the server, or even a network connection disruption.

When working with APIs, it is common to use the status code to determine at a high level if a request was successful or not. Depending on the  outcome, the response body can be inspected for additional clues as  needed.

*Missing or invalid Parameters*

Most systems have a set of requirements that must be met to allow the creation of resources. These kind of restrictions, or **validations**, are used to ensure all data in the system is valid and complete.  The web store server validates the values provided when creating a product resource using its API. 

*Missing Resources*

A very common error is attempting to access a resource that doesn't exist. The corresponding HTTP status code for this error is *404 Not Found*. 

- The resource might not actually exist. It could have been deleted or perhaps it was never there in the first place. Verify that any  parameters in the request are correct, especially identifiers.
- The URL could be incorrect. APIs can have a variety of different URL schemes, from the simple and short to the long and complex. Be sure to  look in the documentation for the API you are working with to see what  hosts and paths to use. Keep in mind that services with different  environments for testing and production will often have a unique URL for each environment.
- Accessing the requested resource may require authentication. In an  ideal world, these errors would use a more accurate HTTP status code of *401* or *403*, but for security reasons, it is sometimes better to only expose the  existence of a resource to those who are authorized to access it.

*Authentication*

We briefly worked with authentication earlier in this chapter while  creating a product. Many systems require authentication on some or all  of their APIs. For the most part, missing authentication credentials  will receive `401`, `403`, or `404` errors, and can be resolved by sending valid credentials.

*Incorrect Media Type*

There are multiple ways to send parameters along with a web request.  Since JSON has emerged as the most common format for API requests and  responses in newly released APIs, HTTPie automatically converts any  parameters into JSON when sending a request. HTTPie doesn't print out  the request by default, but we can change this behavior and see what is  going on.

HTTPie can print out the entire request using the `--print` flag. A value of `HBhb` tells HTTPie to print out the headers and body for both the request and response:

*Rate Limiting*

Making a request to an API server requires the receiving system to do some work in order to return a response. Just as it is easy to write a simple loop in a programming language that does something thousands of times in just a few seconds, it is just as  easy to make thousands of requests to a remote API in an equally short  period of time. Since many APIs have to support many users at the same  time, the possibility of there being too many requests to handle becomes extremely likely.

Most APIs address these by enforcing **rate limiting**.  This means that each API consumer is allotted a certain number of  requests within a specified amount of time. Any requests made beyond  these limits are sent an error response and not processed further. The  status code of responses to rate limited requests varies by service, but it is often *403 Forbidden*.

When encountering these rate-limiting errors, it is often enough to  simply perform the request less often. If the same request is being made over and over, the response can be stored locally to reduce the number  of requests being made.

*Server Errors*

The errors we've looked at so far are all in the format *4xx*, and they can all be described at a high level as *client errors*. They are the result of the client doing something in a way that is  incompatible with the server. It is also possible for errors to occur on the server that are not a direct result of anything a client does.  These errors will be in the format *5xx*, and have many potential causes, such as:

- A bug or oversight in the server implementation. Sometimes these can result from the correct and intended usage of an API.
- A hardware or other infrastructure problem with the remote system.
- Any other error that was not foreseen by the remote server implementors.
- Some APIs even return *5xx* errors when a specific client error would be more accurate and useful.
- Unlike client errors, resolving a server error is usually not useful as  an API consumer. Since server errors can be intermittent, simply  retrying the request after a bit of time is often worth attempting. If  the server errors continue, though, it is best to stop making requests  until the remote system has been fixed. Continuing to make requests to a remote system returning errors can worsen many problems and should be  avoided.



- Resources can be created with POST requests.
- Requests should include all required parameters and use the proper media type.
- Responses to failed requests will often contain information about the cause of the failure.



**Updating a Resource**

Suppose we have just found out the price for one of the products in the system (*Purple Pen 2.0*) is too low. We need to update this product's price to $1.50. While  we're at it, we need to also change the name to be more eye catching to  drive up sales.

It looks like the product that needs to be updated has an `id` of `5`. Making a change to this product is going to be very similar to creating a product, with two main differences:

- Using *PUT* as the HTTP method instead of *POST*
- Using the product's path instead of the product collection path (e.g. */products/1* instead of */products*)
- **PUT** is the correct HTTP method for updating the value  of a resource and sending all of its values back to the server. PUT  tells the server to *put this resource in this place*. According  to the HTTP spec, PUT requests must take a complete representation of  the resource being updated. This means that if a parameter was required  to create the resource, it is required to be sent in any PUT requests  modifying that resource. This also means that any parameter left out of a PUT request is assumed to have an empty value (usually null or nil).  Most APIs don't strictly follow this requirement, however, and provide a much simpler behavior by updating any parameters sent in a PUT request, and not modifying any other parameters that are already on the  resource. 

```js
$ http -a PUT book-example.herokuapp.com/v1/products/5 Authorization:"token AUTH_TOKEN" price=150
HTTP/1.1 200 OK
Connection: close
Content-Length: 60
Content-Type: application/json
Date: Thu, 02 Oct 2014 05:41:07 GMT
Status: 200 OK

{
    "id": 5,
    "name": "Purple Pen 2.0",
    "price": 150,
    "sku": "purp101"
}
```

**Deleting a Resource**

Now that the updates have been made to the `New and Improved Purple Pen`, it is time to remove the older product `Purple Pen` from our system. Deleting a resource is very similar to fetching a resource, with one difference: Using the **DELETE** HTTP method instead of *GET*. Otherwise, everything else should look very familiar. On the web store  API, delete requests need to be authenticated, so those arguments to `http` should be included

`204 No Content` is in the format *2xx*, which means the request was processed successfully. `204 No Content` is commonly used when it doesn't make sense to return anything in the  response body, and deleting a resource is one such case. If there is no  longer a resource at the path being accessed, there isn't anything to  send back.

- Use HTTP method **PUT** to update resources.
- Use HTTP method **DELETE** to delete resources.



**Steps when deciding to work with an API**

- What *protocol*, *host* and *path* (basically, what *URL*) will provide access to the appropriate resource?
- What parameters do I need to include in the request?
- Is authentication required?

**OAuth**

OAuth is a complicated system that provides a way for users to grant  access to third party applications without revealing their credentials. he end result of this is an *access token* and an *access token secret*, which, when combined with an *application key* and *application secret* belonging to the requesting application, provide enough information to  build a request using a somewhat involved list of steps we won't get  into here. You can think of the *application key* and *application secret* as the application's username and password, and the *access token* and *access token secret* as the username and password belonging to an individual user. These  values are used for different purposes, but ultimately you need all four values to make requests.

**Common Response Headers**

https://launchschool.com/books/working_with_apis/read/http_response_headers



**Network Programming in Javascript**

- When the user clicks a link, the web browser automatically requests the page.

- When the browser receives a response, it renders it in the viewport.

  Developers need different methods to work around it; they need a way to replace only part of the page. That new technique is **AJAX**: **A**synchronous **J**avaScript **A**nd **X**ML. AJAX gained popularity for its ability to fetch data, typically HTML or XML, and update parts of a page. 



**AJAX**

HTTP request from a web browser that *does not perform a full page load.*

-   AJAX lets us use all HTTP methods, not just `GET` and `POST` -- the HTML `form` tag only allows `GET` and `POST` as the method.
-   AJAX gives us a fine-grained control over the headers and  data-format of our request. In particular, we can often request data in  HTML format, JSON format, or XML format. This is sometimes not possible  with a purely HTML-based form.
- The web browser doesn't make an automatic HTTP request; instead, JavaScript code initiates it, typically from an event listener.
- When the browser receives a response, JavaScript code *optionally* takes the response's body and updates the page as needed. Note that the JavaScript code is free to ignore the response.
- **To summarize: when requesting a resource using JavaScript, the  developer must write code that initiates the request and then optionally handles the response.**
- AJAX, an acronym for asynchronous JavaScript and XML, is a means of obtaining data from a server after the page has already been loaded and rendered.
- It also allows sending data back to the server without reloading the page. AJAX is used much more often in modern websites and applications to provide that "snappy" or immediate response feeling.

One popular use case for AJAX is to display some pertinent information  in a popup when the user hovers the mouse pointer over certain words:

![AJAX Flow (using hover popup)](https://d3905n0khyu9wc.cloudfront.net/images/xhr_loading.png)

Another use case arises when a large page contains a form. When a user  submits such a form with validation errors, rather than reloading the  entire page and losing the user's scroll position, we can send the form  request asynchronously with AJAX, and update only the form to show  relevant error messages. The technique provides a better user  experience.

**Single Page Applications**

Some modern applications fetch data in a serialized format and create  the DOM entirely from JavaScript running in a client's browser. We call  these applications *single page applications* since they often  run entirely within a single HTML page. Instead of fetching bits of HTML generated by a server, this model does all interactions by passing data to and from the server, often encoded as JSON.



**Making a Request with XMLHttpRequest**

Use the `XMLHttpRequest` object to send a HTTP request with JavaScript. This object is part of the browser API, not the JavaScript language.

Today, we use this object to load any data (typically HTML or JSON) and can use other protocols (including `file://`) as well.

```js
var request = new XMLHttpRequest();

request.send();
after load event fires

request.status » 200

request.statusText » OK

request.responseText » This is a 200 response.

request.readyState » 4

request.getResponseHeader('Content-Type') » text/plain; charset=utf-8
```

To send a request, we must provide the same parameters we would use when sending an HTTP request from any other language or tool: a *method*, a *host*, and a *path*.

```js
let request = new XMLHttpRequest(); // Instantiate new XMLHttpRequest object
request.open('GET', '/path');       // Set HTTP method and URL on request
request.send();                     // Send request
```

The request object has some interesting properties. Before the request  completes, though, those properties contain empty string or `0`:

```js
let request = new XMLHttpRequest();
request.open('GET', '/path');
request.send();

request.responseText;                       // => ""
request.status;                             // => 0
request.statusText;                         // => ""
```

Once request completes:

```js
request.responseText;                       // body of response
request.status;                             // status code of response
request.statusText;                         // status text from response

request.getResponseHeader('Content-Type');  // response header
```

Note that `request.send` is asynchronous, meaning that code execution continues without waiting for it to complete. The `XMLHttpRequest` object uses event listeners to send notifications when the request  completes and provides access to the response returned by the remote  system. Here, we'll wait for the response to load by listening for the `load` event:

```js
request.addEventListener('load', event => {
  var request = event.target;                 // the XMLHttpRequest object

  request.responseText;                       // body of response
  request.status;                             // status code
  request.statusText;                         // status text from response

  request.getResponseHeader('Content-Type');  // response header
});
```

You may sometimes see code where `request.open` receives a third argument, either `true` or `false`. This argument specifies whether the method should make a synchronous or asynchronous request. Since you should never make synchronous requests  from JavaScript, most contemporary browsers deprecate them, which  suggests that you should always use `true` as the third argument. Since the argument defaults to `true`, you can omit it from most code.

**XMLHttpRequest Methods**

| Method                            | Description                                        |
| --------------------------------- | -------------------------------------------------- |
| `open(method, url)`               | Open a connection to `url` using `method`.         |
| `send(data)`                      | Send the request, optionally sending along `data`. |
| `setRequestHeader(header, value)` | Set HTTP `header` to `value`.                      |
| `abort()`                         | Cancel an active request.                          |
| `getResponseHeader(header)`       | Return the response's value for `header`.          |

You should also become familiar with the following `XMLHttpRequest` properties:

| Property       | Writable | Default Value | Description                                                  |
| -------------- | -------- | ------------- | ------------------------------------------------------------ |
| `timeout`      | Yes      | `0`           | Maximum time a request can take to complete (in milliseconds) |
| `readyState`   | No       |               | What state the request is in                                 |
| `responseText` | No       | `null`        | Raw text of the response's body.                             |
| `response`     | No       | `null`        | Parsed content of response, *not meaningful in all situations* |

**XMLHttpRequest Events**

To run some code when an event occurs on an `XMLHttpRequest` object, we can use the same `addEventListener` method that we used for handling user or page events:

```js
let request = new XMLHttpRequest();

request.addEventListener('load', event => {
  let xhr = event.target;   // the request is available as event.target
                            // if you can't access it from an outer scope.
});
```

Two main events fire during an `XMLHttpRequest` cycle: one when it sends the request, and one when response loading ends.

| Event       | Fires When...                                                |
| ----------- | ------------------------------------------------------------ |
| `loadstart` | Request sent to server                                       |
| `loadend`   | Response loading done and all other events have fired. Last event to fire. |

Before `loadend` triggers, another event will fire based on whether the request succeeded:

| Events    | Fires when...                                              |
| --------- | ---------------------------------------------------------- |
| `load`    | A complete response loaded                                 |
| `abort`   | The request was interrupted before it could complete       |
| `error`   | An error occurred                                          |
| `timeout` | A response wasn't received before the timeout period ended |

![XMLHttpRequest lifecycle events](https://d3905n0khyu9wc.cloudfront.net/images/220_xhr_main_events.png)

Keep in mind that the browser considers any request that receives a  complete response as successful, even if the response has a non-200  status code or represents an application error.  **Whether `load` or another event fires is determined by whether the HTTP  request-response cycle loads a complete response. It does not consider  the response's semantic meaning to the application.**

It is the responsibility of the application code to determine whether a `request` was successful from its perspective by inspecting the response within a `load` event handler.

*Media Types*

three common media types of HTML, XML, and JSON  used for response's body

The content of most requests will use a format and media type that works well for representing hierarchical data. These formats are known as data serialization formats.

**Request Serialization Formats**

JavaScript applications that run in a web browser must *serialize* data when communicating with remote systems. Serialization lets both  the client and server transfer data in a format that preserves  information. Applications can use any *data serialization format* that both the client and server know how to read and write.

**Query String/ URL encoding**

Many web applications use a serialization format that you've already  seen and used: URL encoding for query strings. A query string consists  of one or more `name=value` pairs separated by the `&` character. This format is easy to use and understand, though the  presence of non-alphanumeric characters in the names or values can  complicate matters. You must encode those characters. For example, you  can encode spaces in a query string as either `%20` or `+`.

```js
# without encodeURIComponent
title=Do Androids Dream of Electric Sheep?&year=1968

# with encodeURIComponent
encodeURIComponent('Do Androids Dream of Electric Sheep?&year=1968')
'Do%20Androids%20Dream%20of%20Electric%20Sheep%3F%26year%3D1968'

title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968
```

Once you have a properly encoded query string, you can append it to a GET request's path:

URL encoding also works with POST requests, but you must include a `Content-Type` header with a value of `application/x-www-form-urlencoded` in that case. Place the encoded name-value string in the request body.

```js
POST /path HTTP/1.1
Host: example.test
Content-Length: 54
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Accept: */*

title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968
```

**Multipart Forms**

POST requests use multipart form formats for forms that include file uploads or that use `FormData` objects to collect data. This format isn't strictly an encoding format  since we don't encode anything. Instead, we place each name-value pair  in a separate section of the request body. A **boundary delimiter** defined by the `Content-Type` request header separates each part:

```js
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywDbHM6i57QWyAWro
```

Below is an entire POST request that uses multipart form data. Notice  how each parameter is in a separate part of the request body, with the  boundary delimiter before each section, and after the last section. The `Content-Type` header also sets `multipart/form-data` and specifies the boundary delimiter:

```js
POST /path HTTP/1.1
Host: example.test
Content-Length: 267
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywDbHM6i57QWyAWro
Accept: */*

------WebKitFormBoundarywDbHM6i57QWyAWro
Content-Disposition: form-data; name="title"

Do Androids Dream of Electric Sheep?
------WebKitFormBoundarywDbHM6i57QWyAWro
Content-Disposition: form-data; name="year"

1968
------WebKitFormBoundarywDbHM6i57QWyAWro--
```

Note that the final boundary delimiter has an extra `--` at the end; these characters mark the end of the multipart content.

A `GET` request can return JSON, you may then use `POST` to send JSON data to the server. Here we make our request using JSON format:

```js
POST /path HTTP/1.1
Host: example.test
Content-Length: 62
Content-Type: application/json; charset=utf-8
Accept: */*

{"title":"Do Androids Dream of Electric Sheep?","year":"1968"}
```

Note that the `Content-Type` header has a value of `application/json; charset=utf-8`. This is required if you want to use JSON as the request serialization  format. The server may not parse the request correctly if this header  has the wrong value.

**Loading HTML via XHR**

```html
<h1>Existing Page</h1>

<div id="store"></div>
```

```js
document.addEventListener("DOMContentLoaded", () => {
  let request = new XMLHttpRequest();
  request.open("GET", "https://ls-230-web-store-demo.herokuapp.com/products");

  request.addEventListener("load", event => {
    let store = document.getElementById("store");
    store.innerHTML = request.response;
  });

  request.send();
});
```

But say we click on one of the links within the store on our page.. that will not render correctly bc we don't have an event listener on those links

```js
document.addEventListener("DOMContentLoaded", () => {
  let store = document.getElementById("store");

  let request = new XMLHttpRequest();
  request.open("GET", "https://ls-230-web-store-demo.herokuapp.com/products");

  request.addEventListener("load", event => (store.innerHTML = request.response));
  request.send();

  store.addEventListener("click", event => {
    let target = event.target;
    if (target.tagName !== "A") {
      return;
    }

    event.preventDefault();

    let request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://ls-230-web-store-demo.herokuapp.com" + target.getAttribute("href")
    );

    request.addEventListener("load", event => (store.innerHTML = request.response));
    request.send();
  });
});
```

1. We can use an `XMLHttpRequest` object to fetch content and insert it in an existing web page without a full page reload.
2. We can attach event listeners to content embedded in the page to  circumvent the browser's default behavior and create custom  interactions.



**Submitting a Form via XHR**

There are three steps to submitting a form using JavaScript:

1.  Serialize the form data.
2.  Send the request using `XMLHttpRequest`.
3.  Handle the response.

```js
let request = new XMLHttpRequest();
request.open('POST', 'https://example.test/path');

let data = 'this is a test';

request.send(data);

// Or if there was no data to send
// request.send();
```

This code results in the following HTTP request

```js
POST /path HTTP/1.1
Host: example.test
Content-Length: 14
Content-Type: text/plain;charset=UTF-8
Accept: */*  //The Accept header gets set to */* if it isn't set via setRequestHeader.

this is a test
```

**URL-encoding POST parameters**

URL encoding also works with `POST` requests, but you must include a `Content-Type` header with a value of `application/x-www-form-urlencoded` when you do. Place the encoded name-value string in the request body.  Here we post a new book to a book-catalog demo application.

```js
let request = new XMLHttpRequest();
request.open('POST', 'https://lsjs230-book-catalog.herokuapp.com/books');

request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

let data = 'title=Effective%20JavaScript&author=David%20Herman';

request.addEventListener('load', () => {
  if (request.status === 201) {
    console.log(`This book was added to the catalog: ${request.responseText}`);
  }
});

request.send(data);
```

A 201 status means the resource was added successfully on the server,  although our book-catalog application doesn't actually store the data.  This code produces the following HTTP request:

```js
POST /books HTTP/1.1
Host: lsjs230-book-catalog.herokuapp.com
Content-Length: 50
Content-type: application/x-www-form-urlencoded
Accept: */*

title=Effective%20JavaScript&author=David%20Herman
```

The server parses the data in the HTTP request's body and makes it available in the following data structure. * all param values are strings 

```js
{
  title: 'Effective JavaScript',
  author: 'David Herman'
}
```

**Submitting a Form**

```js
<form id="form" method="POST" action="books">
  <p><label>Title: <input type="text" name="title"></label></p>
  <p><label>Author: <input type="text" name="author"></label></p>
  <p><button type="submit">Submit</button></p>
</form>
```

To access the values from this form, we can use the `HTMLFormElement.elements` property within an event listener that receives control when the user submits the form:

```js
let form = document.getElementById('form');

// Bind to the form's submit event to handle the submit button
// being clicked, enter being pressed within an input, etc.
form.addEventListener('submit', event => {
  // prevent the browser from submitting the form
  event.preventDefault();

  // access the inputs using form.elements and serialize into a string
  let keysAndValues = [];

  for (let index = 0; index < form.elements.length; index += 1) {
    let element = form.elements[index];
    let key;
    let value;

    if (element.type !== 'submit') {
      key = encodeURIComponent(element.name);
      value = encodeURIComponent(element.value);
      keysAndValues.push(`${key}=${value}`);
    }
  }

  let data = keysAndValues.join('&');

  // submit the data
  let request = new XMLHttpRequest();
  request.open(form.method, `https://ls-230-web-store-demo.herokuapp.com/${form.getAttribute('action')}`);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener('load', () => {
    if (request.status === 201) {
      console.log(`This book was added to the catalog: ${request.responseText}`);
    }
  });

  request.send(data);
});
```

This result means that the data the remote system receives will be the  same. The difference between the two examples lies purely in how we  obtain the data.

**Submitting a Form with FormData**

URL-encoding the names and values of each `input` element as we did above is a manual and error-prone process. Modern browsers provide a built-in API to assist in this process, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#Retrieving_a_FormData_object_from_an_HTML_form). Here's how to use it:

Please take note that `FormData` only uses input fields that have a `name` attribute. As you can see, using `FormData` makes it easy to serialize the form's data!

```js
let form = document.getElementById('form');

form.addEventListener('submit', event => {
  // prevent the browser from submitting the form
  event.preventDefault();

  let data = new FormData(form);

  let request = new XMLHttpRequest();
  request.open(form.method, `https://ls-230-web-store-demo.herokuapp.com/${form.getAttribute('action')}`);

  request.addEventListener('load', () => {
    if (request.status === 201) {
      console.log(`This book was added to the catalog: ${request.responseText}`);
    }
  });

  request.send(data);
});
```

One thing to note is that `FormData` uses a different serialization format called *multipart*. Forms that include file inputs use this same serialization. Since `FormData` can upload files, it makes sense for it to default to this multipart format.

```js
POST /books HTTP/1.1
Host: lsjs230-book-catalog.herokuapp.com
Content-Length: 234
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryf0PCniJK0bw0lb4e
Accept: */*

------WebKitFormBoundaryf0PCniJK0bw0lb4e
Content-Disposition: form-data; name="title"

Effective JavaScript
------WebKitFormBoundaryf0PCniJK0bw0lb4e
Content-Disposition: form-data; name="author"

David Herman
------WebKitFormBoundaryf0PCniJK0bw0lb4e--
```

The body of requests sent using multipart form serialization contains a  series of parts. Each section is prefixed by a string (in this case, `------WebKitFormBoundaryf0PCniJK0bw0lb4e`), and includes an HTTP header called `Content-Disposition` that provides the name of a parameter and its value. Here's one part of the above request for illustration:

Without credentials, anybody in the world can change the product  information. One way to authenticate is to provide a special header that contains an authentication token that only an authorized client should  know. In a real application, the user would login to a site, which in  turn would return a unique token, possible via a cookie. For now, we'll  add the header manually with a simple (and insecure) string.

**Loading JSON via XHR**

Sometimes, though, it makes more sense to load data in a primitive data  structure and render it with the client-side code. This situation often  occurs when the user interface has widgets that the server doesn't  render.

What do we mean by server-side vs. client-side rendering?

Server-side rendering (SSR) involves building a complete web page on  the server side of things and sending that page to the client - our web  browser - which then displays it.

Client-side rendering (CSR) occurs when the server sends only a  bare-bones HTML document and some JavaScript to the client. The client  then executes the JavaScript code, which requests the data it needs and  fills out the rest of the page dynamically.

Modern browsers make this process a bit easier by providing native  support for fetching JSON data. To do this, we can take advantage of the `responseType` property to tell the browser how to handle the data it receives.

The valid values for `responseType` are: `text`, `json`, `arraybuffer`, `blob`, and `document`.

```js
//FROM THIS: 

let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');

request.addEventListener('load', event => {
  let data = JSON.parse(request.response);

  // do something with data
});

request.send();

//TO THIS:

let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', event => {
  // request.response will be the result of parsing the JSON response body
  // or null if the body couldn't be parsed or another error
  // occurred.

  let data = request.response;
});

request.send();
```

We can avoid this boilerplate by setting `responseType` to `json`. `request.response` either contains a value, or it doesn't, and our code can check that condition.

```js
let request = new XMLHttpRequest();
request.open('GET', 'htps://api.github.com/repos/rails/rails');

request.addEventListener('load', event => {
  let data = JSON.parse(request.response);
  console.log(request.status);
  console.log(data.open_issues);
});

request.addEventListener('error', event => {
  console.log('The request could not be completed!');
});

request.send();
```



**Sending Data via XHR**

1. Serialize the data **into valid JSON**.
2. Send the request using `XMLHttpRequest` **with a `Content-Type: application/json; charset=utf-8` header**.
3. Handle the response.

```js
let request = new XMLHttpRequest();
request.open('POST', 'https://lsjs230-book-catalog.herokuapp.com/books');

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

let data = { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' };
let json = JSON.stringify(data);

request.send(json);
```

```js
function createProduct(productData) {
  let json = JSON.stringify(productData);
  let request = new XMLHttpRequest();

  request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

  request.addEventListener('load', () => {
    console.log(`This product was added: ${request.responseText}`);
  });

  request.send(json);
}

createProduct({
  name: 'HB pencil',
  sku: 'hbp100',
  price: 50,
});

```



**Cross-Domain XMLHttpRequests with CORS**

The scheme, hostname, and port of a web page's URL define its origin. A cross-origin request occurs when the page tries to access a resource  from a different origin.

Let's consider the URL `http://mysite.com/doc1`. If the  web page from this URL requests a resource from any of the following  URLs, it will be considered a cross-origin request.

- https://mysite.com/doc1 (different scheme/protocol)
- http://mysite.com:4000/doc1 (different port)
- http://anothersite.com/doc1 (different host)

A cross-origin request could be a request for an image, a JavaScript  file, an XHR, or any other resource. The most important kind of  cross-origin request for our purposes is a cross-domain request: a  request from one domain (hostname) to another domain.

Cross-domain requests in web browsers have security vulnerabilities that hackers can exploit to launch attacks. These attacks often lure a user  into clicking a carefully crafted link that sends a request to an  application with the user's login credentials. These security issues are beyond the scope of our discussion here. Search *XSS* and *CSRF* if you're interested in finding out more about these attacks.

**Cross- Origin requests with XHR**

By default, an `XHR` object can't send **cross-origin** requests because of the aforementioned security problems. All browsers  implement a security feature called the same-origin policy. It prevents `XMLHttpRequest` from making cross-domain requests. The application can request  resources from the origin domain, but a request from any other domain  causes an error.

You might ask how you can use all the APIs available for public  consumption on web applications if cross-origin requests from XHR  objects aren't allowed? Indeed, many applications do use APIs for  weather information, stocks, sports scores, maps and all kinds of other  services hosted at different domains. The answer is that they use the  Cross-Origin Resource Sharing (CORS) mechanism to allow cross-origin  access to resources.

Cross-Origin Resource Sharing is a W3C specification that defines how the browser and server must communicate when accessing resources across origins. The idea behind CORS is to let the two systems know enough  about each other to determine whether the response should succeed or  fail. Applications use custom HTTP request and response headers to  implement this mechanism.

According to the specification, every `XMLHttpRequest` sent by the browser must have an `Origin` header that contains the origin of the requesting page. The server uses this header to determine whether it should send a corresponding header  in the response.

The browser automatically adds the `Origin` header as part of an XHR. For example, if we send an XHR from a page hosted at `http://localhost:8080`, the browser adds the following request header:

`Origin: http://localhost:8080`

When the server receives this request, it checks the `Origin` header and determines whether the request came from an origin that is  allowed to see the response. If it is, it sends the response back with  an `Access-Control-Allow-Origin` header that contains the same origin. In our example, the response header will be:

`Access-Control-Allow-Origin: http://localhost:8080`

If the server wants to make a resource available to everyone, it can send the same header, but with a value of `*`:

`Access-Control-Allow-Origin: *`

When the browser sees the `Access-Control-Allow-Origin` header, it checks whether the value contains the correct origin or `*`. If it does, the browser makes the response available to the application. Otherwise, it raises an error.

It's important to note that even if the server sends the correct response, but without the `Access-Control-Allow-Origin` header with the appropriate value, the browser will raise an error and not let the script access the response.

```js
router.get('/areas_of_continents', (req, res, next) => {
  // code omitted for brevity
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  // the following line also works
  // res.set('Access-Control-Allow-Origin', '*');
  res.json(continents);
});
```

The Cross-Origin Resource Sharing specification fulfills the need for  legitimate cross-origin requests. It gives us a standard way to access  resources from different origins without the security problems  associated with cross-origin requests.



**Throttling**

What we would want to do is delay sending an XHR to the server for a short period, and not send it at all if we no longer need it. The technique waits for some specified time before sending a request to the server. If, in the interim, that request becomes irrelevant due to a newer request, we discard the original request and start a new delay period for the newer request.

Many JS libraries provide this capability, often with a function named `debounce`. This function takes a callback and a delay in milliseconds as arguments and returns a new function that calls the callback after the specified delay elapses. Let's get a clearer picture of how this works with a custom version of `debounce`.

The utility of `debounce` isn't limited to optimizing AJAX requests. It can optimize the calling frequency of any event handler that gets called too often. Examples include scrolling and mouse movements

Finished code for Autocomplete

https://launchschool.com/lessons/3728e24b/assignments/2d8ea208



**SUMMARY**

- AJAX is a technique used to exchange data between a browser and a server without causing a page reload.
- Modern browsers provide an API called the `XMLHttpRequest` to send AJAX requests.
- Some modern applications rely exclusively on JavaScript and `XMLHttpRequest` to communicate with the server and build up the DOM. Such applications are called *single page applications*
- Sending requests through `XMLHttpRequest` mainly involves the following steps:
  - Create a new `XMLHttpRequest` object.
  - Use the `open` method on the XHR object to specify the method and URL for the request.
  - Use the `setRequestHeader` method on the XHR object to set headers you'd like to send with the request. Most of the headers will be added by the browser automatically.
  - Use the `send` method on the XHR object to trigger the whole action and on POST request we can also pass serialized data as an argument.
  - Attach an event handler for the `load` event to the XHR object to handle the response.
  - Attach an event handler for the `error` event to the XHR object to handle any connection errors. This is not required but it's a good practice.
- XHR objects send asynchronous requests by default, meaning that the rest of the code continues to execute without waiting for the request to complete.
- Important properties on an XHR object are: `responseText`, `response`, `status`, and `statusText`
- The data sent along with requests, if any, must be serialized into a widely supported format.
- The three request serialization formats in widespread use are: 1) *query string/url encoding*, 2) *multi-part form data*, 3) and *JSON*.
- It's a good practice to send a `Content-Type` header with XHR. This helps the server parse the request data.
- Three popular response formats are: 1) HTML, 2) JSON, 3) XML.
- The single most popular serialization format currently in use is JSON.
- To submit a form via XHR, an instance of `FormData` can be used to conveniently serialize the form into multi-part data format.
- One useful property on an XHR object is `responseType`. It's particularly useful when the response is expected to be JSON. When its value is set to `"json"`, the XHR object's response property gives us parsed JSON.
- One major constraint on XHR is the browsers' same-origin policy that limits communication to the same domain, the same port, and the same scheme. Any attempt to communicate outside these limits result in a security error.
- The standard solution for cross-origin restrictions is a W3C specification called Cross-Origin Resource sharing (CORS). CORS recommends using an `Origin` header on the request and an `Access-Control-Allow-Origin` header on the response for cross-origin communications.

Exercises

https://launchschool.com/exercise_sets/e0015dad



**VIDEO**

https://launchschool.com/lessons/e1800f40/assignments/6b7153e3



**Libraries**

When you first approach a new library, it's often useful to view it in a certain context: as a tool that serves an immediate purpose, rather than something you necessarily want to devote a lot of time to becoming an expert in.

The key to effectively using a library within that context is [Just In Time (JIT) learning](https://medium.com/launch-school/just-in-time-learning-f6a10886ddfe), a skill which allows you to quickly ramp up on a new tool, language or even codebase and be able to work with it productively in a short period of time.



**Including an External Library**

In order to make use of a library in your client-side code, you need to *include* that library in the web page(s) where it is going to be used.

One important thing to note is that you should place the `<script>` tag for the library *before* any script tags where that library is used, for example:

1) Host the library locally 

   ```
   ├── index.html
   ├── img
   ├── css
   ├── js
   │   ├── app.js
   │   └── vendor
   │       └── jquery.js
   ```

   ```html
   <!doctype html>
   <html lang="en">
      <head>
         <title>My Awesome Project</title>
         <script src="/js/vendor/jquery.js"></script>
      </head>
      <body>
   
      <!-- rest of html -->
   ```

   

2. Use Content Distribution Network (CDN)

   1. A content delivery network (CDN) is a geographically distributed group of servers that caches content close to end users. A CDN allows for the quick transfer of assets needed for loading Internet content, including HTML pages, JavaScript files, stylesheets, images, and videos.

      ```html
      <!doctype html>
      <html lang="en">
         <head>
            <title>My Awesome Project</title>
            <script
              src="https://code.jquery.com/jquery-3.6.0.min.js"
              integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
              crossorigin="anonymous"
            ></script>
         </head>
         <body>
      
         <!-- rest of html -->
      ```

      When loading assets from a CDN, it's essential that you include the `integrity` and `crossorigin` attributes within your `script` tag.

      These attributes are part of a browser security feature known as **Subresource Integrity**.

      - The `integrity` attribute allows browsers to verify that the resource being requested hasn't been manipulated in transit.
      - The `crossorigin` attribute enables the browser to accurately process the CORS request.

      For more information, visit the [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) page on MDN.

**JQuery**

This last point is a key reason why jQuery was created in the first place. At the time the library was launched, browsers had lots of compatibility issues. A lack of standardization among browsers led to many cross-browser quirks. Front-end developers at the time had to write lots of hacks and workarounds to make sure that their code worked in different browsers. The idea behind jQuery was to create an abstraction layer that took care of all these workarounds for us.

Many of the browser compatibility and standardization issues that led to jQuery's creation and massive popularity have now been resolved. Adherence to standards and modern browser APIs mean that we now can accomplish most of what jQuery does with vanilla JavaScript, without having to write complex hacks and workarounds.

- [
  Courses](https://launchschool.com/course_catalog)
- [JS230 DOM and Asynchronous Programming with JavaScript](https://launchschool.com/courses/a3843755)
- [JavaScript Libraries](https://launchschool.com/lessons/e1800f40)
- 5. jQuery

# jQuery

So far in this course, we've worked directly with the DOM and browser APIs to manipulate elements, handle events, and make AJAX requests. In this assignment, we'll take a first look at **jQuery**. jQuery is a JavaScript library that provides a convenient API to perform these types of functions. It also works consistently across most browsers and platforms.

This last point is a key reason why jQuery was created in the first place. At the time the library was launched, browsers had lots of compatibility issues. A lack of standardization among browsers led to many cross-browser quirks. Front-end developers at the time had to write lots of hacks and workarounds to make sure that their code worked in different browsers. The idea behind jQuery was to create an abstraction layer that took care of all these workarounds for us.

Many of the browser compatibility and standardization issues that led to jQuery's creation and massive popularity have now been resolved. Adherence to standards and modern browser APIs mean that we now can accomplish most of what jQuery does with vanilla JavaScript, without having to write complex hacks and workarounds.

It's true to say that jQuery is nowhere near as prominent within the JavaScript ecosystem as it once was. You'll still find plenty of jQuery in the wild though, in legacy codebases and potentially for new projects where there is a requirement to support older browsers. There are also plenty of frameworks and plug-ins that still have jQuery as a dependency. For these reasons it's still useful to have some understanding and familiarity with the library.

It's important to note that jQuery is *not a separate language* from JavaScript, but a library of functions and methods that abstract away JavaScript functionality. At its core, jQuery is still JavaScript.



**The jQuery Function**

What jQuery does is provide a simple, yet powerful, API for handling events.

At its core, jQuery is a **function** that wraps a *collection of DOM elements* and some *convenience methods* into an *object*. You can call the function to select the elements you need to process, and manipulate the object or its elements with methods built into the object.

What is the jQuery function? Internally, it is a function that works with an argument that you pass to it.

- If the argument is a string or a DOM element, it wraps a collection of jQuery objects and returns them.
- If the argument is a function, jQuery uses that function as a callback when the *document is ready*. (We'll discuss what this means a little later in this assignment).
- While you can use the name `jQuery` when calling jQuery, it's common practice to use the alias `$` instead. Either way, we pass the function a string that resembles a CSS selector. For example, if we have a `div` with an `id` of `content`, we can pass jQuery the string `"#content"`:

```js
var $content = jQuery('#content');
var $sameContent = $('#content');
```

Both forms of the function return an object that represents a collection of elements. For `"#id"` selectors, the returned object represents no more than one element (since ids should be unique on the page). For other selectors, the returned object may reference many elements.

prefixing names that reference jQuery objects with a `$` so we can instantly distinguish them from other (non-jQuery) objects.

**Collections**

Suppose you want to act on all the list items on the page. As we mentioned earlier, *the return value of jQuery is a collection*. When we use an ID selector, the collection contains at most *one element*; with other selectors, it can be *any size*.

If you have, say, three list items on your page, you can verify that the above code selected all three by checking the `length` property of the jQuery collection `$lis`:

If you're unsure whether a variable or property references a jQuery object, you can check the `jquery` property: The property returns the version number of jQuery as a string (e.g., `"3.6.2"`) if the object is a jQuery object, `undefined` if it is not.

`console.log(content.jquery);`

**The DOM Ready Callback**

Since most of jQuery acts on DOM elements, we must wait for the page to load before we execute our code. jQuery has that covered as well. Meet the **DOM ready callback**:

```js
$(document).ready(function() {
  // DOM loaded and ready, referenced image on img tags are not ready
});
```

The callback function we pass to `ready` executes after the document, and its dependencies, finish loading.

If it uses the natural image dimensions, though, you must wait for the window `load` event instead.  In some cases, you must delay execution until the window finishes loading:

```js
$(window).load(function() {
  // DOM loaded and ready, referenced image on img tags loaded and ready
});
```

There's an even shorter way to write a DOM ready callback. You can skip traversing the document and binding to its `ready` event by passing a callback function directly to the jQuery function, `$()`:

```js
$(function() {
  // DOM is now loaded
});
```

**jQuery Object Methods**

Once you obtain an object from jQuery, you can perform a variety of tasks with it. You can, for example, change the `font-size` for all of the elements represented by the object with the `css` method:

```js
$content.css('font-size', '18px');
```

**Getters and Setters**

We often use the term **setter method** to refer to methods that set properties for an object. We also use the term **getter method** to refer to methods that retrieve the current values for a property. Some jQuery methods, including `css`, have both setter and getter forms: if you omit the last argument, the method acts as a getter; otherwise, it acts as a setter.

```js
console.log($content.css('font-size'));    // getter
$content.css('font-size', '18px');         // setter
```

Likewise, the `width` and `height` methods act as both getters and setters. To check the `$content` object's width, call `width`. To set it to half that width, we use the same method with the new width. Note that `width` and `height` return and use numeric values.

```js
var width = $content.width();  // 800 (getter)
$content.width(width / 2);     // Sets to 400
console.log($content.width()); // now 400 (getter)
```

**Chaining Method Calls**

Repetitive code like this is tedious and error prone when working with more than a couple of properties. We can take advantage of the fact that most jQuery methods return an object that contains jQuery methods, which means you can chain calls together:

```js
$content.css('font-size', '18px').css('color', '#b00b00');
```

Or better Yet: Object Argument 

```js
$content.css({
  'font-size': '18px',
  color: '#b00b00'
});
```

**Property Name Syntax**

Note that we quoted the `font-size` property name here, but didn't do that for `color`. Since `font-size` contains a hyphen that JavaScript tries to interpret as subtraction, we can't write `font-size` without quotes; the quotes prevent JavaScript from trying to process `-` as the subtraction operator.

If this syntax annoys you, jQuery also accepts camel case property names instead. Whenever you have a CSS property that includes one or more hyphens, you can omit the hyphens and capitalize the next letter instead. For `font-size`, for example, you can use `fontSize` instead

```js
$content.css({
  fontSize: '18px',
  color: '#b00b00'
});
```

**Selectors Unique to jQuery**

https://api.jquery.com/category/selectors/

**Convenience Methods**

jQuery also provides a variety of convenience methods directly attached to the jQuery object. If you need to check what type a variable is, you can use methods like `$.isArray` and `$.isFunction`. You can concatenate two arrays using `$.merge`, or make a new array with `$.map`. The most important method of the jQuery object is the `$.ajax` method, which lets you make AJAX requests in a much easier fashion than if you had to support multiple versions of Internet Explorer on your own. We'll get to AJAX a bit later.

*Links:*

https://learn.jquery.com

https://api.jquery.com

https://learn.jquery.com/using-jquery-core/jquery-object/



My words: 

So wrapping an element in a jQuery object we have access to the methods available to that object

```js
// Setting the inner HTML with jQuery.
 
var target = document.getElementById( "target" );
 
$( target ).html( "<td>Hello <b>World</b>!</td>" );
```

```
// Selecting only the first <h1> element on the page (alternate approach). var firstHeadingElem = $( "h1" )[ 0 ];
```

In either case, `firstHeadingElem` contains the native DOM element. This means it has DOM properties like `.innerHTML` and methods like `.appendChild()`, but *not* jQuery methods like `.html()` or `.after()`. The `firstHeadingElem` element is more difficult to work with, but there are certain instances that require it. One such instance is making comparisons.

An important detail regarding this "wrapping" behavior is that each wrapped object is unique. This is true *even if the object was created with the same selector or contain references to the exact same DOM elements*.

one might expect that the contents will grow and shrink over time as `<p>` elements are added and removed from the document. jQuery objects do **not** behave in this manner.



**jQuery DOM Traversal**

Earlier in this course we looked at accessing DOM nodes and HTML elements using DOM API methods such as `querySelector()`, `querySelectorAll()`, `getElementById()`, and `getElementsByClassName()`. We also explored using properties such as `firstChild`, `parentNode`, `firstElementChild`, and `nextElementSibling` to traverse the DOM, or to get from one element to another.

`.parent()`

We can call all parents like this or add a CSS selector as an argument to select certain ones 

```js
var $p = $('p');

$p.parent('.highlight').css('color', 'blue');
```

`.closest`

With `parent`, it never looks at the current element for consideration. 

```js
<ul id="navigation">
  <li>
    <a href="#">Categories</a>
    <ul>
      <li><a id="html" href="#">HTML</a></li>
      <li><a id="css" href="#">CSS</a></li>
      <li><a id="javascript" href="#">Javascript</a></li>
    </ul>
  </li>
</ul>
```

```js
$('#javascript').closest('ul').addClass('categories');
```

This will grab the next closest `ul`, and not the outermost parent `ul`. If we wanted to grab all parent `ul` elements, there's a more comprehensive method called `parents` that will continue all the way out to the root element. Change the `closest` method call to `parents` and you'll see that we add the `"categories"` class to both `ul`s.

`$('#javascript').parents('ul').addClass('categories');`

`.find()`

so all children and children of children 

One extremely useful method is the `find` method. You can call it on an existing jQuery object to traverse to one of its child elements using another CSS-like selector.

`alert($('ul#navigation').find('li').length);` // Should be 4

`.children()`

only immediate children 

`alert($('#navigation').children().length);  // Should be 1`

`.nextAll()`

The methods outlined so far will cover almost all of your traversing using jQuery objects. Sometimes, however, you may want to do something like grab all of the sibling elements that come after the current one and perform some action on them. The `nextAll` method will return all siblings after, with an optional selector passed in.

`.prevAll()`

There's a complementary method called `prevAll` that goes in the opposite direction. 

`.siblings()`

And if you needed all the siblings, rather than grabbing the parent and then getting all its children, you could simply use `siblings` with an optional selector.

```js
// Find all list items after the CSS list item and hide them
var $css = $('#css').closest('li');
$css.nextAll().hide();

// Find all list items before the CSS list item and hide them
$css.prevAll().hide();

// Find all sibling lis and show them
$css.siblings().show();
```

The `next()` and `prev()` methods get a *single* sibling element, either immediately after or immediately preceding the current one.

`eq`

`$('article').find('li').eq(3).get(0)` returns fourth li item under article

`.next()` `$("li li:contains('ac ante')").next();` next element

Find all the anchor elements that have an `href` value that begins with #.

`$('a[href^="#"]');`

Find all elements that have a class name that contains `"block"`.

`$('[class*=block]');`

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>jQuery</title>
    <script src="jQuery.js"></script>
    <script src="anotherFile.js"></script>
    <link rel="stylesheet" href="css.css">
  </head>
    <body>
      <ul id="navigation">
        <li>
          <a href="#">Categories</a>
          <ul>
            <li><a id="html" href="#">HTML</a></li>
            <li><a id="css" href="#">CSS</a></li>
            <li><a id="javascript" href="#">Javascript</a></li>
          </ul>
        </li>
      </ul>
    </body>
</html>
```

**Handlers**

You should already know from that earlier lesson that an event listener is a function which gets executed when a particular event occurs. In that lesson we looked at using the `addEventListener()` method from the Event API in this context. jQuery wraps this functionality in a bunch of methods available to a jQuery object. Let's look at some examples.

```html
<ul>
  <li><a href="#">Apples</a></li>
  <li><a href="#">Bananas</a></li>
  <li><a href="#">Oranges</a></li>
</ul>
<p>
  some text 
</p>
```

```js
$(function() {
  $p = $('p')

  $("a").on("click", function (event) {
    event.preventDefault();
    let $anchor = $(this);
    $p.text($anchor.text());
  });

  $('form').on('submit', event => {
    event.preventDefault()
    let $input = $(this).find('input[type=text]')
    $p.text(`Your favorite fruit is ${$input.val()}`)
  })

});
```

We now need to find the paragraph and replace its content with the text of the clicked anchor. We can use jQuery's `text()` method to perform the text replacement. We use this method twice in the example below: to *get* the text content of the `$anchor` object, and to *set* the text content of the `$p` object.

jQuery has convenience methods for many events. These methods have the same name as the event types and let us bind listeners to the events less verbosely. Here's our code rewritten with the `click` and `submit` convenience methods. BUT these are deprecated so dont use: 

```js
$(function () {
  let $p = $("p");
  let OUTPUT = "Your favorite fruit is ";

  $("a").click(function (e) {
    e.preventDefault();
    let $event = $(this);
    $p.text(OUTPUT + $event.text());
  });

  $("form").submit(function (e) {
    e.preventDefault();
    let $input = $(this).find("input[type=text]");
    $p.text(OUTPUT + $input.val());
  });
});
```

**JQuery Event Delegation**

When you have an event handler that is being bound to a large number of elements that all exist witr than bind it to each element individually. Think of a list of 30 items, each of which includes a link to delete the item from the list. If we used an event bound directly to the anchor, there will be 30 events bound. This may not slow down our page that much, but if we have larger and larger sets of elements that all use the same event handler, we'll have a very inefficient application that will be prone to slowdowns.

```html
<ul>
  <li>
    <p>Bananas</p>
    <a href="#">Remove</a>
  </li>
  <!-- 29 more list items, each with a remove anchor -->
</ul>
```

```js
// This callback is bound to each anchor, making 30 event handlers in memory

$("a").on("click", function (e) {
  e.preventDefault();
  $(this).closest("li").remove();
});

Copy Code
// This callback is bound to a single element, yet it is able to process
// click events on any of the remove anchors within it.

$("ul").on("click", "a", function (e) {
  e.preventDefault();
  $(e.target).closest("li").remove();
});
```

Instead, we would attach the same event to the parent unordered list element. Then we would only have one event listener that could then check for which anchor was clicked and perform our processing from there.













**HTML with FORM**

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>Click Handler</title>
    <meta charset="utf-8" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.2/jquery.min.js"></script>
    <script src="anotherFile.js"></script>
  </head>
  <body>
    <main>
      <form action="#" method="get">
       <fieldset>
        <h1>Type a key to toggle the accordion with</h1>
        <input type="text" id="key" name="key" maxlength="1" />
        <input type="submit" value="Set" />
       </fieldset>
      </form>
    

      <div id="accordion">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

    </main>
  </body>
</html>
```

**HTML Templating with JS**

Building HTML from JS

```js
let products = [{
  name: 'Banana',
  quantity: 14,
  price: 0.79
}, {
  name: 'Apple',
  quantity: 3,
  price: 0.55
}];

let $list = $('ul');
let productsHtml = products.map(function(item) {
  return '<li><h3>' + item.name + '</h3><dl><dt>Quantity:</dt><dd>' + item.quantity + '</dd><dt>Price:</dt><dd>$' + item.price + '</dd></dl></li>';
});

$list.html(productsHtml.join(''));
```

This is clearly not a sustainable method of writing HTML using JavaScript. This is why the concept of an HTML template was introduced.

Server-side technologies like PHP, Django, and Rails already had their own ways of generating HTML using data, but JavaScript had nothing built-in to tackle this problem. Thankfully, some innovative people created easy-to-use solutions.

**Handlebars**

<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>

They simplify the process of manually updating the view and at the same time they improve the structure of the application by allowing developers to separate the business logic from the rest of the code.

designed for client side rendering 

 There's another popular library that falls somewhere in between, adding logic and support for templates, but keeping the JavaScript out of the HTML. This library is [Handlebars](http://handlebarsjs.com/). Handlebars can be used on its own. It has no dependencies of any kind, meaning that whether or not you are using jQuery, or an MVC framework, or anything else client-side, you can use Handlebars for your templating.

Handlebars uses a fast and complex method of string replacement that will allow you to write the names of properties of your objects within handlebars and have them replaced with the property values. Handlebars templates allow you to have property names surrounded by two opening and closing curly braces, `{{ }}`. Using our above example, the Handlebars template for a product would look like this:

```html
<li>
  <h3>{{name}}</h3>
  <dl>
    <dt>Quantity:</dt>
    <dd>{{quantity}}</dd>
    <dt>Price:</dt>
    <dd>${{price}}</dd>
  </dl>
</li>
```

These handlebars properties can be placed anywhere within the HTML string. If we wanted to output the quantity as the value of a data attribute on the list item, we could add the attribute and use a handlebars property inside the attribute value.

`<li data-quantity="{{quantity}}">`

**The `if` helper**

Handlebars also has the ability to check properties for whether or not they are truthy values. A Handlebars conditional is `false` if the property value is `false`, `undefined`, `null`, `''`, `0` or an empty array.

With any Handlebars-executed template code, we prefix it with a `#` sign. This tells Handlebars to perform an action at this point in our template before rendering.

This is known as the `if` helper. There are other built-in helpers in Handlebars, and they all start with a `#` sign and end with a closing element. The `if` helper also has an `{{else}}` section that can be used. Note that it does not have a `#` sign in front of it. Handlebars has already been notified that the contents of the `#if` block should be treated differently, so it knows to look for this `{{else}}`keyword and treat it as the alternate condition rather than as a property that is to be output.

How do we use this to output our items, though? In Handlebars, we would use template pre-compilation to create and store a function that can be called to build our template based on an object passed into it. The Handlebars library gives us an object named `Handlebars` that holds the methods we will need to create templates and partials. To create a template function, we would use the `compile` method to provide it an HTML string that we want to use as our template.

Handlebars allows for template reuse through partials. Partials are normal Handlebars templates that may be called directly by other templates ([read more](http://handlebarsjs.com/guide/#partials)).

Just like we did in the previous assignment, we can create a template in our HTML using a script element. If we give the element a type attribute of something other than `text/javascript`, the browser won't try to execute it as JavaScript. We'll use a type of `text/x-handlebars` to wrap our template in a `script` element. We'll add an `id` to it to make it easier to locate it with jQuery.

Just like we did in the previous assignment, we can create a template in our HTML using a script element. If we give the element a type attribute of something other than `text/javascript`, the browser won't try to execute it as JavaScript. We'll use a type of `text/x-handlebars` to wrap our template in a `script` element. We'll add an `id` to it to make it easier to locate it with jQuery.

tag to appear inside 

`<script id='productTemplate' type='text/x-handlebars'>`

```js
<script id='productTemplate' type='text/x-handlebars'>
  <li>
    <h3>{{name}}</h3> //curly braces are expressions
    <dl>
      <dt>Quantity:</dt>
      <dd>{{quantity}}</dd>
      <dt>Price:</dt>
      <dd>
        ${{price}}
        {{#if on_sale}}
        <strong>SALE!</strong>
        {{/if}}
      </dd>
    </dl>
  </li>
</script>
```

The `Handlebars.compile` method converts our HTML into a template function. We can assign the template function to a new variable, `productTemplate`:

`let productTemplate = Handlebars.compile($('#productTemplate').html());`

Here we have read the contents of the script element using jQuery's `.html` method and passed that in to the `Handlebars.compile` method. We get a function in return that can be passed an object, and the function will return an HTML string with all of the properties filled in.

We can now loop over our products array and write this template using the item. We'll store each template in an array just like before, but we won't have the messy string concatenation and conditional.

```js
let $list = $('ul');
let productsHtml = products.map(function(product) {
  return productTemplate(product);
});

$list.html(productsHtml.join(''));
```

![how handlebars works](https://uploads.sitepoint.com/wp-content/uploads/2015/07/1435920536how-handlebars-works.png)

1. Handlebars takes a template with the variables and compiles it into a function
2. This function is then executed by passing a JSON object (or js object) as an argument. This JSON object is known as context and it contains the values of the variables used in the template
3. On its execution, the function returns the required HTML after replacing the variables of the template with their corresponding values

We can also write comments inside Handlebars templates. The syntax for Handlebars comments is `{{!TypeYourCommentHere}}`.                                 {{!--TypeYourCommentHere--}}

**each helper in HandleBars**

We can write our loop within our template with `each`.

You can iterate over a list using the built-in `each` helper. Inside the block, you can use `this` to reference the element being iterated over.

We pass an object that has an array as a value assigned to a property as an argument to the compiled html.

```html
<script id='productTemplate' type='text/x-handlebars'>
  {{#each items}}
  <li>
    <h3>{{name}}</h3>
    <dl>
      <dt>Quantity:</dt>
      <dd>{{quantity}}</dd>
      <dt>Price:</dt>
      <dd>
        ${{price}}
        {{#if on_sale}}
        <strong>SALE!</strong>
        {{/if}}
      </dd>
    </dl>
  </li>
  {{/each}}
</script>
```

```js
let productTemplate = Handlebars.compile($('#productTemplate').html());
let $list = $('ul');

$list.html(productTemplate({ items: products }));
```

This will automatically render a list item for each item in the products array. If we also wanted to output the current index of the loop, we could use the `{{@index}}` expression within the each block.

**Partials**

```html
<script id='productTemplate' type='text/x-handlebars'>
  <li>
    <h3>{{name}}</h3>
    <dl>
      <dt>Quantity:</dt>
      <dd>{{quantity}}</dd>
      <dt>Price:</dt>
      <dd>
        ${{price}}
        {{#if on_sale}}
        <strong>SALE!</strong>
        {{/if}}
      </dd>
    </dl>
  </li>
</script>

<script id='productsList' type='text/x-handlebars'>
  {{#each items}}
  {{> productTemplate}}
  {{/each}}
</script>
```

```js
// Compile both templates for use later
let productsList = Handlebars.compile($('#productsList').html());
let productTemplate = Handlebars.compile($('#productTemplate').html());
let $list = $('ul');

// Also register the product template as a partial
Handlebars.registerPartial('productTemplate', $('#productTemplate').html());

// Write the current list to the page
$list.html(productsList({ items: products }));

// Create a new product
let newProduct = {
  name: 'Soup',
  quantity: 1,
  price: 1.29
};

// Render the new product with the product template
$list.append(productTemplate(newProduct));
```

The `>` sign tells Handlebars to look for a partial with the name `productTemplate`. These partials aren't created automatically, though, so we'll have to register the partial by this name in our JavaScript.



```html
<script id="tag" type="text/x-handlebars">
  <strong>{{this}}</strong>
</script>

<script id="post" type="text/x-handlebars">
  <article>
    <h1>{{title}}</h1>
    <p><time>Posted on {{published}}</time></p>
    {{{body}}}
    <footer>
      <p>
        Tags:
        {{#each tags}}
        {{>tag}}
        {{/each}}
      </p>
    </footer>
  </article>
</script>
```

```js
Handlebars.registerPartial('tag', $('#tag').html());
```



**HTML in objects body**

So say we had some object:

```js
let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus error sit'
};
```

But we want the body attribute's value to include HTML:

`post.body = '<p>' + post.body + '</p>';`

Then we need to use triple `{}` in the template

```html
<script id="post" type="text/x-handlebars">
  <article>
    <h1>{{title}}</h1>
    <p><time>Posted on {{published}}</time></p>
    {{{body}}}
  </article>
</script>
```

**Exercises** 

https://launchschool.com/lessons/e1800f40/assignments/7c85baf6

**Reading**

https://www.sitepoint.com/a-beginners-guide-to-handlebars/





**jQuery Ajax**

The syntax for `XMLHttpRequest` isn't the most concise, and early implementations of XMLHttpRequest had a few cross-browser inconsistencies. jQuery's `ajax()` method sought to deal with this by providing a simple interface that acts as a *wrapper* for that complexity.

https://learn.jquery.com/ajax/

- The way that the `ajax()` method uses a *configuration object* to specify the various parameters of the request
- The fact that responses are handled by *using a callback* passed to a method chained to the initial `ajax()` call
-  It offers both a full-featured `$.ajax()` method, and simple convenience methods such as `$.get()`, `$.getScript()`, `$.getJSON()`, `$.post()`, and `$().load()`.

Most jQuery applications don't in fact use XML, despite the name "Ajax"; instead, they transport data as plain HTML or JSON (JavaScript Object Notation).

 The `$.ajax()` method is particularly valuable because it offers the ability to specify both success and failure callbacks. Also, its ability to take a configuration object that can be defined separately makes it easier to write reusable code.

```js
// Using the core $.ajax() method
$.ajax({
 
    // The URL for the request
    url: "post.php",
 
    // The data to send (will be converted to a query string)
    data: {
        id: 123
    },
 
    // Whether this is a POST or GET request
    type: "GET",
 
    // The type of data we expect back
    dataType : "json",
})
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function( json ) {
     $( "<h1>" ).text( json.title ).appendTo( "body" );
     $( "<div class=\"content\">").html( json.html ).appendTo( "body" );
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
  // Code to run regardless of success or failure;
  .always(function( xhr, status ) {
    alert( "The request is complete!" );
  });
```

The configuration object passed as an argument to the `ajax()` method invocation sets the `url`, request `type`, and `dataType`for the request.

**Fetch API**

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

https://developer.mozilla.org/en-US/docs/Web/API/Request

https://developer.mozilla.org/en-US/docs/Web/API/Response

https://developer.mozilla.org/en-US/docs/Web/API/Headers

Fetch isn't a library like jQuery, but a Web API like `XMLHttpRequest`. It lets you make network requests like `XMLHttpRequest`, but it leverages the Promise syntax to provide a much simpler interface.

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides a JavaScript interface for accessing and manipulating parts of the [protocol](https://developer.mozilla.org/en-US/docs/Glossary/Protocol), such as requests and responses.

It also provides a global [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) method that provides an easy, logical way to fetch resources asynchronously across the network.

Unlike [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) that is a callback-based API, Fetch is promise-based and provides a better alternative that can be easily used in [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). Fetch also integrates advanced HTTP concepts such as [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and other extensions to HTTP.

```js
async function logMovies() {
  const response = await fetch("http://example.com/movies.json");
  const movies = await response.json();
  console.log(movies);
}
```

The simplest use of `fetch()` takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that resolves with a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

The [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, we use the [`json()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)method, which returns a second promise that resolves with the result of parsing the response body text as JSON.

```js
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
```

- This may look very similar to our jQuery Ajax example, and there are indeed similarities between the interfaces provided by the two. There are also some key differences to be aware of, including:
- The Promise that `fetch()` returns won't reject if the response `status` is an HTTP error status code (i.e. response codes in the 4xx and 5xx ranges)
- By default, `fetch()` won't send cookies. In order to send cookies with the request, the `credentials` [parameter](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)must be set to either `include`, or `same-origin`. The latter option sends credentials only if the request URL is on the same origin as the calling script.





As you've seen, there are plenty of options for making Ajax requests: `XMLHttpRequest`, `fetch()`, and jQuery's `ajax()`. In addition, there are also specialist libraries such as [axios](https://github.com/axios/axios), which offers a similar feature set and browser support to jQuery Ajax, but leverages the Promises syntax in a similar way to the Fetch API.



The Promise-based syntax used by Fetch provides a much simpler interface. There are various caveats to consider if wanting to use Fetch, in particular browser support. Fetch is a relatively new API, and is well supported in most modern browsers. If your project needs to support older browsers, such as an older version of IE, it may not be a suitable option (though you can still potentially use it by using the Fetch [polyfill](https://github.com/github/fetch), along with a Promises [polyfill](https://www.npmjs.com/package/promise-polyfill)).



**Summary**

- Use documentation efficiently to ramp up quickly on a new library or API when you need to use it for a particular project.
- Use Developer Tools built in to the browser as part of your work-flow to test and debug your front-end code.
- At its core, jQuery is a function that wraps a collection of DOM elements and some convenience methods into an object.
- jQuery provides methods for many aspects of front-end development, such as interacting with the DOM, managing browser events, and making Ajax calls.
- Handlebars is a minimal templating library which allows you to easily add and update sections of a web page.
- The Fetch API and jQuery's `ajax()` are alternatives to `XMLHttpRequest` for making Ajax calls. At a high level they all do the same thing: make a HTTP request and then process the response once it is received.



Dropdown menu - hide dropdown values depending on choice of other 

```js
document.addEventListener('DOMContentLoaded', event => {

  let animClass = document.getElementById("animal-classifications")
  let animals = document.getElementById("animals")

  function showAll(...values) {
    values.forEach(value => Array.from(value).forEach(option => option.style.display="block"));
  }
 
  function showFirst(items) {
    return Array.from(items).filter(el => el.style.display === 'block')[0].value;
  }

  function hideDisplay(menu) {
    return (...items) => {
      items.push('Classifications', 'Animals');
      items.forEach(item => document.querySelector(`option[value='${item}']`).style.display="none");
      menu.value = showFirst(menu);
    }
  }

  animClass.addEventListener('change', event => {
    showAll(animals, animClass);
    let displayFunc = hideDisplay(animals)
    switch (animClass.value) {
      case 'Vertebrate':
        displayFunc();
        break;
      case 'Warm-blooded':
        displayFunc('Salmon', 'Turtle');
        break;
      case 'Cold-blooded':
        displayFunc('Bear', 'Whale', 'Ostrich');
        break;
      case 'Mammal':
        displayFunc('Turtle', 'Salmon', 'Ostrich');
        break;
      case 'Bird':
        displayFunc('Turtle', 'Salmon', 'Bear', 'Whale');
        break;
    }
  })

  animals.addEventListener('change', event => {
    showAll(animals, animClass);
    let displayFunc = hideDisplay(animClass)
    switch (animals.value) {
      case 'Bear':
        displayFunc('Cold-blooded', 'Bird');
        break;
      case 'Turtle':
        displayFunc('Warm-blooded', 'Mammal', 'Bird');
        break;
      case 'Whale':
        displayFunc('Cold-blooded', 'Bird');
        break;
      case 'Salmon':
        displayFunc('Warm-blooded', 'Mammal', 'Bird');
        break;
      case 'Ostrich':
        displayFunc('Cold-blooded', 'Mammal');
        break;
    }
  })
  
  document.getElementById('clear').addEventListener('click', event => {
    event.preventDefault();
    showAll(animals, animClass);
    animals.value = showFirst(animals);
    animClass.value = showFirst(animClass);
  })
})
```

