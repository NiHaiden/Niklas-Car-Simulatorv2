var cars = []; //Das Auto-Array
var nr = 1; //Die Nummern der Autos
var arrpos = 0; //Die Position der Autos im Array
var blueCarImg_src = "pictures/rennauto_blau.png"; //String der angibt, wo sich das Bild befindet
var redCarImag_src = "pictures/rennauto_rot.png"; //String der angibt, wo sich das Bild befindet
var windowWidth = window.innerWidth; //Weite des Browser-Fensters

/**
 * Eine Constructor Function um ein Auto-Objekt zu erstellen
 * @param marke Die Marke des Autos
 * @param NameOderModell Der Name bzw. das Modell des Autos
 * @param farbe Die Farbe des Autos
 * @param Leistung   Wieviel Leistung das Auto hat
 * @param gaenge Wieviele Gaenge das Auto hat
 */
function createCar(marke, NameOderModell, farbe, Leistung, gaenge) {
    this.nummer = nr; //Die Nummer des Autos
    this.arrpos = arrpos; //Die Position im Auto-Array
    this.marke = marke; //Die Marke des Autos
    this.modell = NameOderModell; //Der Name bzw. das Modell des Autos
    this.farbe = farbe; //Die Farbe des Autos
    this.aktgang = 1; //Der aktuelle Gang, in dem sich das Auto befindet
    this.maxgaenge = gaenge; //Die maximalen Gaenge, die das Auto haben kann
    this.state = "abgestellt"; //Der derzeitige Stand des Motors
    this.imgPosition = 0; //Die Position des Bildes
    this.interVall = null; //Intervall für Animation
    /**
     * Aktualisiert die Daten in den Inputs
     */
    this.refreshValues = function () {
        document.getElementById("gaenge" + this.nummer).value = "Aktueller Gang: "  + this.aktgang;
        document.getElementById("state" + this.nummer).value = "Aktueller Status: " + this.state;
    }
    /**
     * Funktion zum Stoppen des Autos
     */
    this.stop = function () {
        if (this.state === "abgestellt") {
            alert("Das Auto wurde bereits abgestellt!");
        } else {
            this.state = "abgestellt";
            clearInterval(this.interVall);
            this.refreshValues();
        }
    };
    /**
     * Funktion zum Starten des Autos
     */
    this.start = function () {
        if (this.state === "gestartet") {
            alert("Das Auto wurde bereits gestartet!");
        } else {
            this.state = "gestartet";
            this.refreshValues();
            this.interVall = setInterval(frame, 3,  "raceCar" + this.nummer, this.aktgang*0.7);
        }
    };
    /**
     * Funktion zum Hochschalten des Ganges
     */
    this.schalteHoch = function () {
        if (this.aktgang < this.maxgaenge) {
            this.aktgang++; //Raufschalten
            var multiplikator = 0.7*this.aktgang;
            clearInterval(this.interVall);
            this.interVall = setInterval(frame, 3,  "raceCar" + this.nummer, multiplikator);
        } else {
            alert("Du kannst nicht mehr weiterschalten! Du bist im maximalen Gang: " + this.aktgang);
        }
        this.refreshValues();

    };
    /**
     * Funktion zum Runterschalten des Ganges
     */
    this.schalteRunter = function () {
        if (this.aktgang > 1) {
            this.aktgang--; //Runterschalten
            if(this.state === "gestartet") {
                var multiplikator = 0.7*this.aktgang;
                clearInterval(this.interVall);
                this.interVall = setInterval(frame, 10,  "raceCar" + this.nummer, multiplikator);
            }

        }
        else {
            alert("Du kannst nicht mehr weiter runter schalten!");
        }
        this.refreshValues();
    };
    /**
     * Funktion welche das Bild hinzufügt
     * @param color Die Farbe des Autos
     */
    this.addImage = function (color) {



        switch (color) {
            case 'Blau':

                raceAnzeige.innerHTML += "<p>Nummer: " + this.nummer + "</p>";
                raceAnzeige.innerHTML += "<img id = 'raceCar" + this.nummer + "' src='" + blueCarImg_src + "' width='160' height='100' alt='auto_bild'>";
                document.getElementById("raceCar" + this.nummer).style.position = "relative";
                document.getElementById("raceCar" + this.nummer).style.left = "0px";
                anzeige.innerHTML += "<br>";


                break;
            case 'Rot':

                raceAnzeige.innerHTML += "<p>Nummer: " + this.nummer + "</p>";
                raceAnzeige.innerHTML += "<img id = 'raceCar" + this.nummer + "' src='" + redCarImag_src + "' width='160' height='100' alt='auto_bild'>";
                document.getElementById("raceCar" + this.nummer).style.position = "relative";
                document.getElementById("raceCar" + this.nummer).style.left = "0px";
                raceAnzeige.innerHTML += "<br>";


                break;
        }
    };
    /**
     * Diese Funktion generiert die Inputs für den User
     */
    this.createInputs = function () {
        //Generieren der Anzeige Inputs
        anzeige.innerHTML += "<input id='nummer" + this.nummer + "' value='Nummer: " + this.nummer + "' disabled>";
        anzeige.innerHTML += "<input id='marke" + this.nummer + "' value ='Marke: " + this.marke + "' disabled>";
        anzeige.innerHTML += "<input id='model" + this.nummer + "' value ='Modell: " + this.modell + "' disabled>";
        anzeige.innerHTML += "<input id='gaenge" + this.nummer + "' value ='Aktueller Gang: " + this.aktgang + "' disabled>";
        anzeige.innerHTML += "<input id='state" + this.nummer + "' value ='Aktueller Status: " + this.state + "' disabled>";
        anzeige.innerHTML += "<input id='farbe" + this.nummer + "' value ='Farbe: " + this.farbe + "' disabled>";

        //Generieren der Buttons zum Steuern des Autos
        anzeige.innerHTML += "<input type = 'button' class = 'start' id='startbutton" + this.nummer + "' value='Start Car' onclick='cars[" + this.arrpos + "].start();'>";
        anzeige.innerHTML += "<input type = 'button' class = 'stop' id='stopbutton" + this.nummer + "' value='Stop Car' onclick='cars[" + this.arrpos + "].stop();'>";
        anzeige.innerHTML += "<input type = 'button' class = 'hochSchalten' id='hochschalter" + this.nummer + "' value='Hochschalten' onclick='cars[" + this.arrpos + "].schalteHoch();'>";
        anzeige.innerHTML += "<input type = 'button' class = 'runterSchalten' id='runterschalter" + this.nummer + "' value='Runterschalten' onclick='cars[" + this.arrpos + "].schalteRunter();'>";
        anzeige.innerHTML += "<br>";


    };

    this.createInputs(); //Inputs erstellen
    this.addImage(this.farbe); //Das Bild dazuadden

    nr++; //Hochzählen bei den Nummern
    arrpos++; //Hochzählen bei den Array-Positionen

}

/**
 * Hilfsfunktion um Bild-Position ausfindig zu machen
 * @param bildID Die ID des Bildes
 * @returns {number} Returned die aktuelle Position des Bildes
 */
function getPosition(bildID){
    var help = document.getElementById(bildID).style.left;
    return parseFloat(help.slice(0, help.indexOf("px")));
}

/**
 * Funktion für die Animation des Autos
 * @param bildID ID des Bildes
 * @param addWert Wert mit dem nach Links geschoben werden soll
 */
function frame(bildID, addWert) {
    var pos = getPosition(bildID);
    var element = document.getElementById(bildID);
    if(pos >= windowWidth){
        pos = 0;
        element.style.left = pos + 'px';

    }
    else {
        pos+=addWert;
        element.style.left = pos + 'px';
    }
}


/**
 * Fuegt ein Auto dem Auto Array hinzu
 * @param marke Marke des Autos
 * @param NameOderModell Der Name bzw. das Modell des Autos
 * @param farbe Farbe des Autos (wichtig für Bild-Ladung)
 * @param Leistung Leistung des Autos
* @param gaenge Wieviele Gaenge das Auto besitzt
*/
function addCar(marke, NameOderModell, farbe, Leistung, gaenge) {
    if(marke === ""){
        alert('Du musst eine Marke eingeben!');
        return;
    }

    if(NameOderModell === ""){
        alert('Du musst einen Namen oder ein Modell angeben!');
        return;
    }

    if(Leistung === 0 || Leistung < 1){
        alert('Du musst eine gewisse Anzahl von Leistung eingeben!');
        return;
    }

    if(gaenge === 0 || gaenge < 1 || gaenge > 6){
        alert('Du musst eine gewisse Anzahl von Gaengen eingeben! Mindestens 1 Gang hat jedes Auto, maximal 6!');
        return;
    }

    var car = new createCar(marke, NameOderModell, farbe, Leistung, gaenge);
    cars.push(car);
}
