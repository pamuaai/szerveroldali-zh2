const express = require("express");

const router = express.Router();
const models = require("../models");
const { Recipe, Ingredient } = models;

router.post("/", async (req, res) => {
    const {name, isVegetarian, doneCount, ApplianceId} = req.body;

    if (!name || name.length < 1) {
        return res.status(400).send({ message: "A megadott név nem valid!" });
    }

    if(await Recipe.findOne({where: {name}})){
        return res.status(400).send({ message: "Már létezik ilyen nevű recept!" });
    }

    try {
        const recipe = await Recipe.create(req.body);
        return res.status(201).send(recipe);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            // include: [{
            //     model:Ingredient,
            //     through: { attributes: [] },
            // }],
            // group: ["recipe.id", "Ingredients.id"],
        });
        res.status(200).send(recipes);
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
        const recipe = await Recipe.findByPk(id);
        if (recipe === null) {
            return res.status(404).send({ message: "A megadott id-vel nem létezik recept!" });
        }
        res.status(200).send(recipe);
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
        const recipe = await Recipe.findByPk(id);
        if (recipe === null) {
            return res.status(404).send({ message: "A megadott id-vel nem létezik recept!" });
        }
        await recipe.update(req.body);
        res.status(200).send(recipe);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

router.get("/statistics", async (req, res) => {
    try {
        const result = {
            popularVegetarianRecipeCount: undefined,
            // mostPopularRecipeName: "dolorem",
            // mostExpensiveRecipeName: "amet",
        };

        result.popularVegetarianRecipeCount  = await Recipe.findAll({
            where: {
                isVegetarian: true,
                doneCount: {
                    [Op.gt]: 10
                }
            }
        });


        res.status(200).send(recipe);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

module.exports = router;
