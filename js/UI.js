var sketch_UI = function(p) {
 
    let colorPicker = document.getElementById('color-picker');

    p.setup = function() {
        p.canvas = p.createCanvas(screenWidth * 0.2, screenHeight * 1);

        let sliderWidth = 0.8 * p.canvas.width;
       
        p.connectionSlider = p.createSlider(0, 40, total);
        p.connectionSlider.position(15, 40); 
        p.connectionSlider.style('width', sliderWidth + 'px');
        p.connectionSlider.input(p.connectionSliderEvent); 

 
    }

    p.draw = function() {
        p.background(0); // Set background to black
        p.fill(255); // Set text color to white
        // Display the labels for the sliders
        p.text("Connections :  " + total, 20, 35);
        p.text("Line Colour :  " + colorPicker.value, 20, 75);

    }

    // Event handler for the first slider change
    p.connectionSliderEvent = function() {
        // Update the total value when the first slider changes
        total = p.connectionSlider.value();
        createGlobe(); // Call createGlobe() or any other function as needed
    }

    // Event listener for the Apply button
    document.getElementById('apply-colour').addEventListener('click', function() {
        console.log(strokeWeightValue);
        strokeWeightValue = colorPicker.value; 
        console.log(strokeWeightValue);
        createGlobe();
      });
}
