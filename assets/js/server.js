// server/server.js
import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// SQL Server configuration
const config = {
  user: 'JPerryZ',
  password: 'Zdravecky123',
  server: 'ASUSJENBOOK14\\JLPER',
  database: 'Nenzee.com',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Contact Form Submission → SQL
app.post('/contactForm', async (req, res) => {
  const {name, email, comment, clientnum} = req.body;

  if (!name || !email || !comment) {
    return res.status(400).send('Missing required fields.');
  }

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO dbo.CommentNenzeeMain (name, email, comment, clientnum)
      VALUES (${name}, ${email}, ${comment}, ${clientnum})
    `;
    res.status(200).send('Data inserted successfully');
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Error inserting data: ' + err.message);
  } finally {
    await sql.close();
  }
});

// Health Check
app.get('/', (req, res) => {
  res.send('Nenzee API active.');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));

/* --------------------------------------------------
   [OPTIONAL FUTURE USE: COSMOS DB CODE]
   import { CosmosClient } from "@azure/cosmos";
   const client = new CosmosClient({
     endpoint: process.env.COSMOS_ENDPOINT,
     key: process.env.COSMOS_KEY
   });
   const database = client.database("Nenzee.com");
   const container = database.container("Comments");
   await container.items.create({
     id: "contactForm",
     name,
     body: comment,
     page: "/contact.html",
     status: "pending",
     when: new Date().toISOString()
   });
-------------------------------------------------- */
