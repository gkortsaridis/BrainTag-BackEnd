var request = require('sync-request');
var cheerio = require('cheerio');
var encodeUrl = require('encodeurl')

module.exports = {
    crawl : function(language,section){

        //Make HTTP call on the wiki page.
        var link = encodeUrl('https://'+language+'.wikipedia.org/wiki/'+section);
        var res = request('GET', link);
        var wiki_paragraphs = [];
        var $ = cheerio.load(String(res.getBody()));

        //Use Cheerio, to get all <p> tags from the response.
        $('p').each(function(i, element){
            var par = $(this).text();
            if(par != ""){ wiki_paragraphs.push($(this).text()); }
        });

        return this.removeNumbers(wiki_paragraphs);
    },

    removeNumbers : function (text){

		for(var j=0; j<text.length; j++){
        	for(var i=0; i<999; i++){
            	text[j] = text[j].replace("["+i+"]","");
        	}
        }

        return text;
    }

};
