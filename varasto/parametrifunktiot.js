"use strict";

const syotaParametrit = asiakas => [
    +asiakas.asiakasnumero, asiakas.etunimi, asiakas.sukunimi, asiakas.tyyppi, asiakas.osoite
];

const paivitaParametrit = asiakas => [
    asiakas.etunimi, asiakas.sukunimi, asiakas.tyyppi, asiakas.osoite, asiakas.asiakasnumero
];

module.exports = {
    syotaParametrit,
    paivitaParametrit
};
