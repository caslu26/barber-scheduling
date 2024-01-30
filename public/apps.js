const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3002;

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const dbConnection = new sqlite3.Database('clientes.db');
dbConnection.serialize(() => {
  dbConnection.run('CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY, nomeCompleto TEXT, email TEXT, senha TEXT ) ');
});

app.post('/cadastro', (req, res) => {
  const { email, senha, nomeCompleto } = req.body;

  const sql = 'INSERT INTO clientes (email, senha, nomeCompleto) VALUES (?, ?, ?)';
  dbConnection.run(sql, [email, senha, nomeCompleto], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro ao tentar fazer cadastro');
    } else {
      res.redirect('/login.html');
    }
  });
});

// rota de login 

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM clientes WHERE email = ? AND senha = ?';
  dbConnection.get(sql, [email, senha], (err, row) => {
    console.log('Email:', email);
    console.log('Senha:', senha);

    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro ao tentar fazer login');
    }
    console.log('Resultado da consulta SQL:', row);
    if (!row) {
      return res.status(400).send('Usuário ou senha inválido');
    } else {
      return res.redirect('/index.html');
    }
  });
});



app.get('/', (req, res) => {
  res.send(`Servidor rodando em http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});