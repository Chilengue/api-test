const express = require('express');
const routes=require("./routes/custumeres.routes")

class App{
    constructor() {
        this.server=express();
    }
    middlewares(){
        this.server.use(express.json());
    }
    routes(){
      this.server.use(this.routes);  
    }
}

module.exports= new App() .server;