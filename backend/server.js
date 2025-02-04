import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", (req, res)=> res.send("Running and Working") )

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  }
)
