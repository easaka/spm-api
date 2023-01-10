const express = require('express')
const projectModel = require('../Models/project')
const router = express.Router()
const controller = require('../controller/projectController')


//create project
router.post('/create',controller.create)

//get all projects
router.get('/all',controller.showAll)

//get one project
router.get('/:id',async (req,res)=>{
    try {
        const project = await projectModel.findById(req.params.id)
        res.json(project)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router;
