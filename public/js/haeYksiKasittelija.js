"use strict";

(function () {
    let tulosalue;
    let syote;
    document.addEventListener("DOMContentLoaded", alusta);

    function alusta() {
        tulosalue = document.getElementById("tulosalue");
        syote = document.getElementById("asiakasNro");
        document.getElementById("hae")
            .addEventListener("click", () => laheta(true));
        document.getElementById("poista")
            .addEventListener("click", () => laheta(false));
        syote.addEventListener("focus", tyhjenna);
    }

    function tyhjenna() {
        syote.value = "";
        tulosalue.textContent = "";
    }
    async function laheta(hae) {
        const asiakasnumero = syote.value;
        if (asiakasnumero <= 0) {
            paivitaStatus({ viesti: "asiakasnumero oli tyhjä", tyyppi: "virhe" });
        }
        else {
            try {
                const optiot = {
                    method: "POST",
                    body: JSON.stringify({ asiakasnumero }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const reitti = hae ? "/haeYksi" : "/poista";
                const data = await fetch(reitti, optiot);
                const tulos = await data.json();

                if (tulos.viesti) {
                    paivitaStatus(tulos);
                }
                else {
                    paivitaTiedot(tulos);
                }
            }
            catch (virhe) {
                paivitaStatus({ viesti: virhe.message, tyyppi: "virhe" });
            }
        }
    }

    function paivitaStatus(status) {
        tulosalue.textContent = status.viesti;
        tulosalue.setAttribute("class", status.tyyppi);
    }

    function paivitaTiedot(asiakas) {
        tulosalue.innerHTML = `
        <p><span class="selite">ASIAKASNUMERO:</span> <span class="tieto">${asiakas.asiakasnumero}</span></p>
        <p><span class="selite">ETUNIMI:</span> <span class="tieto">${asiakas.etunimi}</span></p>
        <p><span class="selite">SUKUNIMI:</span> <span class="tieto">${asiakas.sukunimi}</span></p>
        <p><span class="selite">TYYPPI:</span> <span class="tieto">${asiakas.tyyppi}</span></p>
        <p><span class="selite">OSOITE:</span> <span class="tieto">${asiakas.osoite}</span></p>
        `;
        tulosalue.removeAttribute("class");
    }

})();