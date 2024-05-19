var sketch_main = function(p){
    
    p.preload = function() {
        p.globeImg = p.loadImage('assets/images/high_res_earth.jpg');
        p.font     = p.loadFont('assets/fonts/Queensides.ttf');
    }
  
    p.setup = function() {
        screenWidth  = window.innerWidth;
        screenHeight = window.innerHeight;
        
        p.canvas = p.createCanvas(screenWidth, screenHeight, p.WEBGL);

        p.noFill();
        p.createGlobe();
        
        window.addEventListener('resize', () => {
            screenWidth  = window.innerWidth;
            screenHeight = window.innerHeight;
            p.resizeCanvas(screenWidth, screenHeight);
            p.createGlobe();
        });
    
    }
  
    p.draw = function() {
        p.orbitControl();

        p.background(backgroundColour);
        p.strokeWeight(strokeWeightValue);
        p.stroke(strokeValue);
        
        
        if (sphereColour != (0, 0, 0)) {
            p.fill(sphereColour); // Fill color white
        } else {
            p.noFill();
        }
        
        
        for (let i = 0; i < total; i++) {
            p.beginShape(p.TRIANGLE_STRIP);
            for (let j = 0; j < total + 1; j++) {
                const v1 = globe[i][j];
                p.vertex(v1.x, v1.y, v1.z);
                const v2 = globe[i + 1][j];
                p.vertex(v2.x, v2.y, v2.z);
            }
            p.endShape();
        }

     
    }


    p.createGlobe = function() {
        globe = new Array(total + 1).fill().map(() => []); 
        r = screenWidth * 0.20;
        for (let i = 0; i <= total; i++) {
            const lat = p.map(i, 0, total, 0, p.PI);

            for (let j = 0; j <= total; j++) {
                const lon = p.map(j, 0, total, 0, p.TWO_PI);

                const x = r * p.sin(lat) * p.cos(lon);
                const y = r * p.sin(lat) * p.sin(lon);
                const z = r * p.cos(lat);
                globe[i][j] = p.createVector(x, y, z);
            }
        }
    }

    window.addEventListener('resize', () => {
        function settings(){
            const uiContainer    = document.getElementById('ui-container');
            const globeContainer = document.getElementById('globe-container');
        
            
            if (uiContainer.style.display === 'none' || uiContainer.style.display === '') {
                const canvas = document.querySelector('canvas');
                canvas.style.width = window.innerWidth  + 'px';
                globeContainer.style.right = '0';
            
        
                } else {
                const canvas = document.querySelector('canvas');
                const newWidth = window.innerWidth * 0.7;
                canvas.style.width = newWidth + 'px';
        
                globeContainer.style.right = (window.innerWidth * 0.3) + 'px';
                }
        };
        
    });

    
}