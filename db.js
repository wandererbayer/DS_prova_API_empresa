const mysql = require('mysql2')

const connection = mysql.createConnection({ //cria uma função para uma constante
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'provaDS1'
})

connection.connect(err=>{
    if(err){ //se o erro existe
        console.error("Erro ao conectar ao Banco de Dados", err);
        return;
    }
    console.log('Conectado ao Banco de Dados');
})

module.exports = connection; //exporta para usar em outro arquivo