Discuss API's- define, examples 

Discuss traversing the DOM and jQuery DOM traversal





**Count Nodes**

Copy in the code exactly as is without any added head body, etc

```js
arr = []

function walk(nodes) {
    arr.push(nodes) 
    for(let ind=0; ind<nodes.childNodes.length; ind+=1) {
        walk(nodes.childNodes[ind])
    }
}

arr.length
```

Make sure there are no extra spaces below the code

**Count Direct/ Indirect Nodes**

```js
document.addEventListener('DOMContentLoaded', () => { 
  
  function walk(nodes, arr) {
    arr.push(nodes);
    for (let ind = 0; ind < nodes.childNodes.length; ind += 1) {
      walk(nodes.childNodes[ind], arr);
    }
  }
  
  function directIndirect(id) {
    let arr = [];
    let childNodesArr = [];
    let el = document.getElementById(id);
    arr.push(el.childNodes.length);
    walk(el, childNodesArr);
    arr.push(childNodesArr.length - 1 - el.childNodes.length);
    console.log(arr);
  }
  
  for (let ind = 1; ind < 11; ind += 1) {
    directIndirect(String(ind));
  }

})
```

**SetTimeOut Closure**

```js
function func(sec) {
  setTimeout(console.log, 1000 * sec, sec)
}

let count = 0
while (count < 6) {
  func(count)
  count += 1
}
```

**setInterval**

```js
count = 0

let x = setInterval(() => {
  console.log(count)
  count += 1
  if (count > 6) clearInterval(x)
}, 1000)
```

