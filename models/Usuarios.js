const { DataTypes } = require("sequelize")
const db = require("../db/conn")


const Usuario = db.define("usuario",{
    nome : {
        type:DataTypes.STRING(30)
    },

    email : {
        type:DataTypes.STRING(30)
    },

    senha : {
        type:DataTypes.STRING(50)
    },

    telefone : {
        type:DataTypes.STRING(50)
    },

    cpf : {
        type:DataTypes.STRING(50)
    },
    tipo : {
        type:DataTypes.STRING(50)
    }


},{
    createdAt:false,
    updatedAt:false
})

// Usuario.sync({force:true})

module.exports = Usuario


