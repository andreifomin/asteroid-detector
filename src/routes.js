const axios = require("axios");
require("dotenv").config();

function routes(app) {
  // Adding an HTML form to the App to make it possible to change default values.
  app.get("/", (req, res) => {
    const htmlResponse = `
      <h2>Asteroid Detector</h2>
      <form action="/data" method="POST">
        <label for="dateStart">Date start</label>
        <input type="date" id="dateStart" name="dateStart" value="2019-01-01" required>
        <br>
        <label for="dateEnd">Date end</label>
        <input type="date" id="dateEnd" name="dateEnd" value="2019-01-07" required>
        <br>
        <label for="distance">Distance from the Earth within</label>
        <input type="number" id="distance" name="withinValue" value="9000000" required>
        <input type="radio" id="km" name="withinUnits" value="kilometers" checked>
        <label for="km">kilometers</label>
        <input type="radio" id="mil" name="withinUnits" value="miles">
        <label for="mil">miles</label>
        <br>
        <input type="submit" value="Submit">
      </form>
    `;

    res.send(htmlResponse);
  });

  app.post("/data", async (req, res) => {
    const { dateStart, dateEnd, withinValue, withinUnits } = req.body;

    // Modifying incoming data format to meet the task requirements and avoid hardcoding.
    const requestData = {
      dateStart,
      dateEnd,
      within: {
        value: Number(withinValue),
        units: withinUnits
      }
    };
    console.log(requestData);

    const apiKey = process.env.API_KEY;
    const apiUrl = "https://api.nasa.gov/neo/rest/v1/feed";
    const requestUrl = `${apiUrl}?start_date=${requestData.dateStart}&end_date=${requestData.dateEnd}&api_key=${apiKey}`;
    // const requestUrl = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";

    await axios.get(requestUrl)
      .then(response => {
        // Getting an array with all asteroid data from the response
        const allAsteroidRawData = Object.values(response.data.near_earth_objects).reduce((total, amount) => {
          return total.concat(amount);
        }, []);

        // Filtering asteroid data to name and distance (both distance units)
        const allAsteroidNamesAndDistance = allAsteroidRawData.map(elem => {
          return {
            name: elem.name,  // Names are not changed
            distance: {
              kilometers: Number(elem.close_approach_data[0].miss_distance.kilometers),
              miles: Number(elem.close_approach_data[0].miss_distance.miles),
            },
          };
        });

        // Filtering asteroids - only those within given distance are left
        const asteroidNames = allAsteroidNamesAndDistance
          .filter(elem => elem.distance[requestData.within.units] <= requestData.within.value)
          .map(elem => elem.name);

        const responseData = {
          asteroids: asteroidNames,
        };

        res.json(responseData);
      })
      .catch(error => {
        console.error("Error: ", error.message);
      });
  });
}

module.exports = routes;