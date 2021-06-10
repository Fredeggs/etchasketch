const container = document.querySelector('#container');
const resetBtn = document.querySelector('#resetBtn');
const mouseModeSelect = document.querySelector('#mousemode');
const colorModeSelect = document.querySelector('#colormode');

// variable that knows whether the mouse is clicked or not
let mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}
let userNum = 10;
let blackness = 0;

//function that changes the number of repeating gridBoxes
function changeGridLen(gridnum) {

    document.getElementById("container").style.gridTemplateColumns = "repeat(" + gridnum + ", " + ((1 / gridnum)*100) + "%)";
    document.getElementById("container").style.gridTemplateRows = "repeat(" + gridnum + ", " + ((1 / gridnum)*100) + "%)";
}

//function that takes a string and style of the grid to increase amount of whiteness
function LightenDarkenColor(col) {
  
    let usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    let num = parseInt(col,16);
 
    let r = (num >> 16) + 50;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    let b = ((num >> 8) & 0x00FF) + 50;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    let g = (num & 0x0000FF) + 50;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

// create a x*x grid of divs styled as boxes. **Mousever to draw** 
function sketchGridHover(gridSize) {
    for (i=0; i<(gridSize*gridSize); i++) {
        const gridBox = document.createElement('div');
        let gridBoxColor = '#FF0000';
        gridBox.classList.add('gridBox');
        // This handler will be executed only once when the cursor
        // moves over the div (grid box)
        gridBox.addEventListener("mouseover", function( event ) {
            if (colorModeSelect.value == 'slowchange') {
                // turn the div white slowly
                gridBoxColor = LightenDarkenColor(gridBoxColor);
                event.target.style.backgroundColor = gridBoxColor;
            } else 
                // turn the div white immediately
                event.target.style.backgroundColor = "white";
        }, false);
        container.appendChild(gridBox);
    }
}


// function that takes in a Num and creates a Num*Num grid of divs styled as boxes. **Click to draw** 
function sketchGridClick(gridSize) {
    for (i=0; i<(gridSize*gridSize); i++) {
        const gridBox = document.createElement('div');
        let gridBoxColor = '#FF0000';
        gridBox.classList.add('gridBox');

    // This handler will be executed only once when the cursor
    // moves over the div (grid box)
        gridBox.addEventListener("mouseover", function( event ) {
            if (mouseDown == 1){
                if (colorModeSelect.value == 'slowchange') {
                    // turn the div white slowly
                    gridBoxColor = LightenDarkenColor(gridBoxColor);
                    event.target.style.backgroundColor = gridBoxColor;
                } else 
                    // turn the div white immediately
                    event.target.style.backgroundColor = "white";
            }
        }, false);
        container.appendChild(gridBox);
    }
}

// function that removes all child nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// a button that resets the grid and prompts you to enter a new grid size
resetBtn.addEventListener('click',function(event) {
    gridBoxColor = "#FF0000";
    let mouseModeSelection = mouseModeSelect.value
    userNum = prompt('Please enter a grid size as a number between 1-100');
    while(!(userNum >= 1 && userNum <= 100)) {
        userNum = prompt('INVALID INPUT, Please enter a grid size as a number between 1-100');
    }
    if (userNum >= 1 && userNum <= 100){
        removeAllChildNodes(container);
        changeGridLen(userNum);

        if( mouseModeSelection == 'hovermode') {
            sketchGridHover(userNum);
        } else if( mouseModeSelection == 'clickmode'){
            sketchGridClick(userNum);
        } else
        console.log('something went wrong');
    }
});

// a dropdown that allows user to change between click mode and hover mode
mouseModeSelect.addEventListener('input',function(event) {
    gridBoxColor = "#FF0000";
    removeAllChildNodes(container);
    changeGridLen(userNum);

    if( event.target.value == 'hovermode') {
        sketchGridHover(userNum);
    } else if( event.target.value == 'clickmode'){
        sketchGridClick(userNum);
    } else 
    console.log('something went wrong');
    
});

// a dropdown that allows user to change between click mode and hover mode
colorModeSelect.addEventListener('input',function(event) {
    let mouseModeSelection = mouseModeSelect.value;
    removeAllChildNodes(container);
    changeGridLen(userNum);

    if( mouseModeSelection == 'hovermode') {
        sketchGridHover(userNum);
    } else if( mouseModeSelection == 'clickmode'){
        sketchGridClick(userNum);
    } else 
    console.log('something went wrong');
    
});

sketchGridHover(10);




