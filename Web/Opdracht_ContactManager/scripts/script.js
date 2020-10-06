let personen=[       
	{
        voornaam: 'Jan',
        familienaam: 'Janssens',
        geboorteDatum: new Date('2010-10-10'),
        email: 'jan@example.com',
        aantalKinderen: 0
    },
    {
        voornaam: 'Mieke',
        familienaam: 'Mickelsen',
        geboorteDatum: new Date('1980-01-01'),
        email: 'mieke@example.com',
        aantalKinderen: 1
    },
    {
        voornaam: 'Piet',
        familienaam: 'Pieters',
        geboorteDatum: new Date('1970-12-31'),
        email: 'piet@example.com',
        aantalKinderen: 2
    }
];
let huidigObject; // om huidig persoon object te bepalen

const initialize = () => {
    VulContactenveld();
    huidigObject = null;
    document.getElementsByTagName("select")[0].addEventListener("change", VulContactInformatie);
    document.getElementById("btnNieuw").addEventListener("click", VoegNieuwContactToe);
    document.getElementById("btnBewaar").addEventListener("click", BewaarNieuwContact);
}

const VulContactenveld = () => {
    document.getElementsByTagName("select")[0].innerHTML = ""; //
    let contacten = document.getElementsByTagName("select")[0];
    let counter = 0;
    for (const persoon of personen) {
        let option = document.createElement("option");
        option.text = persoon.voornaam + " " + persoon.familienaam;
        option.setAttribute("id", counter++);
        contacten.append(option);
    }
}

const VulContactInformatie = () => {
    let contacten = document.getElementsByTagName("select")[0];
    let id = contacten.options[contacten.selectedIndex].id;
    huidigObject = personen[id];
    // Vul contactinformatie afhankelijk van geselecteerd contact
    document.querySelector("input[name='voornaam']").value = personen[id].voornaam;
    document.querySelector("input[name='familienaam']").value = personen[id].familienaam;
    let geboorteDatum = new Date(Date.parse(personen[id].geboorteDatum));
    document.querySelector("input[name='geboorteDatum']").value = geboorteDatum.toISOString().split('T')[0];
    document.querySelector("input[name='email']").value = personen[id].email;
    document.querySelector("input[name='aantalKinderen']").value = personen[id].aantalKinderen;
}

const VoegNieuwContactToe = () => {
    document.getElementsByTagName("form")[0].reset();
    huidigObject = null;
}

const BewaarNieuwContact = () => {
    // Valideer voornaam
    let voornaam = document.querySelector("input[name='voornaam']").value;
    const re_naam = RegExp(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/);
    if (!ValideerInformatie(voornaam, re_naam)) {
        alert("Voornaam voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer familienaam
    let familienaam = document.querySelector("input[name='familienaam']").value;
    if (!ValideerInformatie(familienaam, re_naam)) {
        alert("Familienaam voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer geboortedatum
    let geboorteDatum = document.querySelector("input[name='geboorteDatum']").value;
    const re_geboorteDatum = RegExp(/(19|20)\d{2}\-(0\d{1}|1[0-2])\-([0-2]\d{1}|3[0-1])/);
    if (!ValideerInformatie(geboorteDatum, re_geboorteDatum)) {
        alert("Geboortedatum voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer e-mail
    let email = document.querySelector("input[name='email']").value;
    const re_email = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (!ValideerInformatie(email.toLowerCase(), re_email)) {
        alert("E-mail voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer aantal kinderen
    let aantalKinderen = parseInt(document.querySelector("input[name='aantalKinderen']").value);
    const re_aantalKinderen = RegExp(/[0-9]/);
    if (!ValideerInformatie(aantalKinderen, re_aantalKinderen)) {
        alert("Aantal kinderen voldoet niet aan de voorwaarden.");
        return;
    }
    // Voeg nieuw contact toe of wijzig bestaand contact
    if (huidigObject === null) {
        // Maak nieuw contact object met gevalideerde info
        let nieuwContact = {
            voornaam: voornaam,
            familienaam: familienaam,
            geboorteDatum: new Date(Date.parse(geboorteDatum)),
            email: email,
            aantalKinderen: aantalKinderen
        }
        // Push naar personen array
        personen.push(nieuwContact);
        // Stel huidig object in als nieuw contact (vermijd dat meermaals klikken op bewaar opnieuw een nieuw contact aanmaakt)
        huidigObject = personen.length - 1; // = this kan ook?
    }
    else {
        huidigObject.voornaam = voornaam;
        huidigObject.familienaam = familienaam;
        huidigObject.geboorteDatum = geboorteDatum;
        huidigObject.email = email;
        huidigObject.aantalKinderen = aantalKinderen;
    }
    VulContactenveld();
}

const ValideerInformatie = (info, re) => {
    return re.test(info);
}

window.addEventListener("load", initialize);