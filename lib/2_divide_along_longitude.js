var intersect = require('turf-intersect')
var save = require('./save')
var divs = require('../data/slices.json')
var jf = require('jsonfile')

module.exports = function(callback) {
	openFiles(function(countries, antartica, urban, ocean) {
		divLng(countries, function(divCountries) {
			save('data/tmp/divCountries.json', divCountries, function() {
				divLng(urban, function(divUrban) {
					save('data/tmp/divUrban.json', divUrban, function() {
						divLng(ocean, function(divOcean) {
							save('data/tmp/divOcean.json', divOcean, function() {
								divLng(antartica, function(divAntartica) {
									save('data/tmp/divAntartica.json', divAntartica, function() {
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

function divLng(coll, callback) {
	var newColl = {type:'FeatureCollection', features:[]}
	loop(0, coll.features, newColl, function(done) {
		callback(done)
	})
}

function loop(count, featsColl, newColl, callback) {
	var index = count;
	count = count + 1;
	if(count === featsColl.length + 1) {
		callback(newColl)
	} else {
		var f = featsColl[index];
		for(j=0;j<divs.features.length;j++) {
			var div = divs.features[j]
			var int = intersect(f,div);
			if(int !== undefined) {
				int.properties = div.properties;
				newColl.features.push(int)
			}
		}
		setTimeout(function() {
			if(count/10 === Math.floor(count/10)) { 
				console.log(count + ' / ' + featsColl.length) 
			}
			loop(count, featsColl, newColl, callback)
		},10)
	}
}

function openFiles(callback) {
	jf.readFile('data/tmp/countries_wo_antartica.json', function(err, countries) {
		jf.readFile('data/tmp/antartica.json', function(err, antartica) {
			jf.readFile('data/geojson/ne_50m_urban_areas.json', function(err, urban) {
				jf.readFile('data/geojson/ne_110m_ocean.json', function(err, ocean) {
				callback(countries, antartica, urban, ocean)
				})
			})
		})
	})
}
