const express = require("express");
const app = express();

const router = express.Router();

router.get("/offers", (req, res) => {
  return res.send("Received a GET HTTP method");
});

app.use("/api", router);

app.listen(80, () => console.log(`Example app listening on port 80`));
