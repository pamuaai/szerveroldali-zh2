# Szerveroldali webprogramozás - REST API zárthelyi

_2021. december 03._

Tartalom:

- [Szerveroldali webprogramozás - REST API zárthelyi](#szerveroldali-webprogramozás---rest-api-zárthelyi)
  - [Tudnivalók](#tudnivalók)
  - [Hasznos linkek](#hasznos-linkek)
  - [Kezdőcsomag](#kezdőcsomag)
  - [Zárthelyi](#zárthelyi)
    - [Modellek](#modellek)
      - [Modellek közötti relációk](#modellek-közötti-relációk)
      - [Modellek felépítése](#modellek-felépítése)
    - [Feladatok](#feladatok)
      - [`Migrationok, Seeder`](#migrationok-seeder)
      - [`POST /storages`](#post-storages)
      - [`GET /storages`](#get-storages)
      - [`GET /storages/:id`](#get-storagesid)
      - [`POST /auth`](#post-auth)
      - [`POST /ingredients`](#post-ingredients)
      - [`GET /ingredients`](#get-ingredients)
      - [`GET /ingredients/:id`](#get-ingredientsid)
      - [`PUT /ingredients/:id`](#put-ingredientsid)
      - [`POST /recipes`](#post-recipes)
      - [`GET /recipes`](#get-recipes)
      - [`GET /recipes/:id`](#get-recipesid)
      - [`PUT /recipes/:id`](#put-recipesid)
      - [`POST /appliances/changeName`](#post-applianceschangename)
      - [`GET /recipes/statistics`](#get-recipesstatistics)
      - [`GET /storages/:id/clean`](#get-storagesidclean)

## Tudnivalók

- Kommunikáció
  - **A Teams csoport Általános csatornáján a zárthelyi egész ideje alatt lesz egy meeting! Erősen ajánlott, hogy ehhez csatlakozzatok, hiszen elsősorban ebben a meetingben válaszolunk a felmerülő kérdésekre, valamint az esetleges időközben felmerülő információkat is itt osztjuk meg veletek!**
  - Ha a zárthelyi közben valamilyen problémád, kérdésed adódik, akkor keresd az oktatókat a meetingben vagy privát üzenetben (Teams chaten).
- Időkeret
  - **A zárthelyi megoldására 2 óra áll rendelkezésre: *16:15-18:15*.**
  - Oszd be az idődet! Ha egy feladat nem megy, akkor inkább ugord át (legfeljebb később visszatérsz rá), és foglalkozz a többivel, hogy ne veszíts pontot olyan feladatból, amit meg tudnál csinálni!
- Beadás
  - **A beadásra további *15* perc áll rendelkezésre: *18:15-18:30*. Ez a +15 perc *ténylegesen* a beadásra van! *18:30* után a Canvas lezár, és további beadásra nincs lehetőség!**
  - Ha előbb végzel, természetesen 18:30-ig bármikor beadhatod a feladatot.
  - A feladatokat `node_modules` mappa nélkül kell becsomagolni egy .zip fájlba, amit a Canvas rendszerbe kell feltölteni!
  - **A dolgozat megfelelő és hiánytalan beadása a hallgató felelőssége.** Mivel a dolgozat végén külön 15 perces időkeretet adunk a feladat megfelelő, nyugodt körülmények közötti beadására, ebből kifolyólag ilyen ügyekben nem tudunk utólagos reklamációknak helyt adni. Tehát ha valaki a zárthelyi után jelzi, hogy egy vagy több fájlt nem adott be, akkor azt sajnos nem tudjuk elfogadni.
- Értékelés
  - A legutoljára beadott megoldás lesz értékelve.
  - **A zárthelyin legalább a pontok 40%-át, vagyis legalább 12 pontot kell elérni**, ez alatt a zárthelyi sikertelen.
  - Vannak részpontok.
  - A pótzárthelyin nem lehet rontani a zárthelyi eredményéhez képest, csak javítani.
  - **Érvényes nyilatkozat (megfelelően kitöltött statement.txt) hiányában a kapott értékelés érvénytelen, vagyis 0 pont.**
  - Az elrontott, elfelejtett nyilatkozat utólag pótolható: Canvasen kommentben kell odaírni a feladathoz.
- Egyéb
  - A feladatokat JavaScript nyelven, Node.js környezetben kell megoldani!
  - Ha kell, akkor további csomagok telepíthetőek, de ezeket a `package.json` fájlban fel kell tüntetni!
  - Ellenőrzéskor a gyakorlatvezetők az alábbi parancsokat adják ki a feladatonkénti mappákban:
    ```
    # Csomagok telepítése:
    npm install
    # Friss adatbázis létrehozása:
    npm run db
    # Fejlesztői verzió futtatása:
    npm run dev
    ```
  - Ellenőrzéshez és teszteléshez a Node.js *16.x*, az npm *8.x*, és a Firecamp *2.3.x* verzióját fogjuk használni.

## Hasznos linkek

- [ExpressJS dokumentáció](https://expressjs.com/en/4x/api.html)
- [Sequelize dokumentáció](https://sequelize.org/master/)
- [Sequelize API referencia](https://sequelize.org/master/identifiers.html)
- [Firecamp Chrome kiegészítő](https://chrome.google.com/webstore/detail/firecamp-a-campsite-for-d/eajaahbjpnhghjcdaclbkeamlkepinbl)
- [DB Browser for SQLite](https://sqlitebrowser.org/)

## Kezdőcsomag
Segítségképpen készítettünk egy kezdőcsomagot a zárthelyi elkészítéséhez. Csak telepíteni kell a csomagokat, és kezdheted is a fejlesztést.

- A kezdőcsomag elérhető itt:
  - https://github.com/szerveroldali/restapi_kezdocsomag
- Automatikus tesztelő: `npm run test <FELADATOK SZÁMAI>`
  - Pl. 1. és 2. feladat tesztelése: `npm run test 1 2`
  - Minden feladat tesztelése: `npm run test`
- Zippelő: `npm run zip`

## Zárthelyi
Készíts egy REST API-t Node.js-ben, Express, Sequelize és SQLite3 segítségével, amelyben az alább részletezett feladatokat valósítod meg! A szerver a 4000-es porton fusson!

### Modellek

- Recipes: receptek
- Ingredients: hozzávalók
- Appliances: (konyhai) berendezések
- Storages: tárolók

#### Modellek közötti relációk

- Recipe N - N Ingredient
- Appliance 1 - N Recipe
- Storage 1 - N Ingredient

#### Modellek felépítése

- Storage
    - name: string, unique (tehát egyedi, vagyis ugyanaz a név nem szerepelhet kétszer)
    - capacity: number
  - Appliance
    - name: string
  - Ingredient
    - name: string
    - amount: number
    - **S**torageId (összekapcsolásból jön) 
      - **NAGYON FONTOS**, hogy Pascal case-ben legyen, tehát kezdődjön nagybetűvel!
  - Recipe
    - name: string, unique (tehát egyedi, vagyis ugyanaz a név nem szerepelhet egyszerre több beszállítónál)
    - isVegetarian: boolean
    - doneCount: number _(vagyis hányszor készítették már el)_
    - **A**pplianceId (összekapcsolásból jön) 
      - **NAGYON FONTOS**, hogy Pascal case-ben legyen, tehát kezdődjön nagybetűvel!

### Feladatok

- Hozd létre az adatbázist, töltsd fel néhány adattal. Pár végpont védett. Ha nem tudod megoldani az authentikációt, akkor is készítsd el a végpontot! Hitelesített végpontokra a következő fejléccel kell küldeni a kérést:
  ```
  Authorization: Bearer <token>
  ```
  - Firecamp-ben az Auths fül alatt válaszd a "No Auth" felirattal induló menüből a Bearer-t, és akkor elég csak a tokent megadni, a megfelelő fejlécet fogja elküldeni:

    ![Bearer Firecamp](https://i.imgur.com/qduwew7.png)

#### `Migrationok, Seeder`
- Az adatbázis tartalmazza a megfelelő táblákat néhány példaadattal. **(2 pont)**
- Néhány, vagy akár mindegyik adathoz legyen megoldva a megfelelő reláció is! **(2 pont)**

#### `POST /storages`
- Egy név és kapacitás párost küldünk fel JSON objektumként, az adatokat elmentjük a storages táblába, majd visszatérünk az adatbázis rekordnak megfelelő JSON objektummal: pl. id, name, capacity mezőkkel. **(1 pont)**
  - Kérés
    ```json
    {
      "name": "Shelf",
      "capacity": 50
    }
    ```
  - Válasz:
    - 400 Bad request: hibás adat küldése esetén, pl. ha az adatbázis hibát dob ugyanolyan név beszúrása esetén.
    - 201 Created: siker esetén
      ```json
      {
        "id": 11,
        "name": "Shelf",
        "capacity": 50,
        "updatedAt": "2021-12-03...",
        "createdAt": "2021-12-03..."
      }
      ```

#### `GET /storages`
- Összes tároló lekérdezése **(1 pont)**
- Válasz
  - 200 OK
    ```json
    [
      {
        "id": 1,
        "name": "nisi",
        "capacity": 46,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      },
      {
        "id": 2,
        "name": "nesciunt",
        "capacity": 48,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      },
      ...
    ]
    ```

#### `GET /storages/:id`
- Adott azonosítójú tároló lekérdezése **(1 pont)**
  - Válasz
    - 404 Not found: ha a megadott id-vel nem létezik tároló
    - 200 OK: ha létezik az adott id, akkor visszatérünk a megfelelő storage objektummal JSON formában, pl. id, name, capacity mezőkkel.
      ```json
      {
          "id": 1,
          "name": "nisi",
          "capacity": 46,
          "createdAt": "2021-12-03...",
          "updatedAt": "2021-12-03..."
      }
      ```

#### `POST /auth`
- Hitelesítés. A példában megadott email-t (`user@szerveroldali.hu`) kell beégetni a kódba, hogy csak erre adjon vissza token-t, tehát nem kell adatbázis-beli user-eket kezelni! **(3 pont)**
  - Kérés:
    ```json
    {
      "email": "user@szerveroldali.hu"
    }
    ```
  - Válasz:
    - 401 Unauthorized: nem létező email cím esetén
    - 200 OK: létező email cím esetén. Ekkor egy JWT-t kell generálni és elküldeni az `accessToken` mezőben:
      ```json
      {
        "accessToken": "eyJh..."
      }
      ```
- Egyéb:
  - A token aláírásához `HS256` algoritmust használj!
  - A titkosító kulcs értéke "`secret`" legyen!
  - A token payloadjába kerüljön bele az email az alábbi módon:
    ```json
    {
        "email": "user@szerveroldali.hu"
    }
    ```
  - A tokent itt tudod ellenőrizni: [jwt.io](https://jwt.io/)

#### `POST /ingredients`
- Új hozzávaló felvitele **(1 pont)**
  - Kérés: egy hozzávaló JSON formában felküldve.
    ```json
    {
      "name": "Répa",
      "amount": 30,
      "StorageId": 2
    }
    ```
  - Válasz
    - 201 Created: siker esetén, valamint adja vissza a létrehozott hozzávalót
      ```json
      {
        "id": 16,
        "name": "Répa",
        "amount": 30,
        "StorageId": 2,
        "updatedAt": "2021-12-03...",
        "createdAt": "2021-12-03..."
      }
      ```

#### `GET /ingredients`
- Összes hozzávaló lekérése **(1 pont)**
  - Válasz: 200 OK
    ```json
    [
      {
        "id": 1,
        "name": "molestias",
        "amount": 36,
        "StorageId": 10,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      },
      {
        "id": 2,
        "name": "et",
        "amount": 4,
        "StorageId": 1,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      },
      ...
    ]
    ```

#### `GET /ingredients/:id`
- Egy adott hozzávaló lekérdezése **(1 pont)**
  - Válasz
    - 404 Not found: ha a megadott id-vel nem létezik hozzávaló
    - 200 OK
      ```json
      {
        "id": 1,
        "name": "molestias",
        "amount": 36,
        "StorageId": 10,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      }
      ```

#### `PUT /ingredients/:id`
- Egy hozzávaló módosítása **(1 pont)**
  - Kérés: egy hozzávaló JSON formában felküldve.
    ```json
    {
      "name": "Uborka"
    }
    ```
  - Válasz
    - 404 Not found: ha a megadott id-vel nem létezik hozzávaló
    - 200 OK: siker esetén, és a módosított hozzávaló rekordja.
      ```json
      {
        "id": 1,
        "name": "Uborka",
        "amount": 36,
        "StorageId": 10,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      }
      ```

#### `POST /recipes`
- Új recept felvitele **(1 pont)**
  - Kérés: egy recept JSON formában felküldve.
    ```json
    {
        "name": "Carbonara",
        "isVegetarian": false,
        "doneCount": 1,
        "ApplianceId": 3
    }
    ```
  - Válasz
    - 201 Created: siker esetén, és az adott recept
      ```json
      {
        "id": 16,
        "name": "Carbonara",
        "isVegetarian": false,
        "doneCount": 1,
        "ApplianceId": 3,
        "updatedAt": "2021-12-03...",
        "createdAt": "2021-12-03..."
      }
      ```

#### `GET /recipes`
- Összes recept lekérése **(2 pont)**
  - Válasz: 200 OK, a recepthez kapcsolt hozzávalókat listázni kell a példán látható módon
    ```json
    [
      {
        "id": 1,
        "name": "dignissimos",
        "isVegetarian": false,
        "doneCount": 69,
        "ApplianceId": 5,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03...",
        "Ingredients": [
          {
            "id": 9,
            "name": "suscipit",
            "amount": 94,
            "StorageId": 10,
            "createdAt": "2021-12-03...",
            "updatedAt": "2021-12-03...",
            "StorageId": 10,
            "Recipes_Ingredients": {
              "createdAt": "2021-12-03...",
              "updatedAt": "2021-12-03...",
              "IngredientId": 9,
              "RecipeId": 1
            }
          },
          {
            "id": 11,
            "name": "facilis",
            "amount": 38,
            "StorageId": 3,
            "createdAt": "2021-12-03...",
            "updatedAt": "2021-12-03...",
            "StorageId": 3,
            "Recipes_Ingredients": {
              "createdAt": "2021-12-03...",
              "updatedAt": "2021-12-03...",
              "IngredientId": 11,
              "RecipeId": 1
            }
          }
        ]
      },
      ...
    ]
    ```

#### `GET /recipes/:id`
- Egy adott recept lekérdezése **(2 pont)**
  - Válasz
    - 404 Not found: ha a megadott id-vel nem létezik recept
    - 200 OK, a recepthez kapcsolt hozzávalókat listázni kell a példán látható módon
      ```json
      {
        "id": 1,
        "name": "dignissimos",
        "isVegetarian": false,
        "doneCount": 69,
        "ApplianceId": 5,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03...",
        "Ingredients": [
          {
            "id": 11,
            "name": "facilis",
            "amount": 38,
            "StorageId": 3,
            "createdAt": "2021-12-03...",
            "updatedAt": "2021-12-03...",
            "StorageId": 3,
            "Recipes_Ingredients": {
              "createdAt": "2021-12-03...",
              "updatedAt": "2021-12-03...",
              "IngredientId": 11,
              "RecipeId": 1
            }
          },
          {
            "id": 9,
            "name": "suscipit",
            "amount": 94,
            "StorageId": 10,
            "createdAt": "2021-12-03...",
            "updatedAt": "2021-12-03...",
            "StorageId": 10,
            "Recipes_Ingredients": {
              "createdAt": "2021-12-03...",
              "updatedAt": "2021-12-03...",
              "IngredientId": 9,
              "RecipeId": 1
            }
          }
        ]
      }
      ```

#### `PUT /recipes/:id`
- Egy recept módosítása **(1 pont)**
  - Kérés: egy recept módosítani kívánt mezői JSON formában felküldve (nem muszáj minden mezőt felküldeni a frissítéshez).
    ```json
    {
        "name": "Saláta"
    }
    ```
  - Válasz
    - 404 Not found: ha a megadott id-vel nem létezik recept
    - 200 OK: siker esetén, és a módosított recept rekordja.
      ```json
      {
        "id": 1,
        "name": "Saláta",
        "isVegetarian": false,
        "doneCount": 69,
        "ApplianceId": 5,
        "createdAt": "2021-12-03...",
        "updatedAt": "2021-12-03..."
      }
      ```

#### `POST /appliances/changeName`
- Minden olyan berendezés nevét lecseréli, aminek a neve a kérésben meg lett adva (`oldName`), a szintén kérésben megadott új berendezés nevére (`newName`). **(3 pont)**
  - Kérés:
    ```json
      {
        "oldName": "mikró",
        "newName": "sütő"
      }
    ```
  - Válasz
    - 200 OK: siker esetén megadja az összes berendezést, aminek megváltozott a neve, az alábbi példán látható módon:
      ```json
      [
        {
          "id": 1,
          "name": "sütő",
          "createdAt": "2021-12-03...",
          "updatedAt": "2021-12-03..."
        },
        {
          "id": 3,
          "name": "sütő",
          "createdAt": "2021-12-03...",
          "updatedAt": "2021-12-03..."
        }
      ]
      ```

#### `GET /recipes/statistics`
- A receptekről készít statisztikát. **(3 pont)**
  - Válasz
    - 200 OK: vissza kell adni az összes recepthez tartozó statisztikákat. A statisztika a következő mezőkből áll:
      - popularVegetarianRecipeCount: hány olyan vegetáriánus recept van (`isVegetarian`) amit több mint 10 ember csinált meg (`doneCount`)
      - mostPopularRecipeName: annak a receptnek a neve (`name`), aminek a legmagasabb a `doneCount`-ja. Ha több, egyforma doneCount-ú recept van, akkor a legkisebb id-jút kell visszaadni
      - mostExpensiveRecipeName: a legtöbb hozzávalóval (`ingredient`) rendelkező recept neve
        ```json
        {
          "popularVegetarianRecipeCount": 2,
          "mostPopularRecipeName": "dolorem",
          "mostExpensiveRecipeName": "amet",
        }
        ```

#### `GET /storages/:id/clean`
- Ez a végpont **HITELESÍTETT**. Meghívása után az adott tárolóhoz tartozó hozzávalók számát valamilyen módszerrel csökkenteni kell, úgy, hogy az összegük ne haladja meg a tároló kapacitását.
  Vagyis:
    - ha `Storage.capacity >= sum(a Storage-on lévő összes Ingredient.amount)`, akkor nem kell csinálni semmit, csak a helyesen formázott választ elküldeni, **0** értékkel
    - ha `Storage.capacity < sum(a Storage-on lévő összes Ingredient.amount)`, akkor ki kell törölni `sum(a Storage-on lévő összes Ingredient.amount) - Storage.capacity` darab Ingredient-et, az adott storage-ról, és ugyanezt a számot el kell küldeni a válaszban
    - Az elküldendő darabszám elküldése a válaszban, még nem teljes értékű megoldás!
    Segítség:
      - A törlés bárhogy megoldható: amount csökkentéssel (akár negatívba is mehet! én ezt ajánlanám), más tárolóba rakással vagy tényleges törléssel. A lényeg, hogy végül annyi hozzávaló legyen a tárolóban, amennyi a kapacitása.
  **(4 pont)**
    - Válasz
      - 401 Unauthorized: nincs megadva, vagy érvénytelen a token
      - 404 Not Found: ha a megadott id-vel nem létezik tároló
      - 200 OK: illetve vissza kell adni, hogy hány hozzávaló lett kiszedve a tárolóból, az alábbi példa szerint:
        ```json
          {
            "removedIngredientCount": 2
          }
         ```