import express from "express";
import cors from "cors";
import { routes } from "./routes";
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/error';

dotenv.config({path: '.env'});

const app = express();
app.use(errorHandler);

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log("Server is runnig at port 3333 🔥🔥🔥")
});




