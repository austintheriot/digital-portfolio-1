gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
let documentHeight = document.body.scrollHeight;
let homeSectionHeight = document.querySelector('#home').offsetHeight;
let aboutSectionHeight = document.querySelector('#about').offsetHeight;
const WINDOW_BREAK_POINT_SIZE = 900;
const DARK_COLOR = getComputedStyle(document.documentElement).getPropertyValue(
  '--dark-color'
);

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

//Hire me button animations
const hireMeButton = document.querySelector('.hire-me-button');
gsap.set('.hire-me-button', {
  xPercent: -50,
  yPercent: -50,
});
gsap.set('.hire-me-div', {
  scaleY: 0,
  xPercent: -50,
});
//light up buildings right away on mobile
if (width < WINDOW_BREAK_POINT_SIZE) {
  gsap.to('.building-lights', {
    ease: 'power4.out',
    duration: 3,
    opacity: 1,
  });
} else {
  //light up buildings on hire me button hover
  hireMeButton.addEventListener('mouseover', () => {
    gsap
      .timeline({
        defaults: {
          ease: 'power4.out',
        },
      })
      .to('.hire-me-div', {
        duration: 0.2,
        scaleY: 1,
      })
      .to('.building-lights', {
        duration: 2,
        opacity: 1,
      });
  });
  hireMeButton.addEventListener('mouseout', () => {
    gsap
      .timeline({
        defaults: {
          ease: 'power4.out',
        },
      })
      .to('.hire-me-div', {
        duration: 0.2,
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
  });
}

//Fade out Name, Title, Scroll title, and "Hire Me" button
gsap
  .timeline({
    scrollTrigger: {
      triggerElement: '#home',
      start: '50 top',
      toggleActions: 'play play play reverse',
    },
  })
  .to(
    `.home__name, 
    .home__title, 
    .nav__scroll-heading, 
    .hire-me-button, 
    .hire-me-div`,
    {
      ease: 'power2.inOut',
      duration: 0.2,
      opacity: 0,
    }
  )
  .to(
    `.home__name, 
    .home__title, 
    .hire-me-button,
    .hire-me-div`,
    {
      duration: 0.2,
      scale: 0,
    }
  );

const home = gsap.timeline({
  scrollTrigger: {
    trigger: '#home',
    start: 'top top', //trigger element & viewport
    scrub: 1, //duration for scrub to catch up to scroll
  },
});

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
  yPercent: -50,
});
//Set Welcome heading,
gsap.set('.welcome', {
  yPercent: -50,
  opacity: 0,
});

//Animating Home Items///////////////////////////////////////////////////////////////
//Animation speeds for buildings
const MOVE_PRIMARY_X = 2.2;
const MOVE_PRIMARY_SCALE = 7;
const MOVE_SECONDARY_X = 1.2;
const MOVE_SECONDARY_SCALE = 3;
const MOVE_TERTIARY_X = 0.5;
const MOVE_TERTIARY_SCALE = 2;

// Move Primary Buildings ////////////////////
home
  //Move Primary Buildings Left
  .to(
    '.move-primary-left',
    {
      x: -MOVE_PRIMARY_X,
      scale: MOVE_PRIMARY_SCALE,
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
    },
    '<'
  )
  //Move Primary Buildings Right
  .to(
    '.move-primary-right',
    {
      x: MOVE_PRIMARY_X,
      scale: MOVE_PRIMARY_SCALE,
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
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
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
    },
    '<'
  )
  //Move Secondary Buildings Right
  .to(
    '.move-secondary-right',
    {
      x: MOVE_SECONDARY_X,
      scale: MOVE_SECONDARY_SCALE,
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
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
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
    },
    '<'
  )
  //Move Tertiary Buildings Right
  .to(
    '.move-tertiary-right',
    {
      x: MOVE_TERTIARY_X,
      scale: MOVE_TERTIARY_SCALE,
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
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
  //keep bench in place and fade in welcome
  .to('.welcome', {
    duration: 1,
    opacity: 1,
  });

//fade out city container
gsap.to('.city-container', {
  scrollTrigger: {
    trigger: '#about',
    start: '-20% 80%', //trigger element & viewport
    scrub: true, //duration for scrub to catch up to scroll
  },
  opacity: 0.01,
});

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////

//Animate Text Slides //////////////////////////////////////////////////

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
gsap
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

//PORTFOLIO///////////////////////////////////////////////////////////
var slideDelay = 1.5;
var slideDuration = 0.3;

var slides = document.querySelectorAll('.slide');
var prevButton = document.querySelector('#prevButton');
var nextButton = document.querySelector('#nextButton');

var numSlides = slides.length;

for (var i = 0; i < numSlides; i++) {
  gsap.set(slides[i], {
    backgroundColor: 'black',
    xPercent: i * 100,
  });
}

var timer = gsap.delayedCall(slideDelay, autoPlay);

var animation = gsap.to(slides, {
  duration: 1,
  xPercent: '+=' + numSlides * 100,
  ease: 'none',
  paused: true,
  repeat: -1,
  modifiers: {
    xPercent: gsap.utils.wrap(-100, (numSlides - 1) * 100),
  },
});

var proxy = document.createElement('div');
gsap.set(proxy, { x: 0 });
var slideAnimation = gsap.to({}, { duration: 0.1 });
var slideWidth = 0;
var wrapWidth = 0;
resize();

var draggable = new Draggable(proxy, {
  trigger: '.slides-container',
  throwProps: true,
  onPress: updateDraggable,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {
    x: (x) => gsap.utils.snap(Math.round(x / slideWidth) * slideWidth),
  },
});

window.addEventListener('resize', resize);

prevButton.addEventListener('click', function () {
  animateSlides(1);
});

nextButton.addEventListener('click', function () {
  animateSlides(-1);
});

function updateDraggable() {
  timer.restart(true);
  slideAnimation.kill();
  this.update();
}

function animateSlides(direction) {
  timer.restart(true);
  slideAnimation.kill();

  var x = snapX(gsap.getProperty(proxy, 'x') + direction * slideWidth);

  slideAnimation = gsap.to(proxy, {
    duration: slideDuration,
    x: x,
    onUpdate: updateProgress,
  });
}

function autoPlay() {
  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
    timer.restart(true);
  } else {
    animateSlides(-1);
  }
}

function updateProgress() {
  animation.progress(
    gsap.utils.wrap(0, 1, gsap.getProperty(proxy, 'x') / wrapWidth)
  );
}

function resize() {
  var norm = gsap.getProperty(proxy, 'x') / wrapWidth || 0;

  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  gsap.set(proxy, {
    x: norm * wrapWidth,
  });

  animateSlides(0);
  slideAnimation.progress(1);
}

function snapX(x) {
  return Math.round(x / slideWidth) * slideWidth;
}

//////////////////////////////////////////////////////////////////
//unhide the CSS (so that it doesn't flicker before things are fully placed)
gsap.to(':root', {
  visibility: 'visible',
});

//every time the window resizes:
window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
  documentHeight = document.body.scrollHeight;
  windowSize = { width, height };
});
