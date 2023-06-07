const {Sequelize} = require("sequelize")
const sequelize = new Sequelize("","","",{
    host: "localhost",
    dialect: "mysql"
},{
    createdAt:false,
    updatedAt:false
})


sequelize.authenticate().then(()=>{
    console.log("Conexão realizada com sucesso")
}).catch((error)=>{
    console.error("Não conseguiu conectar no banco de dados"+ error)
})

module.exports = sequelize