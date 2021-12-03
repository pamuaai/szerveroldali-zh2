const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
// const jwt = require("express-jwt");

router.post("/", async (req, res) => {
    const { email } = req.body;
    if(!email && email !== "user@szerveroldali.hu"){
        return res.status(401).send({ message: "Hozzáférés megtagadva!" });
    }
    return res.send({
        "accessToken": 'auth',
      });
});

module.exports = router;
