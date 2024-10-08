const blockSize = 60;
const gridWidth = Math.ceil(innerWidth / blockSize)
const gridHeight = Math.ceil(innerHeight / blockSize)
const blockGrid = []
const prevX = {}
const prevY = {}

const main = () => {

  // Create grids

  for (let x = 0; x < gridWidth; x++) {
    blockGrid[x] = [];
    for (let y = 0; y < gridHeight; y++) {
      const block = document.createElement("div");
      blockGrid[x][y] = block;
      block.style.transform = `translate(${x * blockSize}px, ${y * blockSize}px)`
      document.body.appendChild(block)
    }
  }

  document.body.addEventListener("mousemove", pointEvent)

  document.body.addEventListener("touchmove", (event) => {
    [].forEach.call(event.touches, pointEvent);
    event.preventDefault()
  })

  document.body.addEventListener("touchend", (event) => {
    [].forEach.call(event.touches, (touch) => {
      delete prevX[touch.identifier];
      delete prevY[touch.identifier];
    });
  })



  function pointEvent (event) {
    const id = event.identifier;
    const x = Math.trunc(event.clientX / blockSize)
    const y = Math.trunc(event.clientY / blockSize)

    if (prevX[id] !== x || prevY[id] !== y) {
      animateColor(blockGrid[x][y], id)
      animateTransform(blockGrid[x][y])
    }
    prevX[id] = x;
    prevY[id] = y;
  }



  function animateColor (element, id) {
    id = id || 0;

    // const rgb = [0, 0, 0];
    // // change r,g, and b value to 255 every second
    // rgb[Math.floor((Date.now() / 1000 + id) % 3)] = 255;

    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    const rgb = [r, g, b];

    element.animate({
      offest: 0.5,
      composite: 'add',
      backgroundColor: `rgb(${rgb.join(',')})`,
      boxShadow: `0px 0px 20px 20px rgba(${rgb.join(',')}, 50)`,
      // filter: `drop-shadow(50px 20px 50px rgba(${rgb.join(',')}, 0.5))`
    }, 4000)
  }

  function animateTransform (element) {
    element.animate({
      offest: 0.5,
      composite: 'add',
      transform: 'scale(0.5)',
    }, 500)

    element.animate({
      composite: 'add',
      transform: 'rotate(90deg)',
    }, 500)
  }
}

main()