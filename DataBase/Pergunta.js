const sequelize=require("sequelize");
const connection=require("./database");

const Pergunta=connection.define('perguntas',{
    titulo:{
        type: sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull:false
    }
});

Pergunta.sync({force:false}).then(()=>{}); //nao recria caso ja exista
module.exports=Pergunta;
