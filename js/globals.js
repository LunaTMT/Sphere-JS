// Connections for TRIANGLE_STRIP
let total = 20;

// contains the (x, y, z) coord for sphere
let globe;

//radius
let r = 0.25; //radius

let strokeValue = 100; // it must be [0, 0, 0]
let strokeWeightValue = 1;

let backgroundColour = 51;
let sphereColour = 0;

let screenWidth  = window.innerWidth;
let screenHeight = window.innerHeight;





function settings(){
    const uiContainer    = document.getElementById('ui-container');
    const globeContainer = document.getElementById('globe-container');



    if (uiContainer.style.display === 'none' || uiContainer.style.display === '') {
        uiContainer.style.display = 'block';

        const canvas = document.querySelector('canvas');
        const newWidth = window.innerWidth * 0.7;
        canvas.style.width = newWidth + 'px';

        globeContainer.style.left = (window.innerWidth * 0.3) + 'px';
        globeContainer.style.right = '0px';
    

    } else {
        uiContainer.style.display = 'none';

        const canvas = document.querySelector('canvas');
        canvas.style.width = window.innerWidth  + 'px';
        globeContainer.style.left = '0';
    }
};

