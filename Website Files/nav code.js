const homeSection = document.querySelector('#home');
let homeSectionHeight = homeSection.offsetHeight;
const aboutSection = document.querySelector('#about');
let aboutSectionHeight = aboutSection.offsetHeight;
const portfolioSection = document.querySelector('#portfolio');
let portfolioSectionHeight = portfolioSection.offsetHeight;
const contactSection = document.querySelector('#contact');
let contactSectionHeight = contactSection.offsetHeight;

{
  //recalculate sizes
  homeSectionHeight = homeSection.offsetHeight;
  aboutSectionHeight = aboutSection.offsetHeight;
  portfolioSectionHeight = portfolioSection.offsetHeight;
  contactSectionHeight = contactSection.offsetHeight;
  totalHeight =
    homeSectionHeight +
    aboutSectionHeight +
    portfolioSectionHeight +
    contactSectionHeight;
}

//Animate Nav highlight/info depending on location //////////////////////////////////////////
function triggerNavClass(trigger, prefix, className) {
  return ScrollTrigger.create({
    trigger: trigger,
    start: '-1 top',
    end: `99.9% top`, //prevents overlap
    markers: true,
    onToggle: () =>
      document
        .querySelector(`${prefix}${trigger.id}`)
        .classList.toggle(className),
  });
}

let orbActivationHome;
let orbActivationAbout;
let orbActivationPortfolio;
let orbActivationContact;
let infoActivationHome;
let infoActivationAbout;
let infoActivationPortfolio;
let infoActivationContact;

//Light up navigation orbs when viewing that section//////////////////
function setUpResponsiveNav() {
  if (
    orbActivationHome &&
    orbActivationAbout &&
    orbActivationPortfolio &&
    orbActivationContact
  ) {
    orbActivationHome.kill();
    orbActivationAbout.kill();
    orbActivationPortfolio.kill();
    orbActivationContact.kill();
  }
  orbActivationHome = triggerNavClass(
    homeSection,
    '.nav__link-',
    'nav__link--selected'
  );
  orbActivationAbout = triggerNavClass(
    aboutSection,
    '.nav__link-',
    'nav__link--selected'
  );
  orbActivationPortfolio = triggerNavClass(
    portfolioSection,
    '.nav__link-',
    'nav__link--selected'
  );
  orbActivationContact = triggerNavClass(
    contactSection,
    '.nav__link-',
    'nav__link--selected'
  );

  if (
    infoActivationHome &&
    infoActivationAbout &&
    infoActivationPortfolio &&
    infoActivationContact
  ) {
    infoActivationHome.kill();
    infoActivationAbout.kill();
    infoActivationPortfolio.kill();
    infoActivationContact.kill();
  }

  //Fade in nav info depending on scroll location///////////////////////
  infoActivationHome = triggerNavClass(
    homeSection,
    '.nav__info-',
    'nav__info--selected'
  );
  infoActivationAbout = triggerNavClass(
    aboutSection,
    '.nav__info-',
    'nav__info--selected'
  );
  infoActivationPortfolio = triggerNavClass(
    portfolioSection,
    '.nav__info-',
    'nav__info--selected'
  );
  infoActivationContact = triggerNavClass(
    contactSection,
    '.nav__info-',
    'nav__info--selected'
  );
}

setUpResponsiveNav();

// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
// Nav ////////////////////////////////////////////////////////////////
gsap.set('.nav__link, .nav__vertical-line, .nav__scroll-heading, .nav__info', {
  xPercent: -50,
  yPercent: -50,
});

gsap.set('.nav__scroll-heading, .nav__info', {
  rotate: 90,
});

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
      });

      //trigger functions for mouseout of nav
      nav.addEventListener('mouseout', (event) => {
        gsap.to(nav, {
          ease: 'power',
          duration: 0.4,
          opacity: 0.5,
        });
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
  }
}
