
const Hero = require("../models/Hero");

// GET 
async function list(req, res) {
    try {
        const heroes = await Hero.findAll();
        return res.status(200).json(heroes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// POST 
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
        return res.status(500).json({ message: error.message });
    }
}

// GET 
async function getById(req, res) {
    try {
        const { id } = req.params;

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado"
            });
        }

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PUT 
async function update(req, res) {
    try {
        const { id } = req.params;
        const { name, universe, power } = req.body;

        if (!name || !universe || !power) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios para PUT"
            });
        }

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado"
            });
        }

        await hero.update({ name, universe, power });

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PATCH 
async function patch(req, res) {
    try {
        const { id } = req.params;
        const { name, universe, power } = req.body;

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado"
            });
        }

        const updates = {};

        if (name !== undefined) updates.name = name;
        if (universe !== undefined) updates.universe = universe;
        if (power !== undefined) updates.power = power;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Informe pelo menos um campo para atualizar"
            });
        }

        for (const value of Object.values(updates)) {
            if (typeof value !== "string" || !value.trim()) {
                return res.status(400).json({
                    message: "Os campos não podem ser vazios"
                });
            }
        }

        await hero.update(updates);

        return res.status(200).json(hero);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE 
async function remove(req, res) {
    try {
        const { id } = req.params;

        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).json({
                message: "Herói não encontrado"
            });
        }

        await hero.destroy();

        return res.status(200).json({
            message: "Herói excluído com sucesso"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    list,
    create,
    getById,
    update,
    patch,
    remove
};
