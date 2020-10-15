const initialize = () => {
    $("#btnWijzigDiv").on("click", wijzigDiv);
    $("input[name='layout']").on("click", wijzigPlaceholder);
    $("#invoerLayout").on("click", function() {
        $(this).val(""); // maakt tekstvak leeg indien er in geklikt wordt
    })
}

const wijzigDiv = () => {
    let invoer = $("#invoerLayout").val().trim(); // trim zodat regex geen foutmelding geeft bij evt space begin/eind van input
    let re_hexcode = RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
    let keuze = $(":input[name='layout']:checked").val();
    if (keuze !== undefined)
    {
        switch (keuze){
            case "achtergrond":
                if (re_hexcode.test(invoer))
                    $("#tekstvak").css("background-color", invoer);
                else
                    alert("De hexcode moet van formaat #xxxxxx zijn.");
                break;
            case "voorgrond":
                if (re_hexcode.test(invoer))
                    $("#tekstvak h3").css("color", invoer);
                else
                    alert("De hexcode moet van formaat #xxxxxx zijn.");
                break;
            case "tekst":
                $("#tekstvak h3").text(invoer);
                break;
            case "hoogte":
            case "breedte":
                let getal = Math.floor(invoer);
                if (Number.isInteger(getal) && getal > 0)
                {
                    if (keuze === "hoogte")
                        $("#tekstvak").css("height", invoer);
                    else // stelt breedte in
                    $("#tekstvak").css("width", invoer);
                }
                else
                    alert("De hoogte moet een geheel getal groter dan 0 zijn.");
                break;
            default:
                alert("Sorry, er is iets misgegaan.");
        }
    }
    else
        alert("Gelieve een keuze te maken tussen de mogelijke opties.");
}

const wijzigPlaceholder = () =>{
    let geselecteerd = $(":input[name='layout']:checked").val();
    switch (geselecteerd){
        case "voorgrond":
        case "achtergrond":
            $("#invoerLayout").prop("placeholder", "vb. #00ff00");
            break;
        case "tekst":
            $("#invoerLayout").prop("placeholder", "vb. Dit is een voorbeeldtekst.");
            break;
        case "hoogte":
        case "breedte":
            $("#invoerLayout").prop("placeholder", "vb. 100");
            break;
        default:
            alert("Sorry, er is iets misgegaan.");
    }
}

window.addEventListener("load", initialize);