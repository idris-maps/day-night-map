var save = require('./save')
var jf = require('jsonfile')

module.exports = function(callback) {
	openFiles(function(land, antartica, urban, ocean) {
		console.log(ocean)
		rmUnused(land, function(l) {
			save('./data/final/land.json', l, function() {
				rmUnused(antartica, function(a) {
					save('./data/final/antartica.json', a, function() {
						rmUnused(urban, function(u) {
							save('./data/tmp/urbanBig.json', u, function() {
								rmUnused(ocean, function(o) {
									save('./data/final/ocean.json', o, function() {
										callback()
									})
								})
							})
						})
					})
				})
			})
		})
	})
}

function rmUnused(collection, callback) {
	var c = {type:'FeatureCollection',features:[]}
	for(i=0;i<collection.features.length;i++) {
		var f = collection.features[i];
		var id = f.properties.id;
		if(id > 19 && id < 54) {
			c.features.push(f)
		}
	}
	callback(c)
} 

function openFiles(callback) {
	jf.readFile('data/tmp/land.json', function(err, land) {
		jf.readFile('data/tmp/divAntartica.json', function(err, antartica) {
			jf.readFile('data/tmp/divUrban.json', function(err, urban) {
				jf.readFile('data/tmp/divOcean.json', function(err, ocean) {
				callback(land, antartica, urban, ocean)
				})
			})
		})
	})
}
