
const Hero = require("../models/Hero");


async function list(req, res) {
    try {
        const heroes = await Hero.findAll();
        return res.status(200).json(heroes);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar heróis", error: error.message });
    }
}


async function create(req, res) {
    try {
        const { name, universe, power } = req.body;

        if (!name || !universe || !power) {
            return res.status(400).json({
                message: "Nome, universo e poder são obrigatórios"
            });
        }

        const hero = await Hero.create({ name, universe, power });
        return res.status(201).json(hero);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao cadastrar herói", error: error.message });
    }
}


async function getById(req, res) {
    try {
        const { id } = req.params;

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({ message: "Herói não encontrado" });
        }

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar herói", error: error.message });
    }
}


async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, universe, power } = req.body;

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({ message: "Herói não encontrado" });
        }

        await hero.update({ name, universe, power });

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar herói", error: error.message });
    }
}


async function remove(req, res) {
    try {
        const { id } = req.params;

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({ message: "Herói não encontrado" });
        }

        await hero.destroy();

        return res.status(200).json({ message: "Herói excluído com sucesso" });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao excluir herói", error: error.message });
    }
}

module.exports = {
    list,
    create,
    getById,
    update,
    remove
};
