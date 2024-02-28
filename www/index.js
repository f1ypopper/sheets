import init, {Sheet} from './pkg/sheets.js';
import { render, checkColBounds, checkRowBounds, initRenderer } from "./render.js";
import { toLabel } from "./utils.js";
import { Selection } from "./selection.js";
window.currentRow = 0;
window.currentCol = 0;
window.nrows = 100;
window.ncols = 100;
window.isVisual = false;
window.selection = null;
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

function renderVisual() {
    let rstart = Math.min(selection.startRow, selection.endRow);
    let rend = Math.max(selection.startRow, selection.endRow);
    let cstart = Math.min(selection.startCol, selection.endCol);
    let cend = Math.max(selection.startCol, selection.endCol);
    console.log(rstart, rend);
    for (let r = rstart; r < rend; r++) {
        for (let c = cstart; c < cend; c++) {
            if ((r >= selection.startRow && r <= selection.endRow) && (c >= selection.startCol && c <= selection.endCol)) {
                document.getElementById(toLabel(r, c)).classList.add('visual-selected-cell');
            }
        }
    }
}
function clearVisual() {
    let rstart = Math.min(rStart, rEnd);
    let rend = Math.max(rStart, rEnd);
    let cstart = Math.min(cStart, cEnd);
    let cend = Math.max(cStart, cEnd);
    for (let r = rstart; r < rend; r++) {
        for (let c = cstart; c < cend; c++) {
            if ((r >= selection.startRow && r <= selection.endRow) && (c >= selection.startCol && c <= selection.endCol)) {
                document.getElementById(toLabel(r, c)).classList.remove('visual-selected-cell');
            }
        }
    }
}
async function handleKeyPress(ev) {
    ev.preventDefault();
    if (ev.key == 'j') {
        document.getElementById(toLabel(currentRow, currentCol)).className = 'cell';
        currentRow = Math.min(currentRow + 1, nrows - 1);
        await checkRowBounds(currentRow);
    } else if (ev.key == 'k') {
        document.getElementById(toLabel(currentRow, currentCol)).className = 'cell';
        currentRow = Math.max(currentRow - 1, 0);
        await checkRowBounds(currentRow);
    } else if (ev.key == 'l') {
        document.getElementById(toLabel(currentRow, currentCol)).className = 'cell';
        currentCol = Math.min(currentCol + 1, ncols - 1);
        await checkColBounds(currentCol);
    } else if (ev.key == 'h') {
        document.getElementById(toLabel(currentRow, currentCol)).className = 'cell';
        currentCol = Math.max(currentCol - 1, 0);
        await checkColBounds(currentCol);
    } else if (ev.key == 'G') {
        currentRow = window.nrows - 1;
        currentCol = window.ncols - 1;
        render(currentRow, currentRow);
    } else if (ev.key == 'g') {
        currentRow = 0;
        currentCol = 0;
        render(currentRow, currentRow);
    }else if (ev.key == 'v') {
        if (!isVisual){
            window.isVisual = true;
            window.selection = new Selection(currentRow, currentCol, currentRow, currentCol);
        }
    }else if(ev.key == 'Escape'){
        if(isVisual){
            isVisual = false;
            clearVisual();
        }
    }
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

let sheet = new Sheet(100, 100);
document.addEventListener('keydown', handleKeyPress);

initRenderer(sheet);
render(currentRow, currentCol);
updateCurrent();
