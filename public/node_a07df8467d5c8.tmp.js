const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3011;

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const dbConnection = new sqlite3.Database('Usuarios.db');
dbConnection.serialize(() => {
  dbConnection.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nomeCompleto TEXT, email TEXT, senha TEXT ) ');
});

app.post('/cadastro', (req, res) => {
  const { email, senha, nomeCompleto } = req.body;

  const sql = 'INSERT INTO  usuarios (email,senha,nomeCompleto) VALUES (?, ?, ?)';
  dbConnection.run(sql, [email, senha, nomeCompleto], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao tentar fazer cadastro');
    } else {
      res.redirect('/login.html');
    }
  });
});

// rota de login 

app.post('/login', (req, res) => {
  const { email, senha, } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  dbConnection.get(sql, [email, senha], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro ao tentar fazer login');
    }

    if (!row) {
      return res.status(401).send('Usuario ou senha incorretos');
    }

    // Envie o arquivo initial.html apenas se a autenticação for bem-sucedida
    res.redirect('/initial.html');
  });
});


app.get('/', (req, res) => {
  res.send(`Servidor rodando em http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

