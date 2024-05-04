// Default values.
const dateStart = "2019-01-01";
const dateEnd = "2019-01-07";
const withinValue = "9000000";
const withinUnits = ["kilometers", "miles"];

// Adding an HTML form to the App to make it possible to change default values.
const htmlTags = `
  <h2>Asteroid Detector</h2>
  <form action="/data" method="POST">
    <label for="dateStart">Date start</label>
    <input type="date" id="dateStart" name="dateStart" value=${dateStart} required>
    <br>
    <label for="dateEnd">Date end</label>
    <input type="date" id="dateEnd" name="dateEnd" value=${dateEnd} required>
    <br>
    <label for="distance">Distance from the Earth within</label>
    <input type="number" id="distance" name="withinValue" value=${withinValue} required>
    <input type="radio" id="km" name="withinUnits" value=${withinUnits[0]} checked>
    <label for="km">kilometers</label>
    <input type="radio" id="mil" name="withinUnits" value=${withinUnits[1]}>
    <label for="mil">miles</label>
    <br>
    <input type="submit" value="Submit">
  </form>
`;

function htmlResponse(req, res) {
  res.send(htmlTags);
}

module.exports = htmlResponse;