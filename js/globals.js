// Connections for TRIANGLE_STRIP
let total = 20;

// contains the (x, y, z) coord for sphere
let globe = new Array(total + 1).fill().map(() => []); 

//radius
let r = 0.25; //radius

/*p.stroke(gray): Sets the stroke color using a grayscale value, 
where gray is a number between 0 and 255. 0 represents black, 
255 represents white, and values in between represent shades of gray.

p.stroke(r, g, b): Sets the stroke color using an RGB color, 
where r, g, and b are numbers between 0 and 255 representing t
he red, green, and blue components of the color, respectively.
*/
let strokeValue = 100;
let strokeWeightValue = 1;

screenWidth  = window.innerWidth;
screenHeight = window.innerHeight;


