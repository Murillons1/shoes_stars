const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const conn = require("./db/conn")
const Usuarios = require("./models/Usuarios")
const PORT = 3000
const hostname ="localhost"

let  log = false
let usuario = ""

//----------------------express-----------------------------//
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
//------------------express=handlebars---------------------//
app.set("view engine","handlebars")
app.engine("handlebars",exphbs.engine())
//--------------------------------------------------------//
app.get("/logout",(req,res)=>{
    log = false
    res.render("home", {log})
})

app.get("/",(req,res)=>{
    res.render("home", {log})
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

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async(req,res)=>{
    const email = req.body.email
    const senha = req.body.senha

    const pesq = await Usuarios.findOne({raw:true, where: {email:email, senha:senha}})

    if(pesq == null){
        res.render("home", {log})
    }
    if(pesq.email === email && pesq.senha === senha){
        let usuario = pesq.nome
        log = true
        res.render("home", {log, usuario})
    }else{
        res.redirect("/")
    }

})

app.post("/cadastro",async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const tipo = req.body.tipo

    await Usuarios.create({nome,email,senha,cpf,telefone})

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


