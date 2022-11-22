"use strict";

const STATUSKOODIT = {
    OHJELMAVIRHE: 0,
    EI_LOYTYNYT: 1,
    LISAYS_OK: 2,
    EI_LISATTY: 3,
    JO_KAYTOSSA: 4,
    POISTO_OK: 5,
    EI_POISTETTU: 6,
    PAIVITYS_OK: 7,
    EI_PAIVITETTY: 8,
    AVAIMET_EI_SAMAT: 9
};

const STATUSVIESTIT = {
    OHJELMAVIRHE: () => ({
        viesti: "Anteeksi! Virhe ohjelmassamme",
        statuskoodi: STATUSKOODIT.OHJELMAVIRHE,
        tyyppi: "virhe"
    }),
    EI_LOYTYNYT: asiakasnumero => ({
        viesti: `Annetulla asiakasnumerolla ${asiakasnumero} ei löytynyt asiakkaita`,
        statuskoodi: STATUSKOODIT.EI_LOYTYNYT,
        tyyppi: "virhe"
    }),
    LISAYS_OK: asiakasnumero => ({
        viesti: `Tieto asiakasnumerolla ${asiakasnumero} lisättiin`,
        statuskoodi: STATUSKOODIT.LISAYS_OK,
        tyyppi: "info"
    }),
    EI_LISATTY: () => ({
        viesti: "Tietoja ei lisätty",
        statuskoodi: STATUSKOODIT.EI_LISATTY,
        tyyppi: "virhe"
    }),
    JO_KAYTOSSA: asiakasnumero => ({
        viesti: `Asiakasnumero ${asiakasnumero} oli jo käytössä`,
        statuskoodi: STATUSKOODIT.JO_KAYTOSSA,
        tyyppi: "virhe"
    }),
    POISTO_OK: asiakasnumero => ({
        viesti: `Tieto asiakasnumerolla ${asiakasnumero} poistettiin`,
        statuskoodi: STATUSKOODIT.POISTO_OK,
        tyyppi: "info"
    }),
    EI_POISTETTU: () => ({
        viesti: "Annetulla asiakasnumerolla ei löytynyt tietoja. Mitään ei poistettu",
        statuskoodi: STATUSKOODIT.EI_POISTETTU,
        tyyppi: "virhe"
    }),
    PAIVITYS_OK: asiakasnumero => ({
        viesti: `Tiedot asiakasnumerolla ${asiakasnumero} päivitettiin`,
        statuskoodi: STATUSKOODIT.PAIVITYS_OK,
        tyyppi: "info"
    }),
    EI_PAIVITETTY: () => ({
        viesti: "Tietoja ei muutettu",
        statuskoodi: STATUSKOODIT.EI_PAIVITETTY,
        tyyppi: "virhe"
    }),
    AVAIMET_EI_SAMAT: (avain, avainOliossa) => ({
        viesti: `Avain ${avain} ei ole sama ` +
            `kuin olion avain ${avainOliossa}`,
        statuskoodi: STATUSKOODIT.AVAIMET_EI_SAMAT,
        tyyppi: "virhe"
    })
};
module.exports = { STATUSKOODIT, STATUSVIESTIT };