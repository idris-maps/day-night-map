var save = require('./save')
var merge = require('./merge')
var jf = require('jsonfile')

module.exports = function(callback) {
	open(function(countries) {
		separateById(countries, function(parts) {
			var coll = {type:'FeatureCollection', features:[]}
			loopMerge(0, parts, coll, function(final) {
				save('./data/tmp/land.json', final, function() {
					callback()
				})
			})
		})
	})
}

function loopMerge(count, parts, final, callback) {
	var index = count;
	count = count + 1;
	if(count === parts.length + 1) {
		callback(final)
	} else if(count === 25) {
		for(i=0;i<parts[index].features.length;i++) {
			final.features.push(parts[index].features[i])
		}
		loopMerge(count, parts, final, callback)
	} else {
		var id = parts[index].id;
		var part = parts[index].features;
		merge(part, function(mergedPart) {
			setTimeout(function() {
				console.log(count + ' / ' + parts.length)
				final.features.push(mergedPart)		
				loopMerge(count, parts, final, callback)
			},10)
		})
	}
}

function separateById(collection, callback) {
	var sep = []
	for(i=0;i<collection.features.length;i++) {
		var id = collection.features[i].properties.id;
		var exist = false;
		for(j=0;j<sep.length;j++) {
			var sepId = sep[j].id;
			if(id === sepId) {
				sep[j].features.push(collection.features[i])
				exist = true;
				break;
			} 			
		}
		if(exist === false) {
			sep.push({id: id, features:[collection.features[i]]})
		} 
	}
	callback(sep)
}

function open(callback) {
	jf.readFile('data/tmp/divCountries.json', function(err, data) {
		clean(data, function(cleaned) {
			callback(cleaned)
		})
	})
}

function clean(data, callback) {
	var countries = {type:'FeatureCollection', features: []}

	for(i=0;i<data.features.length;i++) {
		if(data.features[i].geometry.type !== 'Polygon' && data.features[i].geometry.type !== 'MultiPolygon') {
			console.log(data.features[i])
		} else {
			countries.features.push(data.features[i])
		}
	}
	countries.features.sort(function(a, b) {
		  return parseInt(a.properties.id) - parseInt(b.properties.id);
	});
	callback(countries)
}
