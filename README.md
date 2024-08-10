# 2024 HEGY térkép
Dinamikusan frissülő weboldal a 2024-es HEGY tábor keretmese eredméyneinek vizuális megjelenítéséhez.

A tábor keretmese történetében honfoglalószerű játékot játszottak egymással a csapatok, és a nyertesek megkapták a másik csapat területét.

A térkép alapja a régi Nagymagyarország volt, ennek egyes megyéinek összevonásával lett a 16 csapatra méretezve a 16 megyszerezhető terület.

## Nilvántartás
A nyilvántartásra egy Google Sheets táblázatot hoztam létre, mely kettő lapböl áll:

Van egy EDIT lap, ahol lehet vezetni, hogy melyik területhez melyik csapat tartozik, egyszerúen beírni, a szín nevét, és hogy pöttyös, vagy hogy sima.
![image](https://github.com/user-attachments/assets/6f1b69b3-7a68-4aa1-ad16-90c5d80c38a0)

A másik oldal a "data", ami egy úgymond fordító, azaz a beírt csapatokat lefordítja egy értelmezhető információra, azaz a csapatszíneket HEXA kódokra, a pöttyös értéket pedig TRUE/FALSE értékre.
![image](https://github.com/user-attachments/assets/1ba09197-a3b3-4884-ad1e-7a043e80de08)

## A program mögötte
Egy egyszerű html oldal, css-el megformázva, hogy jól nézzen ki.

Az agyát viszont JavaScript-ben írtam, mivel ez könnyen lefut komolyabb szerver nélkül is, és a projektnek ez is az egyik lényege, a költségcsökkentés mellett, hogy minnél egyszerűbb legyen, és a GitHub Page is ki tudja szolgálni az oldalt.
