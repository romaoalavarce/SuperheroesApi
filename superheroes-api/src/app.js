const express = require("express");
const cors = require("cors");

const sequelize = require("./database/database");

const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes");

const app = express();


app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());


Hero.belongsToMany(Movie, {
    through: "HeroMovies"
});

Movie.belongsToMany(Hero, {
    through: "HeroMovies"
});


app.use("/heroes", heroesRoutes);


sequelize.sync()
    .then(() => {
        console.log("Banco de Dados sincronizado.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o Banco:", error);
    });

module.exports = app;
