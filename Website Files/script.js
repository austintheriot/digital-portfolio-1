let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
const ground1 = document.querySelector('.ground1');

window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
});

const controller = new ScrollMagic.Controller();

const SECTION_HEIGHT = 400;
const PIN_DURATION = `${SECTION_HEIGHT * 4}%`;
const ANIMATION_SCROLL_DURATION = `${SECTION_HEIGHT / 2}%`;

//Center buildings Completely
gsap.set('.buildings', {
  yPercent: -50,
});

//Pin City Container
new ScrollMagic.Scene({
  triggerElement: 'body',
  duration: PIN_DURATION,
  triggerHook: 'onLeave',
})
  .setPin('.city-container', { pushFollowers: false })
  .addIndicators()
  .addTo(controller);

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

// Animating the Ground ////////////////////////////////////////////////////////////////
//Animate Ground

gsap.set('.ground', {
  yPercent: -50,
  scaleY: 0.1,
  scaleX: 1.5,
});

const groundTimeline = new TimelineMax();

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

//Trees Left
const TREE_MOVEMENT = () => width * 3;
const TREE_SCALE = 6;
const treesTimelineLeft = new TimelineMax();

gsap.set('.trees', {
  yPercent: -50,
});

treesTimelineLeft.to('.trees-left', {
  ease: 'power.in',
  scale: TREE_SCALE,
  x: -TREE_MOVEMENT(),
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(treesTimelineLeft)
  .addTo(controller);

//Trees Right
const treesTimelineRight = new TimelineMax();

treesTimelineRight.to('.trees-right', {
  ease: 'power.in',
  scale: TREE_SCALE,
  x: TREE_MOVEMENT(),
});

new ScrollMagic.Scene({
  triggerElement: '.home',
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(treesTimelineRight)
  .addTo(controller);

// Move Primary ////////////////////////////////////////////////////////////////
const MOVE_PRIMARY_X = () => width * 2.2;
const MOVE_PRIMARY_SCALE = 5;

//Move Primary Left
const movePrimaryLeft = new TimelineMax();

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
const movePrimaryRight = new TimelineMax();

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
const moveSecondaryLeft = new TimelineMax();

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
const moveSecondaryRight = new TimelineMax();

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
const moveTertiaryLeft = new TimelineMax();

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
const moveTertiaryRight = new TimelineMax();

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
const moveTertiaryRightSlower = new TimelineMax();

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
const backgroundBuildings = new TimelineMax();

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

const benchTimeline = new TimelineMax();

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
