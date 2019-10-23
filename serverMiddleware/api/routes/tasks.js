const { Router } = require('express')

const router = Router()

import slugify from '../../../helpers/slugify'
import Task from '../../../models/Task'


/* GET tasks listing. */
router.get('/tasks', function (req, res, next) {
    Task.find({})
     .then((data)=>{
        console.log('data: ', data);
        res.json(data)
      })
     .catch((err)=>{
       console.log('err: ', err);
       res.status(500).send(err)
     })
})


/* GET task by slug. */
router.get('/tasks/:slug', (req, res) => {
    const slug = req.params.slug
    console.log('slug: ', slug)
    Task.findOne({ slug }).then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})


/* POST create new task. */
router.post('/task', (req, res) => {
    const { payload } = req.body
    const task = new Task(payload)
    task.save().then(data => {
        res.json(data)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

/* PUT update task by ID. */
router.put('/task', (req, res) => {
    console.log('req.body: ', req.body)
    // const { id, newTask } = req.body
    // console.log('id: ', id)
    // console.log('newTask: ', newTask)
    // Task.findOneAndUpdate({ _id: id }, newTask, { useFindAndModify: false }).then(data => {
    //     res.json(data)
    // })
    const { id } = req.body
    console.log('id: ', id)
    Task.findById(id).then(doc => {
        console.log('doc: ', doc)
        doc.completed = !doc.completed
        doc.save()
        res.sendStatus(200)
    })
    .catch(error => {
        res.status(500).send(error)
    })
    // res.json()
})


/* DELETE task by ID. */
router.delete('/task', (req, res) => {
    // console.log('req.body: ', req.body)
    // console.log('req.params: ', req.params)
    console.log('req.query: ', req.query)
    const { id } = req.query
    // const { id } = req.params.id
    console.log('id: ', id)
    Task.deleteOne({ _id: id}).then(data => {
        // res.json(data)
        res.sendStatus(200)
    })
    .catch(error => {
        res.status(500).send(error)
    })
    // res.json()
})

module.exports = router