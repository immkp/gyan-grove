import express from 'express'
import axios from 'axios'
import moment from 'moment';
import fs from 'fs';
import csvParser from 'csv-parser'
import dotenv from 'dotenv'


dotenv.config()
const app = express();
const port = process.env.PORT || 3008;

app.use(express.json());
let eventsData = [];
fs.createReadStream('./events.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    // Process each row and push it to the eventsData array
    eventsData.push(row);
  })
  .on('end', () => {
    // Once all data is read, log the parsed data
    // console.log(eventsData);
  });

// Data creation API endpoint
app.post('/events', (req, res) => {
  const newEvent = req.body;
  eventsData.push(newEvent);
  res.send(eventsData);
});

// Event Finder API endpoint
app.get('/events/find', async (req, res) => {
  const { c } = req.query;
  const { latitude, longitude, date } = req.body;
  const currentDate = moment();
  const filteredEvents = eventsData.filter((event) => {
    const eventDate = moment(event.date, 'YYYY-MM-DD');
    const daysDifference = eventDate.diff(currentDate, 'days');
    return daysDifference >= 0 && daysDifference < 14;
  });

  // Sort events by date
  filteredEvents.sort((a, b) => moment(a.date, 'YYYY-MM-DD').diff(moment(b.date, 'YYYY-MM-DD')));

  // Call external APIs (weather and distance)
  const promises = filteredEvents.map(async (event) => {
    const weatherResponse = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${encodeURIComponent(event.city)}&date=${event.date}`);
    const distanceResponse = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`);

    const weather = weatherResponse.data.weather;
    const distance = distanceResponse.data.distance;

    return { ...event, weather, distance };
  });

  const results = await Promise.all(promises);
  const pageSize = 10;
  const totalPages = Math.ceil(results.length / pageSize);
  let finalResult = []
  for (let page = 1; page <= totalPages; page++) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, results.length);
    const filteredResults = results.slice(startIndex, endIndex);
    finalResult.push(filteredResults,
      "page =" + page,
      "pageSize =" + 10,
      "totalEvents =" + results.length,
      "totalPages=" + totalPages
    )
  }
  console.log(finalResult)
  res.json({ "events" :finalResult });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
