const pickerFrame = document.querySelector("#picker-frame");
const pickerField = document.querySelector("#picker-field");
const generateBtn = document.querySelector("#picker-frame button");
const gridFrame = document.querySelector("#grid-frame");
let gridSizeValue;
let miniGrid;



// input field and it's button are the major things that signals generation. generateBtn
// has the type="submit" attribute, allowing for an easy addEventListener "submit" to handle
// clicking the button OR pressing enter. preventDefault() is just to prevent a page refresh.
function generateBtnClicked() {
    return new Promise (resolve => {pickerFrame.addEventListener("submit",
        (e) => {
        e.preventDefault();
        resolve(gridSizeValue = +pickerField.value);
        },
        {once: true} // deletes the eventListener after it has fired.
    )})
}



// Mostly handles generation. gridFrameWidth determines how the miniGrids are arranged.
// I made a sanitizer function to handle pulling the length of the miniGrid in order to
// dynamically set the width of the gridFrame
async function main() {
    await generateBtnClicked();

    console.log(gridSizeValue);

    if (document.body.contains(miniGrid)) {
        gridFrame.replaceChildren();
    }

    for (let i = 0; i < gridSizeValue ** 2; i++) {
        miniGrid = document.createElement("div");
        gridFrame.appendChild(miniGrid);
    }

    function miniGridLengthSanitizer() {
        let miniGridLength = getComputedStyle(miniGrid).getPropertyValue("padding");
        return 2 * Number(miniGridLength.replace("px",""));
    }

    gridFrame.style.width = `${gridSizeValue * miniGridLengthSanitizer()}px`

    hoverEngine();
}



// Logic for what happens when a mouse interacts with any miniGrid. Using event delegation
// with the parent element (gridFrame) to prevent millions of added eventLiteners
async function hoverEngine() {
    function mouseoverListenerFunc(e) {
        e.target.style.cssText = "background-color: red;"
    }

    function mouseoutListenerFunc(e) {
        setTimeout(() => {
            e.target.style.cssText = "background-color: lightgrey;"
        }, 500)
    }

    gridFrame.addEventListener("mouseover", mouseoverListenerFunc);
    gridFrame.addEventListener("mouseout", mouseoutListenerFunc);

    main();

    // clears duplicate mouse events nicely, but calling generateBtnClicked again makes another
    // "submit" eventListener. Not a big deal though.
    await generateBtnClicked;
    gridFrame.removeEventListener("mouseover", mouseoverListenerFunc);
    gridFrame.removeEventListener("mouseout", mouseoutListenerFunc);
}



main();