var sketch_main = function(p){
  
    preload = function() {
        globeImg = loadImage('assets/images/high_res_earth.jpg');
        font     = loadFont('assets/fonts/Queensides.ttf');
    }
  
    setup = function() {
        screenWidth  = window.innerWidth;
        screenHeight = window.innerHeight;
        noFill();
        canvas = createCanvas(screenWidth, screenHeight, WEBGL);


        createGlobe();
        
        window.addEventListener('resize', () => {
            screenWidth  = window.innerWidth;
            screenHeight = window.innerHeight;
            resizeCanvas(screenWidth, screenHeight);
            createGlobe();
        });
    
    }
  
    draw = function() {
        background(51);
        orbitControl();
        strokeWeight(strokeWeightValue);
        stroke(strokeValue);
        noFill();
        
        for (let i = 0; i < total; i++) {
            beginShape(TRIANGLE_STRIP);
            for (let j = 0; j < total + 1; j++) {
            const v1 = globe[i][j];
            vertex(v1.x, v1.y, v1.z);
            const v2 = globe[i + 1][j];
            vertex(v2.x, v2.y, v2.z);
            }
            endShape();
        }
    }
}
  
  