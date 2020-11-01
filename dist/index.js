const express = require('express');
var Prismic = require('prismic-javascript');
const http = require('http');
const ngrok = require('ngrok');

var apiEndpoint = "https://randblog.cdn.prismic.io/api/v2";
const app = express();
const port = 14181;
 
app.get("/getDocuments", (req, res) => {
    Prismic.getApi(apiEndpoint, { req: req }).then(function(api) {
        return api.query(""); // An empty query will return all the documents
      }).then(function(response) {
          console.log("200 OK Got Documents from prismic");
          return res.json(response.results);
      }, function(err) {
        console.log("Something went wrong: ", err);
      });      
});

app.get("/getMovieQuote", (req, res) => {
  
});

app.listen(port, async () => {
    console.log("Server running on ", port);
    const url = await ngrok.connect(4200);
    console.log(url);
});
