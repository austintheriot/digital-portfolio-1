gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

let width = document.documentElement.clientWidth || window.innerWidth;
const WINDOW_BREAK_POINT_SIZE = 900;
const LARGE_IPAD_SIZE = 1300;
const DARK_COLOR = 'rgb(0, 3, 20)';
const LIGHT_COLOR = 'rgb(246, 243, 248)';
const POP_COLOR = 'rgb(255, 214, 92)';

//only pin city container on desktop
function pinCityContainerFunction() {
  ScrollTrigger.create({
    trigger: '#home',
    end: 'bottom bottom',
    pin: '.city-container',
    pinSpacing: false,
  });
}

//section heading animations
const headings = document.querySelectorAll('.headings');
headings.forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      toggleActions: 'play none none none',
    },
    yPercent: 50,
    opacity: 0,
  });
});

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

const generalButtons = document.querySelectorAll('.button');
generalButtons.forEach((el) => {
  el.addEventListener('mouseenter', buttonMouseEnterHandler);
  el.addEventListener('mouseleave', buttonMouseLeaveHandler);
});

//General Button Animations
function buttonMouseEnterHandler(event) {
  gsap.to(event.target, {
    duration: 0.4,
    color: LIGHT_COLOR,
    backgroundColor: DARK_COLOR,
  });
}

function buttonMouseLeaveHandler(event) {
  gsap.to(event.target, {
    duration: 0.4,
    color: DARK_COLOR,
    backgroundColor: LIGHT_COLOR,
  });
}

//Hire me button animations
const seeMyWorkButton = document.querySelector('.see-my-work-button');

//place button
gsap.set('.see-my-work-button, .scroll-down, .scroll-down-arrow', {
  xPercent: -50,
  yPercent: -50,
});

//add general button animations
seeMyWorkButton.addEventListener('mouseenter', buttonMouseEnterHandler);

seeMyWorkButton.addEventListener('mouseleave', buttonMouseLeaveHandler);

//animations specific to smaller screen sizes
function seeWorkMouseEnterHandler() {
  gsap.to('.building-lights', {
    ease: 'power4.out',
    duration: 2,
    opacity: 1,
  });
}

function seeWorkMouseLeaveHandler() {
  gsap.to('.building-lights', {
    ease: 'power4.out',
    duration: 2,
    opacity: 0,
  });
}

//Fade out Name, Title, Scroll title, and "Hire Me" button
function fadeOutHomeItemsFunction() {
  gsap
    .timeline({
      scrollTrigger: {
        triggerElement: '#home',
        start: '100 top',
        toggleActions: 'play play play reverse',
      },
    })
    .to(
      `.home__name, 
    .home__title, 
    .nav__scroll-heading, 
    .see-my-work-button, 
    .scroll-down,
    .scroll-down-arrow`,
      {
        duration: 0,
        pointerEvents: 'auto',
      }
    )
    .to(
      `.home__name, 
    .home__title, 
    .nav__scroll-heading, 
    .see-my-work-button, 
    .scroll-down,
    .scroll-down-arrow`,
      {
        ease: 'power2.inOut',
        duration: 0.6,
        opacity: 0,
      }
    )
    .to(
      `.home__name, 
    .home__title, 
    .see-my-work-button,
    .scroll-down,
    .scroll-down-arrow`,
      {
        duration: 0,
        pointerEvents: 'none',
      }
    );
}

// Animating HOME SECTION ////////////////////////////////////////////////////////////////////////////////////////
//Placing items before animation//////////////////////////////////////////////////////
//Animate Ground
gsap.set(
  '.ground',
  {
    scaleY: 0.1,
    scaleX: 1.5,
    yPercent: -50,
  },
  '<'
);
//Set Bench,
gsap.set('.bench', {
  scale: 0.02,
  yPercent: -50,
  xPercent: -50,
});
//Set Buildings
gsap.set('.buildings', {
  scale: 1,
  yPercent: -50,
  x: 0,
});
//Set Welcome heading,
gsap.set('.welcome', {
  yPercent: -50,
  opacity: 0,
});
//Set Cars
gsap.set('.car', {
  x: 0,
  left: '125%',
  scale: 0.1,
  yPercent: -50,
});

//home timeline (all city animations (besides the cars) are added to this)
function animateHome() {
  //Animating Home Items///////////////////////////////////////////////////////////////
  //Animation speeds for buildings
  let MOVE_PRIMARY_X = width * 2.2;
  let MOVE_PRIMARY_SCALE = 7;
  let MOVE_SECONDARY_X = width * 1.2;
  let MOVE_SECONDARY_SCALE = 3;
  let MOVE_TERTIARY_X = width * 0.5;
  let MOVE_TERTIARY_SCALE = 2;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#home',
        start: 'top top', //trigger element & viewport
        scrub: 1, //duration for scrub to catch up to scroll
      },
    })
    // Move Primary Buildings ////////////////////
    //Move Primary Buildings Left
    .to(
      '.move-primary-left',
      {
        x: -MOVE_PRIMARY_X,
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
        x: -MOVE_SECONDARY_X,
        scale: MOVE_SECONDARY_SCALE,
      },
      '<'
    )
    //Move Secondary Buildings Right
    .to(
      '.move-secondary-right',
      {
        x: MOVE_SECONDARY_X,
        scale: MOVE_SECONDARY_SCALE,
      },
      '<'
    )
    // Move Tertiary Buildings /////////////////////
    //Move Tertiary Buildings Left
    .to(
      '.move-tertiary-left',
      {
        x: -MOVE_TERTIARY_X,
        scale: MOVE_TERTIARY_SCALE,
      },
      '<'
    )
    //Move Tertiary Buildings Right
    .to(
      '.move-tertiary-right',
      {
        x: MOVE_TERTIARY_X,
        scale: MOVE_TERTIARY_SCALE,
      },
      '<'
    )
    //Move Tertiary Buildings Right (Slower)
    .to(
      '.move-tertiary-right-slower',
      {
        x: 0.3,
        scale: MOVE_TERTIARY_SCALE,
        modifiers: {
          x: gsap.utils.unitize((x) => x * width, 'px'),
        },
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
        ease: 'power1.inOut',
        scale: 1,
      },
      '<'
    )
    // Keep Bench In Shot ////////////////////
    .to('.bench', {
      duration: 0.25,
      scale: 1,
    });

  //fade in welcome
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#home',
        start: '50% top', //trigger element & viewport
        toggleActions: 'play reverse play reverse',
      },
    })
    .to('.welcome', {
      duration: 1,
      opacity: 1,
    });
}

// Animating CARS ////////////////////////////////////////////////////////////////////////////////////////
let animateCars = gsap.timeline();
function animateCarsFunction(action) {
  //animate cars automatically
  animateCars.kill();
  animateCars = gsap
    .timeline({
      repeat: -1, //restarts indefinitely
      scrollTrigger: {
        triggerElement: '#home',
        start: '-1 top',
        end: '9 top',
        toggleActions: `play ${action} resume none`,
      },
    })
    .to('.car', {
      ease: 'none',
      duration: 10 / (Math.random() * 0.5 + 0.75),
      left: '-25%',
      stagger: 3,
      delay: 1, //allow scrub to catch up
    });
}

function animateCarScroll(selector) {
  gsap
    .timeline({
      scrollTrigger: {
        triggerElement: '#home',
        start: '10 top',
        scrub: 1,
      },
    })
    .to(selector, {
      scale: 1,
      x: 1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          let location = document
            .querySelector(selector)
            .getBoundingClientRect().left;
          let modifier = location < width / 2 ? -width * 7 : width * 7;
          return x * modifier;
        }, 'px'),
      },
    });
}

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////

//Animate Text Slides //////////////////////////////////////////////////

document
  .querySelector('.restart-about-slides')
  .addEventListener('click', () => aboutAnimations.restart());

//initialize border locations
gsap.set('.border-left', {
  transformOrigin: 'top',
  scaleY: 0,
});
gsap.set('.border-bottom', {
  transformOrigin: 'left',
  scaleX: 0,
});
gsap.set('.border-right', {
  transformOrigin: 'bottom',
  scaleY: 0,
});
gsap.set('.border-top', {
  transformOrigin: 'right',
  scaleX: 0,
});
gsap.set('.about__info', {
  opacity: 0,
});

const aboutAnimations = gsap
  .timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: '#about',
      toggleActions: 'play reset play reset',
    },
    defaults: {
      duration: 0.6,
    },
  })
  //create labels for border animation
  .addLabel('border-left')
  .addLabel('border-bottom', 'border-left+=4')
  .addLabel('border-right', 'border-bottom+=4')
  .addLabel('border-top', 'border-right+=4')
  //fade in
  .to('.about__info--1', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--1', {
    opacity: 1,
  })
  .to('.about__info--1', {
    duration: 2,
    opacity: 1,
  })
  .to('.about__info--1', {
    opacity: 0,
    zIndex: 0,
  })
  .to('.about__info--1', {
    duration: 0,
    zIndex: 0,
  })
  //border-left animation
  .to(
    '.border-left',
    {
      duration: 4,
      scale: 1,
      borderLeftColor: `${DARK_COLOR}`,
    },
    'border-left'
  )
  //fade in
  .to('.about__info--2', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--2', {
    opacity: 1,
  })
  .to('.about__info--2', {
    duration: 2,
    opacity: 1,
  })
  .to('.about__info--2', {
    opacity: 0,
  })
  .to('.about__info--2', {
    duration: 0,
    zIndex: 200,
  })
  //border-bottom animation
  .to(
    '.border-bottom',
    {
      duration: 4,
      scale: 1,
      borderBottomColor: `${DARK_COLOR}`,
    },
    'border-bottom'
  )
  //fade in
  .to('.about__info--3', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--3', {
    opacity: 1,
  })
  .to('.about__info--3', {
    duration: 2,
    opacity: 1,
  })
  .to('.about__info--3', {
    opacity: 0,
  })
  .to('.about__info--3', {
    duration: 0,
    zIndex: 0,
  })
  //border-right animation
  .to(
    '.border-right',
    {
      duration: 4,
      scale: 1,
      borderRightColor: `${DARK_COLOR}`,
    },
    'border-right'
  )
  //change Z-index
  .to('.about__info--4', {
    duration: 0,
    zIndex: 200,
  })
  //fade in
  .to('.about__info--4', {
    opacity: 1,
  })
  //sustain at 1 opacity
  .to('.about__info--4', {
    duration: 6,
    opacity: 1,
  })
  //fade out
  .to('.about__info--4', {
    opacity: 0,
  })
  .addLabel('break-apart', '<')
  //sustain at 0 opacity
  .to('.about__info--4', {
    duration: 2,
    opacity: 0,
  })
  //change Z-index
  .to('.about__info--4', {
    duration: 0,
    zIndex: 0,
  })
  //border-top animation
  .to(
    '.border-top',
    {
      duration: 4,
      scale: 1,
      borderTopColor: `${DARK_COLOR}`,
    },
    'border-top'
  )
  .to(
    '.border',
    {
      scale: 1.2,
      opacity: 0,
    },
    'break-apart'
  );

//SKILLS///////////////////////////////////////////////////////////
const skills = document.querySelectorAll('.skill-headings');
skills.forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      toggleActions: 'play none complete none',
    },
    opacity: 0,
    xPercent: -50,
  });
});

function fadeInBonusInfo(event) {
  let targetInfo = event.target.dataset.bonusTarget;
  let targetInfoFormatted = `.skills__bonus-info--${targetInfo},
    .construction-building-lights--${targetInfo}`;

  //fade out all other infos and lights
  gsap.to(
    `.skills__bonus-info:not(${targetInfo}),
  .construction-building-lights:not(${targetInfo})`,
    {
      duration: 0.4,
      opacity: 0,
    }
  );
  //stop pointer events on others
  gsap.set(`.skills__bonus-info:not(${targetInfo})`, {
    pointerEvents: 'none',
  });

  //fade in the selected one
  gsap.to(targetInfoFormatted, {
    duration: 0.4,
    opacity: 1,
  });
  //allow pointer events on the selected one
  gsap.set(targetInfoFormatted, {
    pointerEvents: 'auto',
  });
}

gsap.set('.skills__bonus-info, .construction-building-lights', {
  opacity: 0,
});

/* const skillsMoreInfo = document.querySelector('.skills__more-info');
gsap.timeline({
  scrollTrigger: {
    trigger: skillsMoreInfo,
    start: `top top`,
    end: `${skillsSectionHeight} bottom`,
    pin: true,
    pinSpacing: false,
    markers: true,
  },
}); */

//PORTFOLIO///////////////////////////////////////////////////////////
const SLIDE_DELAY = 2;
const SLIDE_DURATION = 0.3;

const slidesInner = document.querySelector('.slides-inner');
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const proxy = document.createElement('div'); //placeholder div for dragging--the proxy tells us how far we've dragged
const numSlides = slides.length;
let slideAnimation = gsap.to({}, { duration: 0 }); //placeholder (to kill before undefined)
let slideWidth;
let wrapWidth;

//initialize slides horizontally
for (let i = 0; i < numSlides; i++) {
  gsap.set(slides[i], {
    xPercent: i * 100,
  });
}
//initialize proxy at 0 movement
gsap.set(proxy, { x: 0 });

//what to do on window resize (called immediately at the bottom)
window.addEventListener('resize', resize);

function snapX(x) {
  return Math.round(x / slideWidth) * slideWidth;
}

//calls the auto play function after a delay
/////////////////////////change Infinity back to DELAY_TIME
const timer = gsap.delayedCall(SLIDE_DELAY, autoPlay);

//moves all slides over by 100% -- starts out paused
const animation = gsap.to(slides, {
  duration: 1,
  xPercent: '+=' + numSlides * 100, //move over the width of the slide
  ease: 'none',
  paused: true,
  repeat: -1,
  modifiers: {
    //wraps positive and negative values to the limit (fancy modulo)
    //offset to the left by one using wrap (so 10 starts out on the left)
    xPercent: gsap.utils.wrap(-100, (numSlides - 1) * 100),
  },
});

//restart timer
//kill the current slideAnimation. Reassign it to a new animation
function animateSlides(direction) {
  timer.restart(true);
  slideAnimation.kill();

  //reads the proxy's position from being dragged
  //snap x position to the closest slide
  let x = snapX(gsap.getProperty(proxy, 'x') + direction * slideWidth);

  slideAnimation = gsap.to(proxy, {
    duration: SLIDE_DURATION,
    x: x,
    onUpdate: updateProgress,
  });
}

//when the outermost container is dragged, drag the proxy (basically nothing)
//stop slideAnimation
//updates the drag animation?
const draggable = new Draggable(proxy, {
  trigger: '.slides-container',
  onPress: updateDraggable,
  onDrag: updateProgress,
});

//updates the the draggable's x/y properties to reflect the target element's current position
function updateDraggable() {
  slideAnimation.kill();
  this.update();
}

//update the slide animation to reflect the movement of the draggable
function updateProgress() {
  animation.progress(
    gsap.utils.wrap(0, 1, gsap.getProperty(proxy, 'x') / wrapWidth)
  );
}

function autoPlay() {
  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
  } else {
    animateSlides(-1);
  }
}

//pause carousel on mouse hover or scroll--resume when mouse leaves
let mouseOnContainer = false;
slidesContainer.addEventListener('mouseenter', () => timer.paused(true));
slidesContainer.addEventListener('mouseleave', () => timer.restart(true));

const projectTitles = document.querySelectorAll('.project-title');
const projectTitleContainers = document.querySelectorAll(
  '.project-title-container'
);

projectTitles.forEach((el) => {
  el.addEventListener('mouseenter', (event) => {
    gsap.to(event.target.parentElement, {
      duration: 0.2,
      backgroundColor: DARK_COLOR,
      color: LIGHT_COLOR,
    });
  });
  el.addEventListener('mouseleave', (event) => {
    gsap.to(event.target.parentElement, {
      duration: 0.2,
      backgroundColor: LIGHT_COLOR,
      color: DARK_COLOR,
    });
  });
});

// Project Previews ///////////////////////////////////////////////
function disableScroll() {
  document.querySelector('body').style.overflow = 'hidden';
}

function enableScroll() {
  document.querySelector('body').style.overflow = 'visible';
}

let stopTimer;
function showPreview(el) {
  let previewTarget = el.dataset.preview;

  //begin loading assets (lazy loading the images for each preview)
  let previewTargetImages = document.querySelectorAll(`${previewTarget} img`);
  previewTargetImages.forEach((el) => {
    el.src = el.dataset.srcPreview;
  });

  //make preview visible
  gsap.set(`${el.dataset.preview}, ${el.dataset.preview} *`, {
    visibility: 'visible',
  });
  gsap.set('.background', {
    visibility: 'visible',
  });

  disableScroll();
  timer.kill();
}

function closePreviews() {
  gsap.set('.project-previews-container, .project-previews-container *', {
    visibility: 'hidden',
  });
  enableScroll();
  clearTimeout(stopTimer);
  timer.restart(true);
}

//display preview on click of the title or about section
const titleButtons = document.querySelectorAll('.project-title');
titleButtons.forEach((el) => {
  el.addEventListener('click', showPreview.bind(this, el));
  el.addEventListener('touchstart', showPreview.bind(this, el));
});

//hide preview on click of the clsoe button or background div
const xButtons = document.querySelectorAll('.x-button');
xButtons.forEach((el) => {
  el.addEventListener('click', closePreviews);
});
const projectPreviewsBackground = document
  .querySelector('.background')
  .addEventListener('click', closePreviews);

//WINDOW RESIZING, etc.//////////////////////////////////////////////////////////////////

/* Logic Begind Interactions Based On Screen-Size: 
Small screens are assumed to be small until proven otherwise. 
Allow all animations to be enabled or disabled based on largest known screen size. 
EXCEPT: City zomm-in/zoom-out animation only available if screen
is large when page is FIRST opened (to prevent massive document-flow issues 
  when switching from animation interaction one to the other)

Small- and medium-size screens adapt to changing width but not height.
This is to prevent jittery effects on iPhones and iPads when the browser resizes itself.

If, however, they are proven to be a desktop, then the height will automatically adjust.
*/

function freezeVHSize() {
  document.documentElement.style.setProperty('--full-height', '100%');
  document.documentElement.style.setProperty(
    '--full-height',
    window.innerHeight + 'px'
  );
}

function enableVHResizing() {
  document.documentElement.style.setProperty('--full-height', '100vh');
}

/* Based on INTIAL screen size */
let largestKnownScreenWidth;
let previousScreenWidth;
if (width < WINDOW_BREAK_POINT_SIZE) {
  largestKnownScreenWidth = 'small';
  freezeVHSize();
} else if (width < LARGE_IPAD_SIZE) {
  largestKnownScreenWidth = 'medium';
  freezeVHSize();
} else {
  largestKnownScreenWidth = 'large';
  enableVHResizing();

  //Enable city animations only on desktop from the outset
  document.querySelector('#home').style.height =
    'calc(var(--full-height, 100vh) * 4)';
  pinCityContainerFunction();
  fadeOutHomeItemsFunction();
  animateCarsFunction('pause');
  animateCarScroll('.car1');
  animateCarScroll('.car2');
  animateHome();
}

/* Based on DYNAMIC screen size */
function resize() {
  width = document.documentElement.clientWidth || window.innerWidth;

  /* Current width */
  if (width < WINDOW_BREAK_POINT_SIZE) {
    currentWidth = 'small';
  } else if (width < LARGE_IPAD_SIZE) {
    currentWidth = 'medium';
  } else {
    currentWidth = 'large';
  }

  /* Any device, depending on current size */
  if (currentWidth === 'small') {
    //disable hover animations on skills
    skills.forEach((el) => {
      el.removeEventListener('mouseenter', fadeInBonusInfo);
    });
    gsap.to('.skills__bonus-info, .construction-building-lights', {
      duration: 0.4,
      opacity: 0,
    });
    gsap.set('.skills__bonus-info', {
      pointerEvents: 'none',
    });
  } else {
    //enable hover animations on skills
    skills.forEach((el) => {
      el.addEventListener('mouseenter', fadeInBonusInfo);
      //immediately make them dissapear
    });
  }

  /* Largest known width ////////////////////////// */
  if (
    width > WINDOW_BREAK_POINT_SIZE &&
    width < LARGE_IPAD_SIZE &&
    largestKnownScreenWidth !== 'large'
  ) {
    largestKnownScreenWidth = 'medium';
  } else if (width > LARGE_IPAD_SIZE) {
    largestKnownScreenWidth = 'large';
  }

  /* iPhones and iPads only */
  if (largestKnownScreenWidth !== 'large') {
    animateCarsFunction('play');

    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 3,
      opacity: 1,
    });
  }

  /* Desktop only */
  if (largestKnownScreenWidth === 'large') {
    enableVHResizing();

    //light up buildings on see my work button hover
    seeMyWorkButton.addEventListener('mouseenter', seeWorkMouseEnterHandler);
    seeMyWorkButton.addEventListener('mouseleave', seeWorkMouseLeaveHandler);
    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 3,
      opacity: 0,
    });
  }

  //Carousel/Slider info:
  let norm = gsap.getProperty(proxy, 'x') / wrapWidth || 0;

  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  gsap.set(proxy, {
    x: norm * wrapWidth,
  });

  gsap.set(slidesInner, {
    width: Math.min(wrapWidth - slideWidth, width),
  });
  gsap.set(slidesContainer, {
    width: Math.min(wrapWidth - slideWidth, width),
  });

  animateSlides(0);
  slideAnimation.progress(1);
}

resize(); //immediately resize window to calibrate

//unhide the CSS (so that it doesn't flicker before things are fully placed)
gsap.to(':root', {
  visibility: 'visible',
});
