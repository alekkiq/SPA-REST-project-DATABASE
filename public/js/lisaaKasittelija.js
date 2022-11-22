"use strict";

(function () {
    let nroKentta;
    let etunimiKentta;
    let sukunimiKentta;
    let tyyppiKentta;
    let osoiteKentta;

    document.addEventListener("DOMContentLoaded", alusta);

    function alusta() {
        nroKentta = document.getElementById("asiakasnro");
        etunimiKentta = document.getElementById("etunimi");
        sukunimiKentta = document.getElementById("sukunimi");
        tyyppiKentta = document.getElementById("tyyppi");
        osoiteKentta = document.getElementById("osoite");

        document.getElementById("laheta")
            .addEventListener("click", laheta);

        nroKentta.addEventListener("focus", tyhjenna);
    }

    function tyhjenna() {
        nroKentta.value = "";
        etunimiKentta.value = "";
        sukunimiKentta.value = "";
        tyyppiKentta.value = "";
        osoiteKentta.value = "";
        tulosalue.textContent = "";
        tulosalue.removeAttribute("class");
    }

    async function laheta() {
        const asiakas = {
            asiakasnumero: +nroKentta.value,
            etunimi: etunimiKentta.value,
            sukunimi: sukunimiKentta.value,
            tyyppi: tyyppiKentta.value,
            osoite: osoiteKentta.value
        };

        try {
            const optiot = {
                method: "POST",
                body: JSON.stringify(asiakas),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const data = await fetch("/lisaa", optiot);
            const tulos = await data.json();

            paivitaStatus(tulos);
        }
        catch (virhe) {
            paivitaStatus({ viesti: virhe.message, tyyppi: "virhe" });
        }
    }

    function paivitaStatus(status) {
        tulosalue.textContent = status.viesti;
        tulosalue.setAttribute("class", status.tyyppi);
    }
})();