const setup = () => {
    let sliders = document.getElementsByClassName("slider");
    for(let i = 0 ; i < sliders.length ; i++)
    {
        sliders[i].addEventListener("change", update);
        sliders[i].addEventListener("input", update);
    }
    update();
    document.querySelector("#btnSave").addEventListener("click", saveSwatch);
}

const update = () => {
    let red = parseInt(document.getElementById("sldRed").value, 10);
    let green = parseInt(document.getElementById("sldGreen").value, 10);
    let blue = parseInt(document.getElementById("sldBlue").value, 10);
    document.getElementById("lblRed").textContent = red;
    document.getElementById("lblGreen").textContent = green;
    document.getElementById("lblBlue").textContent = blue;

    let swatch = document.querySelector("#swatch");
    swatch.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

const saveSwatch = () => {
    let savedList = document.querySelector("#swatchComponents");
    savedList.appendChild(buildSwatch());
}

const buildSwatch = () => {
    // swatch en button aanmaken
    let newDiv = document.createElement("div");
    newDiv.classList.add("swatch");
    let newButton = document.createElement("input");
    newButton.setAttribute("value", "X");
    newButton.setAttribute("type", "button");
    // swatch juiste kleur geven
    configureSwatch(newDiv);
    //swatch eventlistener toevoegen
    newDiv.addEventListener("click", setColorPickerSwatch);
    // swatch en button samenvoegen
    newDiv.appendChild(newButton);
    //button eventlistener toevoegen
    newButton.addEventListener("click", deleteSwatch);
    
    return newDiv;
}

const configureSwatch = (swatch) => {
    let red = document.querySelector("#sldRed").value;
    swatch.dataset.red = red; //opslaan in custom data attribuut om colorpicker setter aan te passen bij verwijderen

    let green = document.querySelector("#sldGreen").value;
    swatch.dataset.green = green; //opslaan in custom data attribuut om colorpicker setter aan te passen bij verwijderen

    let blue = document.querySelector("#sldBlue").value;
    swatch.dataset.blue = blue; //opslaan in custom data attribuut om colorpicker setter aan te passen bij verwijderen

    swatch.style.background = `rgb(${red},${green},${blue})`;
}

const setColorPickerSwatch = (event) => {
    if (event.target.classList.contains("swatch")) { // voorwaarde toevoegen om te vermijden dat colorpicker op grijs springt na verwijderen van swatch in onze lijst (kan ook via custom dataset toevoegen en daarop controleren)
        let swatch = event.target;
        let red = swatch.dataset.red;
        document.querySelector("#sldRed").value = red;
        let green = swatch.dataset.green;
        document.querySelector("#sldGreen").value = green;
        let blue = swatch.dataset.blue;
        document.querySelector("#sldBlue").value = blue;

        update(); // deze call moeten wa maken om de colorpicker terug in te stellen
    }
    else {

    }
}

const deleteSwatch = (event) => {
    event.target.parentElement.remove();
}

window.addEventListener("load", setup);