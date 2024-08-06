const duration = 900

function bounce (elem, iterations) {
  const keyframes = [
    { transform: 'translate3d(0,0,0)', offset: 0 },
    { transform: 'translate3d(0,0,0)', offset: 0.2 },
    { transform: 'translate3d(0,-30px,0)', offset: 0.4 },
    { transform: 'translate3d(0,-30px,0)', offset: 0.43 },
    { transform: 'translate3d(0,0,0)', offset: 0.53 },
    { transform: 'translate3d(0,-15px,0)', offset: 0.7 },
    { transform: 'translate3d(0,0,0)', offset: 0.8 },
    { transform: 'translate3d(0,-15px,0)', offset: 0.9 },
    { transform: 'translate3d(0,0,0)', offset: 1 }
  ]
  const timing = { duration, iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
  return elem.animate(keyframes, timing)
}

function bounceIn (elem, iterations) {
  const keyframes = [
    { transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 0 },
    { transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2 },
    { transform: 'scale3d(.9, .9, .9)', offset: 0.4 },
    { transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', offset: 0.6 },
    { transform: 'scale3d(.97, .97, .97)', offset: 0.8 },
    { transform: 'scale3d(1, 1, 1)', opacity: '1', offset: 1 }
  ]
  const timing = { duration, iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
  return elem.animate(keyframes, timing)
}


function bounceOut (elem, iterations) {
  const keyframes = [
    { transform: 'none', opacity: '1', offset: 0 },
    { transform: 'scale3d(.9, .9, .9)', opacity: '1', offset: 0.2 },
    { transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.5 },
    { transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.55 },
    { transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 1 }
  ]
  const timing = { duration, iterations };
  return elem.animate(keyframes, timing)
}



function moveText () {
  const optionSelected = document.querySelector("#option").value;
  const elem = document.querySelector('#boxContainer');
  const iterations = 1;
  window[optionSelected](elem, iterations);
}


document.getElementById('option').addEventListener('change', moveText);
document.getElementById('box').addEventListener('click', moveText);
