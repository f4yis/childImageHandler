var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var fs = require('fs')

var app = express()
var port = process.env.PORT || 8080;

app.use(cors())

app.use('/image',express.static('./public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.post('/image', (req, res) => {
	var ran = Math.floor((Math.random() * 100000) / (Math.random() * 8 ) )

	var image = req.body.img;
	var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
	require("fs").writeFile(`./public/${ran}.jpeg`, base64Data, 'base64', function(err) {
		if(err)
			res.json({status: 'error'})
		res.json({status: 'success', url: `/image/${ran}.jpeg`})
	});
})


app.listen(port);