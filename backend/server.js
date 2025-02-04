const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const pool = require('./config/db.js');

const app = express();
 
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res)=> res.send("Running and Working") )

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  }
)
