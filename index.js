const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const conn = require("./db/conn")
const Usuarios = require("./models/Usuarios")
const Sneakers = require("./models/Sneakers")

const PORT = 3000
const hostname ="localhost"

let  log = false
let usuario = ""
let tipoUsuario = ''

//----------------------express-----------------------------//
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
//------------------express-handlebars---------------------//
app.set("view engine","handlebars")
app.engine("handlebars",exphbs.engine())
//-----------------------Logout----------------------------//
app.get("/logout",(req,res)=>{
    log = false
    usuario = ''
    res.render('home', {log, usuario})
})

//---------------------Paul-George------------------------//

app.get("/pg",(req,res)=>{
    usuario = ''
    res.render("pg", {log, usuario})
})


//--------------------Kawhi-Leonard-----------------------//

app.get("/kw",(req,res)=>{
    usuario = ''
    res.render("kw", {log, usuario})
})

//--------------------Kevin-Durant-----------------------//

app.get("/kd",(req,res)=>{
    usuario = ''
    res.render("kd", {log, usuario})
})

//--------------------Lebron-James-----------------------//


app.get("/lj",(req,res)=>{
    usuario = ''
    res.render("lj", {log, usuario})
})


//--------------------Cadastro-de-Conta-----------------------//
app.post("/cadastro",async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const cpf = req.body.cpf
    const telefone = req.body.telefone
    const tipo = req.body.tipo

    await Usuarios.create({nome,email,senha,cpf,telefone,tipo})

    res.redirect("/")
})  


app.get("/cadastrar",(req,res)=>{
    usuario = ''
    res.render("cadastro", {log, usuario})
})

//--------------------Login-de-Conta-----------------------//

app.post("/login",async(req,res)=>{
    const email = req.body.email
    const senha = req.body.senha

    const pesq = await Usuarios.findOne({raw:true, where: {email:email, senha:senha}})

    let msg = 'Usuário não Cadastrado'
    if(pesq == null){
        res.render('home', {msg})
    }else if(email == pesq.email && senha == pesq.senha && pesq.tipo === 'admin'){
        log = true
        usuario = pesq.nome
        tipoUsuario = pesq.tipo
        res.render('gerenciador', {log, usuario, tipoUsuario})        
    }else if(email == pesq.email && senha == pesq.senha && pesq.tipo === 'cliente'){
        log = true
        usuario = pesq.nome
        tipoUsuario = pesq.tipo
        console.log(usuario)
        res.render('home', {log, usuario, tipoUsuario})
        
    }else{
        res.render('home', {msg})
    }
    // res.redirect('/')
})

app.get("/login",(req,res)=>{
    log = false
    usuario = ''
    res.render("login",{log, usuario})
})

//--------------------Pedidos-do-Carrinho-----------------------//

app.post("/comprar",async(req,res)=>{
    const dados_carrinho = req.body
    console.log(dados_carrinho)

    const atualiza_promise = []

    for(const item of dados_carrinho){
        const produto = await Sneakers.findByPk(item.cod_prod)
        console.log(produto)
        if(produto || produto.quantidadeEstoque < item.qtde){
             return res.status(400).json({message:"Produto não Disponivel" + produto.quantidadeEstoque})
        }
    }
    const atualiza_promessas = await Sneakers.update(
        {quantidadeEstoque: produto.quantidadeEstoque - item.qtde,
        where: {id:cod_}
})
    atualiza_promise.push(atualiza_promessas)
  
try{
    await Promise.all(atualiza_promise)
    res.status(200).json({message:"compra realizada com sucesso!"})
}catch(error){
    console.error("Não foi possivel realizar a compra"+error)
    res.status(500).json({message: "Erro ao processar a compra"})
} 
})


app.get("/pedidos",(req,res)=>{
    usuario = ''
    res.render("pedidos", {log, usuario})
})


//--------------------Cadastro-Shoes------------------------//
app.post('/cadastrar_sneakers', async (req,res)=>{
    const nome = req.body.nome
    const tamanho = req.body.tamanho
    const cor = req.body.cor
    const quantidadeEstoque = req.body.quantidadeEstoque
    const precoUnitario = req.body.precoUnitario
    const descricao = req.body.descricao
    console.log(nome,tamanho, cor, quantidadeEstoque, precoUnitario, descricao)
    await Sneakers.create({nome:nome, tamanho:tamanho, cor: cor, quantidadeEstoque: quantidadeEstoque, precoUnitario: precoUnitario, descricao: descricao})
    let msg = 'Dados Cadastrados'
    res.render('cadastra_shoes', {log, usuario, tipoUsuario, msg})
})

app.get('/cadastra_shoes', (req,res)=>{
    res.render('cadastra_shoes', {log, usuario, tipoUsuario})
})

//-------------------------Lista-Shoes------------------------//

app.get('/lista_shoes', async (req,res)=>{
    const dados = await Sneakers.findAll({raw:true})
    console.log(dados)
    res.render('lista_shoes', {log, usuario, tipoUsuario, valores:dados})
})

//-----------------------Consulta-Shoes------------------------//

app.post('/consulta_sneakers', async (req,res)=>{
    const nome_produto = req.body.nome
    console.log(nome_produto)
    const dados = await Sneakers.findOne({raw:true, where: {nome:nome_produto}})
    console.log(dados)
    res.render('atualiza_shoes',{log, usuario, tipoUsuario, valor:dados} )
})

//-----------------------Editar-Shoes------------------------//

app.post('/atualiza_shoes', async (req,res)=>{
    const nome = req.body.nome
    const tamanho = Number(req.body.tamanho)
    const cor = req.body.cor
    const quantidadeEstoque = Number(req.body.quantidadeEstoque)
    const precoUnitario = Number(req.body.precoUnitario)
    const descricao = req.body.descricao
    console.log(nome,tamanho, cor, quantidadeEstoque, precoUnitario, descricao)
    const dados = await Sneakers.findOne({raw:true, where: {nome:nome_produto}})
    console.log(dados)
    res.redirect('/atualiza_shoes')

})


app.get('/atualiza_shoes', (req,res)=>{
    res.render('atualiza_shoes', {log, usuario, tipoUsuario})
})

//-------------------------Apaga-Shoes------------------------//


app.get("/apaga_shoes",(req,res)=>{
    usuario = ''
    res.render("apaga_shoes", {log, usuario})
})


//--------------------Página-de-Contato-----------------------//


app.get("/contato",(req,res)=>{
    usuario = ''
    res.render("contato", {log, usuario})
})

//---------------Rota principal-e-Callback--------------

app.get("/",(req,res)=>{
    usuario = ''
    res.render('home', {log, usuario})
})


//---------------------Conexão com o Banco de dados----------------------------//

conn.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Servidor rodando ${hostname}:${PORT}`)
    })
}
).catch((error)=>{
    console.error("Servidor não conectado" + error);
})


