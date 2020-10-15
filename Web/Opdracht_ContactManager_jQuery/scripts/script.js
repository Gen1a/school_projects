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
let huidigObject; // om huidig persoon object te bewaren

const initialize = () => {
    vulContactenveld();
    huidigObject = null;
    $("select").on("change", vulContactInformatie);
    $("#btnNieuw").on("click", voegNieuwContactToe);
    $("#btnBewaar").on("click", bewaarNieuwContact);
}

const vulContactenveld = () => {
    $("select").html("");
    let counter = 0;
    for (const persoon of personen) {
        let option = $("<option>")
            .text(persoon.voornaam + " " + persoon.familienaam)
            .prop("id", counter++);
        $("select").append(option);
    }
}

const vulContactInformatie = () => {
    let id = $("#contacten option:selected").prop("id");
    huidigObject = personen[id];
    // Vul contactinformatie afhankelijk van geselecteerd contact
    $(":input[name='voornaam']").val(personen[id].voornaam);
    $(":input[name='familienaam']").val(personen[id].familienaam);
    let geboorteDatum = new Date(Date.parse(personen[id].geboorteDatum));
    $(":input[name='geboorteDatum']").val(geboorteDatum.toISOString().split('T')[0]);
    $(":input[name='email']").val(personen[id].email);
    $(":input[name='aantalKinderen']").val(personen[id].aantalKinderen);
}

const voegNieuwContactToe = () => {
    $("form")[0].reset();   // of $("form").get(0).reset();
    huidigObject = null;
}

const bewaarNieuwContact = () => {
    // Valideer voornaam
    let voornaam = $(":input[name='voornaam']").val();
    const re_naam = RegExp(/^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$/);
    if (!valideerInformatie(voornaam, re_naam)) {
        alert("Voornaam voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer familienaam
    let familienaam = $(":input[name='familienaam']").val();
    if (!valideerInformatie(familienaam, re_naam)) {
        alert("Familienaam voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer geboortedatum
    let geboorteDatum = $(":input[name='geboorteDatum']").val();
    const re_geboorteDatum = RegExp(/(19|20)\d{2}\-(0\d{1}|1[0-2])\-([0-2]\d{1}|3[0-1])/);
    if (!valideerInformatie(geboorteDatum, re_geboorteDatum)) {
        alert("Geboortedatum voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer e-mail
    let email = $(":input[name='email']").val();
    const re_email = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (!valideerInformatie(email.toLowerCase(), re_email)) {
        alert("E-mail voldoet niet aan de voorwaarden.");
        return;
    }
    // Valideer aantal kinderen
    let aantalKinderen = parseInt($(":input[name='aantalKinderen']").val());
    const re_aantalKinderen = RegExp(/[0-9]/);
    if (!valideerInformatie(aantalKinderen, re_aantalKinderen)) {
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
    vulContactenveld();
}

const valideerInformatie = (info, re) => {
    return re.test(info);
}

window.addEventListener("load", initialize);