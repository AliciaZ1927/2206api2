import { DataTypes } from "sequelize";
import { database } from "../database/connectdb.js";
import bcryptjs from "bcryptjs";
import { miO } from "./miO.js";


export const miU = database.define('miU',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // defaultValue: false,
        allowNull: false
    },
    Account: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// * bcrytpjs 加密密碼

miU.beforeCreate((miu, options) => {
    return bcryptjs.hash(miu.Password, 10)
    .then(hash => {
        miu.Password = hash;
    })
    .catch(err => {
        throw new Error();
    })
});

miU.hasMany(miO, {foreignKey: 'uoid'});
miO.belongsTo(miU, {foreignKey: 'uoid'})

// miU.hasMany(miO);

// miO.belongsTo(miU, {
//     foreignKey: 'miUOid'
// })


// miU.validPassword = async function(Password) {
//     return await bcryptjs.compareSync(Password, this.Password);
// };


// ? TODO:  設unique: true 重複post會crash 得嘗試其他方法 