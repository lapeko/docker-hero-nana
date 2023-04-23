const express = require("express");
const bodyParser = require("body-parser");
const { updateUser, getUserById } = require("./users");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/user/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.send(JSON.stringify(user));
});

app.post("/user/:id", async (req, res) => {
  const id = +req.params.id;
  const body = req.body;
  await updateUser({ id, ...body });
  res.send(JSON.stringify(body));
});

app.listen(3000, () => console.log("server is running on port 3000"));
