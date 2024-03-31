# Event Finder API

The Event Finder API is a powerful tool built on Node.js and Express.js, designed to facilitate event discovery and exploration. Leveraging modern web technologies, this RESTful API offers a seamless experience for users seeking information about events within a specified radius and date range. Whether you're a developer looking to integrate event search functionality into your application or an end-user searching for local events, the Event Finder API has you covered.

## Features

### Data Creation
The API allows users to add new events to the database via a simple POST request to the `/events` endpoint. This feature enables event organizers and administrators to keep the event database up-to-date with the latest information.

### Event Filtering
Users can retrieve events within a specified radius and date range using the `/events/find` endpoint. This powerful filtering capability enables users to narrow down their search and find events that match their specific criteria, such as location, date, and event type.

### External API Integration
The Event Finder API seamlessly integrates with external services to enhance the user experience. By leveraging weather APIs, users can access real-time weather information for event locations, ensuring they're prepared for any weather conditions. Additionally, the API utilizes distance calculation APIs to provide users with accurate distance measurements between their current location and event venues.

## Getting Started

To run the Event Finder API locally, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the `git clone` command.
2. **Install Dependencies**: Navigate to the project directory and install dependencies by running `npm install`.
3. **Set Up Environment Variables**: Create a `.env` file in the root directory and define any required environment variables, such as the port number.
4. **Prepare Event Data**: Ensure you have a CSV file named `events.csv` containing event data in the root directory. You can use sample data or generate your own dataset.
5. **Start the Server**: Run the server using the command `npm run dev`. The API will be accessible at `http://localhost:{PORT}`.

## Endpoints

- **POST /events**: Add a new event to the database.
- **GET /events/find**: Find events within a specified radius and date range.

## External API Integration

The Event Finder API integrates with the following external APIs:

- **Weather API**: Provides real-time weather information based on event location and date.
- **Distance API**: Calculates the distance between the user's location and event venue, helping users plan their travel accordingly.

## Technologies Used

The Event Finder API utilizes the following technologies:

- Node.js: A runtime environment for executing JavaScript code on the server-side.
- Express.js: A minimalist web framework for Node.js used to build robust APIs.
- Axios: A promise-based HTTP client for making requests to external APIs.
- Moment.js: A JavaScript library for parsing, validating, manipulating, and formatting dates.
- CSV Parser: A library for parsing CSV files and converting them into JavaScript objects.

## Contributing

Contributions to the Event Finder API are welcome! To contribute, fork the repository, make your changes, and submit a pull request. Be sure to follow the contribution guidelines outlined in the repository.

