var express = require('express');
var newsData = require('../scripts/newsData')
var config = require('../scripts/config')
var router = express.Router();

// TODO: tag, imgs
function getPublicContent() {

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Express',
      genres: config['genres']
  });
});

// TODO: access login if already login?

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Express'
    });
})

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: 'Register'
    })
})

router.get('/tag/:word', function (req, res, next) {
    res.render('newslist', {
        genres: config['genres'],
        title: req.params.word,
        tag: req.params.word,
        genre: null
    })
})

router.get('/search', function (req, res, next) {
    let search = req.query.search
    if( !search ){
        res.status(404).send()
    }else {
        newsData.search(search, function (err, result) {
            if( err ){
                console.log(err)
                res.status(500).send()
            }else {
                res.render('search',{
                    title: "搜索关键字：" + search,
                    genres: config['genres'],
                    list: result
                })
            }
        })
    }
})

router.get('/info', function (req, res) {
    res.render('info', {
        title: req.query.title,
        message: req.query.message
    })
})

let genres = config['genres']
router.get('/:genre', function (req, res, next) {
    if( newsData.validGenre(req.params.genre) )
        res.render('newslist', {
            genres: config['genres'],
            title: genres[req.params.genre],
            genre: req.params.genre,
            tag: null
        });
    else
        res.status(404).send()
})




module.exports = router;
