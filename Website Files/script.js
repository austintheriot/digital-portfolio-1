gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;
const ground1 = document.querySelector('.ground1');
const homeSection = document.querySelector('#home');
const aboutSection = document.querySelector('#about');
const portfolioSection = document.querySelector('#portfolio');
const contactSection = document.querySelector('#contact');

window.addEventListener('resize', () => {
  width = document.documentElement.clientWidth || window.innerWidth;
  height = document.documentElement.clientHeight || window.innerHeight;
});

const WINDOW_BREAK_POINT_SIZE = 900;
SECTION_HEIGHT_PERCENT = Number(
  getComputedStyle(document.documentElement)
    .getPropertyValue('--section-height')
    .match(/[0-9]/g)
    .join('')
); //retrieve section height from CSS variable (__vh, multiply it times the vertical height)
const SECTION_HEIGHT_PIXELS = (SECTION_HEIGHT_PERCENT / 100) * height;
const PIN_DURATION = `${SECTION_HEIGHT_PERCENT * 5}%`;
const NAV_ORB_DURATION = `${SECTION_HEIGHT_PERCENT}%`;
const ANIMATION_SCROLL_DURATION = `${SECTION_HEIGHT_PERCENT * 0.75}%`;

// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
//Animate Nav highlight/info depending on location //////////////////////////////////////////
function triggerNavClass(trigger, prefix, className, duration) {
  ScrollTrigger.create({
    trigger: trigger,
    start: '=-1 top',
    end: `${duration} top`,
    onToggle: () =>
      document
        .querySelector(`${prefix}${trigger.id}`)
        .classList.toggle(className),
  });
}

function triggerNavContainer(prefix, className) {
  triggerNavClass(homeSection, prefix, className, SECTION_HEIGHT_PIXELS);
  triggerNavClass(aboutSection, prefix, className, SECTION_HEIGHT_PIXELS * 2);
  triggerNavClass(portfolioSection, prefix, className, SECTION_HEIGHT_PIXELS);
  triggerNavClass(contactSection, prefix, className, SECTION_HEIGHT_PIXELS);
}

//Light up navigation orbs when viewing that section//////////////////
triggerNavContainer('.nav__link-', 'nav__link--selected');

//Fade in nav info depending on scroll location (Mobile)//////////////
triggerNavContainer('.nav__info-', 'nav__info--selected');

//Change opacity of entire nav on hover (Desktop)////////////////
const nav = document.querySelector('nav');
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

/* //Animate general scrolling of the page
// --- can't get this to work. The browser just locks up instead every time

nav.addEventListener('click', (event) => {
  let target = event.target;
  if ([...target.classList].includes('nav__link')) {
    event.preventDefault();
    let link = target.getAttribute('href');
    gsap.to(window, {
      duration: 2,
      scrollTo: link,
    });
  }
}); */

//Pin City Container for the Entire Page
ScrollTrigger.create({
  trigger: '.city-container',
  start: 'top top',
  end: PIN_DURATION,
  pin: true,
  pinSpacing: false,
});

//Fade out Name, Title, and Scroll title
gsap.to('.home__name, .home__title, .nav__scroll-heading', {
  scrollTrigger: {
    triggerElement: '#home',
    start: '10 top',
    toggleActions: 'play play reverse reverse',
  },
  ease: 'power2.inOut',
  duration: 0.4,
  opacity: 0,
});

// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////
// Home ////////////////////////////////////////////////////////////////

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
      ease: 'power1.inOut',
      scale: 1,
    },
    '<'
  );

// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////
// About ////////////////////////////////////////////////////////////////

const about = gsap.timeline();

//Animate Bench & Buildings over ///////////////////////////////////

gsap
  .timeline({
    scrollTrigger: {
      trigger: '#about',
      start: '100 top', //trigger element & viewport
      end: `90% top`,
      toggleActions: 'play reverse play reverse',
    },
  })
  .to(
    '.tertiary-buildings',
    {
      ease: 'power1.inOut',
      duration: 0.4,
      xPercent: -50,
    },
    '<'
  )
  .to(
    '.primary-buildings',
    {
      ease: 'power1.inOut',
      duration: 0.4,
      xPercent: -100,
    },
    '<'
  )
  .to(
    '.bench',
    {
      ease: 'power1.inOut',
      duration: 0.4,
      left: '5%',
    },
    '<'
  );

//Animate Text Slides //////////////////////////////////////////////////
document.querySelectorAll('.about__info-section').forEach((el) => {
  const paragraph = el.dataset.paragraph;
  gsap.to(paragraph, {
    scrollTrigger: {
      trigger: el,
      start: '25% center', //trigger element & viewport
      end: 'bottom center',
      markers: true,
      toggleActions: 'play reverse play reverse',
      pin: true,
      pinSpacing: false,
    },
    duration: 0.2,
    opacity: 1,
  });
});

/*       pin: true,
      pinSpacing: false, */

// Skills ////////////////////////////////////////////////////////////////
// Skills ////////////////////////////////////////////////////////////////
// Skills ////////////////////////////////////////////////////////////////

const skills = gsap.timeline({
  scrollTrigger: {
    trigger: '#skills',
    start: 'top top', //trigger element & viewport
    end: () => SECTION_HEIGHT_PIXELS * 1.5,
    scrub: 0.5, //duration for scrub to catch up to scroll
  },
});

//Animate Bench & Buildings over ///////////////////////////////////
