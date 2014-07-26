fs = require 'fs'
child_process = require('child_process')

comList = [
	"application.coffee"
	]

Compile = (scriptFile) ->
	child_process.exec("cmd.exe /c coffee -bc #{scriptFile}");

fs.readdir ".\\", (err, files) ->
	Compile file for file in files when file.match comList.join('|'), "gi"
