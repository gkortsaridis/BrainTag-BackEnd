var request = require('sync-request');
var encodeUrl = require('encodeurl')

module.exports = {
    tag : function(language, text, wrongs){
        text = this.removeNumbers(text);

        //Splitting the paragraph into sentences.
        var splited_sentences = this.split_senteces(text);
        return this.tag_en_stanford(text,splited_sentences,wrongs);
    },

    get_total_recorded_wrongs : function(wrongs){

	    var cnt = 0;
	    for (var p in wrongs) {
			if( wrongs.hasOwnProperty(p) ) {
				cnt = cnt + wrongs[p];
    		}
  		}
	    return cnt;
    },

    get_empty_pos_json : function(){
	  var json = {
	  	"CC": 0,
	  	"CD": 0,
	  	"DT": 0,
	  	"EX": 0,
	  	"FW": 0,
	  	"IN_": 0,
	  	"JJ": 0,
	  	"JJR": 0,
	  	"JJS": 0,
	  	"LS": 0,
	  	"MD": 0,
	  	"NN": 0,
	  	"NNS": 0,
	  	"NNP": 0,
	  	"NNPS": 0,
	  	"PDT": 0,
	  	"POS": 0,
	  	"PRP": 0,
	  	"PRP_": 0,
	  	"RB": 0,
	  	"RBR": 0,
	  	"RBS": 0,
	  	"RP": 0,
	  	"SYM": 0,
	  	"TO_": 0,
	  	"UH": 0,
	  	"VB": 0,
	  	"VBD": 0,
	  	"VBG": 0,
	  	"VBN": 0,
	  	"VBP": 0,
	  	"VBZ": 0,
	  	"WDT": 0,
	  	"WP": 0,
	  	"WP_": 0,
	  	"WRB": 0
	  }

	  return json;
    },

    tag_en_stanford : function(paragraph,splited_sentences,wrongs){

		var http_response = new Object();
		http_response.paragraph = paragraph;

		var totalRecordedErrors = this.get_total_recorded_wrongs(wrongs);
		var empty_words_json_pos = this.get_empty_pos_json();

	    var sentence_array = [];


	    for(var i=0; i<splited_sentences.length; i++){

	        var text = splited_sentences[i].replace('\"/g',"'");

	        var link = encodeUrl('http://localhost:9000/?properties={"annotators": "pos", "outputFormat": "json"}');
	        var res = request('POST', link , { json : text });
	        var tagged_stanford = JSON.parse(res.getBody()).sentences[0].tokens;

	        //console.log("tagged -->"+JSON.stringify(tagged_stanford));
	        //console.log("wrongs -->"+JSON.stringify(wrongs));
	        var sentence_object = new Object();
	        sentence_object.sentence = splited_sentences[i];
	        var response = [];

	        for(var j=0; j<tagged_stanford.length; j++){
	        	var word_element = new Object();
	            if(tagged_stanford[j].pos != undefined){


	            if(wrongs[tagged_stanford[j].pos] != undefined){
		            empty_words_json_pos[tagged_stanford[j].pos]++;
		        }
		        }

	            word_element['textpos'] = tagged_stanford[j].pos;
	            word_element['word'] = tagged_stanford[j].originalText;

	            response.push(word_element);
	        }
	        sentence_object.posTagging = response;

	        sentence_array.push(sentence_object);
	    }

	    //console.log(empty_words_json_pos);


	    var paragraph_word_count = 0;
	    for (var p in empty_words_json_pos) {
			if( empty_words_json_pos.hasOwnProperty(p) ) {
				paragraph_word_count = paragraph_word_count + empty_words_json_pos[p];
    		}
  		}

	    var difficulty = 0;
	    for (var p in empty_words_json_pos) {
			if( empty_words_json_pos.hasOwnProperty(p) ) {
				difficulty = difficulty + empty_words_json_pos[p]/paragraph_word_count * wrongs[p]/totalRecordedErrors;
    		}
  		}
  		http_response.difficulty = difficulty*10;

  		//console.log(difficulty);



	    http_response.sentences = sentence_array;

		return http_response;
    },

    split_senteces : function(text){
        var splited = text.split('. ');
        return splited;
    },

    removeNumbers : function (text){

        for(var i=0; i<999; i++){
            text = text.replace("["+i+"]","");
        }
        return text;
    }

};
