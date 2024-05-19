var sketch_UI = function(p) {
    let uiContainerWidth, uiContainerHeight;
    let x, connectionSliderY, lineThicknessSliderY, lineColourPickerY, sphereColourPickerY, backgroundColourPickerY;
    let textSizePercentage = 0.06; 
    let textSizeValue = p.width * textSizePercentage;

    p.preload = function(){

    }

    p.setup = function() {
        uiContainerWidth  = screenWidth * 0.3
        uiContainerHeight = window.innerHeight;
        
        console.log(uiContainerHeight, uiContainerWidth)

        p.canvas = p.createCanvas(uiContainerWidth, uiContainerHeight);
        p.canvas.style('background-color', 'transparent');

        x = 20;
        // Calculate positions for slider and color picker
       
        connectionSliderY       = uiContainerHeight * 0.1;
        lineThicknessSliderY    = uiContainerHeight * 0.2;
        lineColourPickerY       = uiContainerHeight * 0.3; 
        sphereColourPickerY     = uiContainerHeight * 0.4; 
        backgroundColourPickerY = uiContainerHeight * 0.5; 
        

        p.connectionSlider = p.createSlider(0, 40, total);
        p.connectionSlider.position(x, connectionSliderY); 
        p.connectionSlider.input(p.changeConnections); 
        p.connectionSlider.addClass('slider');
        p.connectionSlider.elt.id = 'connectionSlider'; 
        
        p.lineThicknessSlider = p.createSlider(0, 20, strokeWeightValue);
        p.lineThicknessSlider.position(x, lineThicknessSliderY); 
        p.lineThicknessSlider.input(p.changeLineThickness); 
        p.lineThicknessSlider.addClass('slider');
        p.lineThicknessSlider.elt.id = 'lineThicknessSlider'; 
        
        p.lineColourPicker = p.createColorPicker(100, 100, 100)
        p.lineColourPicker.position(x, lineColourPickerY);
        p.lineColourPicker.input(p.changeLineColour)
        p.lineColourPicker.addClass('colourPicker')

        p.sphereColourPicker = p.createColorPicker(100, 100, 100)
        p.sphereColourPicker.position(x, sphereColourPickerY);
        p.sphereColourPicker.input(p.changeSphereColour)
        p.sphereColourPicker.addClass('colourPicker')

        p.backgroundColourPicker = p.createColorPicker(100, 100, 100)
        p.backgroundColourPicker.position(x, backgroundColourPickerY);
        p.backgroundColourPicker.input(p.changeBackgroundColour)
        p.backgroundColourPicker.addClass('colourPicker')

    

    
        
        
    }
    p.draw = function() {
        p.background(0); 
        p.fill(255); 
        
        p.textSize(textSizeValue);

        p.text("Connections :  "        + total, x, connectionSliderY - 10);
        p.text("Line Thickness :  "     + strokeWeightValue, x, lineThicknessSliderY - 10);
        p.text("Line Colour :  "        + getColourAdjustment(p.lineColourPicker), x, lineColourPickerY - 10);
        p.text("Sphere Colour :  "      + getColourAdjustment(p.sphereColourPicker), x, sphereColourPickerY - 10);
        p.text("Background Colour :  "  + getColourAdjustment(p.backgroundColourPicker), x, backgroundColourPickerY - 10);
        
    }

    p.changeConnections = function() {
        total = p.connectionSlider.value();
        p.createGlobe(); 
    }

    p.changeLineThickness = function() {
        strokeWeightValue = p.lineThicknessSlider.value();
    }

    p.changeLineColour = function() {
        strokeValue = p.lineColourPicker.color();
    }

    p.changeSphereColour = function() {
        sphereColour = p.sphereColourPicker.color();
    }

    p.changeBackgroundColour = function() {
        backgroundColour = p.backgroundColourPicker.color();
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
        uiContainerWidth  = window.innerWidth * 0.3;
        textSizePercentage = 0.05; 
        textSizeValue = p.width * textSizePercentage;
        p.resizeCanvas(uiContainerWidth, uiContainerHeight);
    }
    window.addEventListener('resize', adjustCanvasSize);

    const settingsButton = document.getElementById('edit_button');
    settingsButton.addEventListener('click', adjustCanvasSize);


    document.addEventListener('fullscreenchange', (event) => {
        if (document.fullscreenElement) 
            adjustCanvasSize();
    });

    function getColourAdjustment(colourPicker){
        let colour = colourPicker.color();
        let r = Math.round(p.red(colour));
        let g = Math.round(p.green(colour));
        let b = Math.round(p.blue(colour));

        return "(" + r + ", " + g + ", " + b + ")";
    }
}
