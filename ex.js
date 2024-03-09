document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('a').addEventListener('click', event => {
    event.preventDefault();
    alert('Following the link was prevented.');
  });
});