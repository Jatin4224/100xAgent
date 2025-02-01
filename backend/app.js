import express from "express";
import morgan from "morgan";
import connectDb from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();

connectDb();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
