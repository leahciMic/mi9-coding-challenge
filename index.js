var express = require('express-as-promised');
var lodash = require('lodash');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.text({
  type: 'application/json'
}));

app.post('/', function(request, response) {
  console.log(request.body);
  var payload = request.body;

  try {
    payload = JSON.parse(request.body).payload;
  } catch (e) {
    response.status(400);
    return {error: 'Could not decode request: JSON parsing failed'};
  }

  var shows = payload.filter(function(show) {
    return show.drm && show.episodeCount > 0;
  }).map(function(show) {
    return {
      image: show.image.showImage,
      slug: show.slug,
      title: show.title
    };
  });

  return {response: shows};
});

console.log('Listening on :' + PORT);
app.listen(PORT);
