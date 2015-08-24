var fs = require('fs')
var xml2js = require('xml2js')

var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Map</title></head><body><svg height="1000" width="1000">';
var htmlEnd = '</svg><script src="script.min.js"></script></body></html>'


var parser = new xml2js.Parser();
fs.readFile(__dirname + '/data/map.svg', function(err, data) {
    parser.parseString(data, function (err, result) {
			for(i=0;i<result.svg.g[0].g.length;i++) {
				var g = result.svg.g[0].g[i]
				html = html + '<g id="' + g['$'].id + '">'
				if(g.path !== undefined) {
					for(j=0;j<g.path.length;j++) {
						var p = g.path[j]['$']
						if(p.d !== undefined) {
							html = html + '<path id="' + p.id + '" '
								+ 'class="' + p.class + '" '
								+ 'd="' + p.d + '"></path>'
						}
					}
					html = html + '</g>'
				}
			}
			html = html + htmlEnd
			fs.writeFile('public/index.html', html, function (err) {
				if (err) return console.log(err);
				console.log('done');
			});
    });
});
