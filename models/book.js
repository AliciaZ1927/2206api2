import { DataTypes } from "sequelize";
import { database } from "../database/connectdb.js";
import { miO } from "./miO.js";

export const book = database.define('books',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: false,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

miO.belongsToMany(book, {
    through: 'mioItem'
})