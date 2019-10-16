const { Router } = require('express')

const router = Router()

import slugify from '../../../helpers/slugify'
// var Article = require('../../../models/Article')
import Article from '../../../models/Article'
const abc = 'abc4'
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

// const slugify = function (text) {
//     return text.toString().toLowerCase()
//         .replace(/\s+/g, '_')           // Replace spaces with -
//         .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//         .replace(/\-/g, '_')         // Replace single - with single _
//         .replace(/\-\-+/g, '_')         // Replace multiple - with single _
//         .replace(/^-+/, '')             // Trim - from start of text
//         .replace(/-+$/, '');
// }

/* GET articles listing. */
router.get('/articles', function (req, res, next) {
    console.log('abc: ', abc)
    // console.log('Article: ', Article)
    // res.json(abc)
    // try {
        // Article.find({}, function(err, articles) {
        //     // if (error) return res.status(500).send(error)
        //     if (err) return console.log('err: ', err)
        //     console.log('articles: ', articles)
        //     res.json(articles)
        // })
    // } catch (error) {
        // console.log('error: ', error)
    // }
    // res.json(users)

    Article.find({})
     .then((data)=>{
        console.log('data: ', data);
        res.json(data)
      })
     .catch((err)=>{
       console.log('err: ', err);
       res.status(500).send(err)
     })
})


/* GET article by slug. */
router.get('/articles/:slug', (req, res) => {
    const slug = req.params.slug
    console.log('slug: ', slug)
    Article.findOne({ slug }).then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})



/* POST create new article. */
router.post('/article', (req, res) => {
    console.log('req: ', req)
    console.log('req.body: ', req.body)
    const { payload } = req.body
    console.log('payload: ', payload)
    console.log('slugify(payload): ', slugify(payload.title))
    payload['slug'] = slugify(payload.title)
    const article = new Article(payload)
    article.save().then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

/* PUT update article by ID. */
router.put('/article', (req, res) => {
    console.log('req.body: ', req.body)

})


/* DELETE delete article by ID. */
router.delete('/article', (req, res) => {
    console.log('req.body: ', req.body)
})

module.exports = router