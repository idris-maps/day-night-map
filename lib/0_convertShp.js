var jf = require('jsonfile')
var shp = require('shapefile')
var fs = require('fs')

module.exports = function(inputFolder, outputFolder, callback) {
	var shpPath = inputFolder;
	var geojsonPath = outputFolder;

	function listShpFiles(path, callback) {
		fs.readdir(path, function(err, files) {
			var shpFiles = []
			for(i=0;i<files.length;i++) {
				var file = files[i]
				var ext = file.split('.')[1]
				if(ext == 'shp') { shpFiles.push(file.split('.')[0]) }
			}
			callback(shpFiles)
		})
	}

	function convertAndSave(fileName, callback) {
		var shpFile = shpPath + fileName;
		var jsonFile = geojsonPath + fileName + '.json';
		shp.read(shpFile, function(err, json) {
			if(err) { callback() }
			jf.writeFile(jsonFile, json, function(err) {
				console.log('converted: ' +  fileName)
				callback()
			})
		})
	}

	function loop(count,files, callback) {
		var index = count;
		count = count + 1; 
		if(count == files.length + 1) { callback() }
		else { 
			convertAndSave(files[index], function() {
				loop(count, files, callback)
			})
		}
	}


	listShpFiles(shpPath, function(files) {
		loop(0, files, function() {
			callback()
		})
	})
}

