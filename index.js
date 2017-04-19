var request = require('sync-request');
var encodeUrl = require('encodeurl')
var bodyParser = require('body-parser');


var nlp_pos_tagging = require('nlp_pos_tagging');
var wiki = require('wiki_page_crawler');

exports.handler = (event, context) => {
    //console.log("Event: ", event);
    //console.log("Context: ", context);
    var category = event.wiki_category;    
    var language = event.wiki_language;    


    var wiki_paragraphs = wiki.crawl(language,category);
    var paragraph_to_tag = wiki_paragraphs[getRandomInt(0,wiki_paragraphs.length-1)];
    var tagged = nlp_pos_tagging.tag(language,paragraph_to_tag);

    context.succeed(tagged);
    /*context.succeed({
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": tagged
    });*/

};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}