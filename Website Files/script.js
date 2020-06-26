gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
let documentHeight = document.body.scrollHeight;
let homeSectionHeight = document.querySelector('#home').offsetHeight;
let aboutSectionHeight = document.querySelector('#about').offsetHeight;
let skillsSectionHeight = document.querySelector('#skills').offsetHeight;
const WINDOW_BREAK_POINT_SIZE = 900;
const DARK_COLOR = 'rgb(0, 3, 20)';
const LIGHT_COLOR = 'rgb(246, 243, 248)';
const POP_COLOR = 'rgb(255, 214, 92)';

//pin city container inside HOME section
pinContainer = ScrollTrigger.create({
  trigger: '.city-container',
  start: 'top top',
  end: `${homeSectionHeight} bottom`,
  pin: true,
  pinSpacing: true,
});

//GSAP's iOS bug fix
//possible solution for old iOS bugs that don't display things inside an iframe correctly.
//Create a --full-height CSS variable and use it instead of height: 100%
function readHeight() {
  if (ScrollTrigger.isScrolling()) {
    console.log('wait until end...');
    ScrollTrigger.addEventListener('scrollEnd', readHeight);
  } else {
    ScrollTrigger.removeEventListener('scrollEnd', readHeight);
    window.removeEventListener('resize', readHeight);
    let scrollFunc = ScrollTrigger.getScrollFunc(window),
      scrollProgress = scrollFunc() / ScrollTrigger.maxScroll(window),
      docStyle = document.documentElement.style,
      bodyStyle = document.body.style;
    bodyStyle.overflow = 'auto';
    docStyle.setProperty('--full-height', '100%');
    docStyle.setProperty('--full-height', window.innerHeight + 'px');
    bodyStyle.overflow = 'unset';
    setTimeout(function () {
      window.addEventListener('resize', readHeight);
    }, 500);
    ScrollTrigger.refresh(true);
    scrollFunc(scrollProgress * ScrollTrigger.maxScroll(window));
  }
}
readHeight();

/* // --- can't get this to work. The browser just locks up instead every time
const nav = document.querySelector('nav');
nav.addEventListener('click', (event) => {
  const target = event.target;
  if ([...target.classList].includes('nav__link')) {
    event.preventDefault();
    let link = target.getAttribute('href');
    gsap.to(window, {
      duration: 0.25,
      scrollTo: link,
    });
  }
}); */

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

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
const hireMeButton = document.querySelector('.hire-me-button');

//place button
gsap.set('.hire-me-button, .scroll-down, .scroll-down-arrow', {
  xPercent: -50,
  yPercent: -50,
});
gsap.set('.hire-me-div', {
  scaleY: 0,
  xPercent: -50,
});

//add general button animations
hireMeButton.addEventListener('mouseenter', buttonMouseEnterHandler);

hireMeButton.addEventListener('mouseleave', buttonMouseLeaveHandler);

//animations specific to smaller screen sizes
function hireButtonMouseOverHandler() {
  gsap
    .timeline({
      defaults: {
        ease: 'power4.out',
      },
    })
    .to('.hire-me-div', {
      duration: 0.4,
      transformOrigin: 'bottom',
      scaleY: 1,
    })
    .to('.building-lights', {
      duration: 2,
      opacity: 1,
    });
}

function hireButtonMouseOutHandler() {
  gsap
    .timeline({
      defaults: {
        ease: 'power4.out',
      },
    })
    .to('.hire-me-div', {
      duration: 0.4,
      scaleY: 0,
    })
    .to(
      '.building-lights',
      {
        duration: 2,
        opacity: 0,
      },
      '<'
    );
}

//Fade out Name, Title, Scroll title, and "Hire Me" button
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
    .hire-me-button, 
    .hire-me-div,
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
    .hire-me-button,
    .hire-me-div,
    .scroll-down,
    .scroll-down-arrow`,
    {
      duration: 0.2,
      scale: 0,
    }
  );

// Animating HOME SECTION ////////////////////////////////////////////////////////////////////////////////////////
//home timeline (all city animations (besides the cars) are added to this)
const home = gsap.timeline({
  scrollTrigger: {
    trigger: '#home',
    start: 'top top', //trigger element & viewport
    scrub: 1, //duration for scrub to catch up to scroll
  },
});

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
  yPercent: -50,
});
//Set Welcome heading,
gsap.set('.welcome', {
  yPercent: -50,
  opacity: 0,
});
//Set Cars
gsap.set('.car', {
  scale: 0.1,
  yPercent: -50,
});

// Animating CARS ////////////////////////////////////////////////////////////////////////////////////////
function animateCar(selector, delay = 0, speed = 1) {
  //animate cars automatically
  gsap
    .timeline({
      repeat: -1, //restarts indefinitely
      scrollTrigger: {
        triggerElement: '#home',
        start: '-1 top',
        end: '9 top',
        toggleActions: 'resume pause resume none',
      },
    })
    .to(selector, {
      ease: 'none',
      duration: 10 / speed,
      left: '-25%',
      delay,
    });

  gsap.to(selector, {
    scrollTrigger: {
      triggerElement: '#home',
      start: '10 top',
      scrub: 1,
    },
    scale: 1,
    x: 1,
    modifiers: {
      x: gsap.utils.unitize((x) => {
        let location = document.querySelector(selector).getBoundingClientRect()
          .left;
        let modifier = location < width / 2 ? -width * 7 : width * 7;
        return x * modifier;
      }, 'px'),
    },
  });
}
//car animations
animateCar('.car1', 0, 1);
animateCar('.car2', 5, 1.25);

//Animating Home Items///////////////////////////////////////////////////////////////
//Animation speeds for buildings
let MOVE_PRIMARY_X = width * 2.2;
let MOVE_PRIMARY_SCALE = 7;
let MOVE_SECONDARY_X = width * 1.2;
let MOVE_SECONDARY_SCALE = 3;
let MOVE_TERTIARY_X = width * 0.5;
let MOVE_TERTIARY_SCALE = 2;

// Move Primary Buildings ////////////////////
home
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
  xPercent: -50,
  yPercent: -50,
  opacity: 0,
});

const aboutAnimations = gsap
  .timeline({
    repeat: -1,
    scrollTrigger: {
      trigger: '#about',
      toggleActions: 'play pause play pause',
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
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        toggleActions: 'play none play reverse',
      },
    })
    .from(el, {
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

  //fade in this one
  gsap.to(targetInfoFormatted, {
    duration: 0.4,
    opacity: 1,
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
const prevButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
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
const timer = gsap.delayedCall(Infinity, autoPlay);

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

projectTitleContainers.forEach((el) => {
  el.addEventListener('mouseenter', (event) => {
    gsap.to(event.target, {
      duration: 0.2,
      backgroundColor: DARK_COLOR,
      color: LIGHT_COLOR,
    });
  });
  el.addEventListener('mouseleave', (event) => {
    gsap.to(event.target, {
      duration: 0.2,
      backgroundColor: LIGHT_COLOR,
      color: DARK_COLOR,
    });
  });
});

//CONTACT///////////////////////////////////////////////////////////
const contactSubmitButton = document.querySelector('.contact__submit-button');
contactSubmitButton.addEventListener('mouseenter', buttonMouseEnterHandler);

contactSubmitButton.addEventListener('mouseleave', buttonMouseLeaveHandler);

//////////////////////////////////////////////////////////////////
function resize() {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
  documentHeight = document.body.scrollHeight;
  windowSize = { width, height };

  //see my work button animations
  //light up buildings right away on mobile
  if (width < WINDOW_BREAK_POINT_SIZE) {
    hireMeButton.removeEventListener('mouseenter', hireButtonMouseOverHandler);
    hireMeButton.removeEventListener('mouseleave', hireButtonMouseOutHandler);
    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 3,
      opacity: 1,
    });
  } else {
    //light up buildings on see my work button hover
    hireMeButton.addEventListener('mouseenter', hireButtonMouseOverHandler);
    hireMeButton.addEventListener('mouseleave', hireButtonMouseOutHandler);
    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 3,
      opacity: 0,
    });
  }

  //skills bonus info animations
  if (width < WINDOW_BREAK_POINT_SIZE) {
    skills.forEach((el) => {
      el.removeEventListener('mouseenter', fadeInBonusInfo);
    });
    gsap.to('.skills__bonus-info, .construction-building-lights', {
      duration: 0.4,
      opacity: 0,
    });
  } else {
    skills.forEach((el) => {
      el.addEventListener('mouseenter', fadeInBonusInfo);
      //immediately make them dissapear
    });
  }

  //stuff for carousel/slider
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
