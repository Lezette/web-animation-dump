
/*
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Shared library for the Popup/Expand codelab.
 */


/**
 * Create dummy groups and icons.
 */
window.addEventListener('load', function () {
  const t = document.querySelector('template#icon-group');
  const holder = document.querySelector('.icons');
  for (let i = 0; i < 6; ++i) {
    const icon = makeRandomIcon();

    const local = t.content.cloneNode(true).querySelector('*');

    // Add unique ids for comparison
    local.setAttribute("id", `id-${i}`)
    local.appendChild(icon);
    const childIcons = local.querySelector('.popup .icons');

    const count = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < count; ++j) {
      const childIcon = makeRandomIcon();
      childIcons.appendChild(childIcon);
    }

    holder.appendChild(local);
  }
});


/**
 * Configure handlers to open/close all elements of class '.group'.
 */
window.addEventListener('load', function () {
  document.body.addEventListener('click', closeActive);

  const groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
  groups.forEach(function (group) {
    group.addEventListener('click', function (event) {
      event.stopPropagation();
      groupClick(group);
    });
  });
});


/**
 * @return {!Element} ball icon with random color and picture
 */
function makeRandomIcon () {
  const ball = document.createElement('div');
  ball.className = 'ball';
  ball.style.backgroundColor = randomMaterialColor();

  const i = Math.floor(Math.random() * makeRandomIcon.icons.length);
  const icon = document.createElement('i');
  icon.className = 'material-icons';
  icon.textContent = makeRandomIcon.icons[i];

  ball.appendChild(icon);
  return ball;
}
makeRandomIcon.icons = ('cake star thumb_up favorite new_releases comment ' +
  'cast filter_hdr face android').split(' ');


/**
 * @return {string} random material-ish color
 */
function randomMaterialColor () {
  const v = Math.round(Math.random() * 160) + 200;
  return 'hsl(' + v + ', 100%, 50%)';
}
