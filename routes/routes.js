const express = require('express')
const projectModel = require('../Models/project')
const router = express.Router()
const controller = require('../controller/projectController')
const { tryCatch } = require('../utils/trycatch')


//create project
router.post('/create',tryCatch(controller.create))

//get all projects
router.get('/all',tryCatch(controller.showAll))

//get one project
router.get('/:id',tryCatch(controller.showOne))

//update
router.post('/update/:id',tryCatch(controller.update))


module.exports = router;
