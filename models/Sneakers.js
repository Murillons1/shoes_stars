const { DataTypes } = require("sequelize")
const db = require("../db/conn")


const Sneakers = db.define("sneakers",{
    nome : {
        type:DataTypes.STRING(50)
    },

    tamanho : {
        type:DataTypes.INTEGER
    },

    cor : {
        type:DataTypes.STRING(50)
    },

    quantidadeEstoque : {
        type:DataTypes.INTEGER
    },

    precoUnitario : {
        type:DataTypes.FLOAT
    },

    descricao : {
        type:DataTypes.STRING(100)
    }


},{
    createdAt:false,
    updatedAt:false
})

// Sneakers.sync({force:true})

module.exports = Sneakers


