const { DataTypes } = require("sequelize")
const db = require("../db/conn")


const Usuario = db.define("usuario",{
    nome : {
        type:DataTypes.STRING(100),
        allowNull: false
    },

    email : {
        type:DataTypes.STRING(100),
        allowNull: false
    },

    senha : {
        type:DataTypes.STRING(100),
        allowNull: false
    },

    telefone : {
        type:DataTypes.STRING(100),
        allowNull: false
    },

    cpf : {
        type:DataTypes.STRING(100),
        allowNull: false
    },
    tipo : {
        type:DataTypes.STRING(100),
        allowNull: false
    }


},{
    createdAt:false,
    updatedAt:false
})

// Usuario.sync({force:true})

module.exports = Usuario


