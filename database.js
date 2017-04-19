var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yokoo8332',
  database : 'nlp_thesis',
  stringifyObjects : true
});
 
connection.connect();
 
connection.query("SELECT * FROM `users`", function (error, results, fields) {
  if (error) throw error;
  
  var json = JSON.parse(JSON.stringify(results));
  
  
  for(var i=0; i<json.length; i++){
	  console.log(json[i].Username);
  }
  
});
 
connection.end();