import { toLabel } from "./utils.js";

let nrows = 100;
let ncols = 100;
const colWidth = 100;
const rowHeight = 25;
let clientHeight = window.innerHeight;
let clientWidth = window.innerWidth;
const displayableRows = Math.ceil((clientHeight) / rowHeight);
const displayableCols = Math.ceil(clientWidth / colWidth);
let grid = document.getElementById("grid");
window.rStart = 0;
window.rEnd = displayableRows;
window.cStart = 0;
window.cEnd = displayableCols;
const rhalf = Math.ceil(displayableRows / 2);
const chalf = Math.ceil(displayableCols / 2);
const atBottom = -1;
const atRight = -1;
const atTop = 0;
const atLeft = 0;

let sheet;

function addCol(row, rindex, cindex, direction) {
    let cell = row.insertCell(direction);
    cell.id = toLabel(rindex, cindex);
    cell.className = 'cell';
    cell.innerText = sheet.get(rindex, cindex);
}

function addRow(rindex, direction) {

    let row = grid.insertRow(direction);
    row.className = 'row';
    row.id = rindex;
    for (let cindex = cStart; cindex < cEnd; cindex++) {
        addCol(row, rindex, cindex, atRight);
    }
}

async function renderBottom(start, end) {
    for (let i = start; i < end; i++) {
        addRow(i, atBottom);
    }
}

async function renderTop(start, end) {
    for (let i = start - 1; i >= end; i--) {
        addRow(i, atTop);
    }
}

async function destroyColHeader() {
    if (document.getElementById("col_heads")) {
        document.getElementById("col_heads").remove();
    }
}

async function destroyRows(start, end) {
    for (let i = start; i < end; i++) {
        document.getElementById(i).remove();
    }
}

async function destroyCols(start, end) {
    for (let r = rStart; r < rEnd; r++) {
        for (let c = start; c < end; c++) {
            document.getElementById(toLabel(r, c)).remove();
        }
    }
}
async function renderRight(start, end) {
    for (let r = rStart; r < rEnd; r++) {
        let row = document.getElementById(r);
        for (let c = start; c < end; c++) {
            let cell = row.insertCell();
            cell.id = toLabel(r, c);
            cell.className = 'cell';
            cell.innerText = sheet.get(r, c);
        }
    }
}

async function renderLeft(start, end) {
    for (let r = rStart; r < rEnd; r++) {
        let row = document.getElementById(r);
        for (let c = start - 1; c >= end; c--) {
            let cell = row.insertCell(0);
            cell.id = toLabel(r, c);
            cell.className = 'cell';
            cell.innerText = sheet.get(r, c);
        }
    }
}

export async function checkRowBounds(currentRow) {
    if (rEnd - currentRow < rhalf && rEnd < nrows) {
        renderBottom(rEnd, Math.min(rEnd + rhalf, nrows));
        rEnd = Math.min(rEnd + rhalf, nrows);
    } else if (rEnd - currentRow > displayableRows && currentRow > rhalf) {
        destroyRows(rEnd - rhalf, Math.max(rEnd, displayableRows));
        rEnd = Math.max(rEnd - rhalf, displayableRows);
    }

    if (currentRow - rStart > displayableRows && rStart + displayableRows + rhalf < nrows) {
        destroyRows(rStart, rStart + rhalf);
        rStart = rStart + rhalf;
    } else if (currentRow - rStart < rhalf && currentRow > rhalf) {
        renderTop(rStart, Math.max(rStart - rhalf, 0));
        rStart = Math.max(rStart - rhalf, 0);
    }
}

export async function checkColBounds(currentCol) {
    if (cEnd - currentCol < chalf && cEnd < ncols) {
        renderRight(cEnd, Math.min(cEnd + chalf, ncols));
        cEnd = Math.min(cEnd + chalf, ncols);
    } else if (cEnd - currentCol > displayableCols && currentCol > chalf) {
        destroyCols(cEnd - chalf, Math.max(cEnd, displayableCols));
        cEnd = Math.max(cEnd - chalf, displayableCols);
    }


    if (currentCol - cStart > displayableCols && cStart + displayableCols + chalf < ncols) {
        destroyCols(cStart, cStart + chalf);
        cStart = cStart + chalf;
    } else if (currentCol - cStart < chalf && currentCol > chalf) {
        renderLeft(cStart, Math.max(cStart - chalf, 0));
        cStart = Math.max(cStart - chalf, 0);
    }
}

export function render(currentRow, currentCol) {
    document.getElementById('grid').innerHTML = '';
    let rowOffset = Math.trunc(currentRow / displayableRows) * displayableRows;
    let colOffset = Math.trunc(currentCol / displayableCols) * displayableCols;
    cStart = colOffset;
    cEnd = Math.min(colOffset + displayableCols, ncols);
    rStart = rowOffset;
    rEnd = Math.min(rowOffset + displayableRows, nrows);
    renderBottom(rStart, rEnd);
}

export function initRenderer(sheetObj) {
    sheet = sheetObj;
}
