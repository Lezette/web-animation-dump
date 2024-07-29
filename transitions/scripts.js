
/**
 * Called when a new section has been loaded.
 *
 * @param {Element} link element corresponding to new section
 * @param {Element} current now visible <section>
 * @param {Element} previous previously visible <section>
 */

async function animateToSection (link, current, previous) {

  const effectNode = document.createElement('div');
  effectNode.className = 'circleEffect';

  const bounds = link.getBoundingClientRect();
  effectNode.style.left = `${bounds.left + bounds.width / 2}px`;
  effectNode.style.top = `${bounds.top + bounds.height / 2}px`;



  const header = document.querySelector('header');
  header.appendChild(effectNode);


  const newColor = 'hsl(' + Math.round(Math.random() * 255) + ', 46%, 42%)';
  effectNode.style.background = newColor;

  const scaleSteps = [{ transform: 'scale(0)' }, { transform: 'scale(1)' }];
  const timing = { duration: 2500, easing: 'ease-in-out' };

  const scaleEffect = new KeyframeEffect(effectNode, scaleSteps, timing);

  const allEffects = [scaleEffect, buildFadeOut(previous), buildFadeIn(current)];

  // Create and play animations
  const animations = allEffects.map(effect => new Animation(effect, document.timeline));

  animations.forEach(animation => animation.play());

  // Wait for all animations to finish
  await Promise.all(animations.map(animation => animation.finished));

  header.style.backgroundColor = newColor;
  header.removeChild(effectNode);

  // if (prefersReducedMotion) {

  // }

  // const anim = effectNode.animate(scaleSteps, timing);

  // const animationEffect = new KeyframeEffect(effectNode, scaleSteps, timing)
  // const animate = new Animation(animationEffect, document.timeline)

  // animate.play()

  // anim.finished.then(() => {
  //   header.style.backgroundColor = newColor;
  //   header.removeChild(effectNode);
  // })

}


function buildFadeIn (target) {
  const steps = [
    { opacity: 0, transform: 'translate(0, 20em)' },
    { opacity: 1, transform: 'translate(0)' }
  ];
  return new KeyframeEffect(target, steps, {
    duration: 500,
    delay: 500,
    fill: 'backwards',
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  });
}


function buildFadeOut (target) {
  const angle = Math.pow((Math.random() * 16) - 6, 3);
  const offset = (Math.random() * 20) - 10;
  const transform =
    `translate(${offset}em, 20em) 
    rotate(${angle}deg) 
    scale(0)`;

  const steps = [
    { visibility: 'visible', opacity: 1, transform: 'none' },
    { visibility: 'visible', opacity: 0, transform: transform }
  ];

  return new KeyframeEffect(target, steps, {
    duration: 1500,
    easing: 'ease-in'
  });
}

window.addEventListener('load', function () {
  const icon = document.querySelector('.icon');

  const steps = [
    { color: 'hsl(206, 46%, 89%)', transform: 'scale(0.5)' },
    { color: 'hsl(13, 79%, 96%)', transform: 'scale(2)' },
    { color: 'red', transform: 'scale(1)' }
  ];

  const timing = { duration: 1, fill: 'both', easing: 'ease-in-out' };
  const anim = icon.animate(steps, timing);
  anim.pause();  // never play this animation forward

  function updatePlayer () {
    const top = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    anim.currentTime = top / height;
  }
  updatePlayer();
  window.addEventListener('scroll', updatePlayer);
});