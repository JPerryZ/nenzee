import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// SQL Server configuration
const config = {
  user: 'JPerryZ', // Use environment variable for user
  password: "Zdravecky123",
  server: "ASUSJENBOOK14\\JLPER", // Use environment variable for server
  database: 'Nenzee.com',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO ContactMessages (Name, Email, Message)
      VALUES (${name}, ${email}, ${message})
    `;
    res.send('Data inserted successfully');
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Error: ' + err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
