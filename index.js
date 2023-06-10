const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const conn = require("./db/conn")
const Dados = require("./models/Dados")
const PORT = 3000
const hostname ="localhost"


//----------------------express-----------------------------//
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
//------------------express=handlebars---------------------//
app.set("view engine","handlebars")
app.engine("handlebars",exphbs.engine())
//--------------------------------------------------------//
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/pg",(req,res)=>{
    res.render("pg")
})

app.get("/kw",(req,res)=>{
    res.render("kw")
})

app.get("/kd",(req,res)=>{
    res.render("kd")
})

app.get("/lj",(req,res)=>{
    res.render("lj")
})

app.get("/cadastrar",(req,res)=>{
    res.render("cadastro")
})

app.post("/dados",async(req,res)=>{
    const nome = req.body.nome
    const sobrenome = req.body.sobrenome
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const endereco = req.body.endereco
    const email = req.body.email
    const senha = req.body.senha
    console.log(nome,sobrenome,cpf,telefone,endereco,email,senha)
    await Dados.create({nome,sobrenome,cpf,telefone,endereco,email,senha})
    res.redirect("/")
})  


app.get("/pedidos",(req,res)=>{
    res.render("pedidos")
})


app.get("/contato",(req,res)=>{
    res.render("contato")
})




//-----------------------------------------------------//

conn.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Servidor rodando ${hostname}:${PORT}`)
    })
}
).catch((error)=>{
    console.error("Servidor não conectado" + error);
})


