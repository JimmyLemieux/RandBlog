const express = require('express');
var Prismic = require('prismic-javascript');
var PrismicDOM = require('prismic-dom');
var Elements = PrismicDOM.RichText.Elements;
var fs = require('fs');
var util = require('util');
const cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


const pkg = require("./package.json");
const { json } = require('body-parser');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

var apiEndpoint = "https://randblog.cdn.prismic.io/api/v2";
const app = express();
const port = 14181;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors())

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
      var img = `<div class=\'imageVal\'><img class="img-fluid" src="${element.url}" alt="${element.alt || ''}" copyright="${element.copyright || ''}"><hr class="my-3"/></div>`;
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

app.post("/readDocument", async (req, res) => {
  let fileName = req.body.title;
  const dirName = `./notion_posts/${fileName}/`;
  const path = dirName + fileName + '.html';
  const content = await readFile(path, 'utf-8');
  if (content) {
    return res.json({
      blogBody: content
    });
  } else res.send({error: 500});
});

const readMetaFiles = async (metaDir) => {
  const data = await readFile(metaDir, 'utf-8');
  let obj = JSON.parse(data);
  return {
    title: obj['title'],
    createOn: obj['createDate'],
    synopsis: obj['synopsis'],
    image: obj['image'],
    sortable: obj['sortable']
  }
}
app.get("/getDocuments", async (req, res) => {
  const dirName = "./notion_posts/"
  let fileResponse = [];
  const fileNames = await readdir(dirName);
  for (const file of fileNames) {
    const metaDir = dirName + file + '/' + file + '.json';
    const data = await readMetaFiles(metaDir);
    fileResponse.push(data);
  }
  return res.json(fileResponse);
});

app.post("/parseDocument", (req, res) => {
  var document = req.body;
  document = document.data;
  var htmlBody = PrismicDOM.RichText.asHtml(document.blog_body, linkResolver, htmlSerializer);
  return res.json(
    {
      "blogBody": htmlBody
    
    });
});

app.get("/getCurrentVersion", (req, res) => {
    return res.json({"version": pkg.version});
});

app.get("/getProfilePic", (req, res) => {
  return res.sendFile( __dirname + "/assets/" + "unnamed.jpg" );
})

app.get("/getIntroduction", (req, res) => {
  let jsonOut = {};

  readFile("about.txt").then(data => {
      jsonOut['about'] = data.toString('utf-8');

      readFile("social.txt").then(data => {
        jsonOut["social"] = data.toString('utf-8');
        return res.send(JSON.stringify(jsonOut));
      }).catch((err) => {
        return res.send({"ERROR": 500}); 
      });

    }).catch((err) => {
      return res.send({"ERROR": 500});
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname, 'public', 'index.html');
});

app.get('/healthCheck', (req, res) => {
  res.send(200);
});

app.listen(process.env.PORT || port, async () => {
});

// Depricated Code
// Prismic.getApi(apiEndpoint, { req: req }).then(function(api) {
//     return api.query(""); // An empty query will return all the documents
//   }).then(function(response) {
//       // see if we can read the html files and use them

//       //console.log(response.results);
//       console.log("200 OK Got Documents from prismic");
//       return res.json(response.results);
//   }, function(err) {
//     console.log("Something went wrong: ", err);
//   });
