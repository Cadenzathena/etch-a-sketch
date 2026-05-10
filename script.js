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
        }
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
function hoverEngine() {
    gridFrame.addEventListener("mouseover", (e) => e.target.style.cssText = "background-color: red;");

    gridFrame.addEventListener("mouseout", (e) => setTimeout(() => {
        e.target.style.cssText = "background-color: lightgrey;"}, 400));

    main();
}



main();