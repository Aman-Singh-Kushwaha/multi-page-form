const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const pool = require('./config/db.js');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.routes');
const campaignRoutes = require('./routes/campaign.routes');

const app = express();
 
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(errorHandler); // Global Server Error Middleware

app.get("/", (req, res)=> res.send("API Running and Working at /api") )

app.use('/api/auth', authRoutes);

app.use('/api/campaign', campaignRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  }
)
