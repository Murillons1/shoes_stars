
const { DataTypes } = require("sequelize")
const db = require("../db/conn")


const Dados = db.define("cadastro",{
    nome : {
        type:DataTypes.STRING(30)
    },

    sobrenome : {
        type:DataTypes.STRING(30)
    },

    cpf : {
        type:DataTypes.STRING(50)
    },

    telefone : {
        type:DataTypes.STRING(50)
    },

    endereco : {
        type:DataTypes.STRING(100)
    },

    email : {
        type:DataTypes.STRING(100)
    },

    senha : {
        type:DataTypes.STRING(50)
    }


},{
    createdAt:false,
    updatedAt:false
})

// Criar_conta.sync({force:true})

module.exports = Dados


