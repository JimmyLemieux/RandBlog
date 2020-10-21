const express = require('express');
var Prismic = require('prismic-javascript');


var apiEndpoint = "https://randblog.cdn.prismic.io/api/v2";
const app = express();
const port = 14181;
 
app.get("/getDocuments", (req, res) => {
    Prismic.getApi(apiEndpoint, { req: req }).then(function(api) {
        return api.query(""); // An empty query will return all the documents
      }).then(function(response) {
          console.log("Documents: ", response.results);
          return res.json(response.results);
      }, function(err) {
        console.log("Something went wrong: ", err);
      });      
});

app.listen(port, () => {
    console.log("Server running on ", port);
});
