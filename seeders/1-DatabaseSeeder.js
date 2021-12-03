"use strict";

// Faker dokumentáció: http://marak.github.io/faker.js/faker.html
const faker = require("faker");
const colors = require("colors");
const models = require("../models");
const { Storage, Appliance, Ingredient, Recipe } = models;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Ide dolgozd ki a seeder tartalmát:
            // ...
            const storagesCount = faker.datatype.number({ min: 5, max: 10 });
            const storages = [];
            const appliancesCount = faker.datatype.number({ min: 5, max: 10 });
            const appliances = [];
            const ingredientsCount = faker.datatype.number({ min: 5, max: 10 });
            const ingredients = [];
            const recipesCount = faker.datatype.number({ min: 5, max: 10 });
            const recipes = [];

            for (let i = 1; i < storagesCount; i++) {
              storages.push(
                await Storage.create({
                  name: faker.lorem.word(),
                  capacity: faker.datatype.number({ min: 3, max: 20 }),
                })
              );
            }


            for (let i = 1; i < appliancesCount; i++) {
                appliances.push(
                    await Appliance.create({
                        name: faker.lorem.word(),
                    })
                );
            }

            for (let i = 1; i < ingredientsCount; i++) {
                ingredients.push(
                    await Ingredient.create({
                        name: faker.lorem.word(),
                        amount: faker.datatype.number({ min: 3, max: 20 }),
                        StorageId: faker.random.arrayElement(storages).id,
                    })
                );
            }

            for (let i = 1; i < recipesCount; i++) {
                recipes.push(
                    await Recipe.create({
                        name: faker.lorem.word(),
                        isVegetarian: faker.datatype.boolean(),
                        doneCount: faker.datatype.number({ min: 3, max: 20 }),
                        ApplianceId: faker.random.arrayElement(appliances).id,
                    })
                );
            }

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
