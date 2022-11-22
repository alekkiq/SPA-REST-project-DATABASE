"use strict";

(function () {
    let nroKentta;
    let etunimiKentta;
    let sukunimiKentta;
    let tyyppiKentta;
    let osoiteKentta;
    let tulosalue;

    let hakutila = true;

    document.addEventListener("DOMContentLoaded", alusta);

    function alusta() {
        nroKentta = document.getElementById("asiakasnro");
        etunimiKentta = document.getElementById("etunimi");
        sukunimiKentta = document.getElementById("sukunimi");
        tyyppiKentta = document.getElementById("tyyppi");
        osoiteKentta = document.getElementById("osoite");
        tulosalue = document.getElementById("tulosalue");
        hakutila = true;
        paivitaKenttaAttribuutit();
        document.getElementById("laheta").addEventListener("click", laheta);
        nroKentta.addEventListener("focus", tyhjenna);
    }

    function tyhjenna() {
        if (hakutila) {
            paivitaKenttienTiedot();
        }
        tulosalue.textContent = "";
        tulosalue.removeAttribute("class");
    }

    function paivitaKenttaAttribuutit() {
        if (hakutila) {
            nroKentta.removeAttribute("readonly");
            etunimiKentta.setAttribute("readonly", true);
            sukunimiKentta.setAttribute("readonly", true);
            tyyppiKentta.setAttribute("readonly", true);
            osoiteKentta.setAttribute("readonly", true);
        }
        else {
            nroKentta.setAttribute("readonly", true);
            etunimiKentta.removeAttribute("readonly");
            sukunimiKentta.removeAttribute("readonly");
            tyyppiKentta.removeAttribute("readonly");
            osoiteKentta.removeAttribute("readonly");
        }
    }

    function paivitaKenttienTiedot(asiakas) {
        if (asiakas) {
            nroKentta.value = asiakas.asiakasnumero;
            etunimiKentta.value = asiakas.etunimi;
            sukunimiKentta.value = asiakas.sukunimi;
            tyyppiKentta.value = asiakas.tyyppi;
            osoiteKentta.value = asiakas.osoite;
            hakutila = false;
        }
        else {
            nroKentta.value = "";
            etunimiKentta.value = "";
            sukunimiKentta.value = "";
            tyyppiKentta.value = "";
            osoiteKentta.value = "";
            hakutila = true;
        }
        paivitaKenttaAttribuutit();
    }

    function paivitaStatus(status) {
        tulosalue.textContent = status.viesti;
        tulosalue.setAttribute("class", status.tyyppi);
    }

    async function laheta() {
        try {
            if (hakutila) {
                const asiakasnumero = +nroKentta.value;
                const optiot = {
                    method: "POST",
                    body: JSON.stringify({ asiakasnumero }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                if (asiakasnumero > 0) {
                    const data = await fetch(`/haeYksi`, optiot);
                    const tulos = await data.json();
                    if (tulos.viesti) {
                        paivitaStatus(tulos);
                    }
                    else {
                        paivitaKenttienTiedot(tulos);
                    }
                }
                else {
                    paivitaStatus({ viesti: "tyhjä numero", tyyppi: "virhe" });
                }
            }
            else {
                const asiakas = {
                    asiakasnumero: +nroKentta.value,
                    etunimi: etunimiKentta.value,
                    sukunimi: sukunimiKentta.value,
                    tyyppi: tyyppiKentta.value,
                    osoite: osoiteKentta.value
                };

                const optiot = {
                    method: "POST",
                    body: JSON.stringify(asiakas),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const data = await fetch(`/muuta`, optiot);
                const tulosJson = await data.json();
                if (tulosJson.viesti) {
                    paivitaStatus(tulosJson);
                }
                hakutila = true;
                paivitaKenttaAttribuutit();
            }
        }
        catch (virhe) {
            paivitaStatus({ viesti: virhe.message, tyyppi: "virhe" });
        }
    }
})();
