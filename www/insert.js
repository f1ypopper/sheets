import { toLabel } from "./utils.js";
export function modeInsert(ev) {
    let cellInput = document.getElementById(toLabel(currentRow, currentCol)+"_input");
    if (ev.key === "Escape") {
        let value = document.getElementById(toLabel(currentRow, currentCol)+"_input").value;
        console.log(value);
        cellInput.setAttribute("disabled", "");
        window.sheet.put(currentRow, currentCol, value);
        window.mode = "NORMAL";
    } else {
        cellInput.removeAttribute("disabled");
        cellInput.focus();
    }
}