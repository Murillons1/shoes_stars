const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const conn = require("./db/conn")

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

app.get("/perfil",(req,res)=>{
    res.render("perfil")
})


app.get("/pedidos",(req,res)=>{
    res.render("pedidos")
})


app.get("/contato",(req,res)=>{
    res.render("contato")
})




//-----------------------------------------------------//
app.listen(PORT,hostname,()=>{
    console.log(`Servidor rodando ${hostname}:${PORT}`)
})