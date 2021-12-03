const express = require("express");

const router = express.Router();
const models = require("../models");
const { Ingredient, Storage } = models;

router.post("/", async (req, res) => {
    const {name, amount, StorageId} = req.body;
    if (isNaN(parseInt(amount))) {k
        return res.status(400).send({ message: "A megadott mennyiség nem szám!" });
    }

    if(await Ingredient.findOne({where: {name}})){
        return res.status(400).send({ message: "Már létezik ilyen nevű hozzávaló!" });
    }

    if (isNaN(parseInt(StorageId))) {
        return res.status(400).send({ message: "A megadott táróló ID nem szám!" });
    }

    const storage = await Storage.findByPk(StorageId);
    if(!storage){
        return res.status(400).send({ message: "Nincs ilyen ID-jú hozzávaló!" });
    }

    try {

        const ingredient = await Ingredient.create(req.body);
        res.status(201).send(ingredient);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll();
        res.status(200).send(ingredients);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (ingredient === null) {
            return res.status(404).send({ message: "A megadott id-vel nem létezik hozzávaló!" });
        }
        res.status(200).send(ingredient);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }

});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        return res.status(400).send({ message: "A megadott ID nem szám!" });
    }
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (ingredient === null) {
            return res.status(404).send({ message: "A megadott id-vel nem létezik hozzávaló!" });
        }
        await ingredient.update(req.body);
        res.status(200).send(ingredient);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

module.exports = router;
