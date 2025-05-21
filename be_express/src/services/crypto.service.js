const axios = require('axios');
require('dotenv').config();
const { Crypto } = require('../models/crypto.model');
const { Op } = require('sequelize');

// Service to fetch cryptocurrency data from CoinGecko API
class CryptoService {
  constructor() {
    this.baseUrl = 'https://api.coingecko.com/api/v3';
    this.apiKey = process.env.COINGECKO_API_KEY;
  }

  // Fetch Bitcoin data
  async getBitcoinData() {
    try {
      const response = await axios.get(`${this.baseUrl}/simple/price`, {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd',
          include_market_cap: true
        }
      });

      // Normalize the response
      const bitcoinData = response.data.bitcoin;
      return {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: bitcoinData.usd,
        market_cap: bitcoinData.usd_market_cap
      };
    } catch (error) {
      console.error('Error fetching Bitcoin data:', error.message);
      throw error;
    }
  }

  async getTopCryptocurrencies(limit = 10) {
    try {
      const response = await axios.get(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false
        },
        headers: {
          'x-cg-api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cryptocurrency data: ${error.message}`);
    }
  }

  async getCryptoDetails(coinId) {
    try {
      const response = await axios.get(`${this.baseUrl}/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false
        },
        headers: {
          'x-cg-api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cryptocurrency details: ${error.message}`);
    }
  }

  async getCryptoDataFromDatabase() {
    try {
      const cryptoData = await Crypto.findOne({
        where: {
          created_at: {
            [Op.gte]: new Date(Date.now() - 1000 * 60 * 60 * 24)  
          }
        },
        order: [['created_at', 'DESC']]
      });
      return cryptoData;
    } catch (error) {
      throw new Error(`Error querying cryptocurrency data: ${error.message}`);
    }
  }
}

module.exports = new CryptoService(); 