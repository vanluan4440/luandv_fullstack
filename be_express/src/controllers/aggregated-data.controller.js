const cryptoService = require('../services/crypto.service');
const weatherService = require('../services/weather.service');
const newsService = require('../services/news.service');

class AggregatedDataController {
  async getAggregatedData(req, res) {
    try {
      const dataSources = [
        cryptoService.getCryptoDataFromDatabase(),
        weatherService.getWeatherDataFromDatabase(),
        newsService.getNewsDataFromDatabase()
      ];

      const [cryptoData, weatherData, newsData] = await Promise.all(dataSources);

      return res.json({
        crypto: cryptoData,
        weather: weatherData,
        news: newsData
      });
    } catch (error) {
      console.error('Error in getAggregatedData:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch aggregated data'
      });
    }
  }
}

module.exports = new AggregatedDataController();