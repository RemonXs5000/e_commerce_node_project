const express = require("express");

const app = express();

app.use(express.json());

app.listen(3000, "127.0.0.1", () => {
  console.log("Server up and Running");
});
