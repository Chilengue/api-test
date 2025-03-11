import { Sequelize } from "sequelize";

import config from "../config/database";

import Customer from "../model/customer"; // Corrigido nome do arquivo
import User from "../model/user";
import Product from "../model/product";

const models = [Customer, User, Product];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }

    init() {
        models.forEach(model => model.init(this.connection));
    }

    associate() {
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();
