const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const conn = require("./db/conn")
const bcrypt = require("bcrypt")
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
    res.render('home', {log, usuario , tipoUsuario})
})

//---------------------Paul-George------------------------//

app.get("/pg",(req,res)=>{
    res.render("pg", {log, usuario , tipoUsuario})
})


//--------------------Kawhi-Leonard-----------------------//

app.get("/kw",(req,res)=>{
    res.render("kw", {log, usuario , tipoUsuario})
})

//--------------------Kevin-Durant-----------------------//

app.get("/kd",(req,res)=>{
    res.render("kd", {log, usuario , tipoUsuario})
})

//--------------------Lebron-James-----------------------//


app.get("/lj",(req,res)=>{
    res.render("lj", {log, usuario , tipoUsuario})
})


//--------------------Cadastro-de-Conta-----------------------//
app.post("/cadastro", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const tipo = req.body.tipo;
    const msg = "Preencha todos os dados!!"

    if(!nome  || !email  || !senha  || !cpf  || !telefone || !tipo){
        res.render("cadastro",{log,msg,usuario,tipoUsuario})
    }else{
    bcrypt.hash(senha, 10, async (err, hash) => {
        if (err) {
            console.error("Erro ao criar o hash da senha" + err);
            res.render("home", { log });
            return;
        }
        try {
            await Usuarios.create({nome: nome,email: email,senha: hash, cpf: cpf,telefone: telefone,tipo: tipo,});
            log = true;
            usuario = nome
            tipoUsuario = tipo
            res.render('home', { log,usuario,tipoUsuario });
        } catch (error) {
            console.error("Erro ao criar a senha" + error);
            res.render('home', { log ,usuario,tipoUsuario});
        }
    }); 
    }


});


app.get("/cadastrar",(req,res)=>{
    usuario = ''
    res.render("cadastro", {log, usuario , tipoUsuario})
})

//--------------------Login-de-Conta-----------------------//

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const pesq = await Usuarios.findOne({ where: { email: email } });

    if (!pesq) {
        return res.render('login', { log, msg: 'Usuário não cadastrado' });
    }

    bcrypt.compare(senha, pesq.senha, (err, result) => {
        if (err || !result) {
            return res.render('login', { log, msg: 'Senha incorreta' });
        }

        log = true;
        usuario = pesq.nome;
        tipoUsuario = pesq.tipo;

        if (tipoUsuario === 'admin') {
            res.render('gerenciador', { log, usuario, tipoUsuario });
        } else if (tipoUsuario === 'cliente') {
            res.render('home', { log, usuario, tipoUsuario });
        } else {
        }
    });
});


app.get("/login",(req,res)=>{
    log = false
    usuario = ''
    res.render("login",{log, usuario , tipoUsuario})
})

//--------------------Pedidos-do-Carrinho-----------------------//

app.post("/comprar", async (req, res) => {
    const carrinho = req.body;
  
    try {
      for (const item of carrinho) {
        const produto = await Sneakers.findByPk(item.cod_prod);
  
        if (!produto || produto.quantidadeEstoque < item.qtde) {
          return res.status(400).json({ success: false, error: 'Produto não disponível' });
        }
  
        produto.quantidadeEstoque -= item.qtde;
        await produto.save();
      }
  
      return res.status(200).json({ success: true, message: 'Compra realizada com sucesso!' });
    } catch (error) {
      console.error('Erro ao processar a compra:', error);
      return res.status(500).json({ success: false, error: 'Erro ao processar a compra' });
    }
  });
  

app.get("/pedidos",(req,res)=>{
    res.render("pedidos", {log, usuario , tipoUsuario})
})


//--------------------Cadastro-Shoes------------------------//
app.post('/cadastrar_sneakers', async (req,res)=>{
    const nome = req.body.nome
    const quantidadeEstoque = req.body.quantidadeEstoque
    const precoUnitario = req.body.precoUnitario
    const descricao = req.body.descricao
    console.log(nome,tamanho, cor, quantidadeEstoque, precoUnitario, descricao)
    await Sneakers.create({nome, quantidadeEstoque, precoUnitario, descricao})
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

app.post('/editar_sneakers', async (req,res)=>{
    const  id = req.body.id
    const nome = req.body.nome
    const quantidadeEstoque = Number(req.body.quantidadeEstoque)
    const precoUnitario = Number(req.body.precoUnitario)
    const descricao = req.body.descricao
    const msg = "Dados Atualizados"

    const nome_sneaker = await Sneakers.findOne({raw:true, where: {id:id}})

    if(nome_sneaker != null){
       const dados = {
        id:id,
        nome:nome,
        quantidadeEstoque:quantidadeEstoque,
        precoUnitario:precoUnitario,
        descricao:descricao
       }
        if(nome_sneaker.id === nome_sneaker.id){
        await Sneakers.update(dados,{where: {id:id}})
        res.render("atualiza_shoes",{log,usuario,msg})
        }else{
        res.redirect('/atualiza_shoes')
    

    }}
})


app.get('/atualiza_shoes', (req,res)=>{
    res.render('atualiza_shoes', {log, usuario , tipoUsuario})
})

//-------------------------Apaga-Shoes------------------------//
app.post("/apaga_shoes",async(req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const msg = "Não foi possivel encontrar o Sneaker"

    const pesq = await Sneakers.findOne({raw:true , where: {id:id, nome:nome}})

    if(pesq == null){
        res.render("apaga_shoes",{log,usuario, msg})
    }
    else if(pesq.id === pesq.id || pesq.nome === pesq.nome){
        await Sneakers.destroy({raw:true, where: {id:id}})
        res.render("apaga_shoes", {log,usuario})
    }else{
        res.redirect("apaga_shoes")
    }
})

app.get("/apaga_shoes",(req,res)=>{
    res.render("apaga_shoes", {log, usuario , tipoUsuario})
})

//--------------------------Gráfico-------------------------------//
app.get("/grafico_shoes",(req,res)=>{
    res.render("grafico_shoes", {log, usuario , tipoUsuario})
})

//--------------------Página-de-Privacidade-----------------------//
app.get("/politica",(req,res)=>{
    res.render("privacidade", {log, usuario , tipoUsuario})
})

//--------------------Página-de-Sobre-----------------------//

app.get("/sobre",(req,res)=>{
    res.render("sobre", {log, usuario , tipoUsuario})
})

//--------------------Página-de-Contato-----------------------//
app.post("/contato",async(req,res)=>{
    const nome  = req.body.nome
    const email = req.body.email
    const msg = "Enviado para o suporte com sucesso !!"
    await Usuarios.findOne({raw:true, where: {nome:nome,email:email}})

   res.render("contato",{log,usuario,tipoUsuario,msg})
})


app.get("/contato",(req,res)=>{
    res.render("contato", {log, usuario , tipoUsuario})
})

//---------------Rota principal-e-Callback--------------

app.get("/",(req,res)=>{
    res.render('home', {log, usuario, tipoUsuario})
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


