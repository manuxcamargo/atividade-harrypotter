const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'harrypotter',
  password: 'ds564',
  port: 7007,
});

app.use(express.json());


app.post('/bruxos', async (req, res) => {
  const { nome, idade, casa, habilidade, status, patrono } = req.body;
  const query = 'INSERT INTO bruxos (nome, idade, casa, habilidade, status, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [nome, idade, casa, habilidade, status, patrono];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('error creating wizard 🧙‍♂️:', err);
    res.status(500).send('error creating wizard 🧙‍♂️');
  }
});

app.get('/bruxos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bruxos');
    res.json(result.rows);
  } catch (err) {
    console.error('error getting wizards 🧙‍♂️:', err);
    res.status(500).send('error getting wizards 🧙‍♂️');
  }
});

app.put('/bruxos/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, idade, casa, habilidade, status, patrono } = req.body;
  const query = 'UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade=$4, status=$5, patrono=$6 WHERE id=$7';
  const values = [nome, idade, casa, habilidade, status, patrono, id];

  try {
    await pool.query(query, values);
    res.send('wizard successfully updated 🧙‍♂️');
  } catch (err) {
    console.error('error updating wizard 🧙‍♂️:', err);
    res.status(500).send('error updating wizard 🧙‍♂️');
  }
});

app.delete('/bruxos/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM bruxos WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('wizard successfully deleted 🧙‍♂️');
  } catch (err) {
    console.error('error when deleting wizard 🧙‍♂️:', err);
    res.status(500).send('error when deleting wizard 🧙‍♂️');
  }
});

app.post('/varinhas', async (req, res) => {
  const { material, comprimento, nucleo, data_fabricacao } = req.body;
  const query = 'INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [material, comprimento, nucleo, data_fabricacao];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('error creating wand 🧹:', err);
    res.status(500).send('error creating wand 🧹');
  }
});

app.get('/varinhas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM varinhas');
    res.json(result.rows);
  } catch (err) {
    console.error('error obtaining wands 🧹:', err);
    res.status(500).send('error obtaining wands 🧹');
  }
});

app.put('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const { material, comprimento, nucleo, data_fabricacao } = req.body;
  const query = 'UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, data_fabricacao=$4 WHERE id=$5';
  const values = [material, comprimento, nucleo, data_fabricacao, id];

  try {
    await pool.query(query, values);
    res.send('Varinha atualizada com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar varinha:', err);
    res.status(500).send('Erro ao atualizar varinha');
  }
});
 
app.delete('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM varinhas WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('Varinha deletada com sucesso');
  } catch (err) {
    console.error('Erro ao deletar varinha:', err);
    res.status(500).send('Erro ao deletar varinha');
  }
});

app.get('/', async (req, res) => {
    const frases = [
      "Nitwit! Blubber! Oddment! Tweak!",
      "Wingardium Leviosa!",
      "Expecto Patronum!",
      "Expelliarmus!",
      "Accio!",
      "Alohomora!",
      "Imperio!",
      "Crucio!",
      "Avada Kedavra!",
      "Lumos!",
      "Nox!",
      "Incendio!",
      "Aguamenti!",
      "Protego!",
      "Riddikulus!",
    ];
  
    const randomIndex = Math.floor(Math.random() * frases.length);
    const randomPhrase = frases[randomIndex];
    res.send("Harry Potter lançou sobre você o feitiço: " + randomPhrase);
  });



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}🎀`);
});