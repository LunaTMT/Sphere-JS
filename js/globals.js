// Connections for TRIANGLE_STRIP
let total = 20;

// contains the (x, y, z) coord for sphere
let globe;

//radius
let r = 0.25; //radius

/*stroke(gray): Sets the stroke color using a grayscale value, 
where gray is a number between 0 and 255. 0 represents black, 
255 represents white, and values in between represent shades of gray.

stroke(r, g, b): Sets the stroke color using an RGB color, 
where r, g, and b are numbers between 0 and 255 representing t
he red, green, and blue components of the color, respectively.
*/
let strokeValue = 100;
let strokeWeightValue = 1;

screenWidth  = window.innerWidth;
screenHeight = window.innerHeight;


function createGlobe() {
    globe = new Array(total + 1).fill().map(() => []); 
    r = screenWidth * 0.20;
    for (let i = 0; i <= total; i++) {
        const lat = map(i, 0, total, 0, PI);

        for (let j = 0; j <= total; j++) {
        const lon = map(j, 0, total, 0, TWO_PI);

        const x = r * sin(lat) * cos(lon);
        const y = r * sin(lat) * sin(lon);
        const z = r * cos(lat);
        globe[i][j] = createVector(x, y, z);
        }
    }
}