const jwt = require("express-jwt");

module.exports = jwt({ payload: {
    "email": "user@szerveroldali.hu"
}, secret: "secret", algorithms: ["HS256"] });
