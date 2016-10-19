var result = " ";
var saved = "0";
    alert("h");
    function funClick(e) {
        var target = e.target;
        if (target.tagName === "button") {
            if (target.id === '=') {
                try {
                    var ans = eval(result);
                    document.getElementById("input").value = ans;
                    result = " ";
                    saved = ans;
                } catch (exception) {
                    alert("WARNING");
                }
            } else {
                if (target.id === '←') {
                    result = result.substr(0, result.length-1);
                } else if (target.id === 'CE') {
                    result = ' ';
                    saved = "0";
                } else {
                    if (target.length < 20) {
                        result = result + target.textContent;
                    }
                }
                document.getElementById("input").value = result;
            }
        }
    }
    document.addEventListener('click', funClick);