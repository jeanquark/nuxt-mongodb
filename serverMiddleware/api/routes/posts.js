const { Router } = require('express')

const router = Router()

import slugify from '../../../helpers/slugify'
import Post from '../../../models/Post'


/* GET posts listing. */
router.get('/posts', function (req, res, next) {
    Post.find({})
     .then((data)=>{
        console.log('data: ', data);
        res.json(data)
      })
     .catch((err)=>{
       console.log('err: ', err);
       res.status(500).send(err)
     })
})


/* GET post by slug. */
router.get('/posts/:slug', (req, res) => {
    const slug = req.params.slug
    console.log('slug: ', slug)
    Post.findOne({ slug }).then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})


/* POST create new post. */
router.post('/post', (req, res) => {
    const { payload } = req.body
    console.log('payload: ', payload)
    console.log('slugify(payload): ', slugify(payload.title))
    payload['slug'] = slugify(payload.title)
    const post = new Post(payload)
    post.save().then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

/* PUT update post by ID. */
router.put('/post', (req, res) => {
    // console.log('req.body: ', req.body)
    const { id, newPost } = req.body
    // console.log('id: ', id)
    // console.log('newPost: ', newPost)
    Post.findOneAndUpdate({ _id: id }, newPost, { useFindAndModify: false }).then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
    // res.json()
})


/* DELETE post by ID. */
router.delete('/post', (req, res) => {
    // console.log('req.body: ', req.body)
    // console.log('req.params: ', req.params)
    console.log('req.query: ', req.query)
    const { id } = req.query
    // const { id } = req.params.id
    console.log('id: ', id)
    Post.deleteOne({ _id: id}).then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
    // res.json()
})

module.exports = router