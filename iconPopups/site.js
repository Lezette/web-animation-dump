
var activeTarget = null;
let activePlayer = null;


/**
 * Close any active group target.
 */
async function closeActive () {
  if (!activeTarget) { return; }

  const popup = activeTarget.querySelector('.popup');

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

  });

  activeTarget = null;
  activePlayer = null;


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

  fill.style.width = `${longEdge}px`;
  fill.style.height = `${longEdge}px`;
  fill.style.top = `${-((longEdge - dim) / 2)}px`;
  fill.style.left = `${-((longEdge - rect.width) / 2)}px`;

  const timing = {
    duration: rect.height * 2,
    easing: 'ease-out'
  }

  const fillEffect = new KeyframeEffect(fill, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], timing);
  activePlayer = new Animation(fillEffect, document.timeline)
  activePlayer.play();
}

