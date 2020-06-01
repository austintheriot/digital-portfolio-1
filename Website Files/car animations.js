// ANIMATE CARS //////////////////////////////////////////////////////
//Place Cars//////////////////////
// gsap.set('.car', {
//   yPercent: -50,
//   scale: 0.1,
// });

// //Animate Cars//////////////////////
// function animateCar(selector, delay = 0, speed = 1) {
//   //Animate car movement

//   // The General Logic:

//   // On the 'home' screen, the cars animate to move right to left
//   // across the screen on their own.
//   // When the user scrolls, this animation is paused.
//   // A new animation and scene is built that enables the cars to be scaled and moved based on scroll position.
//   // Once the user scrolls back up to the top, the new scene and animation are destroyed, and the default animation resumes.

//   //Move car from 100% right to -100% left (to prevent accidental peeking on small screen sizes)
//   const carTimelineMoving = gsap.timeline({
//     repeat: -1, //restarts indefinitely
//   });
//   carTimelineMoving.to(selector, {
//     ease: 'none',
//     duration: width / 50 / speed,
//     left: '-100%',
//     delay: delay,
//   });

//   //Pause car movement, create a new scene to move car left or right depending on position
//   //Added to home section--basically pauses as soon as any scrolling takes place
//   home.to(
//     selector,
//     {
//       onStart: () => {
//         carTimelineMoving.pause();
//         let carPosition = document
//           .querySelector(selector)
//           .getBoundingClientRect().left;
//         moveCarWithScroll(carPosition);
//       },
//     },
//     '<'
//   );

//   //Move Car based on scroll position
//   //callback function--allows car to move left or righr depending on current position
//   let scrollingCarScene;
//   let scrollingCarTimeline;
//   function moveCarWithScroll(carPosition) {
//     scrollingCarTimeline = gsap.timeline();

//     scrollingCarTimeline.to(selector, {
//       x: carPosition < width / 2 ? -width * 2.2 : width * 2.2,
//       ease: 'none',
//       scale: 1,
//     });
//     scrollingCarScene = new ScrollMagic.Scene({
//       triggerElement: '.home',
//       duration: ANIMATION_SCROLL_DURATION,
//       triggerHook: 'onEnter',
//     })
//       .setTween(scrollingCarTimeline)
//       .addTo(controller);
//   }

//   //Resume Car Movement
//   //Destroy scrolling scene, destroy timeline, and begin car movement again
//   //When the user scrolls up to the top (literally past "10 pixels below the top")
//   new ScrollMagic.Scene({
//     triggerElement: '.home',
//     offset: 10,
//   })
//     .addTo(controller)
//     .on('leave', () => {
//       scrollingCarScene.destroy();
//       carTimelineMoving.resume();
//     });
// }
// //Car animation logic is executed on specified cars at specified delays
// //selector, delay, speed
// animateCar('.car1', 0, 1);
// animateCar('.car2', 7, 1.3);
// animateCar('.car3', 11, 0.6);
// animateCar('.car4', 15, 1.75);
