const axios = require('axios');
const { Weather } = require('../models/weather.model');
const { Op } = require('sequelize');
require('dotenv').config();

// Service to fetch weather data from OpenWeather API
class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  // Fetch weather data for a specific city
  async getWeatherByCity(city) {
    try {
        console.log(this.apiKey);
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  }

  // Fetch weather forecast for a specific city
  async getWeatherForecast(city) {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching weather forecast: ${error.message}`);
    }
  }

  async insertWeatherData(data) {
    try {
      const row ={
        city: data.city,
        temperature: data.temperature,
        condition: data.condition
      }
      const weatherData = await Weather.create(row);
      return weatherData;
    } catch (error) {
      throw new Error(`Error inserting weather data: ${error.message}`);
    }
  }

  async getWeatherDataFromDatabase() {
    try {
      const weatherData = await Weather.findOne({
        where: {
          created_at: {
            [Op.gte]: new Date(Date.now() - 1000 * 60 * 60 * 24)  
          }
        },
        order: [['created_at', 'DESC']]
      });
      return weatherData;
    } catch (error) {
      throw new Error(`Error querying weather data: ${error.message}`);
    }
  } 
}

module.exports = new WeatherService(); 