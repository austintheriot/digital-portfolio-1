let sidebar = document.querySelector('.sidebar');
let hamburger = document.querySelector('.hamburger');
let line1 = document.querySelector('.hamburger__line1');
let line2 = document.querySelector('.hamburger__line2');
let line3 = document.querySelector('.hamburger__line3');

function showSliders() {
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-200px';
    sidebar.style.opacity = '0';
    hamburger.style.left = '5px';
    line1.style.transform = 'translate(0px, 0px) rotate(0deg)';
    line1.style.marginTop = '4px';
    line2.style.transform = 'translate(0px, 0px) rotate(0deg)';
    line2.style.marginTop = '4px';
    line3.style.transform = 'translate(0px, 0px) rotate(0deg)';
    line3.style.marginTop = '4px';
  } else {
    sidebar.style.left = '0px';
    sidebar.style.opacity = '0.95';
    hamburger.style.left = '205px';
    line1.style.transform = 'translate(-2px, 9px) rotate(45deg)';
    line1.style.marginTop = '0px';
    line2.style.transform = 'translate(-2px, 5px) rotate(135deg)';
    line2.style.marginTop = '0px';
    line3.style.transform = 'translate(-2px, 1px) rotate(135deg)';
    line3.style.marginTop = '0px';
  }
}
