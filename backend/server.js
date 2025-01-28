import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
