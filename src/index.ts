import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apartmentsRouter from './routes/apartments.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Rent Apartments Backend!");
});

app.use('/apartments', apartmentsRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
