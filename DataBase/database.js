const sequelize=require('sequelize');

const connection = new sequelize('perguntas','root','Afm-1802',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports=connection;