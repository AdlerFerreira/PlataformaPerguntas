const sequelize=require("sequelize");
const connection=require("./database");

const Resposta=connection.define('respostas',{
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull:false
    },
    corpo:{
        type: sequelize.TEXT,
        allowNull:false
    }
});

Resposta.sync({force:false}).then(()=>{}); //nao recria caso ja exista

module.exports=Resposta;
