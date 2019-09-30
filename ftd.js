// Exercise: Complete this so that it is a truly restful api
// 1) Make sure all routes return appropriate http error status
// 2) Complete so that delete works, add this to the front end as well
// 3) Complete so that retrieve works better on the front end
// 3) Add users and login. For a truly restful api, no sessions are allowed
//    this means that you will have to send some kind of authentication
//    token on each request requiring authentication. One example is
//    user and password on each appropriate request. Another example
//    is user and hash(user+password+request_payload), the server can verify
//    that the user is the only one that could have generated the request.

var port = 10091;
var express = require('express');
var app = express();

// http://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();

// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// http://www.sqlitetutorial.net/sqlite-nodejs/connect/
// will create the db if it does not exist
var db = new sqlite3.Database('db/database.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the database.');
});

db.run('CREATE TABLE IF NOT EXISTS users ( username VARCHAR(20) PRIMARY KEY, password VARCHAR(20), score  INTEGER DEFAULT 0);');


// https://expressjs.com/en/starter/static-files.html
app.use(express.static('static-content')); 

// retrieve all counters (idempotent)
app.get('/api/ftd/', function (req, res) {
	console.log('Get Database Rows');

	// http://www.sqlitetutorial.net/sqlite-nodejs/query/
	let sql = 'SELECT * FROM users ORDER BY username;';
	db.all(sql, [], (err, rows) => {
		var result = {};
		result["users"] = [];
  		if (err) {
    			result["error"] = err.message;
  		} else {
			rows.forEach((row) => {
				result["users"].push(row);
			});
		}
		res.json(result);
	});
});

// retrieve specific user (idempotent)
app.get('/api/ftd/:username/:pwd', function (req, res) {
	var username = req.params.username;
	var password = req.params.pwd;
	console.log(username + " " + password);

	// http://www.sqlitetutorial.net/sqlite-nodejs/query/
	let sql = 'SELECT * FROM users WHERE username=? AND password=?';
	db.get(sql, [username,password], (err, row) => {
		var result = {};
  		if (err || !row) {
			// Should set res.status!!
			if (!row){//resource not found
				res.status(404); 
				result["error"] = "Invalid authentication details";
				console.log("Error 404: Invalid authentication details");
			}else {
				result["error"] = err.message;
			}
  		} else {
			res.status(200);
			result["username"] = row["username"];
			result["password"] = row["password"];
		}
		res.json(result);
	});
});

// create a new counter (idempotent)
app.put('/api/ftd/:username/:password/', function (req, res) {
	var username = req.params.username;
	var password = req.params.password;
	console.log("PUT:"+username);

	let sql = 'INSERT INTO users(username, password, score) VALUES (?,?,?);';
	db.run(sql, [username, password, 23523], function (err){
		var result = {};
  		if (err) {
			res.status(409); 
    			result["error"] = err.message;
  		} else {
			res.status(200);
			result[username] = "updated rows: "+this.changes;
		}
		console.log(JSON.stringify(result));
		res.json(result);
	});
});

//update a counter (not idempotent)
app.post('/api/ftd/:counterName/', function (req, res) {
	var counterName = req.params.counterName;
	var amount = req.body.amount;
	console.log("POST:"+ counterName + " " + amount);

	// http://www.sqlitetutorial.net/sqlite-nodejs/update/
	let sql = 'UPDATE counter SET counterValue=counterValue+? WHERE counterName=?;';
	db.run(sql, [amount, counterName], function (err){
		var result = {};
  		if (err) {
			res.status(404); 
    			result["error"] = err.message;
  		} else {
			if(this.changes!=1){
    				result["error"] = "Not updated";
				res.status(404);
			} else {
				result[counterName] = "updated rows: "+this.changes;
			}
		}
		res.json(result);
	});
});

// EXERCISE: delete a counter (idempotent)

app.listen(port, function () {
  	console.log('Example app listening on port '+port);
});

// db.close();

