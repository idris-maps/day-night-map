var exec = require('child_process').exec;
var convertShp = require('./lib/0_convertShp')
var antartica = require('./lib/1_separate_antartica')
var divLng = require('./lib/2_divide_along_longitude')
var mergeLand = require('./lib/3_merge_land_by_lng')
var rmUnused = require('./lib/4_remove_unused')

convertShp('data/shp/', 'data/geojson/', function(){
	console.log('--> converted shp')
	antartica(function() {
		console.log('--> separated Antartica')
		divLng(function() { 
			console.log('--> divided by longitude')
			mergeLand(function() { 
				console.log('--> merged land by longitude')
				rmUnused(function() {
					console.log('--> moved to final')
				})
			}) 
		})
	})
})

