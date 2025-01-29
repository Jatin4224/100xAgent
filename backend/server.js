import http from "http";
import app from "./app.js";
import "dotenv/config.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
