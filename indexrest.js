"use strict";

const cors = require("cors");
const express = require("express");
const app = express();
const { port, host } = require("./configREST.json");

const Tietovarasto = require("./varasto/tietovarastokerros");
const varasto = new Tietovarasto();

app.use(cors());
app.use(express.json());

app.get("/api/asiakkaat", (req, res) =>
    varasto.haeKaikki().then(tulos => res.json(tulos)).catch(err => res.json(err))
);

app.get("/api/asiakkaat/:asiakasnumero", (req, res) =>
    varasto.hae(req.params.asiakasnumero).then(tulos => res.json(tulos)).catch(err => res.json(err))
);

app.post("/api/asiakkaat", (req, res) => {
    const asiakas = req.body;
    varasto.lisaa(asiakas).then(status => res.json(status)).catch(err => res.json(err))
});

app.delete("/api/asiakkaat/:asiakasnumero", (req, res) => {
    const asiakasnumero = req.params.asiakasnumero;
    varasto.poista(asiakasnumero).then(status => res.json(status)).catch(err => res.json(err))
});

app.put("/api/asiakkaat/:asiakasnumero", (req, res) => {
    const asiakas = req.body;
    const asiakasnumero = req.params.asiakasnumero;
    varasto.paivita(asiakasnumero, asiakas).then(status => res.json(status)).catch(err => res.json(err))
});

app.all("*", (req, res) => res.json({
    viesti: "resurssia ei tuettu", tyyppi: "virhe"
}));

app.listen(port, host, () => console.log(`${host}:${port} palvelee`));