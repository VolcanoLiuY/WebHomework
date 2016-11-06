
$(document).ready(sort);
var Descend = false;

function sort() {
    $('th').click(function(){
        var th = this;
        AscendOrDescend(th);
        var table = $(this).parents('table').eq(0);
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) {
            rows = rows.reverse();
        }
        excution(rows, table);
    })
}

function AscendOrDescend(th) {
    if (!Descend) {
        $(th).attr("id","Ascend");
        Descend = true;
    } else {
        $(th).attr("id","Descend");
        Descend = false;
    }
}

function excution(rows,table) {
    for (var i = 0; i < rows.length; i++){
            table.append(rows[i]);
            if (i%2 == 1) {
                rows[i].className="alternate";
            } else {
                rows[i].className="";
            }

        }
}

function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    }
}

function getCellValue(row, index){
    return $(row).children('td').eq(index).html();
}