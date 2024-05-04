const express = require("express");
const bodyParser = require("body-parser");
const htmlResponse = require("./callbacks/htmlResponse");
const getFilterData = require("./callbacks/getFilterData");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", htmlResponse);
app.post("/data", getFilterData);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});

