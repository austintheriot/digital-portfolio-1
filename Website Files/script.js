gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

//unhide the CSS (so that it doesn't fliker before it's ready to be showbn)
gsap.to(':root', {
  opacity: 1,
});

let width = document.documentElement.clientWidth || window.innerWidth;
let height = document.documentElement.clientHeight || window.innerHeight;

const ground1 = document.querySelector('.ground1');
const homeSection = document.querySelector('#home');
const homeSectionHeight = homeSection.offsetHeight;
const aboutSection = document.querySelector('#about');
const skillsSection = document.querySelector('#skills');
const skillsSectionHeight = skillsSection.offsetHeight;
const aboutSectionHeight = aboutSection.offsetHeight + skillsSectionHeight;
const portfolioSection = document.querySelector('#portfolio');
const portfolioSectionHeight = portfolioSection.offsetHeight;
const contactSection = document.querySelector('#contact');
const contactSectionHeight = contactSection.offsetHeight;
const totalHeight =
  homeSectionHeight +
  aboutSectionHeight +
  portfolioSectionHeight +
  contactSectionHeight;

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

// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////

//Animate Nav highlight/info depending on location //////////////////////////////////////////
function triggerNavClass(trigger, prefix, className, duration) {
  ScrollTrigger.create({
    trigger: trigger,
    start: '-1 top',
    end: `${duration * 0.999} top`, //prevents overlap
    onToggle: () =>
      document
        .querySelector(`${prefix}${trigger.id}`)
        .classList.toggle(className),
  });
}

function triggerNavContainer(prefix, className) {
  triggerNavClass(homeSection, prefix, className, homeSectionHeight);
  triggerNavClass(aboutSection, prefix, className, aboutSectionHeight);
  triggerNavClass(portfolioSection, prefix, className, portfolioSectionHeight);
  triggerNavClass(contactSection, prefix, className, contactSectionHeight);
}

//Light up navigation orbs when viewing that section//////////////////
triggerNavContainer('.nav__link-', 'nav__link--selected');

//Desktop/Mobile Formatting
function desktopFormatting() {
  if (width > WINDOW_BREAK_POINT_SIZE) {
    navHoverEffects(true);
  } else {
    navHoverEffects(false);
  }
}
desktopFormatting();

//Change opacity of entire nav on hover (Desktop)////////////////
function navHoverEffects(condition) {
  const nav = document.querySelector('nav');
  if (condition) {
    gsap.to(nav, {
      duration: 1,
      opacity: 0.75,
    });

    if (![...nav.classList].includes('desktop')) {
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
      nav.classList.add('desktop');
    }
  } else {
    nav.removeEventListener('mouseover', null);
    nav.removeEventListener('mouseout', null);
    gsap.to(nav, {
      duration: 1,
      opacity: 1,
    });
    //Fade in nav info depending on scroll location (Mobile)//////////////
    triggerNavContainer('.nav__info-', 'nav__info--selected');
  }
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

//Hire me button animations
const hireMeButton = document.querySelector('.hire-me-button');
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
    gsap.to(hireMeButton, {
      duration: 0.2,
      ease: 'none',
      scale: 1.1,
      boxShadow: '0 0 15px 15px transparent',
    });
    gsap.to('.building-lights', {
      ease: 'power4.out',
      duration: 1,
      opacity: 1,
    });
  });
  hireMeButton.addEventListener('mouseout', () => {
    gsap.to(hireMeButton, {
      duration: 0.2,
      ease: 'none',
      scale: 1,
      boxShadow: '0 0 15px 15px rgba(255, 251, 45, 0.1);',
    });
    gsap.to('.building-lights', {
      ease: 'none',
      duration: 1,
      opacity: 0,
    });
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
  end: totalHeight,
  pin: true,
  pinSpacing: false,
});

//Fade out Name, Title, Scroll title, and "Hire Me" button
gsap
  .timeline({
    scrollTrigger: {
      triggerElement: '#home',
      start: '50 top',
      toggleActions: 'play play reverse reverse',
    },
  })
  .to('.home__name, .home__title, .nav__scroll-heading, .hire-me-button', {
    ease: 'power2.inOut',
    duration: 0.2,
    opacity: 0,
  })
  .to('.home__name, .home__title, .nav__scroll-heading, .hire-me-button', {
    duration: 0.2,
    x: -width,
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
    scaleY: 0.1,
    scaleX: 1.5,
  },
  '<'
);
//Set Bench,
gsap.set('.bench', {
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

//Animate Bench & Buildings over ///////////////////////////////////

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.about__info-section--filler',
      start: 'top top', //trigger element & viewport
      end: `100% top`,
      scrub: 0.5,
      toggleActions: 'play reverse play reverse',
    },
  })
  .to(
    '.tertiary-buildings',
    {
      ease: 'power1.inOut',
      xPercent: -50,
    },
    '<'
  )
  .to(
    '.primary-buildings',
    {
      ease: 'power1.inOut',
      xPercent: -100,
    },
    '<'
  )
  .to(
    '.bench',
    {
      ease: 'power1.inOut',
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
      toggleActions: 'play reverse play reverse',
      markers: true,
      pin: true,
      pinSpacing: false,
    },
    duration: 0.2,
    opacity: 1,
  });
});

//move things back
gsap
  .timeline({
    scrollTrigger: {
      trigger: '#about',
      start: '90% center', //trigger element & viewport
      end: '100% center',
      toggleActions: 'play reverse play reverse',
      scrub: 0.5,
    },
  })
  .to(
    '.tertiary-buildings',
    {
      ease: 'power1.inOut',
      xPercent: 50,
    },
    '<'
  )
  .to(
    '.primary-buildings',
    {
      ease: 'power1.inOut',
      xPercent: 50,
    },
    '<'
  )
  .to(
    '.bench',
    {
      ease: 'power1.inOut',
      left: '50%',
    },
    '<'
  );

// Skills ////////////////////////////////////////////////////////////////
// Skills ////////////////////////////////////////////////////////////////
// Skills ////////////////////////////////////////////////////////////////

const skills = gsap.timeline({
  scrollTrigger: {
    trigger: '#skills',
    start: 'top top', //trigger element & viewport
    end: () => skillsSectionHeight * 0.75,
    scrub: 0.5, //duration for scrub to catch up to scroll
  },
});

//Animate Bench & Buildings over ///////////////////////////////////
