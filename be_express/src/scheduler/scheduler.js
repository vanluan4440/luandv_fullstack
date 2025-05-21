const cron = require('node-cron');
const weatherService = require('../services/weather.service');
const newsService = require('../services/news.service');
// Fetch data every 5 minutes
cron.schedule('*/1 * * * *', async () => {
  try {
    await fetchWeatherAndInsert()
    await fetchNewsAndInsert()
    
  } catch (error) {
    console.error('Error in scheduled data fetch:', error);
  }
}); 

const fetchWeatherAndInsert = async () => {
  try {
    console.log('Fetching weather data...');
    const fetchWeather = await weatherService.getWeatherByCity('Hanoi');
    await weatherService.insertWeatherData({
      city: fetchWeather.name,
      temperature: fetchWeather.main.temp,
      condition: fetchWeather.weather[0].main
    });
    console.log('Weather data inserted successfully');
  } catch (error) {
    console.error('Error in scheduled data fetch:', error);
  }
};

const fetchNewsAndInsert = async () => {
  try {
    console.log('Fetching news data...');
    const fetchNews = await newsService.getTopHeadlines();

    await newsService.insertNewsData({
      title: fetchNews.articles[0].title,
      source: fetchNews.articles[0].source.name,
      url: fetchNews.articles[0].url,
      publishedAt: fetchNews.articles[0].publishedAt,
      description: fetchNews.articles[0].description
    });
    console.log('News data inserted successfully');
  } catch (error) {
    console.error('Error in scheduled data fetch:', error);
  }
};  
