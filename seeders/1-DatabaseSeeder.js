"use strict";

// Faker dokumentáció: http://marak.github.io/faker.js/faker.html
const faker = require("faker");
const colors = require("colors");
const models = require("../models");
//const { ... } = models;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Ide dolgozd ki a seeder tartalmát:
            // ...

            console.log("A DatabaseSeeder lefutott".green);
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:".red);
            console.log(colors.gray(e));
        }
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak
    down: async (queryInterface, Sequelize) => {},
};
