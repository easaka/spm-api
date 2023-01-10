const express = require('express')
const projectModel = require('../Models/project')
const router = express.Router()
const controller = require('../controller/projectController')


//create project
router.post('/create',controller.create)

//get all projects
router.get('/all',controller.showAll)

//get one project
router.get('/:id',controller.showOne)

//update
router.post('/update/:id',controller.update)


module.exports = router;
