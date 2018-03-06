var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  db.contactlist.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log('POST @ contactlist');
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id/', function (req, res) {
  var id = req.params.id;
  console.log('DELETE @ contactlist/' + id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
  	console.log('DELETED id = ' + id);
    res.json(doc);
  });
});

app.get('/users/:name', function(req, res) {
	var name = req.params.name;
	console.log('GET @ users/' + name);
	db.contactlist.findOne( {name: name }, function (err, doc) {
	  	if (!doc){
	  		console.log('RESPONSE @ users/' + name + ' : 404 Not Found')
	  		res.status(404).send('User ' + name + ' is not found. Try another name');
	  	} else {
	  	 	console.log('RESPONSE @ contactlist/' + name);
	  	 	console.log(JSON.stringify(doc));
	  		res.send('<h1>'+ doc.name +'</h1>' + '<br><h2>'+ doc.email + '</h2>' + '<br><h3>' + doc.number + '</h3>')};

	});
} )

app.get('/contactlist/:id/', function (req, res) {
  	var id = req.params.id;
	console.log('GET by id @ contactlist/' + id);
	db.contactlist.findOne( {_id: mongojs.ObjectId(id) }, function (err, doc) {
		if (!doc){
			console.log(err);
			res.status(500).send('Error!');
		} else {
		 	console.log('RESPONSE @ contactlist/' + id);
		 	console.log(JSON.doc);
			res.json(doc);
		};
	});
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log('PUT @ /contactlist/' + id);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
    	console.log(doc);
      res.json(doc);
    }
  );
});

app.get('*', (req, res)=>{
	res.send('Not Found');
});

app.listen(3000);
console.log("Server running on port 3000");