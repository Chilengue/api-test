const { Router } = require("express");
const routes = new Router(); 
const custumers = require("../app/controllers/custumersController");

routes.get("customres", custumers.index);
routes.get("customres/:id", custumers.show);
routes.post("customres", custumers.create);
routes.post("customres/:id", custumers.update);
routes.delete("customres/:id", custumers.destroy);


module.exports = routes;
