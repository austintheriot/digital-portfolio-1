//My portfolio Code




const boxContainer = document.querySelector('.box-container');
const boxes = [...document.querySelectorAll('.box')];
const numberOfBoxes = boxes.length;
const boxWidths = boxes.map((el) => (el = el.offsetWidth));
const totalWidth = boxWidths.reduce((a, b) => a + b);
let boxContainerHeight = boxContainer.offsetHeight;

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
  //align boxes on the bottom of the container
  y: (i, target) => target.offsetHeight,
  modifiers: {
    y: gsap.utils.unitize((y) => boxContainerHeight - y),
  },
});

//animate boxes to the left
const carousel = gsap.to('.box', {
  duration: numberOfBoxes * 5,
  ease: 'none',
  x: `-=${totalWidth}`, //move each box the necessasry amount to the right
  modifiers: {
    //allows forward or backward carousel movement
    x: gsap.utils.unitize((x) => {
      let adjustedModulo = x % totalWidth;
      if (adjustedModulo < 0) {
        adjustedModulo += totalWidth;
      }
      return adjustedModulo - largestBoxWidth; //offset to prevent any items jumping in/out of view
    }),
  },
  repeat: -1,
});

//make it so that 0 --> 1 is 'stretched out' more intensely (less activity in the middle)

//progress or reverse carousel animation based on mouse's movement
//carousel coordinates
//update mouse coordinates when the mouse moves
const outerContainer = document.querySelector('.outer-container');
let outerContainerLeft = outerContainer.getBoundingClientRect().left;
let outerContainerTop = outerContainer.getBoundingClientRect().top;
let outerContainerWidth = outerContainer.getBoundingClientRect().width;
let outerContainerHeight = outerContainer.getBoundingClientRect().height;

let mouseInDiv = {
  x: 0,
  xPercent: 0,
};

let carouselTimescale = gsap.fromTo(
  carousel,
  {
    ease: 'none',
    timeScale: -50,
    paused: true,
  },
  {
    ease: 'none',
    timeScale: 50,
    paused: true,
  }
);
carouselTimescale.progress(0.52);

function centrifyValues(value, power) {
  let decreased = value - 0.5;
  let multiplied =
    decreased < 0 && power % 2 === 0
      ? -(decreased ** power)
      : decreased ** power;
  let adjusted = (multiplied + 0.5 ** power) * 2 ** (power - 1);
  return adjusted;
}

let carouselMovement;
//calculate mouse's position on the outer container div
window.addEventListener('mousemove', (e) => {
  mouseInDiv.x = e.x - outerContainerLeft;
  mouseInDiv.xPercent = (e.x - outerContainerLeft) / outerContainerWidth;
  carouselMovement = mouseOnContainer
    ? centrifyValues(mouseInDiv.xPercent, 10)
    : 0.52;
  carouselTimescale.progress(carouselMovement);
});

let mouseOnContainer = false;
let infiniteCarouselChecker;
//pause carousel on mouse hover or scroll
outerContainer.addEventListener('mouseover', () => {
  mouseOnContainer = true;
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
window.addEventListener('mouseout', () => {
  mouseOnContainer = false;
  clearInterval(infiniteCarouselChecker);
});

//when scrolling on mobile, pause the carousel
if (width < WINDOW_BREAK_POINT_SIZE) {
  boxContainer.addEventListener('scroll', () => {
    gsap.to(carousel, {
      duration: 0.4,
      ease: 'power1',
      timeScale: 0,
    });
  });
}

//on mobile, dynamically add more content when scrolling
///////////////////ISSUE AREA//////////////////////////////////
///////////////////ISSUE AREA//////////////////////////////////
///////////////////ISSUE AREA//////////////////////////////////
///////////////////ISSUE AREA//////////////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      scroller: '.box-container',
      trigger: '.box.container',
      start: '10% left',
      end: '90%',
      horizontal: true,
      scrub: true,
      onLeaveBack: () => {
          gsap.to('.box', {
            duration: numberOfBoxes * 5,
            ease: 'none',
            x: `-=${totalWidth}`, //move each box the necessasry amount to the right
            modifiers: {
              //allows forward or backward carousel movement
              x: gsap.utils.unitize((x) => {
                let adjustedModulo = x % totalWidth;
                if (adjustedModulo < 0) {
                  adjustedModulo += totalWidth;
                }
                return adjustedModulo - largestBoxWidth; //offset to prevent any items jumping in/out of view
              }),
            },
          }),
      },
    },
    onComplete: () => {
      gsap.to(.box, {
        timeScale: '+=25',
      });
    },
  })
  .to('.box-container', {
    backgroundColor: 'red',
  });
///////////////////ISSUE AREA//////////////////////////////////
///////////////////ISSUE AREA//////////////////////////////////
///////////////////ISSUE AREA//////////////////////////////////
///////////////////ISSUE AREA//////////////////////////////////

boxContainerHeight = boxContainer.offsetHeight;
  outerContainerLeft = outerContainer.getBoundingClientRect().left;
  outerContainerTop = outerContainer.getBoundingClientRect().top;
  outerContainerWidth = outerContainer.getBoundingClientRect().width;
  outerContainerHeight = outerContainer.getBoundingClientRect().height;
  //reset box heights in their container to bottom align
  gsap.set('.box', {
    y: (i, target) => target.offsetHeight,
    modifiers: {
      y: gsap.utils.unitize((y) => boxContainerHeight - y),
    },
  });

/////////////////////////////////////////////////////////
#portfolio {
  position: relative;
  height: calc(var(--full-height, 100vh) * 2);
  width: 100vw;
}
/* Allows for scrolling on mobile */
.outer-container {
  position: relative;
  overflow: hidden;
  display: block;
  /* Height and width slightly smaller than box-container */
  height: 95vh;
  width: 100vw;
  margin: 0 auto;
  background-color: var(--dark-lavender);
}

.box-container {
  position: relative;
  overflow: scroll;
  display: block;
  height: 100vh;
  width: 125vw;
  background-color: var(--light-lavender);
}

@media (min-width: 900px) {
  /* Prevent mouse scrolling on dekstop */
  .box-container {
    overflow: hidden;
  }

  /* Change cursor on edges for desktop mouse */
  .box-container::before,
  .box-container::after {
    content: '';
    position: absolute;
    z-index: 100;
    height: 105%;
    width: 10%;
    cursor: w-resize;
  }

  .box-container::after {
    left: 87vw;
  }
}

.box {
  position: absolute;
  background-color: lightblue;
  width: 100px;
  height: 50vh;
  border-bottom: 2px solid black;
  overflow: hidden;
}

.box:nth-child(odd) {
  width: 150px;
  height: 60vh;
}

.box:nth-child(4) {
  width: 10px;
  background-color: purple;
  height: 40vh;
}

.box:nth-child(7) {
  width: 400px;
  background-color: yellow;
  height: 70vh;
}

.box:nth-child(9) {
  width: 111px;
  background-color: green;
}

.box p,
.box h1 {
  color: var(--dark-color);
  position: static;
}
