const router = require('express').Router();
const { client } = require('./db');
const bcrypt = require("bcrypt");

router.post('/auth/login', async function (req, res) {

    const res2 = await client.query('SELECT * FROM users WHERE email = $1::text', [req.body.email]);
    if (res2.rowCount === 0) res.json({ "error": "email" });
    const user = res2.rows[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) res.json({ "error": "password" });
    else res.json(user);
});

// api/products/:id
router.get('/:id', function (req, res) {
    res.json({ id: req.params.id });
});

module.exports = router;