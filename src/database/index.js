const { Sequelize } = require("sequelize");

const config = require("../config/database");

const Customer = require("../model/customer");
const User = require("../model/user");
const Product = require("../model/product");

const models = [Customer, User, Product];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }

    init() {
        models.forEach((model) => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

module.exports = new Database();
