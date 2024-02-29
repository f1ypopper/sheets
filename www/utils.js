const colNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function colLabel2Num(label) {
    let len = label.length - 1;
    let col = 0;
    let index = 0;
    while (len > 0) {
        col +=
            26 ** (index + 1) * (label.charCodeAt(index) - "A".charCodeAt(0) + 1);
        index++;
        len--;
    }
    col += label.charCodeAt(index) - "A".charCodeAt(0);
    return col;
}

export function colNum2Label(col) {
    let colLabel = "";
    let fC = Math.floor(col / 26);
    let sC = col % 26;
    while (fC > 0) {
        colLabel += colNames.at((fC - 1) % 26);
        fC = Math.floor(fC / 26);
    }
    colLabel += colNames.at(sC);
    return colLabel;
}

export function toLabel(row, col){
    return colNum2Label(col)+row;
}

export function getValue(row, col){
    return document.getElementById(toLabel(row, col)+"_input");
}