// Generated by IcedCoffeeScript 1.7.1-f
var app, coffee, db, express, fs, run;

db = require('./db.coffee');

fs = require('fs');

express = require('express');

coffee = require('coffee-script');

app = express();

app.get('/', function(req, res) {
  return res.send(run(req));
});

run = function(req) {
  var data, html, script;
  data = fs.readFileSync('search.coffee', 'utf-8');
  script = coffee.compile(data);
  html = "<!DOCTYPE html>\n<html lang='zh-CN'>\n	<head>\n		<meta charset='utf-8'>\n		<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n		<meta name='description' content='Chem Search'>\n		<meta name='author' content='lkytal'>\n		<link rel='shortcut icon' href='favicon.ico'>\n		<title>Chem Search</title>\n		\n		<link href='assets/css/bootstrap.css' rel='stylesheet'>\n		<link href='assets/css/main.css' rel='stylesheet'>\n	</head>\n	<body>\n		<script src='assets/js/jquery.js'></script>\n		<script>\n			" + script + "\n		</script>\n	</body>\n\n</html>";
  console.log(html);
  return html;
};

app.listen(3000);
