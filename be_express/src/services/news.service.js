const axios = require('axios');
require('dotenv').config();
const { News } = require('../models/news.model');
const { Op } = require('sequelize');

class NewsService {
  constructor() {
    this.apiKey = process.env.NEWS_API_KEY;
    this.baseUrl = 'https://newsapi.org/v2';
  }

  // Fetch news data for a specific query
  async getNewsByQuery(query) {
    try {
      const response = await axios.get(`${this.baseUrl}/everything`, {
        params: {
          q: query,
          from: new Date().toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0],
          sortBy: 'popularity',
          apiKey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching news data: ${error.message}`);
    }
  }

  // Fetch top headlines
  async getTopHeadlines() {
    try {
      const response = await axios.get(`${this.baseUrl}/top-headlines`, {
        params: {
          country: 'us',
          apiKey: this.apiKey,
          pageSize: 10
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching top headlines: ${error.message}`);
    }
  }

  async insertNewsData(data) {
    try {
      const row = {
        title: data.title,
        source: data.source.name || 'Unknown',
        url: data.url || 'Unknown',
        publishedAt: data.publishedAt || 'Unknown',
        description: data.description || 'Unknown'
      };
      const newsData = await News.create(row);
      return newsData;
    } catch (error) {
      throw new Error(`Error inserting news data: ${error.message}`);
    }
  }

  async getNewsDataFromDatabase() {
    try {
      const newsData = await News.findAll({
        where: {
            created_at: {
                [Op.gte]: new Date(Date.now() - 1000 * 60 * 60 * 24)
            }
        },
        order: [['created_at', 'DESC']]
      });
      return newsData;
    } catch (error) {
      throw new Error(`Error querying news data: ${error.message}`);
    }
  }
}

module.exports = new NewsService(); 