var sketch_UI = function(p) {


    p.setup = function() {
        p.canvas = p.createCanvas(screenWidth * 0.20, screenHeight * 1);

        p.slider = p.createSlider(0, 40, total); // Create slider with default value
        p.slider.position(10, 40); // Position the slider

        // Add an event listener to the slider
        p.slider.input(p.sliderEvent);
    }

    p.draw = function() {
        p.background(0); // Set background to black
        // Display the current value of the slider
        p.text("Slider Value: " + total, 10, 50);
    }

    // Event handler for slider change
    p.sliderEvent = function() {
        // Update the total value when the slider changes
        total = p.slider.value();
        console.log("Slider value changed to: ", total);
        console.log("Total = ", total);

        // Recalculate the globe when the slider changes
        globe = new Array(total + 1).fill().map(() => []);
        let r = screenWidth * 0.25;
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
}
