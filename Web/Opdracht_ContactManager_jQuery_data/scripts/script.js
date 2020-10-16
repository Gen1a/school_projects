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

const initialize = () => {
    vulContactenveld();
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
            .data("persoon", personen[counter++]);
        $("select").append(option);
    }
}

const vulContactInformatie = () => {
    let persoonObject = $("#contacten option:selected").data("persoon");
    // Vul contactinformatie afhankelijk van geselecteerd contact
    $(":input[name='voornaam']").val(persoonObject.voornaam);
    $(":input[name='familienaam']").val(persoonObject.familienaam);
    let geboorteDatum = new Date(Date.parse(persoonObject.geboorteDatum));
    $(":input[name='geboorteDatum']").val(geboorteDatum.toISOString().split('T')[0]);
    $(":input[name='email']").val(persoonObject.email);
    $(":input[name='aantalKinderen']").val(persoonObject.aantalKinderen);
}

const voegNieuwContactToe = () => {
    $("form")[0].reset();   // of $("form").get(0).reset();
    $("#contacten option:selected").prop("selected", false); // deselect een eventuele geselecteerde persoon
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
    if ($("#contacten option:selected").length === 0) { // JQWS met lengte 0
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
    }
    else {
        let persoonObject = $("#contacten option:selected").data("persoon");
        persoonObject.voornaam = voornaam;
        persoonObject.familienaam = familienaam;
        persoonObject.geboorteDatum = geboorteDatum;
        persoonObject.email = email;
        persoonObject.aantalKinderen = aantalKinderen;
    }
    vulContactenveld();
}

const valideerInformatie = (info, re) => {
    return re.test(info);
}

window.addEventListener("load", initialize);