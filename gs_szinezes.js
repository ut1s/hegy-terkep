document.addEventListener("DOMContentLoaded", function() {
    var svgObj = document.getElementById('kep');

    svgObj.addEventListener('load', function() {
        // Hogy ne stresszeljuk túl az API-t (vagy ne lépjük át véletlenül a kvótát)
        //ujraszinez();

        document.getElementById('frissit').addEventListener('click', function() {
            ujraszinez();
        });

        document.getElementById('ment').addEventListener('click', function () {
            mentes();
        });
    });

    async function ujraszinez() {
        var svgDoc = document.getElementById('kep').contentDocument;
        var elms = [
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
    
        fetchColorsFromGoogleSheets()
        .then(styles => {
            styles.forEach((style, index) => {
                if (elms[index]) {
                    elms[index].style.fill = style.szin;
                    if (style.pottyos) {
                        var pottyok = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        pottyok.setAttribute('x', elms[index].getAttribute('x'));
                        pottyok.setAttribute('y', elms[index].getAttribute('y'));
                        pottyok.setAttribute('width', elms[index].getAttribute('width'));
                        pottyok.setAttribute('height', elms[index].getAttribute('height'));
                        pottyok.setAttribute('fill', 'url(#pottyos)');
                        svgDoc.documentElement.appendChild(pottyok);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data from Google Sheets:', error);
        });
    }
    
    function mentes() {
        var svgDoc = svgObj.contentDocument;
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
    }
    
    async function fetchColorsFromGoogleSheets() {
        const apiKey = 'AIzaSyBSw4kP1Tn0rhZV75FMOlFXtmVzAf599Oo';
        const spreadsheetId = '1dMJUKE9xkSEu_4b20bB68fmXpZBLhFG3TsDbKtMiprw';
        const range = 'data!B1:C9';
    
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        if (data && data.values) {
            return data.values.map(row => {
                return {
                    szin: row[0],
                    pottyos: row[1].toLowerCase() === 'true'
                };
            });
        } else {
            throw new Error('No data found in the specified range.');
        }
    }
});
