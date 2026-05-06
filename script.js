const pickerField = document.querySelector("#picker-field");
const generateBtn = document.querySelector("div#picker-frame button");
const gridFrame = document.querySelector("#grid-frame");
let gridSizeValue;
let miniGrid;

function generateBtnClicked() {
    return new Promise (resolve => {generateBtn.addEventListener("click",
        () => {resolve(gridSizeValue = +pickerField.value)}
    )})
}

async function main() {
    await generateBtnClicked();

    for (let i = 0; i < gridSizeValue ** 2; i++) {
        miniGrid = document.createElement("div");
        gridFrame.appendChild(miniGrid);
    }

    function gridFrameWidthSanitizer() {
        let miniGridLength = getComputedStyle(miniGrid).getPropertyValue("padding");
        return 2 * Number(miniGridLength.replace("px",""));
    }

    gridFrame.style.width = `${gridSizeValue * gridFrameWidthSanitizer()}px`
}

main()