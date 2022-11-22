"use strict";

const { STATUSKOODIT, STATUSVIESTIT } = require("./statuskoodit");

const Tietokanta = require("./tietokanta");

const optiot = require("./SQLconfig.json");

const sql = require("./sqlLauseet.json");

const haeKaikkiSQL = sql.haeKaikki.join(" ");
const haeSQL = sql.hae.join(" ");
const lisaaSQL = sql.lisaa.join(" ");
const paivitaSQL = sql.paivita.join(" ");
const poistaSQL = sql.poista.join(" ");

const { syotaParametrit, paivitaParametrit } = require("./parametrifunktiot");

const perusavain = sql.perusavain;

module.exports = class Tietovarasto {
    constructor() {
        this.db = new Tietokanta(optiot);
    }
    get STATUSKOODIT() {
        return STATUSKOODIT;
    };
    haeKaikki() {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.db.sqlKysely(haeKaikkiSQL);
                resolve(tulos.SQLtulos);
            }
            catch (err) {
                reject(STATUSVIESTIT.OHJELMAVIRHE());
            }
        });
    }

    hae(asiakasnumero) {
        return new Promise(async (resolve, reject) => {
            if (!asiakasnumero) {
                reject(STATUSVIESTIT.EI_LOYTYNYT(" tyhjä "));
            }
            else {
                try {
                    const tulos = await this.db.sqlKysely(haeSQL, [asiakasnumero]);
                    if (tulos.SQLtulos.length > 0) {
                        resolve(tulos.SQLtulos[0]);
                    }
                    else {
                        reject(STATUSVIESTIT.EI_LOYTYNYT(asiakasnumero));
                    }
                }
                catch (err) {
                    reject(STATUSVIESTIT.OHJELMAVIRHE());
                }
            }
        });
    }
    lisaa(uusi) {
        return new Promise(async (resolve, reject) => {
            try {
                if (uusi) {
                    if (!uusi[perusavain]) {
                        reject(STATUSVIESTIT.EI_LISATTY());
                    }
                    else {
                        const tulos = await this.db.sqlKysely(haeSQL, [uusi[perusavain]]);
                        if (tulos.SQLtulos.length > 0) {
                            reject(STATUSVIESTIT.JO_KAYTOSSA(uusi[perusavain]));
                        }
                        else {
                            const status = await this.db.sqlKysely(lisaaSQL, syotaParametrit(uusi));
                            resolve(STATUSVIESTIT.LISAYS_OK(uusi[perusavain]));
                        }
                    }
                }
                else {
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
            }
            catch (err) {
                reject(STATUSVIESTIT.EI_LISATTY());
            }
        });
    }
    poista(asiakasnumero) {
        return new Promise(async (resolve, reject) => {
            if (!asiakasnumero) {
                reject(STATUSVIESTIT.EI_LOYTYNYT(" tyhjä "));
            }
            else {
                try {
                    const status = await this.db.sqlKysely(poistaSQL, [asiakasnumero]);
                    if (status.SQLtulos.muutetutRivitMaara === 0) {
                        resolve(STATUSVIESTIT.EI_POISTETTU());
                    }
                    else {
                        resolve(STATUSVIESTIT.POISTO_OK(asiakasnumero));
                    }
                }
                catch (err) {
                    reject(STATUSVIESTIT.OHJELMAVIRHE());
                }
            }
        });
    }
    paivita(avain, muutos) {
        return new Promise(async (resolve, reject) => {
            try {
                if (avain && muutos) {
                    if (muutos[perusavain] != avain) {
                        reject(STATUSVIESTIT.AVAIMET_EI_SAMAT(avain, muutos[perusavain]));
                    }
                    else {
                        const tulosGet = await this.db.sqlKysely(haeSQL, [avain]);
                        if (tulosGet.SQLtulos.length > 0) {
                            const status = await this.db.sqlKysely(paivitaSQL, paivitaParametrit(muutos));
                            if (status.SQLtulos.muutetutRivitMaara === 0) {
                                resolve(STATUSVIESTIT.EI_PAIVITETTY());
                            }
                            else {
                                resolve(STATUSVIESTIT.PAIVITYS_OK(muutos[perusavain]));
                            }
                        }
                        else {
                            this.lisaa(muutos).then(status => resolve(status)).catch(err => reject(err));
                        }
                    }
                }
                else {
                    reject(STATUSVIESTIT.EI_PAIVITETTY());
                }
            }
            catch (err) {
                reject(STATUSVIESTIT.EI_PAIVITETTY());
            }
        });
    }
}