document.addEventListener("DOMContentLoaded", function() {
    var svgObj = document.getElementById('kep');

    svgObj.addEventListener('load', function() {
        var svgDoc = svgObj.contentDocument;
        var elementsToColor = [
            svgDoc.getElementById('n1'),
            svgDoc.getElementById('n2'),
            svgDoc.getElementById('n3'),
            svgDoc.getElementById('n4'),
            svgDoc.getElementById('n5'),
            svgDoc.getElementById('n6'),
            svgDoc.getElementById('n7'),
            svgDoc.getElementById('n8'),
            svgDoc.getElementById('n9')
        ];

        document.getElementById('frissit').addEventListener('click', function() {
            fetchColorsFromGoogleSheets()
                .then(colors => {
                    colors.forEach((color, index) => {
                        if (elementsToColor[index]) {
                            elementsToColor[index].style.fill = color;
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching colors from Google Sheets:', error);
                });
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
});

async function fetchColorsFromGoogleSheets() {
    const apiKey = 'AIzaSyBSw4kP1Tn0rhZV75FMOlFXtmVzAf599Oo';
    const spreadsheetId = '1dMJUKE9xkSEu_4b20bB68fmXpZBLhFG3TsDbKtMiprw';
    const range = 'data!B1:B9';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.values) {
        return data.values.map(row => row[0]);
    } else {
        throw new Error('No data found in the specified range.');
    }
}
