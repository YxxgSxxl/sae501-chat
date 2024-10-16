const express = require('express');
const router = express.Router();
const database = require('../utils/db/databaseInit.js');

/*
    Enregistre un utilisateur dans la base de donnée

    Interconnection entre PrestaShop et le chat

    Body {
        id (prestashop)
        username (prestashop)
    }
*/
router.post('/register', async (req, res) => {
    const { id, username } = req.body;

    try {
        // Enregistre l'utilisateur dans la bdd du chat
        await database.query('INSERT INTO user (id, username) VALUES (?, ?)', [id, username]);

        return res.json({
            success: true,
            message: `Félicitations ${username}, vous êtes enregistré !`
        });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'enregistrement de l\'utilisateur.'
        });
    }
});

module.exports = router;
