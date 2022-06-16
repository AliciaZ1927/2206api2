import { DataTypes } from "sequelize";
import { database } from "../database/connectdb.js";
import { miU } from "./miU.js";

export const Link = database.define('Link',{
    longLink: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nanoLink: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

miU.hasMany(Link, {foreignKey: 'uid'});
Link.belongsTo(miU, {foreignKey: 'uid'})

// ! TODO: Link關聯性不確定