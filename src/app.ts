import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import { HttpError } from "http-errors";
import expressLayouts from 'express-ejs-layouts'
import dotenv from "dotenv-safe";

const app = express();

dotenv.config();


app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(morgan("dev"));

import foodRoutes from "./routes/login";
import adminRoutes from "./routes/admin";

// app.use('/', foodRoutes);
app.use('/', adminRoutes);

app.use(
  async (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
  }
);

let port: string | number | undefined = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
  console.log("listening");
});
