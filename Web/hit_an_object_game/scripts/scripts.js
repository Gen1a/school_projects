const DELAY = 1000; // constante voor delay tussen sprite bewegingen
let timeoutID = 0;
const spritesAmount = 5;    // constante voor hoeveelheid sprites
let score = 0;  // houdt score bij

const setup = () => {
    // Telkens gebruiker browserscherm aanpast volgende functie callen
    window.addEventListener("resize", updateScreenSize);
    // Resize functie callen indien gebruiker niet manueel browserschermafmetingen zou aanpassen
    updateScreenSize();

    let btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", startGame);
}

const updateScreenSize = () => {
    let playfield = document.getElementById("playfield");
    playfield.style.width = window.innerWidth+'px';
    playfield.style.height = window.innerHeight+'px';
}

const startGame = () => {
    let playfield = document.getElementById("playfield");
    // Verberg de start button
    let btnStart = document.getElementById("btnStart");
    btnStart.style.display = "none";
    // Toon scorebord
    let scorebord = document.createElement("h3");
    let scorebordContent = document.createTextNode("Aantal hits: " + score);
    scorebord.appendChild(scorebordContent);
    playfield.appendChild(scorebord);
    // Start spriteweergave via interval
    timeoutID = setTimeout(showSprite, DELAY);
}

const showSprite = () => {
    // Verwijder sprites, indien er nog aanwezig zijn in playfield
    if (document.getElementById("playfield").contains(document.getElementsByTagName("img")[0])) {
        document.getElementsByTagName("img")[0].remove();
    }
    // Local variables
    let spriteWidth = 0;
    let spriteHeight = 0;
    let sprite = document.createElement("img");
    // Definieer random geheel getal voor random sprite
    let randomInt = Math.floor(Math.random() * spritesAmount);
    sprite.src = "images/" + randomInt + ".png";
    // Voeg click event listener toe aan sprite
    sprite.addEventListener("click", function calculateScore() {
        // indien op bom geklikt
        if (randomInt == 0) {
            clearTimeout(timeoutID);
            alert("Game over! Je score was " + score + ".");
            // indien scorebord moet aangepast worden:
            // document.getElementsByTagName("h3")[0].innerHTML = "Game over! Je score is " + score + ".";
            resetGame();
        }
        // indien niet op bom geklikt
        else {
            score++;
            document.getElementsByTagName("h3")[0].innerHTML = "Aantal hits: " + score;
        }
    });
    // Bepaal afmetingen van sprite vooraleer weergegeven op pagina (vermijd scroll bars)
    spriteWidth = sprite.width;
    spriteHeight = sprite.height;
    // Bepaald maximum breedte en hoogte playfield
    let scorebordHeight = document.getElementsByTagName("h3")[0].offsetHeight * 2; // * 2 voor cleaner design
    let maxWidth = playfield.clientWidth - 50;
    let maxHeight = playfield.clientHeight - 100;
    // Bepaal willekeurige nieuwe positie rekening houdende met playfield border en scorebord
    let leftPos = Math.floor(Math.random() * (maxWidth - spriteWidth)) - 2;
    let TopPos = Math.floor(Math.random() * (maxHeight - spriteHeight) + scorebordHeight) - 2;
    sprite.style.left = leftPos + "px";
    sprite.style.top = TopPos + "px";
    document.getElementById("playfield").appendChild(sprite);
    // Verwijder sprite na delay
    timeoutID = setTimeout(showSprite, DELAY);
}

const resetGame = () => {
    // Toon Start button
    document.getElementById("btnStart").style.display = "block";
    // Verwijder aanwezige sprite en scorebord
    document.getElementsByTagName("img")[0].remove();
    document.getElementsByTagName("h3")[0].remove();
    // Reset score
    score = 0;
}

window.addEventListener("load", setup);