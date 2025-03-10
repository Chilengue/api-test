const { Router } = require("express");
const routes = new Router(); 

// Exemplo de rota GET
routes.get("/", (req, res) => {
    res.send("Bem-vindo à API!");
});

// Exemplo de rota POST
routes.post("/users", (req, res) => {
    const { name, email } = req.body;
    return res.json({ message: `Usuário ${name} cadastrado com sucesso!` });
});

module.exports = routes;
