const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./DataBase/database");
const Pergunta = require("./DataBase/Pergunta");
const Resposta = require("./DataBase/Resposta");
const { where } = require("sequelize");
// database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o DB feita com sucesso!")
    })
    .catch((msgError) => {
        console.log(msgError)
    })

// Usar o ejs como view engine 
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Usar o BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas:
// app.get("/", (req, res) => {
//     var nome="Adler Ferreira";
//     var lang = "JavaScript";
//     var exibirMsg=true;
//     var produtos=[
//         {nome:"Douritos",preco:3.14},
//         {nome:"Coca-Cola",preco:5.00},
//         {nome:"Leite",preco:1.45},
//         {nome:"Carne",preco:8.45},
//         {nome:"RedBull",preco:12.50}        
//     ];

//     res.render("index",{
//         nome:nome,
//         lang:lang,
//         empresa:"google",
//         inscritos:8000,
//         msg: exibirMsg,
//         produtos:produtos
//     });
// });

app.get("/", (req, res) => {
    Pergunta.findAll({rall:true, order:[
        ['id','desc'] //(asc ou desc)
    ]}).then(perguntas=>{
        res.render("index",{
            perguntas:perguntas
        });
    }); // o mesmo que o sql select *all from Perguntas
    
});
app.get("/pergunta/:id", (req, res) => {
    var id =req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta=>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: { perguntaId : id}, 
                order:[['id','desc']] //(asc ou desc)
                
            }).then(resposta =>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    resposta:resposta
                });
            });




           
        }else{
            res.redirect("/");
        };
    });
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var desc = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:desc
    }).then(()=>{
        res.redirect("/")
    });
});
app.post("/responder", (req, res) => {
    var perguntaId = req.body.pergunta;
    var corpo = req.body.corpo;
    Resposta.create({
        perguntaId: perguntaId,
        corpo:corpo
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    });
});

app.listen(8080, () => {
    console.log("App rodando");
});