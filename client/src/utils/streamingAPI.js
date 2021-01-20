import axios from "axios";

// API "STREAMING AVAILABILITY"

export default {

  findShows: function () {
  // this API will show what movies or tv shows are available on the given streaming platform
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
      country: 'us',
      service: 'netflix',
      type: 'movie',
      genre: '18',
      page: '1',
      language: 'en'
    },
    headers: {
      'x-rapidapi-key': 'f8d236ea2fmsh9302102012b2447p1c24d0jsnf3561bc132e8',
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {

    console.log(response.data.results[0].originalTitle);
    // return (response.data.results[0].originalTitle);
    
  }).catch(function (error) {
    console.error(error);
  });
  }
};