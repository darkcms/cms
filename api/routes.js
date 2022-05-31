const router = require('express').Router();
const { client } = require('./framework/db');
const bcrypt = require("bcrypt");
const knex = require('knex');

router.post('/auth/login', async function (req, res) {
    const res2 = await client.from("users").where({'email': "admin@mail.com"});
    if (res2.length === 0) res.json({ "error": "email" });
    const user = res2[0];

    //if (!bcrypt.compareSync(req.body.password, user.password)) res.json({ "error": "password" });
    //else res.json(user);
    res.json(user);
});

router.get('/pages', async function (req, res) {
    const res2 = await client.from("pages");
    return res.json(res2);
});

module.exports = router;