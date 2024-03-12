//My answer 

document.addEventListener('DOMContentLoaded', event => {
  let box = document.querySelector(".text-field")
  let int;

  function oneChar(key) {
    return key.length === 1
  }

  box.addEventListener('click', event => {
    event.stopPropagation()
    box.classList.add('focused')
  
    if (!int) {
      int = setInterval(() => {
        box.classList.toggle('cursor')
      },500)
    }
})

document.addEventListener('click', event => {
  clearInterval(int);
  if (box.classList.contains('focused')) {
    box.classList.remove('focused');
    box.classList.remove('cursor');
    int = false
  }
})

  document.addEventListener('keydown', event => {
    let textArea = document.querySelector('.content')
    var t = textArea.textContent
    if (oneChar(event.key) && Array.from(box.classList).includes('focused')) {
      textArea.textContent += event.key
    } else if (event.key === 'Backspace') textArea.textContent = t.slice(0, -1)
  })

})