
let activeTarget = null;
let activePlayer = null;


/**
 * Close any active group target.
 */
function closeActive () {
  if (!activeTarget) { return; }

  const popup = activeTarget.querySelector('.popup');
  // popup.style.visibility = 'hidden';

  activeTarget = null;
  activePlayer.reverse();
  activePlayer.addEventListener('finish', () => popup.style.visibility = 'hidden')
  activePlayer = null;

}

/**
 * Handle a click on a group. Responsible for closing any previous groups.
 * @param {!Element} group selected, as per "icon-group" template
 */
function groupClick (group) {
  if (activeTarget) {
    if (activeTarget == group) {
      return;  // already visible, do nothing
    }
    closeActive();
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

  // activePlayer = fill.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], timing);
  const fillEffect = new KeyframeEffect(fill, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], timing);
  const groupEffect = new SequenceEffect([fillEffect]);
  activePlayer = new Animation(groupEffect, document.timeline)
}

