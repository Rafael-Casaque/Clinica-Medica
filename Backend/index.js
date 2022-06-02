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

//----------------------------Conteúdo da Rota Raiz------------------------------

app.get('/',(req, res) => {
    const conteudo = `<!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="utf-8">
        <title>Webservice Clínica Médica</title>
    </head>
    
    <body>
        <h1>Webservice de Clínica Médica</h1>
        <p>Este webservice JSON didático contém um sistema de exemplo de uma clínica médica, formada por <b>pacientes</b>,
            <b>médicos</b>, <b>especializações</b> e <b>consultas</b>.
        </p>
        <h2>As rotas disponíveis são:</h2>
        <p><a href="/pacientes">/pacientes</a> suporta as seguintes operações:</p>
        <ul>
            <li><b>GET</b> - Retorna a lista de pacientes.</li>
            <li><b>POST</b> - Adiciona um novo paciente. Requer parâmetros <i>nome</i> e <i>dataNascimento</i> (no formato
                YYYY-MM-DD).</li>
            <li><b>PUT</b> - Edita um paciente. Requer parâmetros <i>id</i>, <i>nome</i> e <i>dataNascimento</i> (no formato
                YYYY-MM-DD).</li>
            <li><b>DELETE</b> - Remove um paciente. Requer parâmetro <i>id</i> (do tipo GET).</li>
        </ul>
        <p><a href="/medicos">/medicos</a> suporta as seguintes operações:</p>
        <ul>
            <li><b>GET</b> - Retorna a lista de médicos.</li>
            <li><b>POST</b> - Adiciona um novo médico. Requer parâmetros <i>nome</i> e <i>idEspecialidade</i>.</li>
            <li><b>PUT</b> - Edita um médico. Requer parâmetros <i>id</i>, <i>nome</i> e <i>idEspecialidade</i>.</li>
            <li><b>DELETE</b> - Remove um médico. Requer parâmetro <i>id</i> (do tipo GET).</li>
        </ul>
        <p><a href="/consultas">/consultas</a> suporta as seguintes operações:</p>
        <ul>
            <li><b>GET</b> - Retorna a lista de consultas.</li>
            <li><b>POST</b> - Adiciona uma nova consulta. Requer parâmetros <i>idPaciente</i> e <i>idMedico</i> e
                <i>data</i> (no formato YYYY-MM-DD HH:mm).
            </li>
            <li><b>PUT</b> - Edita uma consulta. Requer parâmetros <i>id</i>, <i>idPaciente</i> e <i>idMedico</i> e
                <i>data</i> (no formato YYYY-MM-DD HH:mm).
            </li>
            <li><b>DELETE</b> - Remove uma consulta. Requer parâmetro <i>id</i> (do tipo GET).</li>
        </ul>
        <p><a href="/especialidades">/especialidades</a> suporta as seguintes operações:</p>
        <ul>
            <li><b>GET</b> - Retorna a lista de especialidades.</li>
        </ul>
    </body>
    
    </html>`
    res.send(conteudo);
})

//--------------------------------Rotas Paciente---------------------------------

app.get('/pacientes',(req, res) => {        //rota para obtenção de pacientes
    const pacientesDb = require('./pacientes');
    res.send(pacientesDb);
})

app.post('/pacientes',(req, res) => {       //rota para cadastramento de pacientes
    let pacientesDB = require('./pacientes');
    let ultimoID = require('./ultimoID');
    const date = new Date();
    const data = {
        "id": ultimoID[0].id+1,
        "nome": req.body.nome,
        "dataNascimento": req.body.dataNascimento,
        "dataCadastro": `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };    
    ultimoID[0].id += 1;
    pacientesDB.push(data);
    fs.writeFile("pacientes.json", JSON.stringify(pacientesDB), err => {
        if (err) throw err;
    });
    fs.writeFile("ultimoID.json", JSON.stringify(ultimoID), err => {
        if (err) throw err;
    });
    res.send({"status":201});        
})

app.put('/pacientes',(req, res) => {        //rota para edição de pacientes
    let pacientesDB = require('./pacientes');    
    const date = new Date();
    const data = {
        "id": req.body.id,
        "nome": req.body.nome,
        "dataNascimento": req.body.dataNascimento,
        "dataCadastro": `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };
    for(let i = 0; i < pacientesDB.length; i++){
        if(pacientesDB[i].id == req.body.id){
            pacientesDB[i]=data;            
            fs.writeFile("pacientes.json", JSON.stringify(pacientesDB), err => {
                if (err) throw err;
            });  
        }
    }
    res.sendStatus(200);    
})

app.delete('/pacientes',(req, res) => {     //rota para exclusão de pacientes
    let pacientesDB = require('./pacientes');
    for(let i = 0; i < pacientesDB.length; i++){
        if(pacientesDB[i].id == req.body.id){
            pacientesDB.splice(i, 1);            
            fs.writeFile("pacientes.json", JSON.stringify(pacientesDB), err => {
                if (err) throw err;
            });  
        }
    }
    res.sendStatus(200);    
})

//---------------------------------Rotas Médico-----------------------------------

app.get('/medicos',(req, res) => {        //rota para obtenção dos médicos
    const medicosDB = require('./medicos');
    res.send(medicosDB);
})

app.post('/medicos',(req, res) => {       //rota para cadastramento dos médicos
    let medicosDB = require('./medicos');
    let ultimoID = require('./ultimoID');
    const date = new Date();
    const data = {
        "id": ultimoID[0].id+1,
        "nome": req.body.nome,        
        "dataCadastro": `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        "idEspecialidade": req.body.idEspecialidade
    };    
    ultimoID[0].id += 1;
    medicosDB.push(data);
    fs.writeFile("medicos.json", JSON.stringify(medicosDB), err => {
        if (err) throw err;
    });
    fs.writeFile("ultimoID.json", JSON.stringify(ultimoID), err => {
        if (err) throw err;
    });
    res.send({"status":201});        
})

app.put('/medicos',(req, res) => {        //rota para edição dos médicos
    let medicosDB = require('./medicos');    
    const date = new Date();
    const data = {
        "id": req.body.id,
        "nome": req.body.nome,        
        "dataCadastro": `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        "idEspecialidade": req.body.idEspecialidade
    };
    for(let i = 0; i < medicosDB.length; i++){
        if(medicosDB[i].id == req.body.id){
            medicosDB[i]=data;            
            fs.writeFile("medicos.json", JSON.stringify(medicosDB), err => {
                if (err) throw err;
            });  
        }
    }
    res.sendStatus(200);
})

app.delete('/medicos',(req, res) => {     //rota para exclusão dos médicos
    let medicosDB = require('./medicos');
    for(let i = 0; i < medicosDB.length; i++){
        if(medicosDB[i].id == req.body.id){
            medicosDB.splice(i, 1);            
            fs.writeFile("medicos.json", JSON.stringify(medicosDB), err => {
                if (err) throw err;
            });  
        }
    }
    res.sendStatus(200);
})

//---------------------------------Rotas Consultas-----------------------------------

app.get('/consultas',(req, res) => {        //rota para obtenção das consultas
    const consultasDB = require('./consultas');
    res.send(consultasDB);
})

app.post('/consultas',(req, res) => {       //rota para cadastramento das consultas
    let consultasDB = require('./consultas');
    let ultimoID = require('./ultimoID');
    const date = new Date();
    const data = {
        "id": ultimoID[0].id+1,
        "idPaciente": req.body.idPaciente,                
        "idMedico": req.body.idMedico,
        "data": req.body.data
    };    
    ultimoID[0].id += 1;
    consultasDB.push(data);
    fs.writeFile("consultas.json", JSON.stringify(consultasDB), err => {
        if (err) throw err;
    });
    fs.writeFile("ultimoID.json", JSON.stringify(ultimoID), err => {
        if (err) throw err;
    });
    res.sendStatus(200);
})

app.put('/consultas',(req, res) => {        //rota para edição das consultas
    let consultasDB = require('./consultas');    
    const date = new Date();
    const data = {
        "id": req.body.id,
        "idPaciente": req.body.idPaciente,                
        "idMedico": req.body.idMedico,
        "data": req.body.data
    };
    for(let i = 0; i < consultasDB.length; i++){
        if(consultasDB[i].id == req.body.id){
            consultasDB[i]=data;            
            fs.writeFile("consultas.json", JSON.stringify(consultasDB), err => {
                if (err) throw err;
            });  
        }
    }
    res.sendStatus(200);
})

app.delete('/consultas',(req, res) => {     //rota para exclusão das consultas
    let consultasDB = require('./consultas');
    for(let i = 0; i < consultasDB.length; i++){
        if(consultasDB[i].id == req.body.id){
            consultasDB.splice(i, 1);            
            fs.writeFile("consultas.json", JSON.stringify(consultasDB), err => {
                if (err) throw err;
            });  
        }
    }
    res.sendStatus(200);
})

//--------------------------------Rotas Especialidades----------------------------------

app.get('/especialidades',(req, res) => {        //rota para obtenção das especialidades
    const especialidadesDB = require('./especialidades');
    res.send(especialidadesDB);
})

//rota padrão para resposta 404

app.use((req, res) => {
    res.status(404);
    res.send("página não encontrada!");
})

//define o local de escuta do servidor
app.listen(PORT, () => console.log('Servidor inicializado na porta 3000'));