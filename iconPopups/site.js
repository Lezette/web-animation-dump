
var activeTarget = null;
let activePlayer = null;
let activeIcons = null;


/**
 * Close any active group target.
 */
async function closeActive () {
  if (!activeTarget) { return; }

  const popup = activeTarget.querySelector('.popup');

  // hide icons before closing the popup
  activeIcons = activeIcons.reverse()
  activeIcons.map((icon) => icon.reverse())

  activePlayer.reverse();

  // ensure the animation is finished before moving on to next
  await activePlayer.finished

  const popupEffect = new KeyframeEffect(popup, [{ visibility: 'visible' }, { visibility: 'hidden' }], { fill: 'forwards' });
  const popupAnimation = new Animation(popupEffect, document.timeline);
  popupAnimation.play();

  await popupAnimation.finished.then(() => {
    // cancel the animation instance to avoid glitch
    activePlayer.cancel();
    popupAnimation.cancel();
    popup.style = '';

    activeIcons.map((icon) => icon.cancel())
  })

  activeTarget = null;
}

/**
 * Handle a click on a group. Responsible for closing any previous groups.
 * @param {!Element} group selected, as per "icon-group" template
 */


async function groupClick (group) {
  if (activeTarget) {

    // You cannot use === to compare a DOM object so compare based on the ID
    if (activeTarget.getAttribute("id") === group.getAttribute("id")) {
      return;  // already visible, do nothing
    }
    await closeActive();
  }

  activeTarget = group;

  // Change the visibility of the group's popup.
  const popup = activeTarget.querySelector('.popup');
  popup.style.visibility = 'visible';


  const rect = popup.getBoundingClientRect();
  const dim = Math.max(rect.width, rect.height);
  const longEdge = Math.sqrt(rect.width * rect.width + rect.height * rect.height);

  const fill = popup.querySelector('.fill');
  const icons = Array.prototype.slice.call(popup.querySelectorAll('.ball'));

  icons.forEach(icon => {
    icon.style.opacity = 0;
  });

  fill.style.width = `${longEdge}px`;
  fill.style.height = `${longEdge}px`;
  fill.style.top = `${-((longEdge - dim) / 2)}px`;
  fill.style.left = `${-((longEdge - rect.width) / 2)}px`;

  const timing = {
    duration: rect.height * 2,
    easing: 'ease-out'
  }

  activeIcons = createIconEffects(icons, rect);
  const fillEffect = new KeyframeEffect(fill, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], timing);
  activePlayer = new Animation(fillEffect, document.timeline)
  activePlayer.play();

  activePlayer.finished.then(() => {
    playIconEffectsSequentially(activeIcons);
  });

}

function createIconEffects (icons, rect) {
  return icons.map(function (icon) {
    const effect = [{ opacity: 0 }, { opacity: 1 }];
    const timing = { duration: rect.height * 2 / icons.length, fill: 'forwards' };
    return new Animation(new KeyframeEffect(icon, effect, timing), document.timeline);
  });
}

function playIconEffectsSequentially (iconEffects) {
  return iconEffects.reduce((promise, effect) => {
    return promise.then(() => {
      effect.play();
      return effect.finished;
    });
  }, Promise.resolve());
}


