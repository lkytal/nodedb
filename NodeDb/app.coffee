db = require './db.coffee'
fs = require 'fs'
express = require 'express'
coffee = require 'coffee-script'

app = express()

#search = require('search.coffee')

app.get '/', (req, res) ->
	#res.send search.parse req
	res.send run req
	
run = (req) ->
	data = fs.readFileSync 'search.coffee', 'utf-8'
	script = coffee.compile data
	
	html = """
		<!DOCTYPE html>
		<html lang='zh-CN'>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'>
				<meta name='description' content='Chem Search'>
				<meta name='author' content='lkytal'>
				<link rel='shortcut icon' href='favicon.ico'>
				<title>Chem Search</title>
				
				<link href='assets/css/bootstrap.css' rel='stylesheet'>
				<link href='assets/css/main.css' rel='stylesheet'>
			</head>
			<body>
				<script src='assets/js/jquery.js'></script>
				<script>
					#{script}
				</script>
			</body>

		</html>
	"""
	
	console.log html
	
	return html

app.listen 3000
