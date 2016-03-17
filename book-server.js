var fs = require('fs');
var express = require("express");
var parser = require('body-parser');
var app = express();

var booksJSON;
fs.readFile('./books.json', function(err, data){
    if (err) throw err;
    booksJSON = JSON.parse(data);
});

app.get('/api/books', function(req,res){
    res.json(booksJSON);
});

app.get('/api/books/:isbn', function(req, res){
    var isbn = req.params.isbn;
    
    for( var i = 0; i < booksJSON.length; i++){
        if (booksJSON[i]['isbn10'] == isbn || booksJSON[i]['isbn13'] == isbn){
            res.json(booksJSON[i]);
        }
    }
});

app.listen(process.env.PORT);