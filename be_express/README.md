# Multi-API Integration & Data Processing

This project demonstrates the integration of multiple public APIs (CoinGecko and OpenWeather) and normalizes their data into a unified format.

## Features

- Fetches data from CoinGecko API (Bitcoin price and market cap)
- Fetches data from OpenWeather API (Weather data for a specific city)
- Normalizes and combines data from multiple sources
- Stores aggregated data in PostgreSQL database
- Provides endpoints to access current and historical data

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- API keys for OpenWeather API

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=aggregated_data
   DB_USER=postgres
   DB_PASSWORD=your_password
   OPENWEATHER_API_KEY=your_api_key
   PORT=3000
   ```

4. Create the database:
   ```sql
   CREATE DATABASE aggregated_data;
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Get Aggregated Data
```
GET /api/aggregated-data
```
Returns the latest aggregated data from all sources.

### Get Historical Data
```
GET /api/historical-data
```
Returns the last 10 records of aggregated data.

## Response Format

Example response from `/api/aggregated-data`:
```json
{
  "success": true,
  "data": {
    "crypto": {
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 42000,
      "market_cap": 800000000000
    },
    "weather": {
      "city": "New York",
      "temperature": 20,
      "condition": "Cloudy"
    }
  }
}
```

## Error Handling

The API returns appropriate error messages with status codes:
- 500: Server error
- 400: Bad request
- 404: Not found

## Project Structure

```
src/
├── config/         # Database and other configurations
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── services/       # External API services
└── utils/          # Utility functions
``` 