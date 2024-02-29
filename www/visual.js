import { toLabel } from "./utils.js";
export function renderVisual() {
    let rstart = Math.min(selection.startRow, selection.endRow);
    let rend = Math.max(selection.startRow, selection.endRow);
    let cstart = Math.min(selection.startCol, selection.endCol);
    let cend = Math.max(selection.startCol, selection.endCol);
    for (let r = rstart; r <= rend; r++) {
        for (let c = cstart; c <= cend; c++) {
            if ((r >= window.rStart && r <= window.rEnd) && (c >= window.cStart && c <= window.cEnd)) {
                document.getElementById(toLabel(r, c)).classList.add('visual-selected-cell');
            }
        }
    }
}

export function clearVisual() {
    let rstart = Math.min(selection.startRow, selection.endRow);
    let rend = Math.max(selection.startRow, selection.endRow);
    let cstart = Math.min(selection.startCol, selection.endCol);
    let cend = Math.max(selection.startCol, selection.endCol);
    for (let r = rstart; r <= rend; r++) {
        for (let c = cstart; c <= cend; c++) {
            if ((r >= window.rStart && r <= window.rEnd) && (c >= window.cStart && c <= window.cEnd)) {
                document.getElementById(toLabel(r, c)).classList.remove('visual-selected-cell');
            }
        }
    }
}