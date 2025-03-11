import { Router } from("express");
import custumers from ("../app/controllers/custumersController");



const  routes = new Router(); 

routes.get("customres", custumers.index);
routes.get("customres/:id", custumers.show);
routes.post("customres", custumers.create);
routes.post("customres/:id", custumers.update);
routes.delete("customres/:id", custumers.destroy);


module.exports = routes;
                  