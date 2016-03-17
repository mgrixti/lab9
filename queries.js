//Query A
db.books.find({id: 587})

//Query B
db.books.find({'category.secondary': 'Calculus'})

//Query C
db.books.find({id: {$gte:700, $lte: 710}})

//Query D
db.books.find({publisher: 'Prentice Hall', 'category.main': 'Computer Science'}, {title:1, 'production.pages':1})

//Query E
db.books.find({title: /Algebra/}, {title: 1, isbn10: 1}).limit(5)

//Query F
db.books.aggregate([{$match : {title: /Algebra/}}, {$group : {_id: '$production.status', count : {$sum: 1}}}])
    
    