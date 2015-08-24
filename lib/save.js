var jf =  require('jsonfile')

module.exports = function(fileName, data, callback) {
	jf.writeFile(fileName, data, function(err) {
		if(err) { console.log(err) }
		console.log('wrote ' + fileName)
		callback()
	})
}
