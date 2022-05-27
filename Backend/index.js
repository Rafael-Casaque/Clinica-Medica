//importação dos módulos
const express = require('express');
const cors = require('cors');
const fs = require("fs");
const bodyParser = require('body-parser');

//definição da porta de execução do servidor
const PORT = process.env.PORT || 3000;

//inicializa o app com o express.js
app = express();

//definindo a utilização do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//permite o acesso de outros usuários
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
const corsOptions = {
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

//define o local de escuta do servidor
app.listen(PORT, () => console.log('Servidor inicializado na porta 3000'));