export function rotateHighlight(selector = '.brutal-subscribe-content h2 span') {
  const words = document.querySelectorAll(selector);
  if (!words.length) return;

  let index = 0;
  const highlightColors = ['#000', '#FF00AA', '#6A0DAD', '#FF00AA'];

  setInterval(() => {
    words[index].classList.remove('highlight-box');
    words[index].style.backgroundColor = '';
    words[index].style.color = '';

    
    index = (index + 1) % words.length;
    
    words[index].classList.add('highlight-box');
    words[index].style.backgroundColor = highlightColors[index % highlightColors.length];
    words[index].style.color = '#fff';
  }, 1200);
}