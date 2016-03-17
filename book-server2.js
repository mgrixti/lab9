var mongoose = require('mongoose');
var express = require("express");
var app = express();


mongoose.connect('mongodb://localhost:27017/lab9');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
 console.log("connected");
});

var bookSchema = new mongoose.Schema({
 id: String,
 isbn10: String,
 isbn13: Number,
 title: String,

});

var book = mongoose.model('Book',bookSchema);

app.get('/api/books', function(req,res){
    book.find({}, function(err, data) {
        if (err) {
            console.log('error finding all books');
            res.json({ message: 'Unable to connect to books' });
        }
         else {
            // return found data as json back to request
            res.json(data);
         }
    });
});

// Can be ISBN10 or ISBN13. It will figure it out and send the correct query
app.get('/api/books/:isbn', function(req, res){
    var isbn = req.params.isbn;
    
    if (isbn.length == 10)
    {   // find by ISBN10
        book.find({isbn10: isbn}, function(err, data) {
            if (err) {
                console.log('error finding all books');
                res.json({ message: 'Unable to connect to books' });
            }
             else {
                // return found data as json back to request
                res.json(data);
             }
        });
    } else {
        // find by ISBN13
        book.find({isbn13: isbn}, function(err, data) {
            if (err) {
                console.log('error finding all books');
                res.json({ message: 'Unable to connect to books' });
            }
             else {
                // return found data as json back to request
                res.json(data);
             }
        });
    }
});


app.listen(process.env.PORT);