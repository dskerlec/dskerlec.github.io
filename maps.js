var api_key = '966a0a57eeb345ed9ad20329e41f7556';
var api_url = 'https://api.opencagedata.com/geocode/v1/json';

var userInput = document.getElementById('address-input');
var searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', function() {
  var query = userInput.value;

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    if (request.status === 200){
      var data = JSON.parse(request.responseText);
      console.log(data)
      var latitude = data.results[0].geometry.lat;
      var longitude = data.results[0].geometry.lng;
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
    } else {
      console.log("Error getting location data: ", request.statusText);
    }
  };

  request.onerror = function() {
    console.log("Error getting location data: network error");
  };

  request.send();
});
