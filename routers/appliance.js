const express = require("express");

const router = express.Router();
const models = require("../models");
const { Appliance } = models;


router.post("/changeName", async (req, res) => {
    const {oldName, newName} = req.body;

    if (!oldName || oldName.length < 1) {
        return res.status(400).send({ message: "A megadott régi név nem valid!" });
    }

    if (!newName || newName.length < 1) {
        return res.status(400).send({ message: "A megadott új név nem valid!" });
    }

    try {
        const appliances = await Appliance.findAll({
            where: {
                name :oldName,
            }
        });
        for(let appliance of appliances){
            appliance.update({name: newName});
        }
        res.status(200).send(appliances);
    } catch (error) {
        return res.status(400).send({ message: "Hiba!", error });
    }
});

module.exports = router;
