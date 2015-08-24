var union = require('turf-union')

module.exports = function(features, callback) {
	var merged = features[0];
	loop(0, features, merged, function(finalFeat) {
		callback(finalFeat)
	})
}

function loop(count, feats, merged, callback) {
	var index = count;
	count = count + 1;
	if(count === feats.length + 1) {
		callback(merged)
	} else if(index === 0) {
		loop(count, feats, merged, callback)
	} else {
		var f = feats[index]
		var merged = union(merged, f);
		setTimeout(function() {
			console.log('merged ' + count + ' of ' + feats.length)
			loop(count, feats, merged, callback)
		},10)
	}
}
