const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});

