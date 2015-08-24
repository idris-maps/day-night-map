var save = require('./save')
var jf = require('jsonfile')

module.exports = function(callback) {
	open(function(data) { 
		var ant = {type:'FeatureCollection', features:[]}
		var rest = {type:'FeatureCollection', features:[]}
		for(i=0;i<data.features.length;i++) {
			var f = data.features[i]
			if(f.properties.iso_a2 === 'AQ') { ant.features.push(f) }
			else { rest.features.push(f) }
		}

		save('./data/tmp/antartica.json', ant, function() {
			save('./data/tmp/countries_wo_antartica.json', rest, function() {
				callback()
			})
		})
	})
}

function open(callback) {
	jf.readFile('data/geojson/ne_110m_admin_0_countries.json', function(err, val) {
		callback(val)
	})
}
