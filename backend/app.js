import express from "express";
import morgan from "morgan";
import connectDb from "./db/db.js";
const app = express();

connectDb();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
