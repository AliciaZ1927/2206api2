import Sequelize from "sequelize";

export const database = new Sequelize('book', 'root', '0325', {
    dialect: 'mysql',
    host: 'localhost'
});

