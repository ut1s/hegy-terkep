
function alertt(msg) {
    alert("Hello " + msg);
}

function randszinez(elm) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    elm.style.fill = "#" + randomColor;
}

var svgObj = document.getElementById('kep');

svgObj.addEventListener('load', function () {
    var svgDoc = svgObj.contentDocument;
    var n1 = svgDoc.getElementById("n1");
    var n2 = svgDoc.getElementById("n2");
    var n3 = svgDoc.getElementById("n3");
    var n4 = svgDoc.getElementById("n4");
    var n5 = svgDoc.getElementById("n5");
    var n6 = svgDoc.getElementById("n6");
    var n7 = svgDoc.getElementById("n7");
    var n8 = svgDoc.getElementById("n8");
    var n9 = svgDoc.getElementById("n9");

    document.getElementById('frissit').addEventListener('click', function () {
        if (n1) {
            randszinez(n1);
        }
        randszinez(n2);
        randszinez(n3);
        randszinez(n4);
        randszinez(n5);
        randszinez(n6);
        randszinez(n7);
        randszinez(n8);
        randszinez(n9);
    });

    document.getElementById('ment').addEventListener('click', function () {
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svgDoc.documentElement);

        // Create blob
        var blob = new Blob([svgString], { type: "image/svg+xml" });
        var url = URL.createObjectURL(blob);

        // Geeting today
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');

        // Saving to file
        var a = document.createElement('a');
        a.href = url;
        a.download = 'tesztkep_' + mm + '-' + dd +'.svg';
        document.body.appendChild(a);
        a.click();

        // Cleaning up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});