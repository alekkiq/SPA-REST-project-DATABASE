"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", alusta);

    async function alusta() {
        try {
            const data = await fetch("/haeKaikki");
            const asiakkaat = await data.json();

            const tulosjoukko = document.getElementById("tulosjoukko");
            for (let asiakas of asiakkaat) {
                const tr = document.createElement("tr");
                tr.appendChild(teeSolu(asiakas.asiakasnumero));
                tr.appendChild(teeSolu(asiakas.etunimi));
                tr.appendChild(teeSolu(asiakas.sukunimi));
                tr.appendChild(teeSolu(asiakas.tyyppi));
                tr.appendChild(teeSolu(asiakas.osoite));
                tulosjoukko.appendChild(tr);
            }
        }
        catch (virhe) {
            const viestialue = document.getElementById("viestialue");
            viestialue.textContent = `Virhe: ${virhe.message}`;
            viestialue.setAttribute("class", "virhe");
        }
    }
    function teeSolu(tieto) {
        const td = document.createElement("td");
        td.textContent = tieto;
        return td;
    }
})();