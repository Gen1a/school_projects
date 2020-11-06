// start hier
class Dobbelsteen {
    constructor() {
        this._aantalOgen = 1;
    }
    get aantalOgen() { return this._aantalOgen; }
    rol() {
        this._aantalOgen = Math.floor(Math.random() * (6) + 1);
    }
}

class Speler {
    constructor(naam) {
        this._naam = naam;
        this._score = 0;
        this._dobbelstenen = [];
        // initialiseer array met 5 nieuwe Dobbelsteen objecten
        for (let i = 0 ; i < 5 ; i++){
            this.dobbelstenen.push(new Dobbelsteen());
        }
    }
    get score() { return this._score; }
    get naam() { return this._naam; }
    get dobbelstenen() { return this._dobbelstenen; }
    // rollen van dobbelstenen en score aanpassen naargelang aantal ogen
    speel() {
        for (const dobbelsteen of this._dobbelstenen) {
            dobbelsteen.rol();
            if (dobbelsteen.aantalOgen === 1)
                this._score += 100;
            else if (dobbelsteen.aantalOgen === 5)
                this._score += 50;
        }
    }
}

class Spel {
    constructor(spelers) {
        // array van spelers
        this._spelers = spelers;
        this._spelerAanZet = spelers[0];
    }
    get spelerAanZet() { return this._spelerAanZet; }
    get aantalSpelers() { return this._spelers.length; }
    get heeftWinnaar() { 
        for (const speler of this._spelers) {
            if (speler.score >= 1000)   // normaal spel: winnen vanaf 10.000
                return true;
        }
        return false;
    }
    get scoreOverzicht() { 
        let output = "";
        for (const speler of this._spelers) {
            output += `${speler.naam}: ${speler.score}\n`;
        }
        return output;
    }
    speel() {
        if (!this.heeftWinnaar) {
            this._spelerAanZet.speel();
        }
    }
    bepaalVolgendeSpeler() {
        if (!this.heeftWinnaar) {
            this._spelerAanZet = this._spelers[(this._spelers.indexOf(this._spelerAanZet) + 1) % this.aantalSpelers];
        }
    }

}

// geeft dobbelsteen object weer in index pagina
function toHtml(spel) {
    // Bepaal speler aan zet
    document.getElementById("speler").innerHTML = "Speler aan zet: " + spel.spelerAanZet.naam;
    // Geef score weer van huidige speler
    document.getElementById('score').innerHTML = `Score = ${spel.spelerAanZet.score}`;
    let counter = 0;
    let dobbelsteenElementen = document.getElementsByTagName("img");
    for (let el of dobbelsteenElementen){
        // itereren over dobbelstenen van speler
        let aantalOgen = spel.spelerAanZet.dobbelstenen[counter].aantalOgen;
        // img elementen aanpassen naargelang aantal ogen op dobbelsteen
        el.setAttribute("src", "images/Dice" + aantalOgen + ".png");
        counter++;
    }
    // Check of speler score behaald die voldoende is om te winnen
    if (spel.heeftWinnaar) {
        alert(`Proficiat ${spel.spelerAanZet.naam}, je hebt gewonnen!\n${
            spel.scoreOverzicht}`);
    }
    else {
        if (document.getElementById('play').value === 'Rol dobbelstenen') {
            document.getElementById('play').value = 'Volgende speler';
            document.getElementById('play').onclick = function() {
                spel.bepaalVolgendeSpeler();
                toHtml(spel);
            };
            } else {
            document.getElementById('play').value = 'Rol dobbelstenen';
            document.getElementById('play').onclick = function() {
                spel.speel();
                toHtml(spel);
            };
            }
    }
}

function init() {
    const aantalSpelers = Number.parseInt(prompt("Met hoeveel spelers gaan we spelen?"));
    // vraag namen van spelers op
    const spelers = [];
    for (let i = 0 ; i < aantalSpelers ; i++){
        let naam = prompt(`Geef naam van speler ${i + 1}:`);
        let speler = new Speler(naam);
        spelers.push(speler);
    }
    // maak nieuw spel object aan met vernoemde spelers
    let spel = new Spel(spelers);
    // Event listening voor rol dobbelstenen en scorebord
    document.getElementById("play").addEventListener("click", function() {
        spel.speel();
        toHtml(spel);
    });
    document.getElementById("scorebord").addEventListener("click", function() {
        alert(spel.scoreOverzicht);
    });
    toHtml(spel);
}

window.addEventListener("load", init);
/***************************************************************************************** */
/* ondestaand stukje code heb je pas in de laatste stap van de oefening nodig (zie opgave) */
/***************************************************************************************** */
// if (document.getElementById('play').value === 'Rol dobbelstenen') {
// 	document.getElementById('play').value = 'Volgende speler';
// 	document.getElementById('play').onclick = function() {
// 		spel.bepaalVolgendeSpeler();
// 		toHtml(spel);
// 	};
// } else {
// 	document.getElementById('play').value = 'Rol dobbelstenen';
// 	document.getElementById('play').onclick = function() {
// 		spel.speel();
// 		toHtml(spel);
// 	};
// }
