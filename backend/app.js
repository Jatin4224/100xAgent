import express from "express";
import morgan from "morgan";
import connectDb from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
