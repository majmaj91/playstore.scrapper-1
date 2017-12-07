const express = require('express')
const app = express();
var gplay = require('google-play-scraper');

app.get('/', (req, res) => {
  res.send('welcome');
});

app.get('/:appId', (req, res) => {
  console.log(req.params.appId);
  gplay.app({appId: req.params.appId}).then(function(application) {
    // gplay.permissions({appId: application.appId}).then(function(permissions){
    //   gplay.similar({appId: application.appId}).then(function(similarApps) {
        var data = {};
        data.appId = application.appId;
        data.category = application.genre;
        data.installs = { min: application.minInstalls, max: application.maxInstalls };
        // data.permissions = permissions;
        // data.similar = similarApps;
        data.rating = application.score;
        // data.comments = comments;
        res.json(data);
    //   });
    // });
  });
});

app.get('/:appId/permissions', (req, res) => {
  gplay.permissions({appId: req.params.appId}).then(function(permissions){
    res.json(permissions);
  });
});

app.get('/:appId/similar', (req, res) => {
  gplay.similar({appId: req.params.appId}).then(function(similarApps){
    res.json(similarApps);
  });
});

app.get('/:appId/comments', (req, res) => {
  var page = 0*5;
  var allComments = [];
  gplay.reviews({appId: req.params.appId, page: page+0, sort: gplay.sort.NEWEST}).then(function(comments){
    allComments = allComments.concat(comments);
    gplay.reviews({appId: req.params.appId, page: page+1, sort: gplay.sort.NEWEST}).then(function(comments){
      allComments = allComments.concat(comments);
      gplay.reviews({appId: req.params.appId, page: page+2, sort: gplay.sort.NEWEST}).then(function(comments){
        allComments = allComments.concat(comments);
        gplay.reviews({appId: req.params.appId, page: page+3, sort: gplay.sort.NEWEST}).then(function(comments){
          allComments = allComments.concat(comments);
          gplay.reviews({appId: req.params.appId, page: page+4, sort: gplay.sort.NEWEST}).then(function(comments){
            allComments = allComments.concat(comments);
            res.json(allComments);
          });
        });
      });
    });
  });
});

app.get('/:appId/comments/:page', (req, res) => {
  var page = req.params.page*5;
  var allComments = [];
  gplay.reviews({appId: req.params.appId, page: page+0, sort: gplay.sort.NEWEST}).then(function(comments){
    allComments = allComments.concat(comments);
    gplay.reviews({appId: req.params.appId, page: page+1, sort: gplay.sort.NEWEST}).then(function(comments){
      allComments = allComments.concat(comments);
      gplay.reviews({appId: req.params.appId, page: page+2, sort: gplay.sort.NEWEST}).then(function(comments){
        allComments = allComments.concat(comments);
        gplay.reviews({appId: req.params.appId, page: page+3, sort: gplay.sort.NEWEST}).then(function(comments){
          allComments = allComments.concat(comments);
          gplay.reviews({appId: req.params.appId, page: page+4, sort: gplay.sort.NEWEST}).then(function(comments){
            allComments = allComments.concat(comments);
            res.json(allComments);
          });
        });
      });
    });
  });
});

app.listen(8081, '0.0.0.0', () => console.log('Example app listening on port 8081!'))