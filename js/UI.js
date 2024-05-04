var sketch_UI = function(p) {
    p.setup = function() {
        p.canvas = p.createCanvas(screenWidth * 0.2, screenHeight * 1);

        p.connectionSlider = p.createSlider(0, 40, total);
        p.connectionSlider.position(15, 40); 
        p.connectionSlider.input(p.connectionSliderEvent); 
        p.connectionSlider.addClass('slider');
    }

    p.draw = function() {
        p.background(0); // Set background to black
        p.fill(255); // Set text color to white
        p.text("Connections :  " + total, 20, 35);
    }

    p.connectionSliderEvent = function() {
        total = p.connectionSlider.value();
        p.createGlobe(); // Call createGlobe from global.js
    }

    // This function needs to be defined globally in order to be accessible by both sketches
    p.createGlobe = function() {
        globe = new Array(total + 1).fill().map(() => []); 
        let r = screenWidth * 0.20;
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

    // On window resizing we adjust canvas size to ensure proportional reshaping
    function adjustCanvasSize() {
        let uiContainerWidth = document.getElementById('ui-container').offsetWidth;
        p.resizeCanvas(uiContainerWidth, p.height);
    }
    window.addEventListener('resize', adjustCanvasSize);
}
