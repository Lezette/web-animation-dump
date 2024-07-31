
const carAnimation = async () => {

  const lightOff = 'rgb(50,50,50)'

  const greenlight = document.querySelector("#greenLight");
  const orangeLight = document.querySelector("#orangeLight");
  const redLight = document.querySelector("#redLight");
  const car = document.querySelector(".car");
  const wheels = document.querySelectorAll(".wheel");

  const lightTiming = { duration: 500, fill: "forwards" };
  const carTiming = { duration: 3000, fill: 'forwards', easing: "ease-in" };
  const wheelTiming = { duration: 3000, fill: 'forwards' };

  // const moveCar = [{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }]

  const redLightOff = [{ backgroundColor: 'red' }, { backgroundColor: lightOff }]
  const greenLightOn = [{ backgroundColor: lightOff }, { backgroundColor: 'green' }]
  const orangeLightOn = [{ backgroundColor: lightOff }, { backgroundColor: 'orange' }]
  const moveCar = [{ left: '10px' }, { left: '100%' }];
  const rotateWheel = [{ transform: "rotate(0)" }, { transform: "rotate(365deg)" }]


  const createKeyframeEffect = (element, keyframes, timing) => new KeyframeEffect(element, keyframes, timing);

  const playAnimation = async (effect) => {
    const animation = new Animation(effect, document.timeline);
    animation.play();
    await animation.finished;
  };


  try {
    const animations = [
      createKeyframeEffect(redLight, redLightOff, lightTiming),
      createKeyframeEffect(greenlight, greenLightOn, lightTiming),
    ];

    for (const effect of animations) {
      await playAnimation(effect);
    }

    const carEffect = createKeyframeEffect(car, moveCar, carTiming);
    const wheelEffects = Array.from(wheels).map(wheel => createKeyframeEffect(wheel, rotateWheel, wheelTiming));

    // Play car and wheel animations concurrently
    const carAnimation = new Animation(carEffect, document.timeline);
    const wheelAnimations = wheelEffects.map(effect => new Animation(effect, document.timeline));

    carAnimation.play();
    wheelAnimations.forEach(animation => animation.play());

    await Promise.all([carAnimation.finished, wheelAnimations.map(animation => animation.finished)]);



    const reverseEffects = [
      createKeyframeEffect(greenlight, greenLightOn.reverse(), lightTiming),
      createKeyframeEffect(orangeLight, orangeLightOn, lightTiming),
      createKeyframeEffect(orangeLight, orangeLightOn.reverse(), lightTiming),
      createKeyframeEffect(redLight, redLightOff.reverse(), lightTiming),
    ];


    for (const effect of reverseEffects) {
      await playAnimation(effect);
    }

    const reversedEffect = rotateWheel.reverse()

    const reverseCarEffect = createKeyframeEffect(car, moveCar.reverse(), carTiming);
    const reverseWheelEffects = Array.from(wheels).map(wheel => createKeyframeEffect(wheel, reversedEffect, wheelTiming));

    const reverseCarAnimation = new Animation(reverseCarEffect, document.timeline);
    const reverseWheelAnimations = reverseWheelEffects.map(effect => new Animation(effect, document.timeline));

    reverseCarAnimation.play();
    reverseWheelAnimations.forEach(animation => animation.play());

    await Promise.all([reverseCarAnimation.finished, ...reverseWheelAnimations.map(animation => animation.finished)]);

  } catch (error) {
    console.error('Animation error:', error);
  }

}

const button = document.querySelector("#buttonA").addEventListener("mousedown", carAnimation)

