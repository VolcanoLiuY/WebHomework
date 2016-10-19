window.onload = function() {
    var re = '';
    var sa = "0";
    var para = document.getElementById("button");
    para.addEventListener("click", func);
    function func(e) {
        var result = '';
        var saved = "0";
        var target = e.target;
        var ans = document.getElementById("input");
        if (target.tagName.toLowerCase() === "button") {
            if (target.id === '=') {
                try {
                    var calculator = eval(re);
                    ans.value = calculator;
                    result = '';
                    saved = ans;
                    re = '';
                    sa = "0";
                } catch (exception) {
                    alert("WARNING");
                }
            } else {
                if (target.id === '←') {
                    re = result = re.substring(0, re.length-1);
                    ans.value = result;
                } else if (target.id === "CE") {
                    result = ' ';
                    saved = "0";
                    ans.value = ' ';
                } else {
                    var len = target.length;
                    // if (target.length < 13) {
                        re = re + target.textContent;
                        result = result + target.textContent;
                    // }
                    ans.value +=  result;
                }
            }
        }
    }
}