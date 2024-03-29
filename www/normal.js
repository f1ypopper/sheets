import { modeInsert } from "./insert.js";
import { render, checkColBounds, checkRowBounds } from "./render.js";
import { toLabel, getValue } from "./utils.js";
import { Selection } from "./selection.js";
import { renderVisual, clearVisual } from "./visual.js";
export async function modeNormal(ev) {
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
    } else if (ev.key == 'i') {
        window.mode = "INSERT";
    } else if (ev.key == 'x') {
        window.clipboard = window.sheet.get(currentRow, currentCol);
        window.sheet.put(currentRow, currentCol, '');
        render(currentRow, currentCol);
    } else if (ev.key == 'y') {
        window.clipboard = [];
        if(isVisual){
            for(let r = window.selection.startRow; r <= window.selection.endRow; r++){
                let values = [];
                for(let c = window.selection.startCol; c <= window.selection.endCol; c++){
                    values.push(window.sheet.get(r,c));
                }
                window.clipboard.push(values);
            }
            isVisual = false;
            clearVisual();
        }else{
            window.clipboard.push(window.sheet.get(currentRow, currentCol));
        }
    } else if (ev.key == 'p') {
        for(let r = 0; r < window.clipboard.length; r++){
            for(let c = 0; c < window.clipboard[0].length; c++){
                window.sheet.put(currentRow+r,currentCol+c, window.clipboard.at(r).at(c));
            }
        }
        render(currentRow, currentCol);
    }
    else if (ev.key == 'v') {
        if (!isVisual) {
            window.isVisual = true;
            window.selection = new Selection(currentRow, currentCol, currentRow, currentCol);
        }
    } else if (ev.key == 'Escape') {
        if (isVisual) {
            isVisual = false;
            clearVisual();
        }
    }
    
}
