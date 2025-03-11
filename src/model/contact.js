const { Model, Sequelize } = require("sequelize");

class Contact extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: "customer_id" });
    }
}

module.exports = Contact;
