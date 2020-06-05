gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
let documentHeight = document.body.scrollHeight;
let homeSectionHeight = document.querySelector('#home').offsetHeight;
let aboutSectionHeight = document.querySelector('#about').offsetHeight;
const WINDOW_BREAK_POINT_SIZE = 900;

//on desktop, have tree/bench coincide with about me
if (width > WINDOW_BREAK_POINT_SIZE) {
  pinContainer = ScrollTrigger.create({
    trigger: '.city-container',
    start: 'top top',
    end: `${homeSectionHeight} top`,
    pin: true,
    pinSpacing: true,
    markers: true,
  });
}
//on mobile, separate the tree/bench from about me
else {
  pinContainer = ScrollTrigger.create({
    trigger: '.city-container',
    start: 'top top',
    end: `${homeSectionHeight} bottom`,
    pin: true,
    pinSpacing: true,
    markers: true,
  });
}

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

//on desktop move tree over & fade out welcome
if (width > WINDOW_BREAK_POINT_SIZE) {
  home
    .to('.bench', {
      x: -0.4,
      modifiers: {
        x: gsap.utils.unitize((x) => x * width, 'px'),
      },
    })
    .to(
      '.welcome',
      {
        opacity: 0,
      },
      '<'
    );
}

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
  //fade in
  .to('.about__info--4', {
    duration: 0,
    zIndex: 200,
  })
  .to('.about__info--4', {
    opacity: 1,
  })
  .to('.about__info--4', {
    duration: 6,
    opacity: 1,
  })
  .to('.about__info--4', {
    opacity: 0,
  })
  .to('.about__info--4', {
    duration: 2,
    opacity: 0,
  })
  .to('.about__info--4', {
    duration: 0,
    zIndex: 0,
  });

//PORTFOLIO///////////////////////////////////////////////////////////
const boxes = [...document.querySelectorAll('.box')];
const numberOfBoxes = boxes.length;
const boxWidths = boxes.map((el) => (el = el.offsetWidth));
const totalWidth = boxWidths.reduce((a, b) => a + b);
//get array of cumulative box widths for placement purposes
let sum = 0;
const cumulativeWidths = [0];
for (let i = 0; i < boxWidths.length; i++) {
  sum += boxWidths[i];
  cumulativeWidths[i + 1] = sum;
}
const largestBoxWidth = Math.max(...boxWidths);
//place boxes in the container
gsap.set('.box', {
  x: (index) => cumulativeWidths[index],
});

const slider = document.querySelector('.animation-slider');

//animate boxes to the left
const carousel = gsap.to('.box', {
  duration: numberOfBoxes * 2,
  ease: 'none',
  x: `-=${totalWidth}`, //move each box the necessasry amount to the right
  modifiers: {
    //allows forward or backward carousel movement
    x: gsap.utils.unitize((x) => {
      let adjustedModulo = x % totalWidth;
      if (adjustedModulo < 0) {
        adjustedModulo += totalWidth;
      }
      return adjustedModulo - largestBoxWidth;
    }),
  },
  repeat: -1,
});

//progress or reverse carousel animation based on mouse's movement
//carousel coordinates
//update mouse coordinates when the mouse moves
const outerContainer = document.querySelector('.outer-container');
let outerContainerLeft = outerContainer.getBoundingClientRect().left;
let outerContainerTop = outerContainer.getBoundingClientRect().top;
let outerContainerWidth = outerContainer.getBoundingClientRect().width;
let outerContainerHeight = outerContainer.getBoundingClientRect().height;

let reverseCarousel;
let stopCarousel;
let progressCarousel;
//calculate mouse's position on the outer container div
window.addEventListener('mousemove', (e) => {
  mouseInDiv = {
    x: e.x - outerContainerLeft,
    xPercent: (e.x - outerContainerLeft) / outerContainerWidth,
  };
  if (mouseOnContainer && mouseInDiv.xPercent < 0.25) {
    reverseCarousel = gsap.to(carousel, {
      duration: 0.4,
      ease: 'power1',
      timeScale: -5,
    });
  } else if (mouseOnContainer && mouseInDiv.xPercent > 0.75) {
    stopCarousel = gsap.to(carousel, {
      duration: 0.4,
      ease: 'power1',
      timeScale: 5,
    });
  } else if (mouseEnteredContainer) {
    progressCarousel = gsap.to(carousel, {
      duration: 0.4,
      ease: 'power1',
      timeScale: 0,
    });
  }
});

let mouseOnContainer = false;
let mouseEnteredContainer = false;
let infiniteCarouselChecker;
//pause carousel on mouse hover or scroll
outerContainer.addEventListener('mouseover', () => {
  mouseOnContainer = true;
  mouseEnteredContainer = true;
  infiniteCarouselChecker = setInterval(() => {
    if (carousel.progress() === 0) {
      carousel.progress(1);
    }
  }, 30);
});

outerContainer.addEventListener('mouseout', () => {
  mouseOnContainer = false;
  clearInterval(infiniteCarouselChecker);
});

document.querySelector('.box-container').addEventListener('scroll', () => {
  gsap.to(carousel, {
    duration: 0.4,
    ease: 'power1',
    timeScale: 0,
  });
});

//////////////////////////////////////////////////////////////////
//unhide the CSS (so that it doesn't flicker before things are fully placed)
gsap.to(':root', {
  visibility: 'visible',
});

//every time the window resizes on mobile:
window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
  documentHeight = document.body.scrollHeight;
  windowSize = { width, height };

  outerContainerLeft = outerContainer.getBoundingClientRect().left;
  outerContainerTop = outerContainer.getBoundingClientRect().top;
  outerContainerWidth = outerContainer.getBoundingClientRect().width;
  outerContainerHeight = outerContainer.getBoundingClientRect().height;
});
