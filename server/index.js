const express = require('express');
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');
var Elements = PrismicDOM.RichText.Elements;
const http = require('http');
const ngrok = require('ngrok');
var bodyParser = require('body-parser');


const pkg = require("./package.json");

var apiEndpoint = "https://randblog.cdn.prismic.io/api/v2";
const app = express();
const port = 14181;

app.use(bodyParser.json());

var linkResolver = function(doc) {
  // Pretty URLs for known types
  if (doc.type === 'blog') return "/post/" + doc.uid;
  if (doc.type === 'page') return "/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id;
};

var htmlSerializer = function (type, element, content, children) {
  switch(type) {
    case Elements.heading1: return `<h1>${children.join('')}</h1>`;
    case Elements.heading2: return `<h2>${children.join('')}</h2>`;
    case Elements.heading3: return `<h3>${children.join('')}</h3>`;
    case Elements.heading4: return `<h4>${children.join('')}</h4>`;
    case Elements.heading5: return `<h5>${children.join('')}</h5>`;
    case Elements.heading6: return `<h6>${children.join('')}</h6>`;
    case Elements.paragraph: return `<p>${children.join('')}</p>`;
    case Elements.preformatted: return `<pre>${children.join('')}</pre>`;
    case Elements.strong: return `<strong>${children.join('')}</strong>`;
    case Elements.em: return `<em>${children.join('')}</em>`;
    case Elements.listItem: return `<li>${children.join('')}</li>`;
    case Elements.oListItem: return `<li>${children.join('')}</li>`;
    case Elements.list: return `<ul>${children.join('')}</ul>`;
    case Elements.oList: return `<ol>${children.join('')}</ol>`;
    case Elements.image:
      var linkUrl = element.linkTo ? PrismicDOM.Link.url(element.linkTo, module.exports.linkResolver) : null;
      var linkTarget = element.linkTo && element.linkTo.target ? `target="${element.linkTo.target}" rel="noopener"` : '';
      var wrapperClassList = [element.label || '', 'block-img'];
      var img = `<img class="img-fluid" style="text-align:center" src="${element.url}" alt="${element.alt || ''}" copyright="${element.copyright || ''}">`;
      return (`
        <p class="${wrapperClassList.join(' ')}">
          ${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
        </p>
      `);
    case Elements.embed:
      return (`
        <div data-oembed="${element.oembed.embed_url}"
          data-oembed-type="${element.oembed.type}"
          data-oembed-provider="${element.oembed.provider_name}"
        >
          ${element.oembed.html}
        </div>
      `);
    case Elements.hyperlink:
      var target = element.data.target ? `target="${element.data.target}" rel="noopener"` : '';
      var linkUrl = PrismicDOM.Link.url(element.data, linkResolver);
      return `<a ${target} href="${linkUrl}">${children.join('')}</a>`
    case Elements.label:
      var label = element.data.label ? ` class="${element.data.label}"` : '';
      return `<span ${label}>${children.join('')}</span>`;
    case Elements.span: return content ? content.replace(/\n/g, "<br />") : '';
    default: return null;
  }
};
 
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

app.post("/parseDocument", (req, res) => {
  var document = req.body;
  document = document.data;
  var htmlBody = PrismicDOM.RichText.asHtml(document.blog_body, linkResolver, htmlSerializer);

  console.log(htmlBody);
  return res.json(
    {
      "blogBody": htmlBody
    
    });
});

app.get("/getCurrentVersion", (req, res) => {
    console.log(pkg.config.app_version);
    return res.json({"version": pkg.config.app_version});
});

app.get("/getProfilePic", (req, res) => {
  return res.sendFile( __dirname + "/assets/" + "unnamed.jpg" );
})

app.listen(port, async () => {
    console.log("Server running on ", port);
    const url = await ngrok.connect(4200);
    console.log(url);
});
