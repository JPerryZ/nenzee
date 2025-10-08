const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = {
  user: 'your_db_user',
  password: 'your_db_password',
  server: 'your_server_name_or_ip',
  database: 'Nenzee.com',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sql.connect(config);
    await sql.query`INSERT INTO ContactMessages (Name, Email, Message) VALUES (${name}, ${email}, ${message})`;
    res.send('Data inserted successfully');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
