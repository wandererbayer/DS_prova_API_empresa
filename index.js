const express = require('express') //importa o express
const app = express() //usa o express
const db = require('./db') //"importa" o módulo do banco de dados

app.use(express.json()) //usa o framework express

const port = 3000 //define a porta do servidor local

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})

// POST - CADASTRAR DEPARTAMENTO

app.post('/cadastrar_dep', (req,res)=>{
    const {nome_departamento} = req.body

    db.query(
        `INSERT INTO departamento (nome_departamento) VALUES (?)`,
        [nome_departamento],
        function(err, results, fields){
            if(err){
                console.error('Erro na inserção', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`Departamento inserido: \n\nDepartamento: ${nome_departamento}`)
})

// POST - CADASTRAR CARGO

app.post('/cadastrar_cargo', (req,res)=>{
    const {nome_cargo, fk_departamento} = req.body

    db.query(
        `INSERT INTO cargo (nome_cargo, fk_departamento) VALUES (?, ?)`,
        [nome_cargo, fk_departamento],
        function(err, results, fields){
            if(err){
                console.error('Erro na inserção', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`Cargo inserido: \n\Cargo: ${nome_cargo}, \n\ID: ${fk_departamento}`)
})

// POST - CADASTRAR FUNCIONÁRIO

app.post('/cadastrar_func', (req,res)=>{
    const {nome, sobrenome, fk_cargo} = req.body
    db.query(
        `INSERT INTO funcionario (nome, sobrenome, fk_cargo) VALUES (?, ?, ?)`,
        [nome, sobrenome, fk_cargo],
        function(err, results, fields){
            if(err){
                console.error('Erro na inserção', err);
                return;
            }
            console.log(results);
            console.log(fields);
        }
    );
    res.send(`Funcionário inserido: \n\Nome: ${nome}, \n\Sobrenome: ${sobrenome}, \n\Sobrenome: ${fk_cargo}`)
})

// GET - SELECIONAR DEPARTAMENTO POR ID

app.get('/selecionarDepPorId/:id_dep', (req, res) =>{
    const {id_dep} = req.params
    db.query(
        `SELECT * FROM departamento WHERE id_dep = ?`,
        [id_dep],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar departamento'});
            }
            return res.json(results);
        }
    );
})

// GET - SELECIONAR FUNCIONÁRIO POR ID

app.get('/selecionarFuncPorId/:id_func', (req, res) =>{
    const {id_func} = req.params
    db.query(
        `SELECT * FROM funcionario WHERE id_func = ?`,
        [id_func],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar funcionário'});
            }
            return res.json(results);
        }
    );
})

// GET - SELECIONAR CARGO POR ID

app.get('/selecionarCargoPorId/:id_cargo', (req, res) =>{
    const {id_cargo} = req.params
    db.query(
        `SELECT * FROM cargo WHERE id_cargo = ?`,
        [id_cargo],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar cargo'});
            }
            return res.json(results);
        }
    );
})

// GET - SELECIONAR CARGO POR DEPARTAMENTO

app.get('/selecionarCargoPorDep/:fk_departamento', (req, res) =>{
    const {fk_departamento} = req.params
    db.query(
        `SELECT * FROM cargo WHERE fk_departamento = ?`,
        [fk_departamento],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar cargo'});
            }
            return res.json(results);
        }
    );
})

// GET - SELECIONAR FUNCIONÁRIO POR NOME

app.get('/selecionarFuncPorNome/:nome', (req, res) =>{
    const {nome} = req.params
    db.query(
        `SELECT * FROM funcionario WHERE nome = ?`,
        [nome],
        function(err, results, fields){
            if(err){
                console.error('Erro na consulta', err);
                return res.status(500).json({error: 'Erro ao consultar funcionário'});
            }
            return res.json(results);
        }
    );
})

// PUT - ATUALIZAR DEPARTAMENTO

app.put('/atualizarDep/:id_dep', (req, res) =>{
    const {id_dep} = req.params
    const {nome_departamento} = req.body
    db.query(
        `UPDATE departamento SET nome_departamento = ? WHERE id_dep = ?`,
        [nome_departamento, id_dep],
        function(err, results, fields){
            if(err){
                console.error('Erro ao atualizar', err);
                return;
            }
            console.log(results);
            console.log(fields);
        })
    
    res.send(`Departamento Atualizado: \n\nDepartamento: ${nome_departamento}`)
});

// PUT - ATUALIZAR CARGO

app.put('/atualizarCargo/:id_cargo', (req, res) =>{
    const {id_cargo} = req.params
    const {nome_cargo, fk_departamento} = req.body
    db.query(
        `UPDATE cargo SET nome_cargo = ? WHERE id_cargo = ?`,
        [nome_cargo, fk_departamento, id_cargo],
        function(err, results, fields){
            if(err){
                console.error('Erro ao atualizar', err);
                return;
            }
            console.log(results);
            console.log(fields);
        })
    
    res.send(`Cargo Atualizado: \n\Cargo: ${nome_cargo}, \n\Departamento: ${fk_departamento}`)
});

// PUT - ATUALIZAR FUNCIONÁRIO

app.put('/atualizarFunc/:id_func', (req, res) =>{
    const {id_func} = req.params
    const {nome, sobrenome, fk_cargo} = req.body
    db.query(
        `UPDATE funcionario SET nome = ?, sobrenome = ?, fk_cargo = ? WHERE id_func = ?`,
        [nome, sobrenome, fk_cargo, id_func],
        function(err, results, fields){
            if(err){
                console.error('Erro ao atualizar', err);
                return;
            }
            console.log(results);
            console.log(fields);
        })
    
    res.send(`Funcionário Atualizado: \n\Cargo: ${nome}, \n\Departamento: ${sobrenome}`)
});

// DELETE - DELETAR DEPARTAMENTO

app.delete('/deletarPorDep/:id_dep', (req, res) =>{
    const id_dep = req.params.id_dep
    db.query(
        `DELETE FROM departamento WHERE id_dep = ?`,
        [id_dep],
        function(err, results, fields){
            if(err){
                console.error('Erro ao excluir', err);
                return res.status(500).json({error: 'Erro ao excluir departamento'});
            }
            return res.json(results);
        }
    );
})

// DELETE - DELETAR CARGO

app.delete('/deletarPorCargo/:id_cargo', (req, res) =>{
    const id_cargo = req.params.id_cargo
    db.query(
        `DELETE FROM cargo WHERE id_cargo = ?`,
        [id_cargo],
        function(err, results, fields){
            if(err){
                console.error('Erro ao excluir', err);
                return res.status(500).json({error: 'Erro ao excluir cargo'});
            }
            return res.json(results);
        }
    );
})

// DELETE - DELETAR FUNCIONÁRIO

app.delete('/deletarPorFunc/:id_func', (req, res) =>{
    const id = req.params.id_func
    db.query(
        `DELETE FROM funcionario WHERE id_func = ?`,
        [id],
        function(err, results, fields){
            if(err){
                console.error('Erro ao excluir', err);
                return res.status(500).json({error: 'Erro ao excluir cargo'});
            }
            return res.json(results);
        }
    );
})