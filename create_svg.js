var jsdom = require('node-jsdom')
var fs = require('fs')
var d3 = require('d3')
var c = {
	height: 500,
	width: 1000
}

var countriesData = require('./data/final/land.json')
var urbanData = require('./data/final/urban.json')
var seaData = require('./data/final/ocean.json')
var antarticaData = require('./data/final/antartica.json')

jsdom.env(
  "<html><body></body></html>",
  [ 'http://localhost:3000/js/d3.min.js' ],
  function (err, window) {
		var body = window.d3.select('body')
		var svg = body.append('svg')
			.attr({
				height: c.height,
				width: c.width
			})
		draw(svg, {height: c.height, width: c.width})
		fs.writeFileSync('data/map.svg', window.d3.select("body").html());
  }
)

function draw(svg, canvas) {

	var projection = d3.geo.orthographic()
		  .scale(200)
		  .translate([canvas.width/2, canvas.height/2])
		  .clipAngle(90)
		  .precision(.1)
			.rotate([0,0,20])
	var path = d3.geo.path()
		  .projection(projection);

	var earth = svg.append('g').attr('id', 'earth')

	var gSea = earth.append('g').attr('id', 'seaGroup')
	gSea.selectAll('path.sea')
		.data(seaData.features)
		.enter()
		.append('path')
		.attr('id', function(d) { return d.properties.id })
		.attr('class', 'sea')
		.attr('d', path)
		.attr('stroke-width', 1)

	var gCountries = earth.append('g').attr('id', 'countriesGroup')
	gCountries.selectAll('path.countries')
		.data(countriesData.features)
		.enter()
		.append('path')
		.attr('id', function(d) { return d.properties.id })
		.attr('class', 'countries')
		.attr('d', path)
		.attr('stroke-width', 1)

	var gAntartica = earth.append('g').attr('id', 'antarticaGroup')
	gCountries.selectAll('path.antartica')
		.data(antarticaData.features)
		.enter()
		.append('path')
		.attr('id', function(d) { return d.properties.id })
		.attr('class', 'antartica')
		.attr('d', path)
		.attr('stroke-width', 1)

	var gUrban = earth.append('g').attr('id', 'urbanGroup')
	gUrban.selectAll('path.urban')
		.data(urbanData.features)
		.enter()
		.append('path')
		.attr('id', function(d) { return d.properties.id })
		.attr('class', 'urban')
		.attr('d', path)
		.attr('stroke-width',2)

}
