import init, {Sheet} from './pkg/sheets.js';
import { render, checkColBounds, checkRowBounds, initRenderer } from "./render.js";
import { toLabel } from "./utils.js";
import { Selection } from "./selection.js";
import { modeNormal } from './normal.js';
import { modeInsert } from './insert.js';
import { clearVisual, renderVisual } from './visual.js';
window.currentRow = 0;
window.currentCol = 0;
window.nrows = 100;
window.ncols = 100;
window.isVisual = false;
window.selection = null;
window.mode = "NORMAL";
window.clipboard = '';
const modeTable = {"NORMAL": modeNormal, "INSERT": modeInsert};
let statusCell = document.getElementById('status_current_cell');
let statusValue = document.getElementById('status_current_cell_value');

await init();
function updateCurrent() {
    document.getElementById(toLabel(currentRow, currentCol)).className = 'current-cell';
    document.getElementById(toLabel(currentRow, currentCol)).scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
    });
}

function updateStatusBar() {
    if(isVisual){
        statusCell.innerText = toLabel(window.selection.startRow, window.selection.startCol)+":"+toLabel(window.selection.endRow, window.selection.endCol);
    }else{
        statusCell.innerText = toLabel(currentRow, currentCol);
    }
    statusValue.innerHTML = sheet.get(currentRow, currentCol);
}


async function handleKeyPress(ev) {
    if(ev.target == "BODY"){
        ev.preventDefault();
    }
    await modeTable[window.mode](ev);
    updateCurrent();
    updateStatusBar();
    if (isVisual) {
        clearVisual();
        window.selection.endRow = currentRow;
        window.selection.endCol = currentCol;
        renderVisual();
    }
}

function stickyScroll() {
    var status = document.getElementById("status");
    var grid = document.getElementById("grid");
    var stickyTop = status.offsetTop;
    var stickyLeft = status.offsetLeft;
    if (window.scrollY > stickyTop) {
        status.classList.add("sticky_status");
    } else if (window.scrollX > stickyLeft) {
        status.classList.add("sticky_status_horizontal");
        grid.style.top = "30px";
    }
    else {
        status.classList.remove("sticky_status");
        status.classList.remove("sticky_status_horizontal");
        grid.style.top = "0px";
    }
}

window.addEventListener('scroll', stickyScroll);

window.sheet = new Sheet(100, 100);
document.addEventListener('keydown', handleKeyPress);

initRenderer(sheet);
render(currentRow, currentCol);
updateCurrent();
updateStatusBar();
