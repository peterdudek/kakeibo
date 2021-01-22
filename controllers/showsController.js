const db = require("../models");
const axios = require("axios");

// Defining methods for the subscriptionsController

module.exports = {
  findAll: function (req, res) {
    // console.log("Helloo!!!!")
    // console.log("Tutaj: ", req.q)
    // const q = req.q;
    const { query: params } = req;
    console.log("Oto moje: ", params)


    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/search/pro',
      params: {
        country: 'us',
        service: params.q,
        type: 'series',
        order_by: 'year',
        year_min: '2019',
        year_max: '2021',
        genre: '18',
        page: '1',
        desc: 'true',
        language: 'en'
      },
      headers: {
        'x-rapidapi-key': 'f8d236ea2fmsh9302102012b2447p1c24d0jsnf3561bc132e8',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.json(response.data)

    }).catch(function (error) {
      console.error(error);
    });
  },
};