const boxes = document.querySelectorAll('.box');

document.addEventListener('mousemove', (event) => {
  const cursorX = event.clientX
  const cursorY = event.clientY
  boxes.forEach(box => {

    const rect = box.getBoundingClientRect();

    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    const distanceX = elementX - cursorX;
    const distanceY = elementY - cursorY;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = 100;
    const moveDistance = Math.max(0, maxDistance - distance) / maxDistance;

    box.style.transform = `translate(${distanceX * moveDistance}px, ${distanceY * moveDistance}px)`

  });
})

