"use strict";  

/** @type {import('sequelize-cli').Migration} */  
module.exports = {  
    up(queryInterface, Sequelize) {  
        return queryInterface.sequelize.transaction(async (t) => {  
            const hasColumn = await queryInterface.showAllTables().then((tables) => {  
                return queryInterface.describeTable("customers", { transaction: t })  
                    .then(attributes => attributes.status !== undefined);  
            });  

            if (!hasColumn) {  
                await queryInterface.addColumn("customers", "status", {  
                    type: Sequelize.ENUM("ACTIVE", "ARCHIVED"),  
                    allowNull: false,  
                    defaultValue: "ACTIVE",  
                    transaction: t,  
                });  
            }  
        });  
    },  

    down: (queryInterface) => {  
        return queryInterface.removeColumn("customers", "status");  
    },  
};  