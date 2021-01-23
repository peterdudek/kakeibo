import axios from "axios";

// API "WHERE TO WATCH"

export default {


  findMovie: function () {
  // this API will show what streaming services have the desired movie or tv show 
    const options = {
      method: 'POST',
      url: 'https://watch-here.p.rapidapi.com/wheretowatch',
      params: { title: 'game of thrones', mediaType: 'tv show' },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': 'f8d236ea2fmsh9302102012b2447p1c24d0jsnf3561bc132e8',
        'x-rapidapi-host': 'watch-here.p.rapidapi.com'
      },
      data: { mediaType: 'tv show', title: 'game of thrones' }
    };

    axios.request(options)
    .then(function (response) {
      // console.log(response.data[1].Watch);
    })
    .catch(function (error) {
      console.error(error);
    });
  }
};