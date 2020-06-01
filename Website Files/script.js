gsap.registerPlugin(ScrollToPlugin);
const controller = new ScrollMagic.Controller();

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
const ground1 = document.querySelector('.ground1');

window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
});

const WINDOW_BREAK_POINT_SIZE = 900;
const SECTION_HEIGHT = Number(
  getComputedStyle(document.documentElement)
    .getPropertyValue('--section-height')
    .match(/[0-9]/g)
    .join('')
); //retrieve section height from CSS variable
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
// --- can't get this to work. The browser just locks up instead every time

controller.scrollTo(function (newpos) {
  gsap.to(window, 2, { scrollTo: { y: newpos } });
});

nav.addEventListener('click', (event) => {
  let target = event.target;
  if ([...target.classList].includes('nav__link')) {
    event.preventDefault();
    let link = target.getAttribute('href');
    controller.scrollTo(link);
  }
});
 */
//Pin City Container for the Entire Page
new ScrollMagic.Scene({
  triggerElement: 'body',
  duration: PIN_DURATION,
  triggerHook: 'onLeave',
})
  .setPin('.city-container', { pushFollowers: false })
  .addTo(controller);

//Fade out Name, Title, and Scroll title
const fadeAtScroll = gsap.timeline();
fadeAtScroll.to(
  '.home__name, .home__title, .nav__scroll-heading',
  {
    ease: 'none',
    duration: 0.6,
    opacity: 0,
  },
  '<'
);
new ScrollMagic.Scene({
  triggerElement: '#home',
  triggerHook: 'onLeave',
  offset: 1,
})
  .setTween(fadeAtScroll)
  .addTo(controller);

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Animating HOME SECTION ////////////////////////////////////////////////////////////////////////////////////////
const home = gsap.timeline();
// ANIMATE CARS //////////////////////////////////////////////////////
//Place Cars//////////////////////
gsap.set('.car', {
  yPercent: -50,
  scale: 0.1,
});

//Animate Cars//////////////////////
function animateCar(selector, delay = 0, speed = 1) {
  //Animate car movement

  /* The General Logic: 
  
  On the 'home' screen, the cars animate to move right to left 
  across the screen on their own. 
  When the user scrolls, this animation is paused. 
  A new animation and scene is built that enables the cars to be scaled and moved based on scroll position.
  Once the user scrolls back up to the top, the new scene and animation are destroyed, and the default animation resumes. 
  */

  //Move car from 100% right to -100% left (to prevent accidental peeking on small screen sizes)
  //Starts on first load, so needs no ScrollMagic controller
  const carTimelineMoving = gsap.timeline({
    repeat: -1, //restarts indefinitely
  });
  carTimelineMoving.to(selector, {
    ease: 'none',
    duration: width / 50 / speed,
    left: '-100%',
    delay: delay,
  });

  //Pause car movement, create a new scene to move car left or right depending on position
  //Added to home section--basically pauses as soon as any scrolling takes place
  home.to(
    selector,
    {
      onStart: () => {
        carTimelineMoving.pause();
        let carPosition = document
          .querySelector(selector)
          .getBoundingClientRect().left;
        moveCarWithScroll(carPosition);
      },
    },
    '<'
  );

  //Move Car based on scroll position
  //callback function--allows car to move left or righr depending on current position
  let scrollingCarScene;
  let scrollingCarTimeline;
  function moveCarWithScroll(carPosition) {
    scrollingCarTimeline = gsap.timeline();

    scrollingCarTimeline.to(selector, {
      x: carPosition < width / 2 ? -width * 2.2 : width * 2.2,
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
  //Destroy scrolling scene, destroy timeline, and begin car movement again
  //When the user scrolls up to the top (literally past "10 pixels below the top")
  new ScrollMagic.Scene({
    triggerElement: '.home',
    offset: 10,
  })
    .addTo(controller)
    .on('leave', () => {
      scrollingCarScene.destroy();
      carTimelineMoving.resume();
    });
}
//Car animation logic is executed on specified cars at specified delays
//selector, delay, speed
animateCar('.car1', 0, 1);
animateCar('.car2', 7, 1.3);
animateCar('.car3', 11, 0.6);
animateCar('.car4', 15, 1.75);

//Placing items before animation//////////////////////////////////////////////////////
//Animate Ground
gsap.set(
  '.ground',
  {
    yPercent: -50,
    scaleY: 0.1,
    scaleX: 1.5,
  },
  '<'
);
//Center buildings Completely
gsap.set(
  '.buildings',
  {
    yPercent: -50,
  },
  '<'
);
//Set Bench,
gsap.set('.bench', {
  yPercent: -50,
  xPercent: -50,
  scale: 0.02,
});

//Animating Home Items///////////////////////////////////////////////////////////////
//Animation speeds for buildings
const MOVE_PRIMARY_X = () => width * 2.2;
const MOVE_PRIMARY_SCALE = 7;
const MOVE_SECONDARY_X = () => width * 1.2;
const MOVE_SECONDARY_SCALE = 3;
const MOVE_TERTIARY_X = () => width * 0.5;
const MOVE_TERTIARY_SCALE = 2;
// Move Primary Buildings ////////////////////
home
  //Move Primary Buildings Left
  .to(
    '.move-primary-left',
    {
      x: -MOVE_PRIMARY_X(),
      scale: MOVE_PRIMARY_SCALE,
    },
    '<'
  )
  //Move Primary Buildings Right
  .to(
    '.move-primary-right',
    {
      x: MOVE_PRIMARY_X,
      scale: MOVE_PRIMARY_SCALE,
    },
    '<'
  )
  // Move Secondary Buildings ////////////////////
  //Move Secondary Buildings Left
  .to(
    '.move-secondary-left',
    {
      x: -MOVE_SECONDARY_X(),
      scale: MOVE_SECONDARY_SCALE,
    },
    '<'
  )
  //Move Secondary Buildings Right
  .to(
    '.move-secondary-right',
    {
      x: MOVE_SECONDARY_X(),
      scale: MOVE_SECONDARY_SCALE,
    },
    '<'
  )
  // Move Tertiary Buildings /////////////////////
  //Move Tertiary Buildings Left
  .to(
    '.move-tertiary-left',
    {
      x: -MOVE_TERTIARY_X(),
      scale: MOVE_TERTIARY_SCALE,
    },
    '<'
  )
  //Move Tertiary Buildings Right
  .to(
    '.move-tertiary-right',
    {
      x: MOVE_TERTIARY_X(),
      scale: MOVE_TERTIARY_SCALE,
    },
    '<'
  )
  //Move Tertiary Buildings Right (Slower)
  .to(
    '.move-tertiary-right-slower',
    {
      x: width * 0.3,
      scale: MOVE_TERTIARY_SCALE,
    },
    '<'
  )
  // Scale Up Background Buildings //////////////
  .to(
    '.background-buildings',
    {
      scale: 1.5,
    },
    '<'
  )
  // Scale Up Ground /////////////////////////////
  .to(
    '.ground',
    {
      ease: 'power.in',
      scaleY: 0.5,
    },
    '<'
  )
  // Scale Up Bench Into Shot ////////////////////
  .to(
    '.bench',
    {
      scale: 1,
      ease: 'power.in',
    },
    '<'
  );

//Add Home animation to controller
new ScrollMagic.Scene({
  duration: ANIMATION_SCROLL_DURATION,
  triggerHook: 'onEnter',
})
  .setTween(home)
  .addTo(controller);

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////

//Animate Bench & Tree over ///////////////////////////////////
const benchOver = gsap.timeline();
benchOver.to('.bench', {
  ease: 'power1.inOut',
  duration: 1,
  xPercent: -100,
});

//Add benchover animation to controller
new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: 'onLeave',
  offset: 1,
})
  .setTween(benchOver)
  .addTo(controller);

//About Section Scroll Animations ///////////////////////////////////

document.querySelectorAll('.about__info-section').forEach((el) => {
  const paragraph = el.dataset.paragraph;
  const fadeInParagraph = gsap.timeline();

  fadeInParagraph.to(paragraph, {
    duration: 1,
    opacity: 1,
  });

  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.15,
  })
    .setTween(fadeInParagraph)
    .addTo(controller);
});

const about = gsap.timeline();

new ScrollMagic.Scene({
  triggerElement: '#about',
  triggerHook: 'onLeave',
  duration: ANIMATION_SCROLL_DURATION,
  offset: 1,
})
  .setTween(about)
  .addTo(controller);
