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
// I made a sanitizer function to handle pulling the length of the miniGrid. All to
// dynamically set the width of the gridFrame (maybe in case I changed the value of the miniGrid length in the future...)
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

    main();
}



async function hoverEngine() {
    await main();

    gridFrame.addEventListener("mouseover", eventDelegator);

    function eventDelegator(e) {
        if (e.target.matches("div")) {
            e.target.style.cssText = "background-color: red;"
        }
    }

    hoverEngine();
}



main();
hoverEngine();