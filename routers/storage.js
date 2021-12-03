const express = require("express");

const router = express.Router();
const models = require("../models");
const { Storage } = models;

// Egy név és kapacitás párost küldünk fel JSON objektumként, az adatokat elmentjük a storages táblába, majd visszatérünk az adatbázis rekordnak megfelelő JSON objektummal: pl. id, name, capacity mezőkkel.
router.post("/", async (req, res) => {
    const {name, capacity} = req.body;
    if (isNaN(parseInt(capacity))) {
        return res.status(400).send({ message: "A megadott kapacitás nem szám!" });
    }

    if (!name || name.length < 1) {
        return res.status(400).send({ message: "A megadott név nem valid!" });
    }

    try {

        const storage = await Storage.create(req.body);
        res.status(201).send(storage);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

// Összes tároló lekérdezése
router.get("/", async (req, res) => {
    try {
        const storages = await Storage.findAll();
        res.status(200).send(storages);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

//Adott azonosítójú tároló lekérdezése
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    try {
        const storage = await Storage.findByPk(id);
        if (storage === null) {
            return res.status(404).send({ message: "A megadott ID-vel nem létezik tároló!" });
        }
        res.status(200).send(storage);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }

});

module.exports = router;
