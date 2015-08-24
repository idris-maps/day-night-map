var d3 = require('d3')

var html = d3.select('html')
	.attr('style', 'padding:0; margin:0; width:100%; height:100%')
var body = d3.select('body')
	.attr('style', 'padding:0; margin:0; width:100%; height:100%; background-color: #241f1c')

var svg = d3.select('svg');
window.onload = onload;
window.onresize = resize;

function resize() {
	var h =  window.innerHeight - 10;
	var w =  window.innerWidth - 10;
	svg.attr('viewBox', '0 0 1000 500')
	svg.attr('height', h)
	svg.attr('width', w)
}

function onload() {
	resize()

	var duration = 100

	var seaColour = d3.scale.linear()
		.domain([0,5])
		.range(['#37abc8','#0b2228'])

	var landColour = d3.scale.linear()
		.domain([0,5])
		.range(['#2ca05a','#0b2817'])

	var urbanColour = d3.scale.linear()
		.domain([0,5]) 
		.range(['#2ca05a','#ffeeaa'])

	var urbanShine = d3.scale.linear()
		.domain([0,5])
		.range([0,0.3])

	var antColour = d3.scale.linear()
		.domain([0,5]) 
		.range(['#dbdee3','#1c1f24'])

	var count = 0
	setInterval(function() {
		if(count === 0) {
			count = 72;	
		} else {
			count = count - 1;
		}

		d3.selectAll('.sea').transition().duration(duration - 10).ease('linear')
			.attr('fill', function(d) { return seaColour(getColNb(count, getId(this))) })
			.attr('stroke', function(d) { return seaColour(getColNb(count, getId(this))) })
		d3.selectAll('.countries').transition().duration(duration - 10).ease('linear')
			.attr('fill', function(d) { return landColour(getColNb(count, getId(this))) })
			.attr('stroke', function(d) { return landColour(getColNb(count, getId(this))) })
		d3.selectAll('.antartica').transition().duration(duration - 10).ease('linear')
			.attr('fill', function(d) { return antColour(getColNb(count, getId(this))) })
			.attr('stroke', function(d) { return antColour(getColNb(count, getId(this))) })
		d3.selectAll('.urban').transition().duration(duration - 10).ease('linear')
			.attr('fill', function(d) { return urbanColour(getColNb(count, getId(this))) })
			.attr('fill-opacity', function(d) { return urbanShine(getColNb(count, getId(this))) })
			.attr('stroke', function(d) { return urbanColour(getColNb(count, getId(this))) })
			.attr('stroke-opacity', function(d) { return urbanShine(getColNb(count, getId(this))) })
	}, duration)
}



function getId(x) {
	var id = d3.select(x)[0][0].id;
	return +id
}

function getColNb(count, id) {
	var x = between1And72(count + id);
	if(x <= 29) { return 1 }
	else if(x === 30) { return 2 }
	else if(x === 31) { return 3 }
	else if(x === 32) { return 4 }

	else if(x > 32 && x < 70) { return 5 }

	else if(x === 70) { return 4 }
	else if(x === 71) { return 3 }
	else if(x === 72) { return 2 }
}

function between1And72(nb) {
	if(nb > 72) { return nb - 72 }
	else if(nb < 1) { return nb + 72}
	else { return nb }
} 

