/*
Created on: 6/5/17
Revised on: 6/29/17
Name: animations.js
By: Jesus Rodriguez
Description: A script that triggers animations.
*/

/* This jQuery file can take the following data attribues from html code: data-percent and data-id. The data-percent attribute determines the percentage of where the circle that is being drawn will stop it's animation. In order to iterate through all elements at once the data-id is passed in throught the each function of jQuery and is then referenced as the element's id. This was done in order to iterate through all canvas elements at once without explicitly stating the name of a single id. The canvas elements must have a class of '.canvas' in order for this to work.
*/
$(function () {
    // Function that checks if a particular object has a particular class
    function objectExists(object, objectClass) {
       if(object.hasClass(objectClass)) {
            return true;
       }
       return false; // For all other cases return false
    }
    // Varaibles that hold whether an animation has been played
    var circleAnimationHasPlayed = false,
        lineAnimationHasPlayed = false;

   // The objectExists function was made so either animation could be played without the other having to exist.
   if (objectExists($('canvas'), 'canvas')) {
       // If the animation has not played, do the following
       if (!circleAnimationHasPlayed) {
           /* The varaible is declared true after the animation has begun. */
           circleAnimationHasPlayed = true;
           // Will iterate through each class of canvas
           $('.canvas').each(function () {
               // If the object is in view than do the following
               var $this = $(this), /* This refers to the object, however 'this' cannot be used to obtain information from the object relatable to the canvas element, because of the way that jQuery works */
                   id_name = $this.data("id"), // In order to iterate across all elements at once, an individual id tag is not referenced, instead a data element is used to obtain that information
                   canvas = document.getElementById(id_name), // Get the according element by the id name that was obtained in the data-id in the html
                   paintbrush = canvas.getContext("2d"), // Obtain the canvas information
                   amount_loaded = 0, // The amount of percentage that has been loaded into the canvas
                   percentage = $this.data("percent"), // 'this' is used to obtain data information regarding the data-percente the user has coded in the html document.
                   start_point = 4.72, // The point in which the animation will begin playing
                   canvas_width = canvas.width, // Gets the canvas width
                   canvas_height = canvas.height, // Gets the canvas height
                   difference; // Difference will be used later to compare against the amount loaded.

               function progress() {
                   difference = ((amount_loaded / 100) * Math.PI * 2 * 10).toFixed(2); // Math, you tell me what this does, no clue
                   paintbrush.clearRect(0, 0, canvas_width, canvas_height); // To avoid odd animations
                   paintbrush.lineWidth = 8; // The width of the line that will be drawn
                   paintbrush.lineCap = 'round'; // Round off that line
                   paintbrush.fillStyle = "#222"; // Color for the text in the middle
                   paintbrush.strokeStyle = "#00dcc6"; // Color for the actual circle being drawn
                   paintbrush.textAlign = "center"; // Aligning the text within the canvas
                   paintbrush.font = "24px Roboto"; // A font size and font style must be present for proper styling
                   paintbrush.fillText(amount_loaded + "%", canvas_width / 2, canvas_height / 1.8); // Dynamic text that is positioned center within the canvas
                   paintbrush.beginPath(); // The path that will be drawn
                   paintbrush.arc(canvas_width / 2, canvas_height / 2, canvas_height / 2.1, start_point, difference / 10 + start_point, false); // The starting point and arc of the drawing
                   paintbrush.stroke(); // Begin drawing

                   // If the amount loaded is less than the percentage user defined varibale from the html document, then the amount loaded will increase until it is.
                   if (amount_loaded < percentage) {
                       amount_loaded++;
                   }
                   else {
                       clearTimeout(progressEvent);
                       // Other functions can be triggered after the animation stops in this case nothing else is necessary. Custom functions can go here.
                   }
               }
               /* The progress event is an interval that will make the percent animation and circle drawing
               play smoothly. It is important to note that the lower the number, the faster
               the animation will play. */
               var progressEvent = setInterval(progress, 30);
           });
       }
   }
   // Animation for the width of the skills
   if(objectExists($('div'), 'skill-unit')) {
       if(!lineAnimationHasPlayed) {
           // The varaible is declared true after the animation has begun. */
           lineAnimationHasPlayed = true;

           /* Select all skill-amount objects and increase by the skill amount target attribute
           specified in the html document */
           $('.skill-amount').each(function () {
               // Data target attribute in html document called 'data-skill'
               var skillAmount = $(this).data("skill");

               // jQuery animate function
               $(this).animate({
                   width: skillAmount + "%"
               }, 1000);
           });
       }
 }
});
