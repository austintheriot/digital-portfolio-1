gsap.registerPlugin(ScrollToPlugin);

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
const ground1 = document.querySelector('.ground1');

window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
});

const WINDOW_BREAK_POINT_SIZE = 900;
const controller = new ScrollMagic.Controller();
const SECTION_HEIGHT = 400;
const PIN_DURATION = `${SECTION_HEIGHT * 4}%`;
const NAV_ORB_DURATION = `${SECTION_HEIGHT}%`;
const ANIMATION_SCROLL_DURATION = `${SECTION_HEIGHT / 2}%`;

// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
const nav = document.querySelector('nav');

//Light up navigation orbs when viewing that section
new ScrollMagic.Scene({
  triggerElement: '#home',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-home', 'nav__link--selected')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#about',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-about', 'nav__link--selected')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#portfolio',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-portfolio', 'nav__link--selected')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#contact',
  duration: NAV_ORB_DURATION,
})
  .setClassToggle('.nav__link-contact', 'nav__link--selected')
  .addTo(controller);

//Fade out "Scroll" indicator
const scrollHeadingTimeline = gsap.timeline();

scrollHeadingTimeline.to('.nav__scroll-heading', {
  duration: 0.6,
  opacity: 0,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 100,
})
  .setTween(scrollHeadingTimeline)
  .addTo(controller);

//Change opacity of entire nav on hover (on desktop)
if (width >= WINDOW_BREAK_POINT_SIZE) {
  gsap.to(nav, {
    duration: 2,
    opacity: 0.75,
  });

  //trigger functions for mouseover nav
  nav.addEventListener('mouseover', (event) => {
    gsap.to(nav, {
      ease: 'power',
      duration: 0.4,
      opacity: 1,
    });

    //trigger fade-in for info associated with link
    if ([...event.target.classList].includes('nav__link')) {
      fadeInOutElement(event.target, 1);
    }
  });

  //trigger functions for mouseout of nav
  nav.addEventListener('mouseout', (event) => {
    gsap.to(nav, {
      ease: 'power',
      duration: 0.4,
      opacity: 0.5,
    });

    //trigger fade-out for info associated with link
    if ([...event.target.classList].includes('nav__link')) {
      fadeInOutElement(event.target, 0);
    }
  });
} else {
  gsap.to(nav, {
    duration: 2,
    opacity: 1,
  });
}

//Change opacity of nav info on hover (Desktop)
function fadeInOutElement(target, opacity) {
  const linkDescriptor = [...target.classList][1].split('-')[1];
  targetName = `.nav__info-${linkDescriptor}`;
  gsap.to(targetName, {
    duration: 0.4,
    opacity: opacity,
  });
}

//Change opacity of nav info on location (Mobile)
if (width < WINDOW_BREAK_POINT_SIZE) {
  new ScrollMagic.Scene({
    triggerElement: '#home',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-home', 'nav__info--selected')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#about',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-about', 'nav__info--selected')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#portfolio',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-portfolio', 'nav__info--selected')
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: '#contact',
    duration: NAV_ORB_DURATION,
  })
    .setClassToggle('.nav__info-contact', 'nav__info--selected')
    .addTo(controller);
}

/* //Animate general scrolling of the page 
--- can't get this to work. The browser just locks up instead every time

controller.scrollTo(function (newpos) {
  TweenMax.to(window, 2, { scrollTo: { y: newpos } });
});

nav.addEventListener('click', (event) => {
  let target = event.target;
  if ([...target.classList].includes('nav__link')) {
    let link = target.dataset.link;
    controller.scrollTo(link);
  }
});
 */

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

//Pin City Container
new ScrollMagic.Scene({
  triggerElement: 'body',
  duration: PIN_DURATION,
  triggerHook: 'onLeave',
})
  .setPin('.city-container', { pushFollowers: false })
  .addTo(controller);

//Fade out Name and Title
const nameAndTitleTimeline = gsap.timeline();

nameAndTitleTimeline.to('.home__name, .home__title', {
  duration: 0.6,
  opacity: 0,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 100,
})
  .setTween(nameAndTitleTimeline)
  .addTo(controller);

// Animating the Ground ////////////////////////////////////////////////////////////////
//Animate Ground

gsap.set('.ground', {
  yPercent: -50,
  scaleY: 0.1,
  scaleX: 1.5,
});

const groundTimeline = gsap.timeline();

groundTimeline.to('.ground', {
  ease: 'power.in',
  scaleY: 0.5,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(groundTimeline)
  .addTo(controller);

//Place Cars
gsap.set('.car', {
  yPercent: -50,
  scale: 0.1,
});

// Car 1 /////////////////////////////////////////////////////////////
//Animate car movement
//Move car from 50% left to 50% past the right and then repeats
const carTimelineMoving = new TimelineMax({
  onComplete: () => carTimelineMoving.restart(),
});
carTimelineMoving.to('.car1', {
  ease: 'none',
  duration: width / 50,
  left: width * 1.1,
});

//Pause car movement, create a new scene to move car left or right depending on position
const carTimelinePause = gsap.timeline();
carTimelinePause.to('.car1', {
  onStart: () => {
    carTimelineMoving.pause();
    let carPosition = gsap.getProperty('.car1', 'left');
    moveCarWithScroll(carPosition);
  },
});
new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(carTimelinePause)
  .addTo(controller);

//Move Car with Mouse Scrolling
//callback function--allows car to move left or righr depending on current position
let scrollingCarScene;
function moveCarWithScroll(carPosition) {
  const scrollingCarTimeline = gsap.timeline();

  scrollingCarTimeline.to('.car1', {
    x: carPosition < width / 2 - width / 200 ? -width * 2.2 : width * 2.2,
    ease: 'none',
    scale: 1,
  });
  scrollingCarScene = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: ANIMATION_SCROLL_DURATION,
    triggerHook: 'onEnter',
  })
    .setTween(scrollingCarTimeline)
    .addTo(controller);
}

//Resume Car Movement
//Destroy scrolling scene and begin car movement again
new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 10,
})
  .addTo(controller)
  .on('leave', () => {
    scrollingCarScene.destroy();
    carTimelineMoving.resume();
  });

// Car 2 /////////////////////////////////////////////////////////////
//Animate car movement
//Move car from 50% left to 50% past the right and then repeats
const carTimelineMoving2 = new TimelineMax({
  onComplete: () => carTimelineMoving2.restart(),
});
carTimelineMoving2.to('.car2', {
  ease: 'none',
  duration: width / 50,
  left: width * 1.1,
  delay: 4,
});

//Pause car movement, create a new scene to move car left or right depending on position
const carTimelinePause2 = gsap.timeline();
carTimelinePause2.to('.car2', {
  onStart: () => {
    carTimelineMoving2.pause();
    let carPosition = gsap.getProperty('.car2', 'left');
    moveCarWithScroll2(carPosition);
  },
});
new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(carTimelinePause2)
  .addTo(controller);

//Move Car with Mouse Scrolling
//callback function--allows car to move left or righr depending on current position
let scrollingCarScene2;
function moveCarWithScroll2(carPosition) {
  const scrollingCarTimeline2 = gsap.timeline();

  scrollingCarTimeline2.to('.car2', {
    x: carPosition < width / 2 - width / 200 ? -width * 2.2 : width * 2.2,
    ease: 'none',
    scale: 1,
  });
  scrollingCarScene2 = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: ANIMATION_SCROLL_DURATION,
    triggerHook: 'onEnter',
  })
    .setTween(scrollingCarTimeline2)
    .addTo(controller);
}

//Resume Car Movement
//Destroy scrolling scene and begin car movement again
new ScrollMagic.Scene({
  triggerElement: '.home',
  offset: 10,
})
  .addTo(controller)
  .on('leave', () => {
    scrollingCarScene2.destroy();
    carTimelineMoving2.resume();
  });

// Move Primary ////////////////////////////////////////////////////////////////
//Center buildings Completely
gsap.set('.buildings', {
  yPercent: -50,
});

const MOVE_PRIMARY_X = () => width * 2.2;
const MOVE_PRIMARY_SCALE = 7;

//Move Primary Left
const movePrimaryLeft = gsap.timeline();

movePrimaryLeft.to('.move-primary-left', {
  x: -MOVE_PRIMARY_X(),
  scale: MOVE_PRIMARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(movePrimaryLeft)
  .addTo(controller);

//Move Primary Right
const movePrimaryRight = gsap.timeline();

movePrimaryRight.to('.move-primary-right', {
  x: MOVE_PRIMARY_X,
  scale: MOVE_PRIMARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(movePrimaryRight)
  .addTo(controller);

// Move Secondary ////////////////////////////////////////////////////////////////
const MOVE_SECONDARY_X = () => width * 1.2;
const MOVE_SECONDARY_SCALE = 3;

//Move Secondary Left
const moveSecondaryLeft = gsap.timeline();

moveSecondaryLeft.to('.move-secondary-left', {
  x: -MOVE_SECONDARY_X(),
  scale: MOVE_SECONDARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(moveSecondaryLeft)
  .addTo(controller);

//Move Secondary Right
const moveSecondaryRight = gsap.timeline();

moveSecondaryRight.to('.move-secondary-right', {
  x: MOVE_SECONDARY_X(),
  scale: MOVE_SECONDARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(moveSecondaryRight)
  .addTo(controller);

// Move Tertiary ////////////////////////////////////////////////////////////////
const MOVE_TERTIARY_X = () => width * 0.5;
const MOVE_TERTIARY_SCALE = 2;

//Move Tertiary Left
const moveTertiaryLeft = gsap.timeline();

moveTertiaryLeft.to('.move-tertiary-left', {
  x: -MOVE_TERTIARY_X(),
  scale: MOVE_TERTIARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(moveTertiaryLeft)
  .addTo(controller);

//Move Tertiary Right
const moveTertiaryRight = gsap.timeline();

moveTertiaryRight.to('.move-tertiary-right', {
  x: MOVE_TERTIARY_X(),
  scale: MOVE_TERTIARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(moveTertiaryRight)
  .addTo(controller);

//move-tertiary-right-slower
const moveTertiaryRightSlower = gsap.timeline();

moveTertiaryRightSlower.to('.move-tertiary-right-slower', {
  x: width * 0.3,
  scale: MOVE_TERTIARY_SCALE,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(moveTertiaryRightSlower)
  .addTo(controller);

//Background Buildings
const backgroundBuildings = gsap.timeline();

backgroundBuildings.to('.background-buildings', {
  scale: 1.5,
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(backgroundBuildings)
  .addTo(controller);

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////

const benchTimeline = gsap.timeline();

//Bench
gsap.set('.bench', {
  yPercent: -50,
  xPercent: -50,
  scale: 0.02,
});

benchTimeline.to('.bench', {
  scale: 1,
  ease: 'power.in',
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(benchTimeline)
  .addTo(controller);
