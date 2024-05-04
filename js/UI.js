var sketch_UI = function(p) {
    let uiContainerWidth, uiContainerHeight;
    let x, sliderY, colourPickerY
    let activated = false;

    p.preload = function(){

    }

    p.setup = function() {
        uiContainerWidth  = screenWidth * 0.3
        uiContainerHeight = screenHeight;
        
        console.log(uiContainerHeight, uiContainerWidth)

        p.canvas = p.createCanvas(uiContainerWidth, uiContainerHeight);
        p.canvas.style('background-color', 'transparent');

        x = uiContainerWidth * 0.1;
        // Calculate positions for slider and color picker
       
        connectionSliderY       = uiContainerHeight * 0.05;
        lineThicknessSliderY    = uiContainerHeight * 0.1;
        colourPickerY           = uiContainerHeight * 0.15; 
        

        p.connectionSlider = p.createSlider(0, 40, total);
        p.connectionSlider.position(x, connectionSliderY); 
        p.connectionSlider.input(p.connectionSliderEvent); 
        p.connectionSlider.addClass('slider');
        p.connectionSlider.elt.id = 'connectionSlider'; 
        
        p.lineThicknessSlider = p.createSlider(0, 20, strokeWeightValue);
        p.lineThicknessSlider.position(x, lineThicknessSliderY); 
        p.lineThicknessSlider.input(p.changeLineThickness); 
        p.lineThicknessSlider.addClass('slider');
        p.lineThicknessSlider.elt.id = 'lineThicknessSlider'; 
        
        p.colourPicker = p.createColorPicker(100, 100, 100)
        p.colourPicker.position(x, colourPickerY);
        p.colourPicker.input(p.changeGlobeLineColour)
        p.colourPicker.addClass('colourPicker')

        
        
    }
    p.draw = function() {
        p.background(0); // Set background to black

        p.fill(255); // Set text color to white
        p.text("Connections :  " + total, x, connectionSliderY - 10);
        p.text("Line Colour :  " + getLineColourAdjustment(), x, colourPickerY - 10);
        p.text("Line Thickness :  " + strokeWeightValue, x, lineThicknessSliderY - 10);
    }

    p.connectionSliderEvent = function() {
        total = p.connectionSlider.value();
        p.createGlobe(); // Call createGlobe from global.js
    }

    p.changeGlobeLineColour = function() {
        console.log("changed");
        strokeValue = p.colourPicker.color();
    }

    p.changeLineThickness = function() {
        strokeWeightValue = p.lineThicknessSlider.value();
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

    function getLineColourAdjustment(){
        let color = p.colourPicker.color();
    let r = Math.round(p.red(color));
    let g = Math.round(p.green(color));
    let b = Math.round(p.blue(color));

    return "(" + r + ", " + g + ", " + b + ")";
    }
}
