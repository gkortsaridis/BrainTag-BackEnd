//To persistently StanfordCoreNLPServer run the next command from inside stanford directory
//nohup java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer &

const express = require('express');
var bodyParser = require('body-parser');

var nlp_pos_tagging = require('nlp_pos_tagging');
var wiki = require('wiki_page_crawler');

const app = express();
const port = 3000;


var mysql = require('mysql');

var mysql_config = {
	host     : 'localhost',
	user     : 'root',
	password : 'yokoo8332',
	database : 'braintag'
};



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/', (request, response) => {

	//console.log(request.body);

    var category = request.body.wiki_category;
    var language = request.body.wiki_language;
    var wrongs = request.body.wrongs;

    var wiki_paragraphs = wiki.crawl(language,category);
    var paragraph_to_tag = wiki_paragraphs[getRandomInt(0,wiki_paragraphs.length-1)];

    var tagged = nlp_pos_tagging.tag(language,paragraph_to_tag,wrongs);

    response.send(tagged);
});

app.post('/tag/', (request, response) => {
    var par = request.body.paragraph;
    //console.log(par);
    var tagged = nlp_pos_tagging.tag("en",par);
    response.send(tagged);
});

app.get('/wrongs/', (request, response) => {

    var connection = mysql.createConnection(mysql_config);
	var wrongs_json;
	connection.connect();
	connection.query("SELECT * FROM wrong_answers",function (error, results, fields) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			var wrongs_json = JSON.parse(JSON.stringify(results));
			response.status(200).send(wrongs_json[0]);

			}
		});
		connection.end();
});

//Checked out
//TODO : Add more categories
app.get('/categories/', (request, response) => {
	console.log("Request : /categories/ ");
	
	var respo = new Object();
	
	var resp = new Array();
	
	var sports = new Object();
	sports.name = "Sports";
	var sportsCategories = new Array();
	sportsCategories.push("Sports");
	sportsCategories.push("Basketball");
	sportsCategories.push("Football");
	sportsCategories.push("Soccer");
	sportsCategories.push("Volleyball");
	sportsCategories.push("Tennis");
	sportsCategories.push("NBA");
	sports.categories = sportsCategories;
	resp.push(sports);
	
	respo.categories = resp;
	respo.category = "Sports";
	response.status(200).send(respo);
});

//Checked out
app.post('/scoreboard/', (request, response) => {
	console.log("Request : /scoreboard/ from ID : "+request.body.ID);

	var resp = new Object();
	var id = request.body.ID;
	var myscore = -1;
	var myposition = -1;

    var connection = mysql.createConnection(mysql_config);
	var wrongs_json;
	connection.connect();
	connection.query("SELECT `ID`, `Username`, `Score` FROM `users` ORDER BY `Score` DESC",function (error, results, fields) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			var json = JSON.parse(JSON.stringify(results));

			for(var i=0; i<json.length; i++){
				if(json[i].ID == id){
					myscore = json[i].Score;
					myposition = (i+1);
				}
			}

			if(myscore == -1){	myscore = "N/A"; }
			if(myposition == -1){ myposition = "N/A"; }
			
			resp.scoreboard = json;
			resp.score = myscore;
			resp.rank = myposition;
			response.status(200).send(resp);

			}
		});
		connection.end();
});

//Checked out
app.post('/register/', (request, response) => {
	console.log("Request : /register/ for username "+request.body.username);

    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;

	var connection = mysql.createConnection(mysql_config);
	var connection1 = mysql.createConnection(mysql_config);

	connection.connect();
	connection.query("SELECT * FROM users WHERE Username = '"+username+"'", function (error, results, fields) {
		if (error) throw error;

		if(results.length == 0){
			connection1.connect();

			connection1.query("INSERT INTO users  (Username,Password,Email,Score) VALUES ('"+username+"','"+password+"','"+email+"',0);", function (error1, results1, fields1) {
				response.status(200).send("OK");
			});
			connection1.end();
		}else{
			response.status(401).send("Username already taken");
		}
	});
	connection.end();

});

app.post('/login/', (request, response) => {

    var username = request.body.username;
    var password = request.body.password;

	var jsonResp;
	var connection = mysql.createConnection(mysql_config);
	connection.connect();
	connection.query("SELECT * FROM users WHERE Username = '"+username+"' AND Password = '"+password+"'", function (error, results, fields) {
		if (error) throw error;

		var json = JSON.parse(JSON.stringify(results));
		if(json.length > 0){
			response.status(200).send(json[0]);
		}else{
			response.status(404).send("FAIL");

		}


	});
	connection.end();
});


app.post('/game_end/', (request, response) => {

    var id = request.body.user_id;
    var score = request.body.score;
    var wrong_answers = request.body.wrong_answers;
    //console.log(wrong_answers);

	var connection = mysql.createConnection(mysql_config);
	var connection1 = mysql.createConnection(mysql_config);

	connection.connect();
	connection.query("UPDATE users SET Score = Score + "+score+" WHERE ID = "+id, function (error, results, fields) {
		if (error){
			response.status(500).send("Could not update score");
		}else{
			var query = "UPDATE wrong_answers SET "+
			"CC = CC + "+wrong_answers.CC+" ,"+
			"CD = CD + "+wrong_answers.CD+" ,"+
			"DT = DT + "+wrong_answers.DT+" , "+
			"EX = EX + "+wrong_answers.EX+" , "+
			"FW = FW + "+wrong_answers.FW+" ,"+
			"IN_ = IN_ + "+wrong_answers.IN+" ,"+
			"JJ = JJ + "+wrong_answers.JJ+" , "+
			"JJR = JJR + "+wrong_answers.JJR+" ,"+
			"JJS = JJS + "+wrong_answers.JJS+" ,"+
			"LS = LS + "+wrong_answers.LS+" , "+
			"MD = MD + "+wrong_answers.MD+" ,"+
			"NN = NN + "+wrong_answers.NN+" , "+
			"NNS = NNS + "+wrong_answers.NNS+" , "+
			"NNP = NNP + "+wrong_answers.NNP+" , "+
			"NNPS = NNPS + "+wrong_answers.NNPS+" ,"+
			"PDT = PDT + "+wrong_answers.PDT+" , "+
			"POS = POS + "+wrong_answers.POS+" ,"+
			"PRP = PRP + "+wrong_answers.PRP+" , "+
			"PRP_ = PRP_ + "+wrong_answers.PRP$+" , "+
			"RB = RB + "+wrong_answers.RB+" , "+
			"RBR = RBR + "+wrong_answers.RBR+" , "+
			"RBS = RBS + "+wrong_answers.RBS+" ,"+
			"RP = RP + "+wrong_answers.RP+" ,"+
			"SYM = SYM + "+wrong_answers.SYM+", "+
			"TO_ = TO_ + "+wrong_answers.TO+","+
			"UH = UH + "+wrong_answers.UH+", "+
			"VB = VB + "+wrong_answers.VB+","+
			"VBD = VBD + "+wrong_answers.VBD+","+
			"VBG = VBG + "+wrong_answers.VBG+","+
			"VBN = VBN + "+wrong_answers.VBN+","+
			"VBP = VBP + "+wrong_answers.VBP+","+
			"VBZ = VBZ + "+wrong_answers.VBZ+","+
			"WDT = WDT + "+wrong_answers.WDT+","+
			"WP = WP + "+wrong_answers.WP+","+
			"WP_ = WP_ + "+wrong_answers.WP$+","+
			"WRB = WRB + "+wrong_answers.WRB

			connection1.connect();
			connection1.query(query, function (error, results, fields) {
				if (error){
					response.status(500).send(error);
				}else{
					response.status(200).send("OK");
				}
			});
			connection1.end();
		}
	});
	connection.end();
});



app.post('/wiki/', (request, response) => {
    var category = request.body.wiki_category;
    var language = request.body.wiki_language;

    var wiki_paragraphs = wiki.crawl(language,category);
    var paragraph_to_tag = wiki_paragraphs[getRandomInt(0,wiki_paragraphs.length-1)];

    response.send(paragraph_to_tag);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
