const initialize = () => {
    if (!localStorage.getItem("Contactmanager.personen")){
        initialiseerStorage();
    }
    vulContactenveld();
    $("select").on("change", vulContactInformatie);
    $("#btnNieuw").on("click", voegNieuwContactToe);
    $("#btnBewaar").on("click", bewaarNieuwContact);
}

const initialiseerStorage = () => {
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
    // Sla data op in local storage met key die webapplicatie en soort data verduidelijkt
    localStorage.setItem("Contactmanager.personen", JSON.stringify(personen));
}

const vulContactenveld = () => {
    $("select").html("");
    let counter = 0;
    let personenData = JSON.parse(localStorage.getItem("Contactmanager.personen"));
    for (const persoon of personenData){
        let option = $("<option>")
        .text(persoon.voornaam + " " + persoon.familienaam)
        .data("id", counter++);
        $("select").append(option);
    }
}

const vulContactInformatie = () => {
    let id = $("#contacten option:selected").data("id");    // Haalt custom data attribuut id op voor geselecteerd contact
    let persoonData = JSON.parse(localStorage.getItem("Contactmanager.personen"))[id];
    // Vul contactinformatie afhankelijk van geselecteerd contact
    $(":input[name='voornaam']").val(persoonData.voornaam);
    $(":input[name='familienaam']").val(persoonData.familienaam);
    let geboorteDatum = new Date(Date.parse(persoonData.geboorteDatum));
    $(":input[name='geboorteDatum']").val(geboorteDatum.toISOString().split('T')[0]);
    $(":input[name='email']").val(persoonData.email);
    $(":input[name='aantalKinderen']").val(persoonData.aantalKinderen);
}

const voegNieuwContactToe = () => {
    $("form")[0].reset();   // of $("form").get(0).reset();
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
    // Check of contact reeds aanwezig in contacten object
    var personenData = JSON.parse(localStorage.getItem("Contactmanager.personen"));
    function reedsAanwezig() {
        for (const persoon of personenData){
            if (email.toLowerCase() === persoon.email)
                return true;
        }
        return false;
    }
    // Voeg nieuw contact toe of wijzig bestaand contact
    if (!reedsAanwezig()) {
        // Maak nieuw contact object met gevalideerde info
        let nieuwContact = {
            voornaam: voornaam,
            familienaam: familienaam,
            geboorteDatum: new Date(Date.parse(geboorteDatum)),
            email: email,
            aantalKinderen: aantalKinderen
        }
        // Voeg toe aan localStorage
        personenData.push(nieuwContact);
        localStorage.setItem("Contactmanager.personen", JSON.stringify(personenData));
    }
    else {
        let id =  $("#contacten option:selected").data("id");
        if (id === undefined)
        {
            alert("Gelieve een contact te selecteren.");
            return;
        }
        personenData[id].voornaam = voornaam;
        personenData[id].familienaam = familienaam;
        personenData[id].geboorteDatum = geboorteDatum;
        personenData[id].email = email;
        personenData[id].aantalKinderen = aantalKinderen;
        localStorage.setItem("Contactmanager.personen", JSON.stringify(personenData));
    }
    vulContactenveld();
}

const valideerInformatie = (info, re) => {
    return re.test(info);
}

window.addEventListener("load", initialize);