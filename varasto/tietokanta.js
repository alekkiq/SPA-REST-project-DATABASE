"use strict";

const mariadb = require("mariadb");

module.exports = class Tietokanta {
    constructor(optiot) {
        this.optiot = optiot;
    }
    sqlKysely(sql, parametrit) {
        return new Promise(async (resolve, reject) => {
            let yhteys;
            try {
                yhteys = await mariadb.createConnection(this.optiot);
                let SQLtulos = await yhteys.query(sql, parametrit);
                if (typeof SQLtulos === "undefined") {
                    reject("SQL virhe");
                }
                else if (typeof SQLtulos.affectedRows === "undefined") {
                    delete SQLtulos.meta;
                    resolve({ SQLtulos, tulosjoukko: true });
                }
                else {
                    resolve({
                        SQLtulos: {
                            muutetutRivitMaara: SQLtulos.affectedRows,
                            insertId: SQLtulos.insertId,
                            status: SQLtulos.warningStatus
                        },
                        tulosjoukko: false
                    });
                }
            }
            catch (err) {
                reject(`SQL-virhe ${err}`);
            }
            finally {
                if (yhteys) {
                    yhteys.end();
                }
            }
        });
    }
}