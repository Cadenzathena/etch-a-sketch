const pickerField = document.querySelector("#picker-field");
const generateBtn = document.querySelector("div#picker-frame button");
const gridFrame = document.querySelector("#grid-frame");
let gridSizeValue;
let miniGrid;



// button is the only/major thing that signals generation. This is a
// simple function that sends a signal to main() that the btn has been clicked
function generateBtnClicked() {
    return new Promise (resolve => {generateBtn.addEventListener("click",
        () => {resolve(gridSizeValue = +pickerField.value)}
    )})
}



// Mostly handles generation. gridFrameWidth determines how the miniGrids are arranged.
// I made a sanitizer function to handle pulling the length of the miniGrid. All to
// dynamically set the width of the gridFrame (maybe in case I changed the value of the miniGrid length in the future...)
async function main() {
    await generateBtnClicked();

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

main()